$(function(){
  $("#search-btn").click(searchBtn);
  $("#userPage-btn").click(userPageBtn);
  $("#shopping-btn").click(shoppingBtn);
  $("#menu-btn").click(menuBtn);
})

function searchBtn(){
  // 현재 창 위로 카테고리 슬라이드 펼치기
  // 마우스 이탈하거나 X 누르면 슬라이드 숨기기
}

// 로그인 전 상태라면 로그인 팝업 창 오픈
// 로그인 된 상태라면 바로 마이페이지 이동
// let 변수 = T/F -> 로그인:T / 로그아웃:F -> if문?
// 로그인 속성 값 prop(a,T) / 로그아웃 속성 값 prop(a,F) ?
function userPageBtn(){
  const width = 400;
  const height = 600;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  const options = `width=${width}, height=${height}, left=${left}, top=${top},`;
  window.open("login.html", "_blank", options);
}

function shoppingBtn(){
  // 장바구니 이동
  // 비활성화
}

function menuBtn(){
  // searchBtn() 동일
}


