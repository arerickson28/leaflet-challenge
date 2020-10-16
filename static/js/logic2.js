// geoJason = https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

// var myMap = L.map('mapid').setView([51.505, -0.09], 3);




var initialLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

console.log("hey") ; 


function plateJson(data)
 {
     L.geoJson(data).addTo(myMap) ;

 } ;

 var platelink = "static/data/plates.geojson";




var overlayMaps = 
    {
        "Tectonic Plates" : L.layerGroup(d3.json(platelink).then(plateJson))
        // "Earthquakes" : quake,
        // "Tectonic Plates" : plates.addTo(myMap)
    } ;


var myMap = L.map("mapid", {
    center: [51.505, -0.09],
    zoom: 3,
    layers: [initialLayer, null]//layers to be enabled]
  });
// get the geojson data and create geojson layer with the retrieved data
// function quakeJson(data) 
//  { 
//     L.geoJson(data).addTo(myMap);
//  } ;

// var quakelink = "static/data/earthquake.geojson" ;

// quake = d3.json(quakelink).then(quakeJson())

// get the tectonic plate data and create geojson layer





// function deployPlates()
//     {
//     d3.json(platelink).then(plateJson) ;
//     };

// d3.json(platelink).then(plateJson) ;

// var plates = L.layerGroup(d3.json(platelink).then(plateJson)) ;



//GEOJSON STUFF HERE


// quakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// platesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"



// d3.json(platelink).then(function(data) {
//     // Create a GeoJSON layer with the retrieved data
//     L.geoJson(data).addTo(myMap);
//   });






//Need magnitiude and three coordinates for each earthquake












// Tile layer basemaps
var TerrainBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
});

var topography = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var baseMaps = 
    {
        Terrain : TerrainBackground,
        Topography : topography,
        Street : street,
        Satellite : WorldImagery
    };







//Add control
L.control.layers(baseMaps, null, {collapsed: false}).addTo(myMap);
  
 