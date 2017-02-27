require("./scss/app.scss");
import ko from 'knockout';
import 'whatwg-fetch';

const brasserieData = [
    {
        name: 'Westmalle',
        lat: 51.284722,
        lng: 4.656667,
        display: ko.observable(true),
        queryWiki: 'Westmalle%20Brewery'
    },
    {
        name: 'Westvleteren',
        lat: 50.895942,
        lng: 2.721262,
        display: ko.observable(true),
        queryWiki: 'Westvleteren%20Brewery'
    },
    {
        name: 'Achel',
        lat: 51.298778,
        lng: 5.488572,
        display: ko.observable(true),
        queryWiki: 'Achel%20Brewery'
    },
    {
        name: 'Chimay',
        lat: 49.982222,
        lng: 4.336111,
        display: ko.observable(true),
        queryWiki: 'Chimay%20Brewery'
    },
    {
        name: 'Orval',
        lat: 49.639722,
        lng: 5.348889,
        display: ko.observable(true),
        queryWiki: 'Orval%20Brewery'
    },
    {
        name: 'Rochefort',
        lat: 50.17803,
        lng: 5.22036,
        display: ko.observable(true),
        queryWiki: 'Rochefort%20Brewery'
    },
    {
        name: 'La Trappe',
        lat: 51.544233,
        lng: 5.131055,
        display: ko.observable(true),
        queryWiki: 'La%20Trappe%20Abbey'
    }
];

let map;
let init = false;
let InfoWindow;

const getContentFromWikipedia = function(target) {
    const wikipediaUrl = `https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=query`;
    const fullUrl = wikipediaUrl + `&prop=extracts&exintro=&explaintext=&titles=${target.queryWiki}`;
    fetch(fullUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Origin': '*'
        }
    })
        .then(response =>
            response.json().then(responseJSON => ({
                status: response.status,
                responseJSON
            })
        ))
        .then(({status, responseJSON}) => {
            switch (status) {
            case 200:
                target.wikiIntro = responseJSON.query.pages[Object.keys(responseJSON.query.pages)[0]];
                if (target.wikiIntro.extract) {
                    target.infoWindowContent = '<div class="infoContainer">' +
                        '<h2>' + target.name + '</h2>' +
                        '<h4>Extract from Wikipedia</h4>' +
                        '<p class="wikiExtract">' + target.wikiIntro.extract + '</p>' +
                        `<a href="http://en.wikipedia.org/?curid=${target.wikiIntro.pageid}">` +
                        'Link to Wikipedia page</a>' +
                        '</div>';
                } else {
                    target.infoWindowContent = '<div class="infoContainer">' +
                        '<p class="error">Sorry we were unable to get this information, try again later.</p>' +
                        '</div>';
                }
                break;
            default:
                target.infoWindowContent = '<div class="infoContainer">' +
                    '<p class="error">Sorry we were unable to get this information, try again later.</p>' +
                    '</div>';
            }
        }).catch(error => {
            target.infoWindowContent = '<div class="infoContainer">' +
                '<p class="error">Sorry we were unable to get this information, try again later.</p>' +
                '</div>';
        });
};

const setMarkers = function(data) {
    const bounds = new google.maps.LatLngBounds();
    data.forEach(function(elem) {
        elem.marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(elem.lat, elem.lng),
            title: elem.name,
            animation: google.maps.Animation.DROP
        });
        bounds.extend(elem.marker.position);
        getContentFromWikipedia(elem);
        elem.openInfoWindow = function() {
            brasserieData.forEach(function(brasserie) {
                brasserie.marker.setAnimation(null);
            });
            elem.marker.setAnimation(google.maps.Animation.BOUNCE);
            InfoWindow.marker = elem.marker;
            InfoWindow.setContent(elem.infoWindowContent);
            InfoWindow.open(map, elem.marker);
            map.setCenter(elem.marker.position);
        };
        elem.marker.addListener('click', elem.openInfoWindow);
    });
    map.fitBounds(bounds);
    google.maps.event.addDomListener(window, 'resize', function() {
        map.fitBounds(bounds);
    });
};

const displayMarkers = function(data) {
    data.forEach(function(elem) {
        elem.marker.setVisible(elem.display());
    });
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'));
    InfoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(InfoWindow, 'closeclick', function() {
        InfoWindow.marker.setAnimation(null);
    });
    setMarkers(brasserieData);
    init = true;
}

window.initMap = initMap;

function BeerMapViewModel() {
    const self = this;
    self.brasseries = ko.observableArray(brasserieData);
    self.keyword = ko.observable('');
    self.search = ko.computed(function() {
        const value = self.keyword().toLowerCase();
        self.brasseries().forEach(function(brasserie) {
            const name = brasserie.name.toLowerCase();
            let bool = true;
            if (value && brasserie.marker) {
                for (let i = 0; i < value.length; i++) {
                    if (value[i] !== name[i]) {
                        bool = false;
                    }
                }
            }
            brasserie.display(bool);
        });
        if (init) {
            displayMarkers(self.brasseries());
        }
    }, this);
}

ko.applyBindings(new BeerMapViewModel());
