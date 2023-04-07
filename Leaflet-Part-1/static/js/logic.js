// Creating a map object.
var myMap = L.map("map", {
  center: [14.716677, -17.467686],
  zoom: 2.2
});

// Adding a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Performing a GET request to the query URL/
d3.json(url).then(function (data){
  // Once we get a response, sending the data.features object to the getFeatures function.
  getFeatures(data.features);
});

function getFeatures(earthquakeData) {
  // Defining a functions that we want to run once for each feature in the features array.
  markerSize(earthquakeData);
  // Defining a markerSize() function that will give each earthquake feature a different radius based on its magnitude.
  function markerSize(mag) {
    return mag * 50000;
  }
  //Creating a gradient color palette (function to be called later), using ColorBrewer2.org
  function getColor(d) {
    return d > 150 ? '#49006a' :
           d > 90 ? '#7a0177' :
           d > 70 ? '#ae017e' :
           d > 50 ? '#dd3497' :
           d > 30 ? '#f768a1' :
           d > 20 ? '#fa9fb5' :
           d > 10 ? '#fcc5c0' :
           d > 0  ? '#fde0dd' :
                    '#fff7f3';                 
  }
  
  //Looping through the earthquakeData to get parameters needed such as coordinates, magnitude and depth
  for (var i = 0; i < earthquakeData.length; i++) {
    console.log(earthquakeData[i]);
    L.circle([earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]], {
      fillOpacity: 1,
      color: "white",
      // Setting our circle's color to equal the output of our getColor() function:
      fillColor: getColor(earthquakeData[i].geometry.coordinates[2]),
      // Setting our circle's radius to equal the output of our markerSize() function:
      radius: markerSize(earthquakeData[i].properties.mag)
    }).bindPopup(`<h3>${earthquakeData[i].properties.place}</h3><hr><p>Earthquake of ${earthquakeData[i].properties.mag.toLocaleString()} magnitude and ${earthquakeData[i].properties.sig.toLocaleString()} out of 1000 significance</p>`).addTo(myMap);
  }

  // Setting up the legend
  let legend = L.control({position: 'bottomright'});
  legend.onAdd = function (map) {

      let div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 10, 20, 30, 50, 70, 90, 150],
      labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
       
        "<i style=\"background-color:" + getColor(grades[i] + 1) + "\"></i>" +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        
      }
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
  };
  // Adding the Legend to the map
  legend.addTo(myMap);

}




