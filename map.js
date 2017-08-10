
var infowindow = null;
var points = [];
var info = [];

function load_from_spreadsheet() {

  $.ajax({
      type: "GET",
      // url: 'https://crossorigin.me/https://docs.google.com/spreadsheets/d/1HCFLANKyy4zEaFinmDFI0tTmK-sdJPzZJAH4AniBnjo/pub?output=csv',
      url: 'https://docs.google.com/spreadsheets/d/1HCFLANKyy4zEaFinmDFI0tTmK-sdJPzZJAH4AniBnjo/pub?output=csv',
      // url: 'http://cors.io/?u=https://docs.google.com/spreadsheets/d/1HCFLANKyy4zEaFinmDFI0tTmK-sdJPzZJAH4AniBnjo/pub?output=csv',
      // dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
      dataType: 'jsonp',
      async:true,
      crossDomain:true,
      // dataType: "jsonp",
      success: function(data, status, xhr) {
          // alert(data);
          var my_data = data;

          var matrix = [];

          var columns = my_data.split('\n');
          console.log(columns);
          for (var i = 0; i < columns.length; i++) {
            matrix.push(columns[i].split(','));
          }
          console.log(matrix);

          //create dictionary
          for (var i = 1; i < matrix.length; i++ ) {
            var my_current_dictionary = {};
            for (var j = 0; j < matrix[0].length; j++ ) {
              var current_key = matrix[0][j];
              console.log(current_key);
              my_current_dictionary[current_key] = matrix[i][j];
            }
            info.push(my_current_dictionary);
          }
          console.log(info);

          initMap();

      }
  });
}

$(document).ready(function(){
    load_from_spreadsheet();
});

function initMap() {

  var infowindow = new google.maps.InfoWindow();
  var markers = [];

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 38, lng: -90},
    // styles: [
    //         {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    //         {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    //         {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    //         {
    //           featureType: 'administrative.locality',
    //           elementType: 'labels.text.fill',
    //           stylers: [{color: '#d59563'}]
    //         },
    //         {
    //           featureType: 'poi',
    //           elementType: 'labels.text.fill',
    //           stylers: [{color: '#d59563'}]
    //         },
    //         {
    //           featureType: 'poi.park',
    //           elementType: 'geometry',
    //           stylers: [{color: '#263c3f'}]
    //         },
    //         {
    //           featureType: 'poi.park',
    //           elementType: 'labels.text.fill',
    //           stylers: [{color: '#6b9a76'}]
    //         },
    //         {
    //           featureType: 'road',
    //           elementType: 'geometry',
    //           stylers: [{color: '#38414e'}]
    //         },
    //         {
    //           featureType: 'road',
    //           elementType: 'geometry.stroke',
    //           stylers: [{color: '#212a37'}]
    //         },
    //         {
    //           featureType: 'road',
    //           elementType: 'labels.text.fill',
    //           stylers: [{color: '#9ca5b3'}]
    //         },
    //         {
    //           featureType: 'road.highway',
    //           elementType: 'geometry',
    //           stylers: [{color: '#746855'}]
    //         },
    //         {
    //           featureType: 'road.highway',
    //           elementType: 'geometry.stroke',
    //           stylers: [{color: '#1f2835'}]
    //         },
    //         {
    //           featureType: 'road.highway',
    //           elementType: 'labels.text.fill',
    //           stylers: [{color: '#f3d19c'}]
    //         },
    //         {
    //           featureType: 'transit',
    //           elementType: 'geometry',
    //           stylers: [{color: '#2f3948'}]
    //         },
    //         {
    //           featureType: 'transit.station',
    //           elementType: 'labels.text.fill',
    //           stylers: [{color: '#d59563'}]
    //         },
    //         {
    //           featureType: 'water',
    //           elementType: 'geometry',
    //           stylers: [{color: '#17263c'}]
    //         },
    //         {
    //           featureType: 'water',
    //           elementType: 'labels.text.fill',
    //           stylers: [{color: '#515c6d'}]
    //         },
    //         {
    //           featureType: 'water',
    //           elementType: 'labels.text.stroke',
    //           stylers: [{color: '#17263c'}]
    //         }
    //       ]

  });

  infowindow = new google.maps.InfoWindow({
    content: "temp"
  });

  for (var i = 0; i < info.length; i++) {
    console.log(info[i]['Date']);
    var html_string = "<div id=\"content\">" + "<span id=\"header\">Location:</span> " + info[i]['Location']
    + "<br><span id=\"header\">Room:</span> " + info[i]['Room']
    + "<br><span id=\"header\">Business:</span> " + info[i]['Business']
    + "<br><span id=\"header\">People:</span> " + info[i]['People']
    + "<br><span id=\"header\">Date:</span> " + info[i]['Date']
    + "</div>";

    var icon = {
       url: "locksmith.svg" // url
      //  size: new google.maps.Size(30, 30), // size
    };

    markers.push(new google.maps.Marker({
      position: {lat: Number(info[i]['Lat']), lng: Number(info[i]['Lon'])},
      map: map,
      title: info[i]['Title'],
      icon: icon,
      // size: size: new google.maps.Size(20, 32),
      // html: info[i]['Description']
      html: html_string
    }));

    google.maps.event.addListener(markers[i], 'click', function () {
      infowindow.setContent(this.html);
      infowindow.open(map, this);
    });
  }
}

function removeLock() {
  document.getElementById('overlay_id').style.visibility='hidden';
  document.getElementById('actual_id').style.visibility='visible';
}
