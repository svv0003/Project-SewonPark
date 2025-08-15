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

  // 입력 데이터를 변수에 담기
  const name = $("#name-input").val().trim();
  const email = $("#email-input").val().trim();
  const password = $("#password-input").val().trim();
  let phone = $("#phone-input").val().trim();
  const address = $("#address-input").val().trim();

  // 형식 검증 변수 생성하기
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
  if (!(/^010-\d{4}-\d{4}$|^010\d{8}$/).test(phone)) {
    $("#phone-error").text("전화번호는 010-XXXX-XXXX (하이픈 생략 가능) 형식이어야 합니다.").addClass("error");
    isError = true;
  }

  // 전화번호 하이픈 생략된 입력 값 형태 변경하기
  else if (/^010\d{8}$/.test(phone)) {
    phone = phone.replace(/(\d{3})(\d{4})(\d{4})/, '010-$2-$3');
  }

  // 주소 입력 확인
  if (!address) {
    $("#address-error").text("주소를 입력해 주세요.").addClass("error");
    isError = true;
  }

  // 비밀번호 검증
  const passwordCheck = checkPasswordInput(password);
  if (!passwordCheck.length || !passwordCheck.englishNumber || !passwordCheck.special) {
    $("#password-error").text("비밀번호는 8자 이상이어야 하며, 영문, 숫자, 특수문자를 포함해야 합니다.").addClass("error");
    isError = true;
  }

  // 필수 체크박스 검증
  const requiredCheckboxes = ["#required-checkbox-1", "#required-checkbox-2", "#required-checkbox-3"];
  let unchecked = null;
  requiredCheckboxes.forEach(id => {
    if (!$(id).is(":checked")) {
      if (!unchecked) unchecked = $(id);
      isError = true;
    }
  });

  if (isError) {
    requiredCheckboxes.forEach(id => {
      const checkbox = $(id);
      const errorId = `#checkbox-error${id.split('-')[2]}`;
      if (!checkbox.is(":checked")) {
        $(errorId).text("필수 항목에 동의해 주세요.").addClass("error");
      } else {
        $(errorId).text("").removeClass("error");
      }
    });
    if (unchecked) {
      $("#checkbox-error").text(""); // 단일 에러 메시지 초기화
      $("html, body").animate({ scrollTop: unchecked.offset().top - 50 }, 500);
      unchecked.focus();
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
      createAt: new Date().toLocaleDateString("ko-KR"),
    };
    // 기존 데이터에 추가
    userList.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userList));
    alert("회원가입이 완료되었습니다.");
    window.location.href = "../index.html";
  }
}



// 모든 동의 항목 체크
function checkAll() {
  const isChecked = $(this).is(":checked");
  const requiredCheckboxes = ["#required-checkbox-1", "#required-checkbox-2", "#required-checkbox-3"];
  requiredCheckboxes.forEach(id => $(id).prop("checked", isChecked));
  if (!isChecked) $("#required-checkboxAll").prop("checked", false); // 전체 해제 시 전체 체크 해제
}


// 비밀번호 실시간 체크
function checkPasswordInput(password) {
  // 8~20글자
  const isLength = password.length >= 8 && password.length <= 20;
  // 영어와 숫자 혼용
  const isEnglishNumber = /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password);
  // 특수문자 포함
  const isSpecial = /[!@#$%^&*]/.test(password);

  $("#pw-length").prop("checked", isLength);
  $("#pw-englishNumber").prop("checked", isEnglishNumber);
  $("#pw-special").prop("checked", isSpecial);

  return {
    length: isLength,
    englishNumber: isEnglishNumber,
    special: isSpecial
  };
}