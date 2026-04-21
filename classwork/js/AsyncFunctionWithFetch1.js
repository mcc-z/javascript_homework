hideSpinner();
function hideSpinner() {
    $('#loader-container').hide();
}
function showSpinner() {
    $('#loader-container').show();
}

async function loadTable() {
    showSpinner();
    const url = "http://universities.hipolabs.com/search?country=cambodia";
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
                            <td class='text-left'>${arrayItem.web_pages}</td>
                            <td class='text-center'>${arrayItem.country}</td>
                            <td class='text-center'>
                                <button type="button" class='btn btn-success btn-xs' id='BtOnOff'>On/Off</button>
                            </td>
                            <td class='text-center'>
                                <button type="button" class='btn btn-danger btn-xs' id='BtDelete'>Delete</button>
                            </td>
                            <td class='text-center'>
                                <button type="button" class='btn btn-success btn-xs' id='BtEdit'>Edit</button>
                            </td>
                        </tr>`;
        $('#tableBody').append(newRow);
    });
}

$(document).ready(function(){
    $('#BtShow').click(function(){
        loadTable();
    });
});