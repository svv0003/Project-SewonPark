$(function () {
  // 검색 버튼 클릭
  $("#search-btn").click(searchBtn);
  // 마이페이지 버튼 클릭
  $("#userPage-btn").click(userPageBtn);
  // 장바구니 버튼 클릭
  $("#shopping-btn").click(shoppingBtn);
  // 메뉴 버튼 클릭
  $("#menu-btn").click(menuBtn);

  // Enter 키 입력 시 search.html 이동
  $("#search-input").keypress(function (e) {
    if (e.which === 13) {
      const keyword = $(this).val().trim();
      if (!keyword) {
        $(this)
          .attr("placeholder", "검색어를 입력하세요")
          .addClass("error-placeholder");
        return;
      }
      $(this)
        .attr("placeholder", "검색어를 입력하세요")
        .removeClass("error-placeholder");
      window.location.href = `pages/search.html?query=${keyword}&page=1`;
    }
  });

  // 상위 카테고리 클릭 시 하위 카테고리 표시
  $(".genderAge").click(function () {
    const gender = $(this).attr("id");

    // 모든 서브카테고리 숨기고, 해당 성별의 서브카테고리만 표시
    $(".subcategory-container").removeClass("active");
    $(`#${gender}-subcategories`).addClass("active");

    // 상위 카테고리 스타일 변경
    $(".genderAge").removeClass("active");
    $(this).addClass("active");
  });

  // 상세 카테고리 클릭 시 search.html 이동
  $(".subcategory-item").click(function (e) {
    e.preventDefault();
    const gender = $(this).data("gender");
    const category = $(this).data("category");
    window.location.href = `pages/search.html?genderAge=${gender}&category=${category}&page=1`;
  });

  // 로고 클릭 시 홈으로 이동
  $("#logo").click(function () {
    window.location.href = "index.html";
  });

  const slider = $("#slider");
  let imageData = [];
  let totalImages = 0;
  let preloadedImages = {}; // 이미지 캐시를 위한 객체

  // JSON 불러오기
  $.ajax({
    url: "json/model.json",
    dataType: "json",
    // 데이터 로딩 성공 시 배열 저장, 페이지 표시하기
    success: function (data) {
      imageData = data;
      totalImages = imageData.length;

      // 첫 이미지 로드 및 표시
      preloadImage(0); // 첫 번째 이미지 미리 로드
      setSliderImage(0);

      // 다음 2개의 이미지 미리 로드 (캐싱 효과)
      preloadImage(1);
      preloadImage(2);

      // 클릭 시 상품 상세 페이지로 이동하기
      slider.on("click", function () {
        const currentIndex = getCurrentIndex();
        const refNum = imageData[currentIndex].referenceNumber;
        window.location.href = `pages/detail.html?referenceNumber=${refNum}`;
      });   

      // 스크롤 이벤트로 이미지 변경하기
      $(window).on("scroll", function () {
        const index = getCurrentIndex();
        setSliderImage(index);

        // 현재 이미지와 다음 이미지 미리 로드하여 끊김 방지
        preloadImage((index + 1) % totalImages);
      });
    },
  });

  // 현재 스크롤 위치로 이미지 index 계산
  function getCurrentIndex() {
    const scrollTop = $(window).scrollTop();
    const sectionHeight = $(window).height();
    const index = Math.floor(scrollTop / sectionHeight) % totalImages;
    return index;
  }

  // 이미지 캐시 및 설정 함수
  function setSliderImage(index) {
    if (preloadedImages[index]) {
      // 캐시된 이미지가 있으면 바로 사용
      slider.css({
        "background-image": `url(${preloadedImages[index].src})`
      });
    } else {
      // 캐시되지 않았다면 이미지 로드 후 설정
      preloadImage(index, () => {
        slider.css({
          "background-image": `url(${preloadedImages[index].src})`
        });
      });
    }
  }

  // 이미지 미리 로드 함수
  function preloadImage(index, callback) {
    if (preloadedImages[index]) {
      // 이미 로드된 이미지는 다시 로드하지 않음
      if (callback) callback();
      return;
    }

    const img = new Image();
    img.src = imageData[index].image;
    img.onload = () => {
      preloadedImages[index] = img;
      if (callback) callback();
    };
  }

  // 배경 이미지 변경
  function setSliderImage(index) {
    slider.css({
      "background-image": `url(${imageData[index].image})`
    });
  }
});

// 검색 버튼 기능
function searchBtn() {
  $(".search-input-container").toggleClass("off on");
  if ($(".search-input-container").hasClass("on")) {
    $("#search-input").focus();
  }
}

// 마이페이지 버튼 기능
// 로그아웃 상태 -> 로그인 팝업창 -> 홈페이지 이동 -> 마이페이지 이동
// 로그인 상태 -> 마이페이지 이동
// let 변수 = T/F -> 로그인:T / 로그아웃:F -> if문?
// 로그인 속성 값 prop(a,T) / 로그아웃 속성 값 prop(a,F)?
function userPageBtn() {
  /*
  const width = 400;
  const height = 600;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  const options = `width=${width}, height=${height}, left=${left}, top=${top},`;
  */

  const loggedInUser = sessionStorage.getItem("loggedInUser");

  // 로그인 정보가 없으면 로그인 팝업창 생성
  if (!loggedInUser) {
    // 로그인 팝업창 생성하기
    // window.open("login.html", "_blank", options);
    window.location.href = "pages/login.html";
  }
  // 로그인 정보가 있으면 마이페이지 이동
  else {
    window.location.href = "pages/myPage.html";
  }
}

// 장바구니 버튼 기능 (비활성화)
function shoppingBtn() {
  window.location.href = "#";
}

// 메뉴 버튼 기능
function menuBtn() {
  $(".category-container").toggleClass("off on");
  $(".nav-container").toggleClass("off on");
  $(".new-slide").toggleClass("off on");
  $("svg").toggleClass("off on");

  if ($(".category-container").hasClass("on")) {
    // 남성 카테고리 기본 표시 설정
    $(".subcategory-container").removeClass("active");
    $(".genderAge").removeClass("active");
    $("#Men-subcategories").addClass("active");
    $("#Men").addClass("active");
  } else {
    $(".subcategory-container").removeClass("active");
    $(".genderAge").removeClass("active");
  }
}