const apiurl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

// Global variables
const movieBox = document.querySelector("#movie-box");
let fullMovieList = [];

const topRatedMovies = async (api) => {
  const response = await fetch(api);
  const data = await response.json();
  fullMovieList = data.results;
  showMovies(fullMovieList);
};

showMovies = (movielist) => {
  movieBox.innerHTML = "";
  movielist.forEach((item) => {
    const movies = document.createElement("Div");
    movies.classList.add("movies");
    movies.innerHTML = `
    <div class="card" style="width: 18rem">
          <img src="${
            IMGPATH + item.poster_path
          }" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${item.original_title}</h5>
            <p><b>IMDB Rating: </b>${item.vote_average}</p>
            <p><b>Release Date: </b>${item.release_date}</p>
          </div>
        </div>
    `;
    movieBox.appendChild(movies);
  });
};

document.querySelector("#search").addEventListener("keyup", function (event) {
  if (event.target.value != "") {
    const searchTerm = event.target.value.toLowerCase();
    const filteredMovies = fullMovieList.filter((movie) =>
      movie.original_title.toLowerCase().includes(searchTerm)
    );
    showMovies(filteredMovies);
  } else {
    topRatedMovies(apiurl);
  }
});

topRatedMovies(apiurl);
