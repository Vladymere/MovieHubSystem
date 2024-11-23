// Retrieve movie title from URL parameters
function loadMovieTitle() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get("title");
    document.getElementById("movie-title").innerText = movieTitle;
}

function finalizeBooking() {
    const movieTitle = document.getElementById("movie-title").innerText;
    const location = document.getElementById("location").value;
    const time = document.getElementById("time").value;

    if (!location || !time) {
        alert("Please select both location and time.");
        return;
    }

    document.getElementById("scheduling-form").style.display = "none";
    document.getElementById("confirmation").style.display = "block";
    document.getElementById("confirm-movie-title").innerText = movieTitle;
    document.getElementById("confirm-location").innerText = location;
    document.getElementById("confirm-time").innerText = time;
}

function goToDashboard() {
    window.location.href = "/dashboard"; // Adjust to your actual dashboard URL
}

// Load the selected movie title when page loads
window.onload = loadMovieTitle;

document.addEventListener('DOMContentLoaded', () => {
    const movieTitleElement = document.getElementById('movie-title');
    const finalizeBookingButton = document.getElementById('finalize-booking');
    const confirmationSection = document.getElementById('confirmation');
    const confirmMovieTitle = document.getElementById('confirm-movie-title');
    const confirmLocation = document.getElementById('confirm-location');
    const confirmTime = document.getElementById('confirm-time');
    const confirmQuantity = document.getElementById('confirm-quantity');
    const confirmSeats = document.getElementById('confirm-seats');

    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Get movie name from URL parameters
    const movieName = getUrlParameter('movieName');

    // Set the selected movie title
    if (movieName) {
        movieTitleElement.textContent = movieName;
    }

    // Handle the "Finalize Booking" button click
    finalizeBookingButton.addEventListener('click', () => {
        const location = document.getElementById('location').value;
        const time = document.getElementById('time').value;
        const quantity = document.getElementById('quantity').value;
        const seats = document.getElementById('seat-numbers').value;

        if (location && time && quantity && seats) {
            confirmMovieTitle.textContent = movieName;
            confirmLocation.textContent = location;
            confirmTime.textContent = time;
            confirmQuantity.textContent = quantity;
            confirmSeats.textContent = seats;

            confirmationSection.style.display = 'block';

            // Redirect to payment page after a short delay
            const url = `payment.html?movieName=${encodeURIComponent(movieName)}&location=${encodeURIComponent(location)}&time=${encodeURIComponent(time)}&quantity=${encodeURIComponent(quantity)}&seats=${encodeURIComponent(seats)}`;
            setTimeout(() => {
                window.location.href = url;
            }, 2000);
        } else {
            alert('Please fill in all the details.');
        }
    });
});

