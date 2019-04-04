// UX logic
$('#btn-locations').click(function(){
    $('#btn-reset-locations').show(500);
    $('#btn-locations').prop('disabled', true);
    $('#locations').show(500);
    $('#map').show(500);
});

$('#btn-reset-locations').click(function(){
    $('#btn-reset-locations').hide(500);
    $('#btn-locations').prop('disabled', false);
    $('#locations').hide(500);
    $('#map').hide(500);
});

let responseList = document.querySelector('#responseList');
let map;
let positionList = [];
let markers = [];

//map charge
window.addEventListener('load', 
    function() { 
        initMap();
    }, false
);

function getLocationList() {
    
    fetch('http://api.open-notify.org/iss-now.json')
    .then(responseList => responseList.json())
    .then(data => {
        // We update our cluster of Markers showing the last 15 positions of the ISS on the map
        generateMapMarker(data.iss_position.latitude, data.iss_position.longitude);

        // We center the map to the latest position we got from API
        updateMapCenter(data.iss_position.latitude, data.iss_position.longitude);

        // Logic for get the 15 locations
        if (positionList.length < 15) {
            positionList.push({
                latitude: data.iss_position.latitude, 
                longitude: data.iss_position.longitude
            });
        } else {
            positionList.splice(14, 1);
            positionList.unshift({
                latitude: data.iss_position.latitude, 
                longitude: data.iss_position.longitude
            });
        }

        // Response in table
        responseList.innerHTML = '';
        positionList.forEach(element => {
            responseList.innerHTML +=  `
            <tr class="tr">
                <th>${element.latitude}</th>
                <th>${element.longitude}</th>
            </tr>
        `;
        });
        
    })
    .then(() => {
        setTimeout(getLocationList, 2000);
    })
}

// Iinitial map
function initMap() {

    fetch('http://api.open-notify.org/iss-now.json')
    .then(responseList => responseList.json())
    .then(data => {
        //new map
        map = new google.maps.Map(document.getElementById('map'), {

        //map options
        center: {lat: parseFloat(data.iss_position.latitude), lng: parseFloat(data.iss_position.longitude)},
        zoom: 8
        });
    })
}

// update map with the last locations
function updateMapCenter(latitude, longitude) {
    let position = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
    map.setCenter(position);
}

// Generate the markers in map
function generateMapMarker(latitude, longitude) {
    let position = {lat: parseFloat(latitude), lng: parseFloat(longitude)};

      if (markers.length < 5) {
        // debugger;
        markers.push({
            lat: position.lat, 
            lng: position.lng
        });
      } else {
        markers.splice(0, 1);
        markers.push({
            lat: position.lat, 
            lng: position.lng
        });
    }
    
   
    markers.forEach(currentMarker => {
        new google.maps.Marker({
            position: currentMarker,
            title: 'new marker',
            draggable: false,
            map: map
        }); 
    });
}

function resetLocationList() {
    responseList.innerHTML = '';
}