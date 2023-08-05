"use strict";
if (userActive) {
  let id = (id) => document.getElementById(id);
  const btnNext = id("btn-next");
  const newsContainer = id("news-container");
  const btnPrevious = id("btn-prev");
  const pageNum = id("page-num");
  const btnSubmit = id("btn-submit");
  const queryInput = id("input-query");
  const navPagenum = id("nav-page-num");
  // Hàm lấy dữ liệu data từ new APT
  let totalResults = 0;
  let keyword = "";
  navPagenum.style.display = "none";
  btnSubmit.addEventListener("click", function () {
    pageNum.textContent = "1";
    newsContainer.innerHTML = "";
    keyword = queryInput.value;
    getDataNewByNewWord(keyword, 1);
    navPagenum.style.display = "block";
  });
  async function getDataNewByNewWord(keyword, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keyword}&page=${page}&&pageSize=${userActive.pageSize}&apiKey=82345fa4f91c441d9db40503b18e4a0b`
      );
      const data = await res.json();
      if (data.totalResults == 0) {
        navPagenum.style.display = "none";
        throw new Error(
          "Dont have any article fit with your keyword!! Please search again"
        );
      }
      displayNewList(data);
    } catch (err) {
      alert("Error:" + err.message);
    }
  }
  function displayNewList(data) {
    totalResults = data.totalResults;
    checkBtnNext();
    checkBtnPrev();
    let html = "";
    data.articles.forEach(function (article) {
      html += `
    <div class="card flex-row flex-wrap">
            <div class="card mb-3" style="">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img
                    src=${
                      article.urlToImage
                        ? article.urlToImage
                        : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                    }
                    class="card-img"
                    alt=""
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">
                    ${article.title}
                    </h5>
                    <p class="card-text">
                    ${article.description}
                    </p>
                    <a
                      href=${article.url}
                      class="btn btn-primary"
                      >View</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
    });

    newsContainer.innerHTML = html;
  }
  btnNext.addEventListener("click", function () {
    getDataNewByNewWord(keyword, ++pageNum.textContent);
  });
  btnPrevious.addEventListener("click", function () {
    getDataNewByNewWord(keyword, --pageNum.textContent);
  });
  function checkBtnPrev() {
    if (pageNum.textContent == 1) {
      btnPrevious.style.display = "none";
    } else {
      btnPrevious.style.display = "block";
    }
  }
  function checkBtnNext() {
    if (pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }
} else {
  alert("Please login to use this function");
  window.location.assign("../index.html");
}
