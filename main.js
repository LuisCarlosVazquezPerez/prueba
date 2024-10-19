const movieContainer = document.getElementById('movie-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
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