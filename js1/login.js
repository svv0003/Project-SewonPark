$(function () {
  $("#login-btn").click(loginBtn);
  $("#move-register-btn").click(moveRegisterBtn);

  // 검색창 Enter 키 입력 처리
  $("#pw-input").keypress(function (e) {
    if (e.which === 13) {
      loginBtn(e);
    }
  });
});

function loginBtn(e) {
  e.preventDefault();

  // 입력 값 변수 저장
  const inputEmail = $("#email-input").val().trim();
  const inputPW = $("#pw-input").val().trim();

  // 에러 메시지 초기화하기
  $("#id-error").css("display", "none");
  $("#pw-error").css("display", "none");

  // 이메일 입력, 정규표현식 검사하기
  let isValid = true;
  if (!inputEmail || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputEmail)) {
    $("#id-error").css("display", "block");
    isValid = false;
  }

  // 비밀번호 유효성 검사하기
  if (!inputPW) {
    $("#pw-error").css("display", "block").text("비밀번호를 입력해 주세요.");
    isValid = false;
  }

  // 유효성 검사 False
  if (!isValid) {
    return;
  }

  // 기존 데이터 불러오기
  let userList = JSON.parse(localStorage.getItem("userList") || "[]");

  // 로그인 정보 확인하기
  const loggedInUser = userList.find(
    (data) => data.email === inputEmail && data.password === inputPW
  );

  if (loggedInUser) {
    alert("로그인되었습니다.");

    // 로그인 회원 정보 저장
    sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    window.location.href = "../index.html";
  } else {
    alert("아이디 또는 비밀번호를 확인해 주세요.");
  }
}

function moveRegisterBtn() {
  window.location.href = "register.html";
}