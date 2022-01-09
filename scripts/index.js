/* Place your JavaScript in this file */
var map = L.map('map').setView([44, 6], 5);


/* Modifie le fond de carte suivant le niveau de zoom, celui de l'Atlas of Roman Empire n'est pas disponible > 11 */
    var romanempiremap = L.tileLayer('https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://dh.gu.se/dare/">Digital Atlas of the Roman Empire (DARE) </a> contributors',
    });
    
    var OSM = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
    });
  
    romanempiremap.addTo(map); //initial layer according to initial zoom
    
    map.on("zoomend", function(e){
      	console.log("Zoom level: ", map.getZoom());
	if(map.getZoom() > 11){ //Level 11 is the treshold 
          map.removeLayer(romanempiremap);
          OSM.addTo(map);
        }else{
          map.removeLayer(OSM);
          romanempiremap.addTo(map);
        }
    });
	
	// Add the SCALE BAR
	L.control.betterscale().addTo(map);

//Script pour afficher la couche de polygones json -->
			// load GeoJSON and save it as a thing called `data`
$.getJSON("essai.json", function(data) {
	// adds GeoJSON objects to layer
data = L.geoJson(data ,{
// converts point feature into a map layer
pointToLayer: function(feature,latlng){
return L.marker(latlng);
}
}).addTo(map);
});<!-- Fin script pour afficher la couche de polygones json -->

		

    var control = L.control.UniForm(null, overlayMaps, {
            collapsed: false,
            position: 'topright'
        }
    );


//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;



