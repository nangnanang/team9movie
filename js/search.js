import { movies, fetchMovies } from "./fetchData.js";

const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

fetchMovies().then(() => {
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const value = searchInput.value.toLowerCase();

    if (value === "") {
      alert("검색어를 입력해주세요.");
      searchInput.focus();
      return;
    }

    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(value)
    );

    const searchMovie = document.querySelector("#cardList");
    searchMovie.innerHTML = "";

    if (filteredMovies.length === 0) {
      alert("검색 결과가 없습니다.");
      searchInput.focus();
      return;
    }

    filteredMovies.forEach((movie) => {
      const filteredMovie = document.createElement("div");
      filteredMovie.classList.add("movie");

      filteredMovie.innerHTML = `
          <div class="oneCard">
            <div class="imgBox">
                <div class="overviewBox">
                    <p>${movie.overview}</p>
                </div>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} 포스터">
            </div>
            <a href="detailMovie.html?movieId=${movie.id}">
                <div class="movie-content-position">
                    <div class="contentBox">
                        <h2 class="contentTitle">${movie.title}</h2>
                        <div class="infoBox">
                            <p class="vote"><b>평점:</b> ${movie.vote_average}</p>
                            <p class="releaseDate"><b>개봉일:</b> ${movie.release_date}</p>
                        </div>
                    </div>
                </div>
            </a>
          </div>
    `;
      searchMovie.appendChild(filteredMovie);
    });

    const movieListSection = document.querySelector("#movie-list");
    const offset = 130; // 스크롤 오프셋
    const scrollPosition = movieListSection.offsetTop - offset;

    window.scrollTo({ top: scrollPosition, behavior: "smooth" });
  });
});
