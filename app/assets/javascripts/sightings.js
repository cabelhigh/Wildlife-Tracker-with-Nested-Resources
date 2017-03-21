function createSightingsMap(dataFromServer) {
  var handler = Gmaps.build('Google'); //maybe builds a map based on google maps?
  handler.buildMap({
    provider: {},
    internal: {id: 'sightings_map'}
  },
  function() {
    markers = handler.addMarkers(dataFromServer);
    handler.bounds.extendWith(markers);
    handler.fitMapToBounds();
    handler.getMap().setZoom(12);
    handler.getMap().setCenter(new google.maps.LatLng(33.2527597,-116.4872973))
  });
  console.log(handler.getMap())
  google.maps.event.addListener(handler.getMap(), 'click', function(event){
    placeMarker(event.latLng, handler.getMap());
  });
}

function placeMarker(location, map){
  $("#overlay").show()
  $("#new_sighting").show()
  $.ajax({
    dataType: 'json',
    url: '/sightings/1',
    type: 'GET',
    success:function(){
      console.log(location);
      var marker = new google.maps.Marker({
        position: location,
        map: map
      })
       map.panTo(location);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Getting map data failed: " + errorThrown);
    }
  });
}

function loadAndCreateGmap(){
  //Only load data if we have a map on the page
  if($("#sightings_map").length > 0 ) {
    $.ajax({
      dataType : 'json',
      url: '/get_sightings',
      method: 'GET',
      success:createSightingsMap,
      error: function(jqXHR, textStatus, errorThrown) {
        alert("Getting map data failed: " + errorThrown);
      }
    });
  }
}

$(document).on('ready', loadAndCreateGmap)

$(document).ready(function() {
  $("#overlay").hide();
  $("#new_sighting").hide();
  $("button").on("click", function() {
    $("#overlay").hide();
    $("#new_sighting").hide();
  })
})
