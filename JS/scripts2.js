$(function () {
  // 로고 클릭 시 홈으로 이동
  $("#logo").click(function () {
    window.location.href = "index.html";
  });

  // 로그인 상태를 전역적으로 관리할 수 있도록 함수 노출
  window.updateLoginStatus = function (status) {
    localStorage.setItem('isLogin', status);
  }
});

