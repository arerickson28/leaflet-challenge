
 //Tectonic plates layer group 
          //read in geojson
var platelink = "static/data/plates.geojson" ;
var quakelink = "static/data/earthquake.geojson" ;

var geoJsonQuake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson" ;

var geoJsonPlate = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json" ;


console.log("logic.js") ;



// plateLayer = L.layerGroup(L.geoJson(d3.json(platelink)) );



// var quakeData = []

// d3.json(quakelink).then(function(data)
//   { 
//       var quakeLayer = L.layerGroup();

//       for (var i = 0; i < data.length; i++)
//           {
//             coordinates = data.features[i].geometry.coordinates
//             console.log(coordinates)
//             quakeData.push(coordinates)

//           }

//   }) ;



// // Grab the data with d3
// d3.json(url).then(function(response) {

//   // Create a new marker cluster group
//   var markers = L.markerClusterGroup();

//   // Loop through data
//   for (var i = 0; i < response.length; i++) {

//     // Set the data location property to a variable
//     var location = response[i].location;

//     // Check for location property
//     if (location) {

//       // Add a new marker to the cluster group and bind a pop-up
//       markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
//         .bindPopup(response[i].descriptor));
//     }

//   }








  // {
  //   for (var i = 0; i < data.lentgh; i++)
  //     {
  //       quakeData.push(feature[i].geometry.coordinates)

  //     } ;



  // }) ;  



// function createFeatures(earthquakeData) 
//   {
//     function onEachFeature(feature, layer) {
//       feature.geometry.coordinates 

//   } ;







// // d3.json(quakelink, function(data) {
// //   // Once we get a response, send the data.features object to the createFeatures function
// //   createFeatures(data.features);
// // });

// function createFeatures(earthquakeData) {

//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//   function onEachFeature(feature, layer) {
//       feature.geometry.coordinates 

//       for (var i = 0; i < locations.length; i++) {
//         // Setting the marker radius for the state by passing population into the markerSize function
//         stateMarkers.push(
//           L.circle(locations[i].coordinates, {
//             stroke: false,
//             fillOpacity: 0.75,
//             color: "white",
//             fillColor: "white",
//             radius: markerSize(locations[i].state.population)
//           })
//         );

//     layer.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
// //   }














          // d3.json(platelink, function plateJson(data) 
          //   {
          //     L.geoJson(data, {color: "#FFA500", weight: 4, fillOpacity: 0})
          //     .addTo(plateLayer) ;

          //   }) ;

          // var plates = d3.json(platelink).then(function(data) {
          //   // Create a GeoJSON layer with the retrieved data

          //   plateLayer = L.layerGroup()

            
          //   L.geoJson(data).addTo(plateLayer);


          // });

          
            // function plateJson(data)
            // {
            //     L.geoJson(data).addTo(myMap) ;
          
            // } ;
          
            // var platelink = "static/data/plates.geojson";
          
            // plateLayerGroup = L.layerGroup(d3.json(platelink).then(plateJson))


//Earthquake layer group
          //read in geoJson----specify features needed (magnitude, and three cooderinates--lat, long, depth)
          //bind markers that are varied in size based on corresponding matnitude






          //create base layers

          var initialLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/streets-v11",
            accessToken: API_KEY
          });


          //Define map object
          var myMap = L.map("mapid", {
            center: [51.505, -0.09],
            zoom: 3
          });

          initialLayer.addTo(myMap) ;

          //Function to determine radius of earthquake marker based on earthquake magnitude
          function quakeRadius(magnitude)
            {

              if (magnitude == 0) {
                return 1
              };
              
              return magnitude * 4 ;

            } ;

            

              // Function that will determine the color of a neighborhood based on the borough it belongs to
                function chooseColor(magnitude) {
                  switch (true) {
                  case magnitude > 5:
                    return "red";
                  case magnitude > 4:
                    return "orange";
                  case magnitude > 3:
                    return "yellow";
                  case magnitude > 2:
                    return "green";
                  case magnitude > 5:
                    return "blue";
                  default:
                    return "purple";
                  }
                };

                function styleInfo(feature) {
                  return {
                    opacity: 1,
                    fillOpacity: 1,
                    fillColor: chooseColor(feature.properties.mag),
                    color: "#000000",
                    radius: quakeRadius(feature.properties.mag),
                    stroke: true,
                    weight: 0.5
                  }
                };

                //Main data processing starts here
                d3.json(geoJsonQuake).then(function(data)
                {

                                  console.log(data) ;

                            

                                console.log(quakeRadius(3) );


                                //Add geoJson layer

                                L.geoJson(data, {
                                  pointToLayer: function (feature, latlng) {
                                    return L.circleMarker(latlng) ;
                                  }, 
                                  style: styleInfo, 
                                  onEachFeature: function (feature, layer) {
                                    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br> + Location: " + feature.properties.place) ;
                                  }

                                }).addTo(myMap) ;

                                //legend
                                var legend = L.control({ 
                                  position: "bottomright",
                                  
                                }) ;

                                legend.onAdd = function(){
                                  // Then add all the details for the legend
                                      var div = L.DomUtil.create("div", "info legend");
                                      var grades = [0, 1, 2, 3, 4, 5];
                                      var colors = [
                                        "purple",
                                        "blue",
                                        "green",
                                        "yellow",
                                        "orange",
                                        "red"];

                                        // Looping through our intervals to generate a label with a colored square for each interval.
                                      for (var i = 0; i < grades.length; i++) {
                                        div.innerHTML +=
                                          "<i style='background: " + colors[i] + "'></i> " +
                                          grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
                                      }
                                      return div;

                                } ;
                                      legend.addTo(myMap) ;



              }) ;







          // var TerrainBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}', {
          //     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          //     subdomains: 'abcd',
          //   minZoom: 0,
          //   maxZoom: 18,
          //   ext: 'png'
          // });

          // var topography = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          //   maxZoom: 17,
          //   attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          // });

          // var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          //   maxZoom: 19,
          //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // });

          // var WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          //   attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          // });

          // var baseMaps = 
          //     {
          //         Initial : initialLayer,
          //         Terrain : TerrainBackground,
          //         Topography : topography,
          //         Street : street,
          //         Satellite : WorldImagery
          //     };

         
          // // var overlayMaps = 
          // //     {
          // //         "Tectonic Plates" : plateLayer,
          // //         "Earthquakes" : quakeLayer
                  
          // //     } ;


          // //Earthquake layer group
          // //read in geoJson----specify features needed (magnitude, and three cooderinates--lat, long, depth)
          // //bind markers that are varied in size based on corresponding matnitude



          //   // Pass our map layers into our layer control
          // // Add the layer control to the map
          // L.control.layers(baseMaps, overlayMaps, {
          //     collapsed: false
          //   }).addTo(myMap);
            
  