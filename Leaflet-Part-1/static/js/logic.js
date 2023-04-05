const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Perform a GET request to the query URL/
d3.json(url).then(function (data) {
    // Once we get a response, send the data.features object to the getFeatures function.
    getFeatures(data.features);
});
  
function getFeatures(earthquakeData) {
  
    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and magnitude of the earthquake.
    function featureProperties(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3> <hr> <h3> Earthquake: ${feature.properties.mag.toLocaleString()} magnitude and ${feature.properties.sig.toLocaleString()} out of 1000 significance</h3>`);
    }
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
      featureProperties: featureProperties
    });

    
  
    // Send our earthquakes layer to the Mapping function
    Mapping(earthquakes);
}

d3.json(url).then(function (data){
    markerSize(data.features);
   
  function markerSize(mag) {
    return mag;
    }

    for (var i = 0; i < data.features.length; i++) {
        L.circle(data.features[i].geometry.coordinates, {
          fillOpacity: 0.75,
          color: "red",
          fillColor: "purple",
          // Setting our circle's radius to equal the output of our markerSize() function:
          radius: markerSize(data.features[i].properties.mag)
        }).bindPopup(`<h1>${features[i].properties.place}</h1>`).addTo(loadMap);
      }
    
});
  
function Mapping(earthquakes) {
  
    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the topographic map and earthquakes layers to display by default.
    var loadMap = L.map("map", {
      center: [14.716677, -17.467686 
      ],
      zoom: 3,
      layers: [topo, earthquakes]
    });
  
    // Pass our baseMaps and overlayMaps to a control layer to be added on the map.
      L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(loadMap);
  
}
  

/////////////////////////////////////////////

