const API_KEY = 'c257e549';  // Replace with your actual API key from OMDB or TMDB
const API_URL = 'https://www.omdbapi.com/';

// Function to fetch movie data based on search term
async function fetchMovies(query) {
    const response = await fetch(`${API_URL}?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === 'True') {
        return data.Search; // Array of movie objects
    } else {
        alert("No movies found!");
        return [];
    }
}

// Function to display the list of movies
function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';  // Clear any existing movies

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200'}" alt="${movie.Title}" />
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
            <button onclick="showMovieDetails('${movie.imdbID}')">Details</button>
        `;

        movieList.appendChild(movieCard);
    });
}

// Function to fetch and display movie details
async function showMovieDetails(imdbID) {
    const response = await fetch(`${API_URL}?i=${imdbID}&apikey=${API_KEY}`);
    const movie = await response.json();

    const movieDetails = document.getElementById('movie-details');
    movieDetails.innerHTML = `
        <h1>MOVIE DETAILS</h1>
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}" alt="${movie.Title}" />
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <ul>
            <li><strong>Rating:</strong> ${movie.imdbRating}</li>
            <li><strong>Director:</strong> ${movie.Director}</li>
            <li><strong>Actors:</strong> ${movie.Actors}</li>
            <li><strong>Runtime:</strong> ${movie.Runtime}</li>
            <li><strong>Languages:</strong> ${movie.Language}</li>
            <li><strong>Release Date:</strong> ${movie.Released}</li>
        </ul>
    `;

    movieDetails.style.display = 'block';  // Show the movie details
}

// Event listener for search functionality
document.getElementById('search-button').addEventListener('click', async () => {
    const searchQuery = document.getElementById('search-input').value;
    if (searchQuery) {
        const movies = await fetchMovies(searchQuery);
        displayMovies(movies);
    } else {
        alert("Please enter a movie title!");
    }
});

// Optional: You could add functionality for the Enter key to trigger the search
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('search-button').click();
    }
});

