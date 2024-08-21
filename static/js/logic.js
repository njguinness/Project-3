// Initialize the map and set its view to Washington, D.C.
var map = L.map('map').setView([38.9072, -77.0369], 12);

// Add a tile layer (the map background)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON data and add it to the map
fetch('Wards_from_2022.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: "#FF0000", // Boundary color
                    weight: 2,        // Boundary thickness
                    opacity: 1,       // Boundary opacity
                    fillOpacity: 0.1  // Fill opacity
                };
            },
            onEachFeature: function (feature, layer) {
                if (feature.properties && feature.properties.NAME) {
                    layer.bindPopup("Ward: " + feature.properties.NAME);
                }
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error("Error loading the GeoJSON data: ", error);
    });

