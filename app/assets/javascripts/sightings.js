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
  google.maps.event.addListener(handler.getMap(), 'click', function(event){
    placeMarker(event.latLng, handler.getMap());
  });
}

function placeMarker(location, map){
  $("#overlay").show()
  $("#new_sighting").show()

  $("button:contains('Close')").on("click", function() {
    $("#overlay").hide();
    $("#new_sighting").hide();
  })

  $("button:contains('Create Sighting')").on("click", function() {
    new_sighting = {
      "sighting" : {
        "date" : $("#sighting_date").val(),
        "time" : $("#sighting_time").val(),
        "animal_id" : $("#sighting_animal_id").val(),
        "latitude" : location.lat(),
        "longitude" : location.lng()
      }
    }

    console.log(new_sighting);
    $.ajax({
      dataType: 'json',
      url: '/sightings/',
      type: 'POST',
      data: new_sighting,
      success:function(){
        var marker = new google.maps.Marker({
          position: location,
          map: map
        })
        map.panTo(location);
        $("#overlay").hide();
        $("#new_sighting").hide();

      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert("Getting map data failed: " + errorThrown);
        window.load("/")
      }
    });


  })

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
})
