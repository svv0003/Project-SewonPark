$(function(){
  userInfoShow();
  $("#move-myPage-btn").click(moveMyPage);
})

function userInfoShow(){
  // userList 데이터를 불러와서 회원 정보를 가져오기
  const userInfo = JSON.parse(localStorage.getItem("userList"));

  $("#userInfo-email").html()
  $("#userInfo-name").html()
  $("#userInfo-phone").html()
  $("#userInfo-address").html()

}

// 아이디 변경 버튼 ->  아이디 수정 페이지 팝업창 -> 새 아이디 input, 중복확인 버튼 -> 완료 문구, 팝업창 닫기
// 비밀번호 변경 버튼 -> 비밀번호 수정 페이지 팝업창 -> 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인 input -> 완료 문구, 팝업창 닫기
// 회원정보 변경 버튼 -> 회원 정보 수정 페이지 팝업창 -> 회원 정보 수정 완료 -> 회원 정보 페이지 내용 수정되도록


function moveMyPage() {
  window.location.href = "myPage.html";
}