$(function () {
  // 페이지 로드 시 회원 정보 표시하기
  userInfoShow();

  // 모달 열기
  $("#userId-change").click(() => openModal("email"));
  $("#userPW-change").click(() => openModal("password"));
  $("#userAddress-change").click(() => openModal("address"));

  // 모달 닫기
  $(".close").click(closeModal);
  $("#modal-save").click(saveModal);

  // 이메일 변경 중복확인(형식, 공백 확인)
  $(document).on("click", "#modal-check-duplicate", () => {
    const newEmailInput = $("#modal-email").val().trim();
    const userList = JSON.parse(localStorage.getItem("userList") || "[]");
    const isDuplicate = userList.some((user) => user.email === newEmailInput);
    const modal = $("#modal");

    if (!newEmailInput) {
      alert("이메일을 입력하세요.");
      modal.data("emailValid", false);
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newEmailInput)) {
      alert("유효한 이메일 주소를 입력하세요.");
      modal.data("emailValid", false);
    } else if (isDuplicate) {
      alert("이미 사용중인 이메일입니다.");
      modal.data("emailValid", false);
    } else {
      alert("사용 가능한 이메일입니다.");
      modal.data("emailValid", true);
    }
  });

  // 마이페이지 이동하기
  $("#move-myPage-btn").click(() => {
    window.location.href = "myPage.html";
  });
});

// 회원 정보 표시
function userInfoShow() {
  // sessionStorage에 저장된 로그인 회원 정보를 변환 후 가져와서 해당 값들 화면에 표시하기
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  $("#userInfo-email").html(loggedInUser.email || "등록된 정보가 없습니다.");
  $("#userInfo-name").html(loggedInUser.name || "등록된 정보가 없습니다.");
  $("#userInfo-phone").html(loggedInUser.phone || "등록된 정보가 없습니다.");
  $("#userInfo-address").html(
    loggedInUser.address || "등록된 정보가 없습니다."
  );
}

// 모달 열기
function openModal(type) {
  const modal = $("#modal");
  const modalTitle = $("#modal-title");
  const modalBody = $("#modal-body");

  emailValid = false;
  modal.show();
  // 모달의 종류를 data에 저장하기
  modal.data("type", type);
  // 이메일 유효성 초기화하기
  modal.data("emailValid", false);

  switch (type) {
    case "email":
      modalTitle.text("이메일 변경");
      modalBody.html(`
      <input type="email" class="changeInfo" id="modal-email" placeholder="새 이메일">
      <button id="modal-check-duplicate">중복 확인</button>
    `);
      break;
    case "password":
      modalTitle.text("비밀번호 변경");
      modalBody.html(`
      <input type="password" class="changeInfo" id="modal-current-pw" placeholder="현재 비밀번호"><br>
      <input type="password" class="changeInfo" id="modal-new-pw" placeholder="새 비밀번호"><br>
      <input type="password" class="changeInfo" id="modal-confirm-pw" placeholder="새 비밀번호 확인">
    `);
      break;
    case "address":
      modalTitle.text("주소지 변경");
      modalBody.html(`
      <input type="text" class="changeInfo" id="modal-address" placeholder="주소지">
    `);
      break;
  }
}

// 모달 닫기
function closeModal() {
  $("#modal").hide();
}

// 모달 저장하기
function saveModal(e) {
  e.preventDefault();

  const userList = JSON.parse(localStorage.getItem("userList") || "[]");
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const currentUserInList = userList.find(
    (user) => user.email === loggedInUser.email
  );
  const modal = $("#modal");
  const modalType = modal.data("type");

  let isValid = true;

  switch (modalType) {
    case "email":
      const newEmailInput = $("#modal-email").val().trim();
      if (!modal.data("emailValid")) {
        alert("이메일 중복 확인을 먼저 해주세요.");
        isValid = false;
        break;
      } else if (!newEmailInput) {
        alert("이메일을 입력하세요.");
        isValid = false;
        break;
      }
      if (isValid) {
        currentUserInList.email = newEmailInput;
        loggedInUser.email = newEmailInput;
      }
      break;

    case "password":
      const currentPw = $("#modal-current-pw").val();
      const newPw = $("#modal-new-pw").val();
      const confirmPw = $("#modal-confirm-pw").val();
      // 입력 유무 확인
      if (!currentPw || !newPw || !confirmPw) {
        alert("모든 비밀번호 필드를 입력하세요.");
        isValid = false;
        break;
      }
      // 현재 비밀번호가 일치하지 않은 경우
      if (currentUserInList.password !== currentPw) {
        alert("현재 비밀번호가 일치하지 않습니다.");
        isValid = false;
        break;
        // 새로 입력한 비밀번호 형식 검토, 비밀번호 확인 입력 검토
      }
      if (
        newPw !== confirmPw ||
        !/[a-zA-Z]/.test(newPw) ||
        !/\d/.test(newPw) ||
        !/[!@#$%^&*]/.test(newPw) ||
        newPw.length < 8
      ) {
        alert(
          "새 비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 하며 확인이 일치해야 합니다."
        );
        isValid = false;
        break;
      }
      // 유효한 비밀번호라면 수정 내용 저장
      if (isValid) {
        currentUserInList.password = newPw;
        loggedInUser.password = newPw;
      }
      break;

    case "address":
      const address = $("#modal-address").val().trim();
      if (!address) {
        alert("주소를 입력하세요.");
        isValid = false;
        break;
      }
      if (isValid) {
        currentUserInList.address = address;
        loggedInUser.address = address;
      }
      break;

    default:
      isValid = false;
      break;
  }

  if (isValid) {
    localStorage.setItem("userList", JSON.stringify(userList));
    sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    alert("변경이 완료되었습니다.");

    // 모달 닫기
    closeModal();

    // 새 정보를 페이지에 업데이트
    userInfoShow();
  }
}
