// Helper function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Helper function to get a cookie
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

// Function to handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageArea = document.getElementById('message');

    const username = usernameInput.value;
    const password = passwordInput.value;

    // In a real application, credentials would be sent to a server for validation.
    // For this example, we use a simple hardcoded check.
    if (username === 'admin' && password === '1122334455') {
        // Set a "session" cookie that lasts for 1 day
        setCookie('session_token', 'your_secure_token('+password+')', 1);
        setCookie('username', username, 1);

        messageArea.textContent = 'Login successful! Redirecting...';
        messageArea.style.color = 'green';
        // Redirect to a protected page
        window.location.href = 'protected.html';
    } else {
        messageArea.textContent = 'Invalid username or password.';
        messageArea.style.color = 'red';
    }
});

// Check if already logged in when the page loads
window.onload = function() {
    if (getCookie('session_token')) {
        window.location.href = 'protected.html';
    }
};