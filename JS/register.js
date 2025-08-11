$(function () {
  $("#register-btn").click(register);

  // 모든 동의 항목 체크
  $("#required-checkboxAll").click(checkAll);

  // 비밀번호 실시간 검증
  $("#password-input").on("input", function() {
  const password = $(this).val();
  checkPasswordInput(password);
  });
});



function register(e) {
  e.preventDefault();

// 에러 메시지 초기화
  $(".error-message").text("").removeClass("error");

  // 입력 값 변수에 담기
  const name = $("#name-input").val().trim();
  const email = $("#email-input").val().trim();
  const password = $("#password-input").val().trim();
  const phone = $("#phone-input").val().trim();

  // 형식 검증
  let isError = false;

  // 이름 검증
  if (!/^[가-힣a-zA-Z\s]+$/.test(name)) {
    $("#name-error").text("이름은 한글 또는 영문만 입력해 주세요.").addClass("error");
    isError = true;
  }

  // 이메일 검증
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    $("#email-error").text("유효한 이메일 주소를 입력해 주세요.").addClass("error");
    isError = true;
  }

  // 전화번호 검증
  if (!/^010-\d{4}-\d{4}$/.test(phone)) {
    $("#phone-error").text("전화번호는 010-XXXX-XXXX 형식이어야 합니다.").addClass("error");
    isError = true;
  }

  // 비밀번호 검증
  const passwordCheck = checkPasswordInput(password);
  if (!passwordCheck.english || !passwordCheck.number || !passwordCheck.special || password.length < 8) {
    $("#password-error").text("비밀번호는 8자 이상이어야 하며, 영문, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.").addClass("error");
    isError = true;
  }

  // 필수 체크박스 검증
  const requiredCheckboxes = ["#required-checkbox-1", "#required-checkbox-2", "#required-checkbox-3"];
  let firstUnchecked = null;
  requiredCheckboxes.forEach(id => {
    if (!$(id).is(":checked")) {
      if (!firstUnchecked) firstUnchecked = $(id);
      isError = true;
    }
  });

  if (isError) {
    if (firstUnchecked) {
      $("#checkbox-error").text("필수 항목에 동의해 주세요.").addClass("error");
      $("html, body").animate({ scrollTop: firstUnchecked.offset().top - 50 }, 500);
      firstUnchecked.focus();
    }
    return;
  }

  // 이메일 중복 체크
  let userList = JSON.parse(localStorage.getItem("userList") || "[]");
  const existing = userList.find((user) => user.email === email);
  if (existing) {
    $("#email-error").text("이미 가입된 이메일입니다.").addClass("error");
    isError = true;
    return;
  }
  
  // 회원가입 성공
  if (!isError) {
    const newUser = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      address: address,
      createAt: new Date().toLocaleDateString("ko-KR", { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    // 기존 데이터에 추가
    userList.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userList));
    alert("회원가입이 완료되었습니다.");
    window.location.href = "index.html";
  }
}



// 모든 동의 항목 체크
function checkAll() {
  const isChecked = $(this).is(":checked");
  $(".check-input").prop("checked", isChecked);
};

// 비밀번호 실시간 체크
function checkPasswordInput(password) {
  const isEnglish = /[a-zA-Z]/.test(password);
  const isNumber = /\d/.test(password);
  const isSpecial = /[!@#$%^&*]/.test(password);

  $("#pw-english").prop("checked", isEnglish);
  $("#pw-number").prop("checked", isNumber);
  $("#pw-special").prop("checked", isSpecial);

  return {
    english: isEnglish,
    number: isNumber,
    special: isSpecial
  };
};