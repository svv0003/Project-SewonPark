/**
 * 로그인 입력 값 없을 시 에러 문구 표시
 * 기존 회원 데이터에서 로그인 입력 값과 동일한 데이터 찾기
 * 로그인 성공 시 로그인 상태 변수 값 변경하기
 */


$(function(){
  $("#login-btn").click(loginBtn);
  $("#move-register-btn").click(moveRegisterBtn);

  // 검색창 Enter 키 입력 처리
  $("#pw-input").keypress(function (e) {
    if (e.which === 13){
      loginBtn(e);
    }
  });
})

function loginBtn(e) {
  e.preventDefault();
  
  // 입력 값 변수
  const inputEmail = $("#email-input").val().trim();
  const inputPW = $("#pw-input").val().trim();

  // 기존 데이터 불러오기
  let userList = JSON.parse(localStorage.getItem("userList") || "[]");

  const loggedInUser = userList.find(data => data.email === inputEmail && data.password === inputPW);

  if (loggedInUser) {
    alert("로그인되었습니다.");
    // 로그인 회원 정보 저장
    sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    window.location.href = "index.html";
  } else {
    alert("아이디 또는 비밀번호를 확인해 주세요.");
    return;
  }
}

function moveRegisterBtn(){
  opener.location.href = "register.html";
}