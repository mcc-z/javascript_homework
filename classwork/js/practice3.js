hideSpinner();
function hideSpinner() {
    document.getElementsByClassName('loader')[0].style.display = 'none';
}

function showSpinner() {
    document.getElementsByClassName('loader')[0].style.display = 'block';
}

$(document).ready(function() {
    $('#showSpinner').click(showSpinner);
    $('#hideSpinner').click(hideSpinner);
});