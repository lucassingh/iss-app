

$(document).ready(function(){
    $('#btn-current-location').click(function(){
        $('#btn-reset-current-location').show(500);
        $('#btn-current-location').prop('disabled', true);
        $('#current-location').show(500);
    });

    $('#btn-reset-current-location').click(function(){
        $('#btn-current-location').prop('disabled', false);
        $('#btn-reset-current-location').hide(500);
        $('#current-location').hide(500);
    });
});

var response = document.querySelector('#response');

function getData() {
    
    fetch('https://api.open-notify.org/iss-now.json')
    .then(response => response.json())
    .then(data => {
        
        response.innerHTML += `
            <tr class="tr">
                <th>${data.iss_position.latitude}</th>
                <th>${data.iss_position.longitude}</th>
            </tr>
        `
    })
}

function resetData() {
    response.innerHTML = '';
}

