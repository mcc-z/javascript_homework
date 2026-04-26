const CourseName = document.getElementById('CourseName');
const Hour = document.getElementById('Hour');
loadCourseType();

function loadCourseType() {
    let encodedCredentials = getCookie('session_token');
    const url = "http://127.0.0.1/api/coursetype";
    fetch(url,{
        headers: {
            'Authorization': `Basic ${encodedCredentials}`
        }
    })
    .then(response=>{
        if(!response.ok){
            throw new Error(`HTTP error! Status ${response.status}`);
        }
        return response.json();
    })
    .then(data=>{
        loadCourseTypeContent(data);
    })
    .catch(error=>{
        console.log(`Fetch error: `, error.message);
    })
}

function loadCourseTypeContent(JSONDataList) {
    const selectElement = document.getElementById('CourseType');
    let optionsHTML = [];
    selectElement.innerHTML += optionsHTML.join('\n');
    JSONDataList.forEach(function (arrayItem) {
        optionsHTML.push(`<option value="${arrayItem.CourseTypeId}">${arrayItem.CourseTypeName}</option>`);
    });
    selectElement.innerHTML += optionsHTML.join('\n');
}

function clearForm() {
    CourseName.value='';
    setError(CourseName, 'Course name is required');
    Hour.value='';
    setError(Hour, 'Hour is required');
    const selectElement = document.getElementById("CourseType");
    selectElement.selectedIndex = 0;
    selectElement.focus();
}

function createCourse() {
    if(validateInputs()===true) {
        let courseTypeId = document.getElementById('CourseType').value;
        let courseName = document.getElementById('CourseName').value;
        let hour = document.getElementById('Hour').value;

        let encodedCredentials = getCookie('session_token');
        const url = "http://127.0.0.1/api/course";
        let Parameters = {
            CourseTypeId: courseTypeId,
            CourseName: courseName,
            HourAmount: hour
        };

        fetch(buildUrl(url, Parameters),{
            method: 'post',
            headers: {
                'Authorization': `Basic ${encodedCredentials}`
            }
        })
        .then(response=>{
            if(!response.ok){
                throw new Error(`HTTP error! Status ${response.status}`);
            }
            return response.json();
        })
        .then(data=>{
            if(data.slice(0,12)==="Successfully") {
                clearForm();
            }
            document.getElementById('MsgArea').innerHTML = data;
        })
        .catch(error=>{
            console.log(`Fetch error: `, error.message);
        })
    } else {
        document.getElementById('MsgArea').innerHTML = "Warning! Invalid input(s).";
    }
}

const validateInputs = () => {
    const CourseNameValue = CourseName.value.trim();
    const HourValue = Hour.value.trim();

    let Result = false;
    let V1 = false;
    let V2 = false;

    if (CourseNameValue === '') {
        setError(CourseName, 'Course name is required');
    } else if (CourseNameValue.length < 3) {
        setError(CourseName, 'Course name must be at least 3 characters.');
    } else {
        setSuccess(CourseName);
        V1 = true;
    }

    if (HourValue === '') {
        setError(Hour, 'Hour is required');
    } else if (isPositiveNumberString(HourValue) !== true) {
        setError(Hour, 'Hour must be a positive number');
    } else {
        setSuccess(Hour);
        V2 = true;
    }

    if (V1===true & V2===true) {
        Result = true;
    }

    return Result;
};

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
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

function isPositiveNumberString(str) {
    const num = Number(str);
    return !isNaN(num) && num > 0;
}