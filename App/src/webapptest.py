from SPARQLWrapper import SPARQLWrapper, JSON, N3, RDF

sparql = SPARQLWrapper("http://leonsmits.github.io/Zoo_new.ttl")
sparql.setQuery("""
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT ?label
    WHERE { <http://leonsmits.github.io/Zoo_new.ttl#> rdfs:label ?label }
""")

# N3 example
print '\n\n*** N3 Example'
sparql.setReturnFormat(N3)
results = sparql.query().convert()
print results