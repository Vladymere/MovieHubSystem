// Simulated Movie Data
const movies = [
    { id: 1, title: "Inside Out 2", genre: "Animation, Drama, Family, Comedy", image: "InsideOut2.jpg" },
    { id: 2, title: "Black Panther 2", genre: "Action, Drama", image: "BlankPanther2.jpg" },
    { id: 3, title: "Spider-Man No Way Home", genre: "Adventure, Action", image: "SpiderMan.jpg" },
    { id: 4, title: "Deadpool and Wolverine", genre: "Science Fiction, Comedy, Action", image: "DP and WOLV.jpg" },
    { id: 5, title: "Joker: Folie a Deux", genre: "Drama, Crime, Thriller", image: "Joker.png" },
    { id: 6, title: "The Wild Robot", genre: "Animation, Science Fiction, Family", image: "WildRobot.jpg" },
    { id: 7, title: "Bad Boys: Ride or Die", genre: "Action, Crime, Thriller", image: "BadBoys.jpg" },
    { id: 8, title: "Never Let Go (2024)", genre: "Horror, Thriller, Suspense", image: "NeverLetGo.jpg" },
    { id: 9, title: "Bad Genius (2024)", genre: "Drama, Thriller", image: "BadG.png" },
    { id: 10, title: "The Substance", genre: "Horror, Body Horror, Science Fiction, Drama", image: "TheSubstance.jpg" },
    { id: 11, title: "Twilight of the Warriors: Walled In", genre: "Action, Martial Arts, Adventure, Thriller, Crime Fiction, Neo-noir", image: "Twilight.jpg" },
    { id: 12, title: "I, The Executioner", genre: "Action, Comedy, Adventure, Crime Film, Crime Fiction", image: "Executioner.jpg" }
] 

// Helper function to create movie card
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const movieImg = document.createElement('img');
    movieImg.src = movie.image;
    movieImg.alt = movie.title;

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie-info');

    const movieTitle = document.createElement('h4');
    movieTitle.innerText = movie.title;

    const movieGenre = document.createElement('p');
    movieGenre.innerText = movie.genre;

    const bookButton = document.createElement('button');
    bookButton.innerText = 'Book Now';
    bookButton.addEventListener('click', () => {
        alert(`You have selected ${movie.title} for booking!`);
        window.location.href = `scheduling.html?movie=${encodeURIComponent(movie.title)}`;
    });

    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(movieGenre);
    movieCard.appendChild(movieImg);
    movieCard.appendChild(movieInfo);
    movieCard.appendChild(bookButton);

    return movieCard;
}

// Load all movies
function loadMovies() {
    const moviesGrid = document.querySelector('.movies-grid');
    moviesGrid.innerHTML = '';
    movies.forEach(movie => {
        moviesGrid.appendChild(createMovieCard(movie));
    });
}

// Search movies
function searchMovies() {
    const searchInput = document.querySelector('#search-input').value.toLowerCase();
    const filteredMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchInput) || movie.genre.toLowerCase().includes(searchInput)
    );
    displayFilteredMovies(filteredMovies);
}

// Display filtered movies
function displayFilteredMovies(filteredMovies) {
    const moviesGrid = document.querySelector('.movies-grid');
    moviesGrid.innerHTML = '';

    if (filteredMovies.length === 0) {
        moviesGrid.innerHTML = '<p>No movies found.</p>';
        return;
    }

    filteredMovies.forEach(movie => {
        moviesGrid.appendChild(createMovieCard(movie));
    });
}

// Event listener for search functionality
document.querySelector('.bx-search').addEventListener('click', searchMovies);

// Load movies on page load
document.addEventListener('DOMContentLoaded', loadMovies);

function toggleProfileDropdown() {
    const dropdown = document.getElementById("dropdown-menu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}


// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('#profile-icon')) {
        const dropdowns = document.getElementById("dropdown-menu");
        if (dropdowns.style.display === "block") {
            dropdowns.style.display = "none";
        }
    }
}


// Navigation function
function navigateTo(page) {
    const routes = {
        home: '/dashboard',
        comingSoon: '/coming-soon',
        aboutUs: '/about-us',
        contactUs: '/contact-us'
    };
    window.location.href = routes[page] || '/';
}
