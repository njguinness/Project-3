// Initialize the map and set its view to Washington, D.C.
// var map = L.map('map').setView([38.9072, -77.0369], 12);

// Add a tile layer (the map background)
//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//    maxZoom: 18,
//    attribution: '© OpenStreetMap contributors'
//}).addTo(map);

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
                if (feature.properties && feature.properties.Name) {
                    // Bind a popup showing the ward name
                    layer.bindPopup(feature.properties.Name);

                    // Use getBounds().getCenter() to find the center of the polygon
                    const center = layer.getBounds().getCenter();

                    // Add a marker at the center with the ward number as a label
                    L.marker(center, {
                        icon: L.divIcon({
                            className: 'ward-label',
                            html: feature.properties.Name,
                            iconSize: null // Allow the label to auto-size
                        })
                    }).addTo(map);

                    // Add event listener to open the modal with ward info
                    layer.on('click', function() {
                        var modal = document.getElementById("wardModal");
                        var span = document.getElementsByClassName("close")[0];
                        var wardInfo = document.getElementById("wardInfo");

                        // Display ward ID in modal
                        wardInfo.innerHTML =  feature.properties.Name;

                        // Display the modal
                        modal.style.display = "block";

                        // When the user clicks on <span> (x), close the modal
                        span.onclick = function() {
                            modal.style.display = "none";
                        };

                        // When the user clicks anywhere outside of the modal, close it
                        window.onclick = function(event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        };
                    });
                }
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error("Error loading the GeoJSON data: ", error);
    });
