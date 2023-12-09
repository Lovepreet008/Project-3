//create map object
var map = L.map('map', {
    center: [37.8, -96],
    zoom: 4
});

//add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
//load GeoJSON data
let geoData = "http://127.0.0.1:5000/api/state";

// To do:

// Get the data with d3.
d3.json(geoData).then(function(data) {
    // Create a new choropleth layer.
    let geojson = L.choropleth(data, {
      // Define which property in the features to use.
      valueProperty: "DP03_75E",
      // Set the color scale.
      scale: ["#ffffb2", "#b10026"],
      // The number of breaks in the step range
      steps: 10,
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      // Binding a popup to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Zip Code: " + feature.properties.NAME + "<br>Estimated total income and benifits<br>" +
          "$" + feature.properties.DP03_75E);
    }
      }).addTo(myMap);
    // Set up the legend.
    let legend = L.control({ position: "bottomright" });
      // Add minimum and maximum.
      legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let limits = geojson.options.limits;
        let colors = geojson.options.colors;
        let labels = [];
  
        // Add min & max
        let legendInfo = "<h1>Population with children</h1>" +
          "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
          "</div>";
  
        div.innerHTML = legendInfo;
  
        limits.forEach(function(limit, index) {
          labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });
  
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
      };
    // Adding the legend to the map
    legend.addTo(myMap);
    }
  );