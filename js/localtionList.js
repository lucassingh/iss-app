
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

function getLocationList() {
    
    fetch('http://api.open-notify.org/iss-now.json')
    .then(responseList => responseList.json())
    .then(data => {
        console.log(data);
        responseList.innerHTML += `
            <tr class="tr">
                <th>${data.iss_position.latitude}</th>
                <th>${data.iss_position.longitude}</th>
            </tr>
        `
    })
    setInterval(getLocationList, 3000);
}

function resetLocationList() {
    responseList.innerHTML = '';
}