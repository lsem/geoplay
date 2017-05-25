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
    lastTimeoutScheduled = setTimeout(function() {
            EventBus.$emit('rectCreated', rectangle.getBounds())
        }, 10)
    })
}

//var cellsPolygonsPool = []

var usedPolygons = []
var unusedPolygons = []
function dequeuePolygon(vertices) {
    if (unusedPolygons.length == 0) {
        console.log('created new polygon')
        var newPolygon = new google.maps.Polygon({
            paths: [], // {lat: X, lng: Y} is what api expects
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            geodesic: true,
            zIndex: 10
        })
        unusedPolygons.push(newPolygon)
    }
    var polygon = unusedPolygons.pop()
    polygon.paths = vertices
    usedPolygons.push(polygon)
    return polygon
}

function returnBackAll() {
    var usedCount = usedPolygons.length
    for (var n = 0; n < usedCount; n++) {
        var polygon = usedPolygons.pop()
        polygon.setMap(null)
        unusedPolygons.push(polygon)
    }
    console.assert(usedPolygons.length == 0)
}

EventBus.$on('regionApproximated', function(data) {
    try {
        returnBackAll()
        data.cells.forEach(function(item, index) {
            var polygon = dequeuePolygon(item.vertices)
            polygon.setMap(map)
        })
    } catch(error) {
        console.error('ERROR: ', error)
    }
})
