$(function () {
  // 검색 버튼 클릭
  $("#search-btn").click(searchBtn);
  // 마이페이지 버튼 클릭
  $("#userPage-btn").click(userPageBtn);
  // 장바구니 버튼 클릭
  $("#shopping-btn").click();
  // 메뉴 버튼 클릭
  $("#menu-btn").click(menuBtn);

  // 검색 입력 시 search.html로 이동
  $("#search-input").click(function () {
    window.location.href = "search.html?keyword=" + encodeURIComponent($(this).val());
  });

  // Enter 키 입력 시 search.html 이동
  $("#search-input").keypress(function (e) {
    if (e.which === 13) {
      const keyword = $(this).val().trim();
      if (keyword) {
        window.location.href = `search.html?query=${encodeURIComponent(keyword)}`;
      }
    }
  });

  // 상위 카테고리 클릭 시 하위 카테고리 표시
  $(".genderAge").click(function () {
    const gender = $(this).attr("id"); // 예: "men", "women", "kids", "baby"
    
    // 모든 서브카테고리 숨기고, 해당 성별의 서브카테고리만 표시
    $(".subcategory-container").removeClass("active");
    $(`#${gender}-subcategories`).addClass("active");

    // 상위 카테고리 스타일 변경
    $(".genderAge").removeClass("active");
    $(this).addClass("active");
  });


  // 상세 카테고리 클릭 시 search.html 이동
  $(".subcategory-item").click(function () {
    const gender = $(this).data("gender");
    const category = $(this).data("category");
    window.location.href = `search.html?gender=${gender}&category=${encodeURIComponent(category)}`;
  });

  // 로고 클릭 시 홈으로 이동
  $("#logo").click(function () {
    window.location.href = "index.html";
  });
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
  const width = 400;
  const height = 600;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  const options = `width=${width}, height=${height}, left=${left}, top=${top},`;

  // 로그인 상태 변수 생성
  const isLogin = false; // 예시

  if (isLogin) {
    // 마이페이지 이동하기
    window.location.href = "myPage.html";
  } else {
    // 로그인 팝업창 생성하기 
    window.open("login.html", "_blank", options);
  }
}

/*
// 마이페이지 버튼 기능
function userPageBtn() {
  const width = 400;
  const height = 600;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  const options = `width=${width}, height=${height}, left=${left}, top=${top}`;

  // 로그인 여부 확인 로직은 생략됨 (예: isLoggedIn 변수 사용 가능)
  const isLoggedIn = false; // 예시

  if (isLoggedIn) {
    window.location.href = "myPage.html";
  } else {
    window.open("login.html", "_blank", options);
  }
}
*/


// 장바구니 버튼 기능
function shoppingBtn() {
  window.location.href = "#";
  // 장바구니 이동
  // 비활성화
}


// 메뉴 버튼 기능
function menuBtn() {
  $(".category-container").toggleClass("off on");

  if ($(".category-container").hasClass("on")) {
    // 초기 상태: 남성 카테고리 표시
    $("#men-subcategories").addClass("active");
    $("#men").addClass("active");
  } else {
    $(".subcategory-container").removeClass("active");
    $(".genderAge").removeClass("active");
  }
}

