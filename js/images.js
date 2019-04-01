$(document).ready(function(){
    $('#btn-show-image').click(function(){
        $('#btn-reset-image').show(500);
        $('#btn-show-image').prop('disabled', true);
        $('#image').show(500);
    });

    $('#btn-reset-image').click(function(){
        $('#btn-show-image').prop('disabled', false);
        $('#btn-reset-image').hide(500);
        $('#image').hide(500);
    });
});

var responseImage = document.querySelector('#responseImage');

function getImage() {
    
    fetch('https://pixabay.com/api/?key=2145246-677240d3f6789833b4edc3dea&q=places&image_type=photo')
    .then(responseImage => responseImage.json())
    .then(data => {
        console.log(data);
        responseImage.innerHTML += `
            <tr class="tr">
                <img class="img-size" width="600" height="300" src="${data.hits[0].largeImageURL}" alt="">                
            </tr>
        `
    })
}

function resetImage() {
    response.innerHTML = '';
}
