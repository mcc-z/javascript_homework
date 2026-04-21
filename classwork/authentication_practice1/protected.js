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

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

window.onload = function() {
    const username = getCookie('username');
    if (getCookie('session_token') && username) {
        document.getElementById('welcomeMessage').textContent = 'Welcome, ' + username + '!';
    } else {
        window.location.href = 'login.html';
    }
};

function logout() {
    deleteCookie('session_token');
    deleteCookie('username');
    window.location.href = 'login.html';
}