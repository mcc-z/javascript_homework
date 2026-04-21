hideSpinner();
function hideSpinner() {
    document.getElementsByClassName('loader')[0].style.display = 'none';
}

function showSpinner() {
    document.getElementsByClassName('loader')[0].style.display = 'block';
}

$(document).ready(function() {
    $('button#showSpinner').click(function() {
        showSpinner();
    });
});

$(document).ready(function() {
    $('button#hideSpinner').click(function() {
        hideSpinner();
    });
});