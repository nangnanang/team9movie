import "./detailPage.js";

const searchId = new URLSearchParams(window.location.search);
const movieId = searchId.get("movieId");

const reviewAddBtn = document.querySelector(".reviewAddBtn");

const reviewOutputBox = document.querySelector(".reviewOutputBox");

// 리뷰 데이터 저장
const setReviewData = () => {
  let nickname = document.querySelector(".reviewNicknameInput").value;
  let password = document.querySelector(".reviewPasswordInput").value;
  let content = document.querySelector(".reviewContentInput").value;
  let star = document.querySelector("#star").value;

  let obj = {
    nickname: nickname,
    password: password,
    content: content,
    star: star,
  };

  let review = getReviewData();
  review.unshift(obj);

  localStorage.setItem(`review${movieId}`, JSON.stringify(review));
  location.reload();
};

// 인풋 데이터 유효성 검사
const addReviewCard = () => {
  let nickname = document.querySelector(".reviewNicknameInput").value;
  let password = document.querySelector(".reviewPasswordInput").value;
  let content = document.querySelector(".reviewContentInput").value;
  let star = document.querySelector("#star").value;

  if (!nickname) {
    return alert("닉네임을 입력해주세요");
  } else if (!password) {
    return alert("비밀번호를 입력해주세요");
  } else if (!content) {
    return alert("리뷰를 입력해주세요");
  } else if (!star) {
    return alert("평점을 입력해주세요");
  }
  {
    setReviewData();
  }
};
reviewAddBtn.addEventListener("click", addReviewCard);

// 리뷰 데이터 불러오기
const getReviewData = () => {
  let reviewData = JSON.parse(localStorage.getItem(`review${movieId}`));
  if (reviewData === null) {
    reviewData = [];
  }
  return reviewData;
};

//리뷰 카드 생성하기
const makeReviewData = () => {
  let reviewData = getReviewData();
  reviewOutputBox.innerHTML = "";

  // 최신 리뷰가 위로 오도록 reverse() 사용
  reviewData.forEach((element) => {
    let nickname = element.nickname;
    let password = element.password;
    let content = element.content;
    let star = "⭐".repeat(element.star);

    reviewOutputBox.innerHTML += `
      <div class="oneReview">
        <div class="outputNickname">${nickname}</div>
        <div class="outputContent">${star}</div>
        <div class="outputContent">${content}</div>
        <button class="deleteBtn" id="${password}">X</button>
      </div>`;
  });
};

// 로컬스토리지 모든 데이터 삭제
// 아래 2줄 코드 중 위쪽 주석 처리 취소하고 아래쪽 주석 처리 후 새로고침
// 하면 로컬 스토리지 삭제 가능
// 다시 리뷰 데이터를 쌓고 싶으면 두 줄 코드 원래대로 돌려놓기

// localStorage.clear();
makeReviewData();

// 리뷰데이터 삭제하기+이벤트 위임하기
reviewOutputBox.addEventListener("click", deleteReview);
function deleteReview({ target }) {
  if (target === reviewOutputBox) return;

  if (target.matches(".deleteBtn")) {
    let reviewData = getReviewData();
    let deletePassword = target.id;

    // password 입력창 띄우기
    let passwordWindow = window.prompt("비밀번호를 입력하세요");
    if (passwordWindow === deletePassword) {
      let deleteCard = "";
      for (const element of reviewData) {
        if (deletePassword === element.password) {
          deleteCard = reviewData.splice(element, 1);
          break;
        }
      }
      reviewData = reviewData.filter((n) => n !== deleteCard);
      localStorage.setItem(`review${movieId}`, JSON.stringify(reviewData));
      alert("리뷰가 삭제되었습니다.");
      window.location.reload();
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  }
}
