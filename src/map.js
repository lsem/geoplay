import Vue from 'vue'
import EventBus from "./eventBus"

var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
});

var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['marker', 'circle', 'polygon', 'rectangle']
    },
    markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
    circleOptions: {
        fillColor: '#ffff00',
        fillOpacity: 1,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1
    }
});

drawingManager.setMap(map);

google.maps.event.addListener(drawingManager, 'rectanglecomplete',
    function(rectangle) {
        //console.log('RECTANGLE!!!: ' + rectangle.getBounds())
        rectangle.setEditable(true);
        EventBus.$emit('rectCreated', rectangle.getBounds())
    }
);

//   poly = new google.maps.Polyline({
//     strokeColor: '#000000',
//     strokeOpacity: 1.0,
//     strokeWeight: 3
//   });
//   poly.setMap(map);

//   // Add a listener for the click event
//   map.addListener('click', addLatLng);

//   // Handles click events on a map, and adds a new point to the Polyline.
// function addLatLng(event) {
//   var path = poly.getPath();
//   console.log('added!');

//   // Because path is an MVCArray, we can simply append a new coordinate
//   // and it will automatically appear.
//   path.push(event.latLng);

//   // Add a new marker at the new plotted point on the polyline.
//   // var marker = new google.maps.Marker({
//   //   position: event.latLng,
//   //   title: '#' + path.getLength(),
//   //   map: map
//   // });

    //window.initMap = initMap;
