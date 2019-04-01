
$('#btn-locations').click(function(){
    $('#btn-reset-locations').show(500);
    $('#btn-locations').prop('disabled', true);
    $('#locations').show(500);
});

$('#btn-reset-locations').click(function(){
    $('#btn-reset-locations').hide(500);
    $('#btn-locations').prop('disabled', false);
    $('#locations').hide(500);
});

var responseList = document.querySelector('#responseList');
let positionList = [];

function getLocationList() {
    
    fetch('http://api.open-notify.org/iss-now.json')
    .then(responseList => responseList.json())
    .then(data => {
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
            console.dir(positionList);
        }

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
        setTimeout(getLocationList, 1000);
    })
}

function resetLocationList() {
    responseList.innerHTML = '';
}