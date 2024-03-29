//Creates the map, tells it to display in the element with id of 'mapid' and sets a flat projection, as we are projecting an image. 
var map = L.map('mapid', { 
    crs: L.CRS.Simple, //Set a flat CRS (Coordinate Reference System) projection as we are projecting an image.
	zoomDelta: 0.25,
	minZoom: 2,
	maxZoom: 5
	});

//Change the URL to reflect where you are hosting your map tiles. Width and Height of original image MUST be defined.
var layer = L.tileLayer.zoomify('./badlands-map/{g}/{z}-{x}-{y}.jpg', {
    width: 4096,    // MUST be defined.
    height: 3072,   // MUST be defined.
	}).addTo(map);

//Setting the view to our layer bounds, set by our Zoomify plugin.
map.fitBounds(layer.getBounds());

//Creates the switchable map layers. Change the URL to reflect where you are hosting your map tiles. Width and Height of original image MUST be defined.
var badlands = L.tileLayer.zoomify('./badlands-map/{g}/{z}-{x}-{y}.jpg', {
    width: 4096,                                                                                        // MUST be defined.
    height: 3072,                                                                                       // MUST be defined.
    tolerance: 0.9, 
	}).addTo(map);
	
var byaza = L.tileLayer.zoomify('./byaza-map/{g}/{z}-{x}-{y}.jpg', {
    width: 2048,                                                                                        // MUST be defined.
    height: 1536,                                                                                       // MUST be defined.
    tolerance: 0.9, 
	});

var passages = L.tileLayer.zoomify('./passages-map/{g}/{z}-{x}-{y}.jpg', {
    width: 2048,                                                                                        // MUST be defined.
    height: 1536,                                                                                       // MUST be defined.
    tolerance: 0.9, 
	});
	
var meridiem = L.tileLayer.zoomify('./meridiem-map/{g}/{z}-{x}-{y}.jpg', {
    width: 2048,                                                                                        // MUST be defined.
    height: 1536,                                                                                       // MUST be defined.
    tolerance: 0.9, 
    });

var morra = L.tileLayer.zoomify('./morra-map/{g}/{z}-{x}-{y}.jpg', {
    width: 2048,                                                                                        // MUST be defined.
    height: 1536,                                                                                       // MUST be defined.
    tolerance: 0.9, 
    });

// Creates baseMaps layer and passes which maps to include in the layers control.
var baseMaps = {
    "The Badlands": badlands,
	"The Continent of Morra": morra,
	"The Arkevian Ruins of Byaza": byaza,
	"The Underground City of Meridiem": meridiem,
	"The Passages": passages,
	};

var poi = L.layerGroup();
var towns = L.layerGroup();
var worldtour = L.layerGroup();
var traderoute = L.layerGroup();
var byazaMarkers = L.layerGroup();
var passagesMarkers = L.layerGroup();
var thuvim = L.layerGroup();
var meridiemMarkers = L.layerGroup();
var morraMarkers = L.layerGroup();

map.addLayer(poi);
map.addLayer(towns);

var allLayers = { poi, towns, byazaMarkers, passagesMarkers, meridiemMarkers, worldtour, traderoute, thuvim, morraMarkers };

var badlandsMarkers = {
	"Towns" : towns,
	"Points of Interest": poi,
	"Badlands Trade Routes": traderoute,
	"Badlands World Tour Route": worldtour,
	};

var control = L.control.activeLayers(baseMaps, badlandsMarkers, {collapsed: false});
control.addTo(map);

map.on('baselayerchange', function(e) {	
	for (var layerGroup in allLayers) {
		map.removeLayer(allLayers[layerGroup]);
		control.removeLayer(allLayers[layerGroup]);
	}
	switch(e.name) {
		case 'The Arkevian Ruins of Byaza':
			byazaMarkers.addTo(map);
			break;
		case 'The Badlands':
			poi.addTo(map);
			towns.addTo(map);
			control.addOverlay(towns, "Towns");
			control.addOverlay(poi, "Points of Interest");
			control.addOverlay(traderoute, "Badlands Trade Routes");
			control.addOverlay(worldtour, "Badlands World Tour Route");
			break;
		case 'The Passages':
			passagesMarkers.addTo(map);
			control.addOverlay(thuvim, "Thuvim's Expedition");
			break;
		case 'The Underground City of Meridiem':
			meridiemMarkers.addTo(map);
			break;
		case 'The Continent of Morra':
			morraMarkers.addTo(map);
			break;
		default:
	}
	map.setView([-96,128],2);
});

function swapMap(name) {
	var layerControlElement = document.getElementsByClassName('leaflet-control-layers')[0];
	switch(name) {
		case 'Badlands':
			layerControlElement.getElementsByTagName('input')[0].click();
			return false;
			break;
		case 'Morra':
			layerControlElement.getElementsByTagName('input')[1].click();
			return false;
			break;
		case 'Byaza':
			layerControlElement.getElementsByTagName('input')[2].click();
			return false;
			break;
		case 'Meridiem':
			layerControlElement.getElementsByTagName('input')[3].click();
			return false;
			break;
		case 'The Passages':
			layerControlElement.getElementsByTagName('input')[4].click();
			return false;
			break;			
		default:
			return true;
	}
}