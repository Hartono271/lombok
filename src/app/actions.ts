'use server'

export type Destination = {
  name: string;
  typeURI: string;
  typeLabel: string;
  desc: string;
  img: string;
  price: string;
  location: string;
  transport: string;
}

export async function fetchDestinations(): Promise<{ success: boolean; data: Destination[]; error?: string }> {
  const endpoint = process.env.SPARQL;

  if (!endpoint) {
    console.error("Environment variable SPARQL is not defined");
    return { success: false, data: [], error: "Server Configuration Error: SPARQL endpoint missing" };
  }
  
  const query = `
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX to: <http://www.semanticweb.org/harto/ontologies/2025/3/protegetesis#>
  
      SELECT ?name ?typeURI (SAMPLE(?typeLabel) as ?label) (SAMPLE(?desc) as ?description) (SAMPLE(?img) as ?image) (SAMPLE(?price) as ?priceVal) (GROUP_CONCAT(DISTINCT ?locName; separator=", ") as ?locations) (GROUP_CONCAT(DISTINCT ?transName; separator=", ") as ?transports)
      WHERE {
        ?s to:TourismName ?name .
        ?s rdf:type ?typeURI .
        
        FILTER(?typeURI != owl:NamedIndividual)
        
        OPTIONAL { 
           ?typeURI rdfs:label ?typeLabel .
           FILTER(lang(?typeLabel) = "en") 
        }
        
        OPTIONAL { ?s to:Description ?desc . }
        OPTIONAL { ?s to:Images ?img . }
        OPTIONAL { ?s to:Price ?price . }
  
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
      LIMIT 200
  `;

  try {
    // Request ini dilakukan oleh Server Bun
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sparql-query',
        'Accept': 'application/sparql-results+json'
      },
      body: query,
      cache: 'no-store' // Pastikan selalu ambil data fresh
    });

    if (!response.ok) {
        throw new Error(`Fuseki Error: ${response.statusText}`);
    }

    const json = await response.json();
    
    // Transformasi data agar bersih saat dikirim ke client
    const cleanData: Destination[] = json.results.bindings.map((b: any) => ({
      name: b.name.value,
      typeURI: b.typeURI.value,
      typeLabel: b.label ? b.label.value : "Destination",
      desc: b.description ? b.description.value : "No description available.",
      img: b.image ? b.image.value : "",
      price: b.priceVal ? b.priceVal.value : "Free",
      location: b.locations ? b.locations.value : "Lombok",
      transport: b.transports ? b.transports.value : "Kendaraan Pribadi" 
    }));

    return { success: true, data: cleanData };

  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, data: [], error: "Gagal menghubungkan ke Server Fuseki (Port 3030)" };
  }
}