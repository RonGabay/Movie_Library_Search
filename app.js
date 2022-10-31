const addMovieBtn = document.getElementById("add-movie-btn");
const searchMovieBtn = document.getElementById("search-btn");

const movies = [];

const renderMovies = (filter) => {
  const movieList = document.getElementById("movie-list");

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }

  movieList.innerHTML = '';

  // let filteredMovies = !filter;
  //   if (filteredMovies) {
  //     movies;
  //   } else {
  //     movies.filter(movie => movie.info.title.includes(filter));
  //   }

  const filteredMovies = !filter ? movies
  : movies.filter(movie => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement('li');
    const { info } = movie;
    let { getFormattedTitle } = movie;

    let text = getFormattedTitle.call(movie) + ' - ';

    for (const key in info) {
      if (key !== 'title' && key !== '_title') {
        text += `${key}: ${info[key]}`;
      }
    }

    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    extraName.trim() === '' ||
    extraValue.trim() === ''
    ) {
    return;
  }

  const newMovie = {
    info: {
      set title(val) {
       if (val.trim() === '') {
         this._title = 'DEFAULT';
         return;
       }
       this._title = val;
      },
      get title() {
       return this._title.toUpperCase();
      },
      [extraName]: extraValue
    },
    id: Math.random().toString(),
    getFormattedTitle: function() {
      return this.info.title;
    }
  };

  newMovie.info.title = title;
  console.log(newMovie.info.title);

  movies.push(newMovie);
  console.log(newMovie);

  renderMovies();
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchMovieBtn.addEventListener('click', searchMovieHandler);