const form = document.getElementById('form');

const BtCreate = document.getElementById('BtCreate');
const TeacherCode = document.getElementById('TeacherCode');
const FullName = document.getElementById('FullName');
const Contact = document.getElementById('Contact');

BtCreate.addEventListener('click', e=>{
    if(validateInputs()===true) {
        document.getElementById('Msg').innerHTML = "Successfully added a record!";
    } else {
        document.getElementById('Msg').innerHTML = "Warning! Invalid input(s).";
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('sucsess');
    inputControl.classList.remove('error');
};

const validateInputs = () => {
    const TeacherCodeValue = TeacherCode.value.trim();
    const FullNameValue = FullName.value.trim();
    const ContactValue = Contact.value.trim();
    var Result = false;
    var V1 = false;
    var V2 = false;
    var V3 = false;
    if (TeacherCodeValue === '') {
        setError(TeacherCode, 'TeacherCode is required');
    } else {
        setSuccess(TeacherCode);
        V1 = true;
    }
    if (FullNameValue === '') {
        setError(FullName, 'FullName is required');
    } else if (FullNameValue.length < 5) {
        setError(FullName, 'FullName must be at least 5 characters.');
    } else {
        setSuccess(FullName);
        V2 = true;
    }
    if (ContactValue === '') {
        setError(Contact, 'Contact is required');
    } else {
        setSuccess(Contact);
        V3 = true;
    }
    if (V1===true && V2===true && V3===true) {
        Result = true;
    }
    return Result;
};