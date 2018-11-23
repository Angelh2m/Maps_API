var map;
var infowindow = new google.maps.InfoWindow();

var styledMapType = new google.maps.StyledMapType(
    [
        { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
        {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#c9b2a6' }]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#dcd2be' }]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#ae9e90' }]
        },
        {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#93817c' }]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{ color: '#a5b076' }]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#447530' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#f5f1e6' }]
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{ color: '#fdfcf8' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#f8c967' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#e9bc62' }]
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{ color: '#e98d58' }]
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#db8555' }]
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#806b63' }]
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }]
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#8f7d77' }]
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ebe3cd' }]
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{ color: '#dfd2ae' }]
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#b9d3c2' }]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#92998d' }]
        }
    ],
    { name: 'Styled Map' });

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        suppressPolylines: true,
        infoWindow: infowindow,
        preserveViewport: true
    });
    var styles = [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }]
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {
            lat: 32.930501,
            lng: -97.019639
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styles
    });
    setMarkers();
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
}

function setMarkers(params) {
    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    var beachMarker = new google.maps.Marker({
        position: {
            lat: 32.930501,
            lng: -97.019639
        },
        map: map,
        icon: image,
    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {

    var waypts = [{
        location: ' 32.927496, -97.010303',
        stopover: true
    },];

    const drivingData = {
        origin: {
            lat: 32.930501,
            lng: -97.019639

        },
        destination: {
            lat: 32.920806,
            lng: -97.008062
        },
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    }
    /* *
    *  directionsService.route
    */
    // directionsService.route(drivingData, (response, status) => {
    //     console.log('RESPONSE', response, map);

    //     if (status === google.maps.DirectionsStatus.OK) {
    //         directionsDisplay.setOptions({
    //             directions: response,
    //             suppressMarkers: true
    //         })
    //         // var route = response.routes[0];
    //         renderDirectionsPolylines(response, directionsDisplay);
    //     } else {
    //         console.error('There is an error with the request!!!')
    //     }
    // });

}

google.maps.event.addDomListener(window, "load", initMap);

var polylineOptions = {
    strokeColor: '#C83939',
    strokeOpacity: 1,
    strokeWeight: 5
};
var colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];
var polylines = [];

function renderDirectionsPolylines(response) {
    var bounds = new google.maps.LatLngBounds();

    polylines.forEach(polyline => {
        console.log('RUN', polyline);
        polyline.setMap(null);
    });

    var legs = response.routes[0].legs;

    // Get Polyline
    legs.forEach((leg, i) => {
        var steps = leg.steps
        steps.forEach((element, j) => {

            var nextSegment = steps[j].path;
            var stepPolyline = new google.maps.Polyline(polylineOptions);

            stepPolyline.setOptions({
                strokeColor: colors[i],
                strokeOpacity: 5.0,
                fillColor: "red",
                fillOpacity: 0.4
            })
            for (k = 0; k < nextSegment.length; k++) {
                stepPolyline.getPath().push(nextSegment[k]);
                bounds.extend(nextSegment[k]);
            }

            polylines.push(stepPolyline);
            stepPolyline.setMap(map);
            // route click listeners, different one on each step
            google.maps.event.addListener(stepPolyline, 'click', function (evt) {
                infowindow.setContent("you clicked on the route<br>" + evt.latLng.toUrlValue(6));
                infowindow.setPosition(evt.latLng);
                infowindow.open(map);
            });

        });
    });

    map.fitBounds(bounds);
}


