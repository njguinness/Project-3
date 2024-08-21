// Initialize the map and set its view to Washington, D.C.
var map = L.map('map').setView([38.9072, -77.0369], 12);

// Add a tile layer (the map background)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON data and add it to the map
fetch('path-to-your-ward-boundaries.geojson')
    .then(response => response.json())
    .then(data => {
        // Add the GeoJSON data to the map with custom styling
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
                    // Bind a popup showing the ward name
                    layer.bindPopup("Ward: " + feature.properties.NAME);

                    // Use getBounds().getCenter() to find the center of the polygon
                    const center = layer.getBounds().getCenter();

                    // Add a marker at the center with the ward number as a label
                    L.marker(center, {
                        icon: L.divIcon({
                            className: 'ward-label',
                            html: feature.properties.NAME,
                            iconSize: null // Allow the label to auto-size
                        })
                    }).addTo(map);
                }
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error("Error loading the GeoJSON data: ", error);
    });
