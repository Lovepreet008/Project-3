//create map object
var map = L.map('map', {
    center: [37.8, -96],
    zoom: 4
});

//add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    

// Update selectedYear when the dropdown selection changes
let dropdown = document.getElementById('selDataset');

// Get the selected year
let selectedYear = dropdown.options[dropdown.selectedIndex].value;

dropdown.addEventListener('change', function() {
    selectedYear = this.options[this.selectedIndex].value;
     // Update the map here
    updateMap();
});

//load GeoJSON data
let geojsonData, stateData;

// Load GeoJSON data
fetch('http://127.0.0.1:5000/api/geojsondata')
  .then(response => response.json())
  .then(data => {
    geojsonData = data;
    if (stateData) {
      combineData();
      updateMap();
    }
  });

// Load JSON data
fetch('http://127.0.0.1:5000/api/state')
  .then(response => response.json())
  .then(data => {
    stateData = data;
    if (geojsonData) {
      combineData();
      updateMap();
    }
  });
// To do:
function combineData() {
  if (!geojsonData || !stateData) {
    // If either dataset hasn't been loaded yet, do nothing
    return;
  }

  // Create a lookup object for quick access to JSON data by state code
  const dataLookup = stateData.reduce((lookup, item) => {
    lookup[item.state_code] = item;
    return lookup;
  }, {});

  // Loop through each feature in the GeoJSON and add properties from JSON data
  geojsonData.features.forEach(feature => {
    const stateCode = feature.properties.stusab; // Adjust the property key as needed
    if (dataLookup[stateCode]) {
      // Add properties to the feature
      feature.properties.transplantCount = dataLookup[stateCode].counts;
      feature.properties.organ = dataLookup[stateCode].organ;
      // ... add other properties as needed
    }
  });

  // Now 'geojsonData' contains the merged data and is ready for use in your map
}



// Create a variable to hold the choropleth layer
let choroplethLayer;
let legend;
// Function to update the map
function updateMap() {
    // Remove the old choropleth layer if it exists
    if (choroplethLayer) {
        map.removeLayer(choroplethLayer);
    }
    if (legend){
      map.removeControl(legend);
    }

    // Create a new choropleth layer with the updated data
    choroplethLayer = L.choropleth(geojsonData, {
        // Define coordinates from geojson file
        geometry: "coordinates",
        // set valueproperty to transplantCount from json file in api/state
        valueProperty: function(feature) {
            let stateInfo = stateData.filter(d => d.organ === "All" && d.state_code == feature.properties.stusab);
            return stateInfo.length > 0 ? stateInfo[0].counts : 0;
        },
        // Set the color scale.
        scale: ["#FFFFB2", "#99000d"],
        // The number of breaks in the step range
        steps: 10,
        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        // Binding a popup to each layer
        onEachFeature: function(feature, layer) {
            // Get the state data for this feature
            let Info = stateData.filter(d => d.state_code == feature.properties.stusab && d.year.toString() === selectedYear);
            // Create a string for the popup
            let popupContent = "State: " + feature.properties.name;
            // Add the count for each organ
            Info.forEach(item => {
                popupContent += "<br>" + item.organ + ": " + item.counts;
            });
            layer.bindPopup(popupContent);
        }
    }).addTo(map);
    // Set up the legend.
    legend = L.control({ position: "bottomright" });
    // Add minimum and maximum.
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend");
      let limits = choroplethLayer.options.limits; 
      let colors = choroplethLayer.options.colors; 
      let labels = [];
    // Add min & max
      let legendInfo = "<div style='color: black; font-size: 14px;'>Recipient Count</div>";
      div.innerHTML = legendInfo;
      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "; width: 10px; height: 10px;\"></li>");
    });
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
  };
  // Adding the legend to the map
  legend.addTo(map);
}
  