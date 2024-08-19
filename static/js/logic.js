// Initialize the map and set its view to a specific location and zoom level
var map = L.map('map').setView([51.505, -0.09], 10);

// Add a tile layer (base layer)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load the GeoJSON data
fetch('/Wards_from_2022.geojson')
    .then(response => response.json())
    .then(data => {
        // Create a GeoJSON layer and add it to the map
        L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: "#ff7800",
                    weight: 2,
                    opacity: 1
                };
            },
            onEachFeature: function (feature, layer) {
                // Bind a popup to each feature
                layer.bindPopup('<strong>Ward Name: </strong>' + feature.properties.Ward_Name);
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));
