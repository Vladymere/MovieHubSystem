// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to handle form submission
function validateSignUpForm(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get email, password, and confirm password values
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check if any fields are empty
    if (email === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Validate email format
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // If all fields are valid, simulate account creation (e.g., save to database)
    alert("Account created successfully!");

    // Redirect to login page (simulated)
    window.location.href = "index.html"; // Redirect back to login page
}

// Attach the form validation to the submit button
document.getElementById('signUpForm').addEventListener('submit', validateSignUpForm);
