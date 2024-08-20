// Initialize the map and set its view to Washington, DC
var map = L.map('map').setView([38.89511, -77.03637], 12);  // Coordinates for Washington, DC

// Add a tile layer (you can use different tile providers like OpenStreetMap, Mapbox, etc.)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load the GeoJSON data
fetch('Wards_from_2022.geojson')
    .then(response => response.json())
    .then(geojsonData => {
        // Add the GeoJSON layer to the map
        L.geoJSON(geojsonData, {
            style: function (feature) {
                return {
                    color: "#ff7800",
                    weight: 2,
                    opacity: 1
                };
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error loading the GeoJSON data:', error));
