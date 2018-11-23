var map;
var infowindow = new google.maps.InfoWindow();

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        suppressPolylines: true,
        infoWindow: infowindow
    });
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {
            lat: 32.930501,
            lng: -97.019639
        },
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
        icon: image
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
    directionsService.route(drivingData, (response, status) => {
        console.log('RESPONSE', response, map);

        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setOptions({
                directions: response,
                suppressMarkers: true
            })
            // var route = response.routes[0];
            renderDirectionsPolylines(response, directionsDisplay);
        } else {
            console.error('There is an error with the request!!!')
        }
    });

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
    // for (i = 0; i < legs.length; i++) {
    //     var steps = legs[i].steps;
    //     for (j = 0; j < steps.length; j++) {
    //         var nextSegment = steps[j].path;
    //         var stepPolyline = new google.maps.Polyline(polylineOptions);
    //         stepPolyline.setOptions({
    //             strokeColor: colors[i]
    //         })
    //         for (k = 0; k < nextSegment.length; k++) {
    //             stepPolyline.getPath().push(nextSegment[k]);
    //             bounds.extend(nextSegment[k]);
    //         }

    //         polylines.push(stepPolyline);
    //         stepPolyline.setMap(map);
    //         // route click listeners, different one on each step
    //         google.maps.event.addListener(stepPolyline, 'click', function (evt) {
    //             infowindow.setContent("you clicked on the route<br>" + evt.latLng.toUrlValue(6));
    //             infowindow.setPosition(evt.latLng);
    //             infowindow.open(map);
    //         })
    //     }
    // }
    map.fitBounds(bounds);
}


