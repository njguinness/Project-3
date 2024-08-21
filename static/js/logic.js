// Initialize the map and set its view to Washington, D.C.
var map = L.map('map').setView([38.9072, -77.0369], 12);

// Add a tile layer (the map background)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to calculate the centroid of a polygon
function calculateCentroid(coordinates) {
    let centroid = [0, 0];
    let area = 0;

    for (let i = 0; i < coordinates[0].length - 1; i++) {
        const x1 = coordinates[0][i][0];
        const y1 = coordinates[0][i][1];
        const x2 = coordinates[0][i + 1][0];
        const y2 = coordinates[0][i + 1][1];

        const a = (x1 * y2 - x2 * y1);
        area += a;
        centroid[0] += (x1 + x2) * a;
        centroid[1] += (y1 + y2) * a;
    }

    area *= 0.5;
    centroid[0] /= (6 * area);
    centroid[1] /= (6 * area);

    return centroid;
}

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
                    // Bind a popup showing the ward name
                    layer.bindPopup("Ward: " + feature.properties.NAME);

                    // Calculate the centroid of the polygon (for placing the label)
                    const centroid = calculateCentroid(feature.geometry.coordinates);

                    // Add a marker at the centroid with the ward number as a label
                    L.marker(centroid, {
                        icon: L.divIcon({
                            className: 'ward-label',
                            html: feature.properties.NAME,
                            iconSize: [20, 20]
                        })
                    }).addTo(map);
                }
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error("Error loading the GeoJSON data: ", error);
    });


