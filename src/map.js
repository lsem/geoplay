import Vue from 'vue'
import EventBus from "./eventBus"

var initialCenter = {lat: 49.8018013, lng: 24.0042424};
var map;

window.initGoogleMaps = function() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: initialCenter,
        zoom: 11
    });

var rectangle = new google.maps.Rectangle({
    bounds: {
        north: initialCenter.lat + 0.1,
        east: initialCenter.lng + 0.1,
        south: initialCenter.lat - 0.1,
        west: initialCenter.lng - 0.1
    },
    editable: true,
    draggable: true,
    fillColor: '#99b3ff',
    fillOpacity: 0.15,
    zIndex: 100,

    strokeOpacity: 0.7,
    strokeWeight: 2,
})
rectangle.setMap(map)

var infoWindow = new google.maps.InfoWindow()

var lastTimeoutScheduled = null
rectangle.addListener('bounds_changed', function(event) {
    if (lastTimeoutScheduled) clearTimeout(lastTimeoutScheduled)
    lastTimeoutScheduled = setTimeout(function(){
        console.log('Bounds changed: ', JSON.stringify(rectangle.getBounds()))
        EventBus.$emit('rectCreated', rectangle.getBounds())
    }, 200)
})

}

var cellsPolygonsPool = []

EventBus.$on('regionApproximated', function(data) {
    cellsPolygonsPool.forEach(function (polygon) {
         polygon.setMap(null)
    })
    cellsPolygonsPool = []
    data.cells.forEach(function(item, index) {
        var newCellPolygon = new google.maps.Polygon({
            paths: item.vertices, // {lat: X, lng: Y} is what api expects
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            geodesic: true,
            zIndex: 10
        })
        newCellPolygon.setMap(map)
        cellsPolygonsPool.push(newCellPolygon)
    })
})

