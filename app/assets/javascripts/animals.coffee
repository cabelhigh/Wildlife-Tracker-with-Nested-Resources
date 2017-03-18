# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->

  console.log($('#map').text())

  map = new L.Map('map');

	# create the tile layer with correct attribution
	osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

	# start the map in South-East England
	map.setView(new L.LatLng(51.3, 0.7),1);
	map.addLayer(osm);
