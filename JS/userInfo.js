$(function(){
  // 페이지 로드 시 회원 정보 표시하기
  userInfoShow();

  /*
  // 이메일 변경 버튼 클릭
  $("#userId-change").click(function () {
    openPopup("changeEmail.html", 400, 300);
  });
  // 비밀번호 변경 버튼 클릭
  $("#userPW-change").click(function () {
    openPopup("changePassword.html", 400, 400);
  });
  // 주소지 변경 버튼 클릭
  $("#userAddress-change").click(function () {
    openPopup("changeUserInfo.html", 400, 500);
  });
  */

  // 모달 열기
  $("#userId-change").click(() => openModal("email"));
  $("#userPW-change").click(() => openModal("password"));
  $("#userAddress-change").click(() => openModal("address"));

  // 모달 닫기
  $(".close").click(closeModal);
  $("#modal-save").click(saveModal);

  // 마이페이지 이동하기
  $("#move-myPage-btn").click(()=>{
    window.location.href = "myPage.html";
  });
})


// 회원 정보 표시
function userInfoShow() {
  // userList 데이터를 불러와서 현재 로그인된 회원 정보 표시하기
  const userList = JSON.parse(localStorage.getItem("userList") || "[]");
  const loggedInEmail = localStorage.getItem("loggedInUserEmail");
  const currentUser = userList.find(user => user.email === loggedInEmail);
  console.log(loggedInEmail);
  console.log(currentUser);

  $("#userInfo-email").html(currentUser.email || "등록된 정보가 없습니다.");
  $("#userInfo-name").html(currentUser.name || "등록된 정보가 없습니다.");
  $("#userInfo-phone").html(currentUser.phone || "등록된 정보가 없습니다.");
  $("#userInfo-address").html(currentUser.address || "등록된 정보가 없습니다.");
}


// 모달 열기
function openModal(type) {
  const modal = $("#modal");
  const modalTitle = $("#modal-title");
  const modalBody = $("#modal-body");

  modal.show();

  switch (type) {
  case "email":
    modalTitle.text("이메일 변경");
    modalBody.html(`
      <input type="email" id="modal-email" placeholder="새 이메일">
      <button id="modal-check-duplicate">중복 확인</button>
    `);
    break;
  case "password":
    modalTitle.text("비밀번호 변경");
    modalBody.html(`
      <input type="password" id="modal-current-pw" placeholder="현재 비밀번호">
      <input type="password" id="modal-new-pw" placeholder="새 비밀번호">
      <input type="password" id="modal-confirm-pw" placeholder="새 비밀번호 확인">
    `);
    break;
  case "address":
    modalTitle.text("주소지 변경");
    modalBody.html(`
      <input type="text" id="modal-address" placeholder="주소지">
    `);
    break;
  }
}


// 모달 닫기
function closeModal(){
  $("#modal").hide();
}


// 모달 저장하기
function saveModal(e){
  e.preventDefault();

  const userList = JSON.parse(localStorage.getItem("userList") || "[]");
  const loggedInEmail = localStorage.getItem("loggedInUserEmail");
  const currentUser = userList.find(user => user.email === loggedInEmail);
  const modalTitle = $("#modal-title").text();
  
  let isValid = true;
  switch (modalTitle) {
    case "email":
      const newEmail = $("#modal-email").val().trim();
      const newUserEmail = userList.some(user => user.email === newEmail);
      // 새로 입력한 이메일 형식 검토
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newEmail)) {
        alert("유효한 이메일 주소를 입력하세요.");
        isValid = false;
      // 새로 입력한 이메일 중복 검토
      } else if(newUserEmail){
        alert("이미 사용중인 이메일입니다.")
        isValid = false;
      }
      // 유효한 이메일이라면 수정 내용 저장
      if (isValid) {
        currentUser.email = newEmail;
        localStorage.setItem("loggedInUserEmail", newEmail);
      }
      break;
    case "비밀번호 변경":
      const currentPw = $("#modal-current-pw").val();
      const newPw = $("#modal-new-pw").val();
      const confirmPw = $("#modal-confirm-pw").val();
      // 기존 비밀번호 입력 확인
      if (currentUser.password !== currentPw) {
        alert("현재 비밀번호가 일치하지 않습니다.");
        isValid = false;
      // 새로 입력한 비밀번호 형식 검토, 비밀번호 확인 입력 검토
      } else if (newPw !== confirmPw || !/[a-zA-Z]/.test(newPw) || !/\d/.test(newPw) || !/[!@#$%^&*]/.test(newPw) || newPw.length < 8) {
        alert("새 비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 하며 확인이 일치해야 합니다.");
        isValid = false;
      }
      // 유효한 비밀번호라면 수정 내용 저장
      if (isValid) currentUser.password = newPw;
      break;
    case "주소지 변경":
      const address = $("#modal-address").val().trim();
      if (isValid) {
        currentUser.address = address;
      }
      break;
  }
    if (isValid) {
    localStorage.setItem("userList", JSON.stringify(userList));
    alert("변경이 완료되었습니다.");
    // 모달 닫기
    closeModal();
    // 새 정보를 페이지에 업데이트
    userInfoShow();
    }
}


/*
// 팝업 열기 함수 (공통)
// 아이디 변경 버튼 ->  아이디 수정 페이지 팝업창 -> 새 아이디 input, 중복확인 버튼 -> 완료 문구, 팝업창 닫기
// 비밀번호 변경 버튼 -> 비밀번호 수정 페이지 팝업창 -> 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인 input -> 완료 문구, 팝업창 닫기
// 회원정보 변경 버튼 -> 회원 정보 수정 페이지 팝업창 -> 회원 정보 수정 완료 -> 회원 정보 페이지 내용 수정되도록
function openPopup(url, width, height) {
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  const options = `width=${width}, height=${height}, left=${left}, top=${top}`;
  const popup = window.open(url, "_blank", options);
}
*/





