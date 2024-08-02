import { movies, fetchMovies } from "./fetchData.js";
// console.log(movies);
fetchMovies().then(() => {
    createDetailPage(movies);
})



// 상세페이지 데이터 입력
function createDetailPage() {
    const movieInfo = document.createElement('div');
    const movie = movies
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
                    <div class="genre">장르</div>
                    <div class="date">${movie.relase_date}</div>
                    <div class="rate"><span>평점: ${movie.vote_average}</span></div>
                </div>
            </div>
`;
    // card.addEventListener('click', () => alert(`Movie ID: ${movie.id}`));
    return movieInfo;
    
}

