hideSpinner();
function hideSpinner() {
    $('#loader-container').hide();
}
function showSpinner() {
    $('#loader-container').show();
}

async function loadTable() {
    showSpinner();
    const url = "http://api.tvmaze.com/shows/30/episodes";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const resData = await response.json();
        LoadTableData(resData);
        hideSpinner();
    } catch (error) {
        console.error(error.message);
        setTimeout(hideSpinner, 3000);
    }
}

function LoadTableData(jsonData) {
    let i = 0;
    $("#tableBody").empty();
    $.each(jsonData, function(index, arrayItem) {
        i++;
        let newRow = `  <tr>
                            <td class='text-center'>${i}</td>
                            <td class='text-left'>${arrayItem.name}</td>
                            <td class='text-center'>${arrayItem.type}</td>
                            <td class='text-center'><img src='${arrayItem.image.medium}'></td>
                            <td class='text-center'>${arrayItem.airdate}</td>
                            <td class='text-center'>${arrayItem.runtime}</td>
                            <td class='text-center'>${arrayItem.rating.average}</td>
                        </tr>`;
        $('#tableBody').append(newRow);
    });
}

$(document).ready(function(){
    $('#BtShow').click(function(){
        loadTable();
    });
});