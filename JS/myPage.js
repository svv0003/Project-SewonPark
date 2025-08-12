$(function(){
  $("#logout").click(logout);
})

function logout(e){
  e.preventDefault();
  if (confirm("로그아웃 진행하겠습니까?")) {
    // 로그아웃 처리 시 로그인 상태 변경, 로그인 회원
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  } else {return;}
}