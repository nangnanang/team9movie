import { movies, fetchMovies } from "./fetchData.js";
// console.log(movies);
fetchMovies().then(() => {
    createDetailPage(movies);
})

const GENRE_MAP = {
    35: "코미디",
    53: "스릴러",
    28: "맥션",
    10749: "로맨스",
    18: "드라마"
  };
  const movie = movies
  const genreNumber = movie.genre_ids;
  const genreText = GENRE_MAP[genreNumber];

// 상세페이지 데이터 입력
function createDetailPage() {
    const movieInfo = document.createElement('div');
    
    console.log(movie);
    movieInfo.className = 'topPosition';
    movieInfo.innerHTML = `
    <div class="moviePic">
                <img src=""https://image.tmdb.org/t/p/w500${movie.poster_path}"" alt="${movie.title}">
            </div>


            <div class="contents">
                <div class="contents1">
                    <div class="theme"><h3>${movie.title}</h3> </div>
                    <div class="summary"><p>${movie.overview}</p></div>
                </div>

                <div class="contents2">
                    <div class="genre">${genreText}</div>
                    <div class="date">${movie.release_date}</div>
                    <div class="rate"><span>평점: ${movie.vote_average}</span></div>
                </div>
            </div>
`;
    // card.addEventListener('click', () => alert(`Movie ID: ${movie.id}`));
    document.querySelector('allPosition').append(movieInfo);

    
}

