// Existing Remember Me functionality
const emailInput = document.querySelector('input[type="text"]');
const rememberMeCheckbox = document.getElementById('rememberMe');

// Check if the user has previously selected "Remember Me"
window.onload = function() {
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  const rememberMeChecked = localStorage.getItem('rememberMeChecked');

  if (rememberedEmail) {
    emailInput.value = rememberedEmail; // Pre-fill the email field
  }

  if (rememberMeChecked === 'true') {
    rememberMeCheckbox.checked = true; // Restore "Remember Me" checkbox state
  }
};

// Function to validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Attach the form validation to the submit button (Login form)
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  })
  .then(response => response.text())
  .then(data => {
    if (data.trim() === 'success') {
      window.location.href = 'Dashboard.html';
    } else {
      alert('Login failed: ' + data);
    }
  })
  .catch(error => console.error('Error:', error));
});

// -------------------------------------------------------------
// Forgot Password functionality
// -------------------------------------------------------------

// Get forgot password form elements
const loginForm = document.getElementById('loginForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backToLoginLink = document.getElementById('backToLogin');
const resetEmailInput = document.getElementById('resetEmail');

// Show Forgot Password form when "Forgot Password" link is clicked
forgotPasswordLink.addEventListener('click', function(event) {
  event.preventDefault();
  loginForm.classList.add('hidden'); // Hide login form
  forgotPasswordForm.classList.remove('hidden'); // Show forgot password form
});

// Show Login form when "Back to Login" link is clicked
backToLoginLink.addEventListener('click', function(event) {
  event.preventDefault();
  forgotPasswordForm.classList.add('hidden'); // Hide forgot password form
  loginForm.classList.remove('hidden'); // Show login form
});

// Handle Forgot Password form submission
forgotPasswordForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const resetEmail = resetEmailInput.value;

  // Validate email format
  if (!validateEmail(resetEmail)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate sending a password reset link
  alert(`A password reset link has been sent to ${resetEmail}`);
  
  // Redirect back to login form after sending reset link
  forgotPasswordForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// Google Sign-In
function handleGoogleSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  const idToken = googleUser.getAuthResponse().id_token;

  // You can use the profile info for your application
  console.log("User signed in:");
  console.log("ID: " + profile.getId());
  console.log("Name: " + profile.getName());
  console.log("Email: " + profile.getEmail());

  // Redirect or handle sign-in in your application
  alert("Google Sign-In successful: " + profile.getEmail());
}

// Initialize Google Sign-In
function initGoogleSignIn() {
  gapi.load('auth2', function () {
    console.log('gapi loaded');
    gapi.auth2.init({
      client_id: 'YOUR_GOOGLE_CLIENT_ID'
    }).then(function (auth2) {
      console.log('auth2 initialized');
      document.getElementById('google').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission
        auth2.signIn().then(handleGoogleSignIn);
      });
    }).catch(function (error) {
      console.error('Error initializing Google Auth: ', error);
    });
  });
}

// Load the Google API
(function() {
  const googleScript = document.createElement('script');
  googleScript.src = 'https://apis.google.com/js/platform.js';
  document.head.appendChild(googleScript);
  googleScript.onload = initGoogleSignIn;
})();

// Initialize Facebook SDK
window.fbAsyncInit = function() {
  FB.init({
    appId: 'YOUR_FACEBOOK_APP_ID',
    cookie: true,
    xfbml: true,
    version: 'v10.0'
  });
  
  // Check login status and handle it accordingly
  document.getElementById('facebook').addEventListener('click', function () {
    FB.login(function(response) {
      if (response.status === 'connected') {
        FB.api('/me', {fields: 'name,email'}, function(response) {
          console.log("Facebook login successful");
          console.log("User Name: " + response.name);
          console.log("User Email: " + response.email);
          alert("Facebook Sign-In successful: " + response.email);
        });
      } else {
        alert("User did not authorize Facebook login.");
      }
    }, {scope: 'email'});
  });
};

// Load the Facebook SDK
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
