$(function(){
  $("#logout").click(logout);
})

function logout(){
  // 로그아웃 처리 시 로그인 상태 변경, 로그인 회원                                                                                                                                                                                                                                                                                                                                                                                                                                   `sadsf 객체 삭제, 메인페이지 이동
    window.updateLoginStatus(false);
    localStorage.removeItem("loggedInUserEmail");
}