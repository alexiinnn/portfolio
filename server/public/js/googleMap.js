/**
 * Created by Alexey on 22-Nov-16.
 */

//script for rendering Google Map
var map;

function initMap() {
    // Styles a map in night mode.
    var map = new google.maps.Map(document.getElementById('google-map'), {
        center: {lat: 53.900326, lng: 27.562330},
        zoom: 15,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        streetViewControl: false,
        mapTypeControl: false,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{"color": "#61dac9"}]
            }, {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#ffffff"}]
            }, {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"gamma": 0.01}, {"lightness": 20}]
            }, {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"saturation": -31}, {"lightness": -33}, {"weight": 2}, {"gamma": 0.8}]
            }, {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{"lightness": 30}, {"saturation": 30}]
            }, {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#ffffff"}]
            }, {
                "featureType": "landscape",
                "elementType": "geometry.stroke",
                "stylers": [{"hue": "#ff0000"}]
            }, {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry",
                "stylers": [{"color": "#ff0000"}]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{"saturation": 20}]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{"lightness": 20}, {"saturation": -20}]
            }, {"featureType": "road", "elementType": "all", "stylers": [{"color": "#d7d7d7"}]}, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{"lightness": 10}, {"saturation": -30}]
            }, {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{"saturation": 25}, {"lightness": 25}]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{"color": "#d7d7d7"}]
            }, {
                "featureType": "transit.line",
                "elementType": "all",
                "stylers": [{"color": "#d7d7d7"}]
            }, {"featureType": "water",
                "elementType": "all",
                "stylers": [{"lightness": -20}, {"color": "#61dac9"}]}
        ]
    });
};


