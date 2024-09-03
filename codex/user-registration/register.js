document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const logInForm = document.getElementById('LogInForm');
    const mainContent = document.getElementById('mainContent');
    const skyliteUserRegistrationPage = document.getElementById('skyliteUserRegistrationPage');
    const openLogInForm = document.getElementById('openLogInForm');
    const openRegistrationForm = document.getElementById('openregistrationForm');

    // Initially hide main content and show registration form
    mainContent.style.display = 'none';
    skyliteUserRegistrationPage.style.display = 'block';
    registrationForm.style.display = 'block';

    // Toggle between registration and login forms
    openLogInForm.addEventListener('click', function () {
        registrationForm.style.display = 'none';
        logInForm.style.display = 'block';
    });

    openRegistrationForm.addEventListener('click', function () {
        logInForm.style.display = 'none';
        registrationForm.style.display = 'block';
    });

    // Handle registration form submission
    registrationForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(registrationForm);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // After successful registration, show the main content
                skyliteUserRegistrationPage.style.display = 'none';
                mainContent.style.display = 'block';
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle login form submission
    logInForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(logInForm);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // After successful login, show the main content
                skyliteUserRegistrationPage.style.display = 'none';
                mainContent.style.display = 'block';
            } else {
                alert('Login failed. Please check your username and password.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
