export async function getDestinations() {
  const endpoint = process.env.SPARQL || "http://localhost:3030/wisata-lombok/sparql";

  if (!endpoint) {
    console.error("Environment variable SPARQL is not defined");
    return [];
  }

  const query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX to: <http://www.semanticweb.org/harto/ontologies/2025/3/protegetesis#>

    SELECT ?name ?typeURI 
      (SAMPLE(?typeLabel) as ?label) 
      (SAMPLE(?desc) as ?description) 
      (SAMPLE(?img) as ?image) 
      (SAMPLE(?price) as ?priceVal) 
      (SAMPLE(?rating) as ?ratingVal)
      (SAMPLE(?activity) as ?activityVal)
      (SAMPLE(?facility) as ?facilityVal)
      (SAMPLE(?openHours) as ?openingHoursVal)
      (GROUP_CONCAT(DISTINCT ?locName; separator=", ") as ?locations) 
      (GROUP_CONCAT(DISTINCT ?transName; separator=", ") as ?transports)
    WHERE {
      ?s to:TourismName ?name .
      ?s rdf:type ?typeURI .
      FILTER(?typeURI != owl:NamedIndividual)
      
      OPTIONAL { ?typeURI rdfs:label ?typeLabel . FILTER(lang(?typeLabel) = "en") }
      OPTIONAL { ?s to:Description ?desc . }
      OPTIONAL { ?s to:Images ?img . }
      OPTIONAL { ?s to:Price ?price . }
      OPTIONAL { ?s to:Ratings ?rating . }
      OPTIONAL { ?s to:Activity ?activity . }
      OPTIONAL { ?s to:Facility ?facility . }
      OPTIONAL { ?s to:OpeningHours ?openHours . }

      OPTIONAL {
        ?s to:Locatedin ?loc .
        ?loc rdf:type ?locType .
        FILTER(?locType != owl:NamedIndividual)
        BIND(STRAFTER(STR(?locType), "#") as ?locName)
      }

      OPTIONAL {
        ?trans to:used_to_reach ?s .
        BIND(STRAFTER(STR(?trans), "#") as ?transName)
      }
    }
    GROUP BY ?name ?typeURI
    LIMIT 300
  `;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sparql-query',
        'Accept': 'application/sparql-results+json'
      },
      body: query,
      cache: 'no-store' // Ensure fresh data on server render
    });

    if (!response.ok) {
        throw new Error("Failed to fetch from Fuseki");
    }

    const data = await response.json();

    return data.results.bindings.map((b: any) => ({
      name: b.name.value,
      typeURI: b.typeURI.value,
      typeLabel: b.label ? b.label.value : extractTypeName(b.typeURI.value),
      desc: b.description ? b.description.value : "",
      img: b.image ? b.image.value : "",
      price: b.priceVal ? b.priceVal.value : "",
      rating: b.ratingVal ? b.ratingVal.value : "",
      activity: b.activityVal ? b.activityVal.value : "",
      facility: b.facilityVal ? b.facilityVal.value : "",
      openingHours: b.openingHoursVal ? b.openingHoursVal.value : "",
      location: b.locations ? b.locations.value : "Lombok",
      transport: b.transports ? b.transports.value : ""
    }));

  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function extractTypeName(uri: string) {
  const match = uri.match(/#([^#]+)$/);
  return match ? match[1].replace(/([A-Z])/g, ' $1').trim() : "Destination";
}