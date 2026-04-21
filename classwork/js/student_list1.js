LoadTableArea();
function LoadTableArea() {
    const MyStudent = new Student();
    let i = 0;
    $.each(MyStudent.StudentList(), function(index, arrayItem) {
        i++;
        let newRow = `<tr>
                        <td class='text-center'>${i}</td>
                        <td class='text-center'>${arrayItem.student_code}</td>
                        <td><div class='d-flex justify-content-between'><div>${arrayItem.last_name + ' ' + arrayItem.first_name}</div><div>[${arrayItem.gender}]</div></div></td>
                        <td class='text-center'>${arrayItem.contact}</td>
                        <td class='text-center'><button type='button' class='btn btn-success btn-xs' id='BtOnOff' value='${arrayItem.id}'>On/Off</button></td>
                        <td class='text-center'><button type='button' class='btn btn-danger btn-xs' id='BtDelete' value='${arrayItem.id}'>Delete</button></td>
                        <td class='text-center'><button type='button' class='btn btn-success btn-xs' id='BtEdit' value='${arrayItem.id}'>Edit</button></td>
                    </tr>`;
        $('#tableBody').append(newRow);
    })
}

$(document).on('click', '#BtOnOff', function() {
    let BtValue = $(this).val();
    $('#ModalOnOff_Val').html(BtValue);
    $('#ModalOnOff').modal('show');
});
$(document).on('click', '#BtDelete', function() {
    let BtValue = $(this).val();
    $('#BtDeleteYes').val(BtValue);
    $('#ModalDelete').modal('show');
});
$(document).on('click', '#BtDeleteYes', function() {
    let BtValue = $(this).val();
    $('#ModalDelete_Val').html(BtValue);
});
$(document).on('click', '#BtEdit', function() {
    let BtValue = $(this).val();
    $('#ModalBody_Edit').html(BtValue);
    $('#ModalEdit').modal('show');
});