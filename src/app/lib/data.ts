export async function getDestinations() {
  const endpoint = process.env.SPARQL || "http://localhost:3030/lombok/sparql";

  if (!endpoint) {
    console.error("Environment variable SPARQL is not defined");
    return [];
  }

  // Query untuk mendapatkan data dalam kedua bahasa (EN dan ID)
  const query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX to: <http://www.semanticweb.org/harto/ontologies/2025/3/protegetesis#>

    SELECT ?name ?typeURI 
      (SAMPLE(?typeLabelEn) as ?labelEn) 
      (SAMPLE(?typeLabelId) as ?labelId) 
      (SAMPLE(?desc) as ?description) 
      (SAMPLE(?descEn) as ?descriptionEn) 
      (SAMPLE(?descId) as ?descriptionId) 
      (SAMPLE(?img) as ?image) 
      (SAMPLE(?price) as ?priceVal) 
      (SAMPLE(?priceEn) as ?priceValEn)
      (SAMPLE(?priceId) as ?priceValId)
      (SAMPLE(?rating) as ?ratingVal)
      (SAMPLE(?activity) as ?activityVal)
      (SAMPLE(?activityEn) as ?activityValEn)
      (SAMPLE(?activityId) as ?activityValId)
      (SAMPLE(?facility) as ?facilityVal)
      (SAMPLE(?facilityEn) as ?facilityValEn)
      (SAMPLE(?facilityId) as ?facilityValId)
      (SAMPLE(?openHours) as ?openingHoursVal)
      (SAMPLE(?openHoursEn) as ?openingHoursValEn)
      (SAMPLE(?openHoursId) as ?openingHoursValId)
      (GROUP_CONCAT(DISTINCT ?locNameEn; separator=", ") as ?locationsEn) 
      (GROUP_CONCAT(DISTINCT ?locNameId; separator=", ") as ?locationsId) 
      (GROUP_CONCAT(DISTINCT ?transName; separator=", ") as ?transports)
    WHERE {
      ?s to:TourismName ?name .
      ?s rdf:type ?typeURI .
      FILTER(?typeURI != owl:NamedIndividual)
      
      OPTIONAL { ?typeURI rdfs:label ?typeLabelEn . FILTER(lang(?typeLabelEn) = "en" || lang(?typeLabelEn) = "") }
      OPTIONAL { ?typeURI rdfs:label ?typeLabelId . FILTER(lang(?typeLabelId) = "id") }
      
      OPTIONAL { ?s to:Description ?desc . }
      OPTIONAL { ?s to:meaningdescription ?descEn . FILTER(lang(?descEn) = "en") }
      OPTIONAL { ?s to:meaningdescription ?descId . FILTER(lang(?descId) = "id") }
      
      OPTIONAL { ?s to:Images ?img . }
      OPTIONAL { ?s to:Price ?price . }
      OPTIONAL { ?s to:pricedescription ?priceEn . FILTER(lang(?priceEn) = "en") }
      OPTIONAL { ?s to:pricedescription ?priceId . FILTER(lang(?priceId) = "id") }
      OPTIONAL { ?s to:Ratings ?rating . }
      
      OPTIONAL { ?s to:Activity ?activity . }
      OPTIONAL { ?s to:activitydescprition ?activityEn . FILTER(lang(?activityEn) = "en") }
      OPTIONAL { ?s to:activitydescprition ?activityId . FILTER(lang(?activityId) = "id") }
      
      OPTIONAL { ?s to:Facility ?facility . }
      OPTIONAL { ?s to:facilitydescription ?facilityEn . FILTER(lang(?facilityEn) = "en") }
      OPTIONAL { ?s to:facilitydescription ?facilityId . FILTER(lang(?facilityId) = "id") }
      
      OPTIONAL { ?s to:OpeningHours ?openHours . }
      OPTIONAL { ?s to:openinghoursdescription ?openHoursEn . FILTER(lang(?openHoursEn) = "en") }
      OPTIONAL { ?s to:openinghoursdescription ?openHoursId . FILTER(lang(?openHoursId) = "id") }

      OPTIONAL {
        ?s to:Locatedin ?loc .
        ?loc rdf:type ?locType .
        FILTER(?locType != owl:NamedIndividual)
        OPTIONAL { ?locType rdfs:label ?locLabelEn . FILTER(lang(?locLabelEn) = "en" || lang(?locLabelEn) = "") }
        OPTIONAL { ?locType rdfs:label ?locLabelId . FILTER(lang(?locLabelId) = "id") }
        BIND(COALESCE(?locLabelEn, STRAFTER(STR(?locType), "#")) as ?locNameEn)
        BIND(COALESCE(?locLabelId, STRAFTER(STR(?locType), "#")) as ?locNameId)
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
      // Data dalam bahasa Inggris
      typeLabelEn: b.labelEn ? b.labelEn.value : extractTypeName(b.typeURI.value),
      descEn: b.descriptionEn ? b.descriptionEn.value : (b.description ? b.description.value : ""),
      activityEn: b.activityValEn ? b.activityValEn.value : (b.activityVal ? b.activityVal.value : ""),
      facilityEn: b.facilityValEn ? b.facilityValEn.value : (b.facilityVal ? b.facilityVal.value : ""),
      priceEn: b.priceValEn ? b.priceValEn.value : (b.priceVal ? b.priceVal.value : ""),
      openingHoursEn: b.openingHoursValEn ? b.openingHoursValEn.value : (b.openingHoursVal ? b.openingHoursVal.value : ""),
      locationEn: b.locationsEn ? b.locationsEn.value : "Lombok",
      // Data dalam bahasa Indonesia
      typeLabelId: b.labelId ? b.labelId.value : (b.labelEn ? b.labelEn.value : extractTypeName(b.typeURI.value)),
      descId: b.descriptionId ? b.descriptionId.value : (b.descriptionEn ? b.descriptionEn.value : (b.description ? b.description.value : "")),
      activityId: b.activityValId ? b.activityValId.value : (b.activityValEn ? b.activityValEn.value : (b.activityVal ? b.activityVal.value : "")),
      facilityId: b.facilityValId ? b.facilityValId.value : (b.facilityValEn ? b.facilityValEn.value : (b.facilityVal ? b.facilityVal.value : "")),
      priceId: b.priceValId ? b.priceValId.value : (b.priceValEn ? b.priceValEn.value : (b.priceVal ? b.priceVal.value : "")),
      openingHoursId: b.openingHoursValId ? b.openingHoursValId.value : (b.openingHoursValEn ? b.openingHoursValEn.value : (b.openingHoursVal ? b.openingHoursVal.value : "")),
      locationId: b.locationsId ? b.locationsId.value : "Lombok",
      // Data umum
      img: b.image ? b.image.value : "",
      rating: b.ratingVal ? b.ratingVal.value : "",
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