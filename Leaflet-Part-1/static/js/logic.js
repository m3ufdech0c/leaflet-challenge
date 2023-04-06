// Create a map object.
var myMap = L.map("map", {
  center: [14.716677, -17.467686],
  zoom: 3
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Perform a GET request to the query URL/
d3.json(url).then(function (data){
  // Once we get a response, send the data.features object to the getFeatures function.
  getFeatures(data.features);
});

function getFeatures(earthquakeData) {
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Earthquake of ${feature.properties.mag.toLocaleString()} magnitude and ${feature.properties.sig.toLocaleString()} out of 1000 significance</p>`).addTo(myMap);
  }
  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  markerSize(earthquakes);

  function markerSize(mag) {
    return mag;
  }

  for (var i = 0; i < earthquakes.length; i++) {
    L.circle(earthquakes[i].geometry.coordinates, {
      fillOpacity: 0.75,
      color: "red",
      fillColor: "purple",
      // Setting our circle's radius to equal the output of our markerSize() function:
      radius: earthquakes[i].properties.mag
    }).addTo(myMap);
  }
}




// .bindPopup(`<h3>${earthquakes[i].properties.place}</h3><hr><p> Earthquake of ${earthquakes[i].properties.mag.toLocaleString()} magnitude and ${earthquakes[i].properties.sig.toLocaleString()} out of 1000 significance</p>`).addTo(myMap);
 
  

