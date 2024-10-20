// Suggested code may be subject to a license. Learn more: ~LicenseLog:3807366737.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:745030384.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:609640648.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:599485183.
const movieContainer = document.getElementById('movie-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const searchInput = document.getElementById('search-input');
let currentPage = 1;

function fetchMovies(page) {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1f568d2185657f7dca3a595bf59fffd6&page=${page}`) //llama a la api
  .then(response => response.json())
  .then(data => {
      movieContainer.innerHTML = '';
    data.results.forEach(movie => {
        // Fetch movie genres
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=1f568d2185657f7dca3a595bf59fffd6&append_to_response=genres`)
          .then(response => response.json())
          .then(movieDetails => {
            const genres = movieDetails.genres.map(genre => `
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${genre.name}</span>
            `).join('');
            
      const movieElement = document.createElement('div');
      movieElement.className = 'bg-white rounded-lg shadow-md p-4 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out'; 
            movieElement.innerHTML = `
              <h2 class="text-xl font-semibold text-gray-800">${movie.title}</h2>
                                  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster" class="w-full rounded-md">
              <p class="text-gray-600 mt-2">${movie.overview}</p>
              <div class="mt-2">
                ${genres}
              </div>
            `;
      movieContainer.appendChild(movieElement);
    });
      });

      prevBtn.disabled = page === 1;
      nextBtn.disabled = page === data.total_pages;
    });
}

fetchMovies(currentPage); //

prevBtn.addEventListener('click', () => {
  currentPage--;
  fetchMovies(currentPage);
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchMovies(currentPage);
});
//Error estaba aqui, faltaba cerrar el nextBtn
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=1f568d2185657f7dca3a595bf59fffd6&query=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        currentPage = 1; // Reset to first page when searching
        movieContainer.innerHTML = ''; 
        data.results.forEach(movie => {
          // Fetch movie genres for search results
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=1f568d2185657f7dca3a595bf59fffd6&append_to_response=genres`)
            .then(response => response.json())
            .then(movieDetails => {
              const genres = movieDetails.genres.map(genre => `
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${genre.name}</span>
              `).join('');

              const movieElement = document.createElement('div');
              movieElement.className = 'bg-white rounded-lg shadow-md p-4 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out';
              movieElement.innerHTML = `
                <h2 class="text-xl font-semibold text-gray-800">${movie.title}</h2>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster" class="w-full rounded-md">
                <p class="text-gray-600 mt-2">${movie.overview}</p>
                <div class="mt-2">${genres}</div>
              `;
              movieContainer.appendChild(movieElement);
            });
        });
      });
  } else {
    fetchMovies(currentPage); // Back to popular movies if search is empty
  }
  });