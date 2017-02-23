require("./scss/app.scss");
import ko from 'knockout';

const brasserie = [
    {
        name: 'Westmalle',
        lat: 51.284722,
        lng: 4.656667,
        display: ko.observable(true)
    },
    {
        name: 'Westvleteren',
        lat: 50.895942,
        lng: 2.721262,
        display: ko.observable(true)
    },
    {
        name: 'Achel',
        lat: 51.298778,
        lng: 5.488572,
        display: ko.observable(true)
    },
    {
        name: 'Chimay',
        lat: 49.982222,
        lng: 4.336111,
        display: ko.observable(true)
    },
    {
        name: 'Orval',
        lat: 49.639722,
        lng: 5.348889,
        display: ko.observable(true)
    },
    {
        name: 'Rochefort',
        lat: 50.17803,
        lng: 5.22036,
        display: ko.observable(true)
    },
    {
        name: 'La Trappe',
        lat: 51.544233,
        lng: 5.131055,
        display: ko.observable(true)
    }
];

function loadGoogleMap() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBdHx7GHO_zFqjqJ6zY-gIfb9SLIuZ7A6k&callback=initMap";
    document.body.appendChild(script);
}
window.onload = loadGoogleMap;

let map;



const displayMarkers = () => {
    const bounds = new google.maps.LatLngBounds();
    brasserie.forEach(elem => {
        if (elem.display) {
            const marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(elem.lat, elem.lng),
                title: elem.name,
                animation: google.maps.Animation.DROP
            });
            bounds.extend(marker.position);
            const infoWindow = new google.maps.InfoWindow();
            infoWindow.marker = marker;
            infoWindow.setContent('<div>' + marker.title + '</div>');
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
                map.setCenter(marker.position);
            });
        }
    });
    map.fitBounds(bounds);
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'));

    displayMarkers();
}

window.initMap = initMap;
