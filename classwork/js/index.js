function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires - "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('psw');
    const messageArea = document.getElementById('messageArea');

    let username = usernameInput.value;
    let password = passwordInput.value;

    checkLogin(username, password);
});

window.onload = function() {
    if (getCookie('session_token')) {
        window.location.href = 'dashboard.html';
    }
};

function checkLogin(username, password) {
    let encodedCredentials = btoa(`${username}:${password}`);
    const url = "http://127.0.0.1/api/login";
    fetch(url,{
        method: 'GET',
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
        if(data === 'Login successful!'){
            document.getElementById("messageArea").textContent=data;
            document.getElementById("messageArea").style.color='green';
            setCookie('session_token', encodedCredentials, 1);

            window.location.href = 'dashboard.html';
        }
    })
    .catch(error=>{
        document.getElementById("messageArea").innerHTML="Warning! Invalid user and password.";
    })
}