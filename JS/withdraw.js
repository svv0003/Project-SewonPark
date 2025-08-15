$(function() {
  $("#withdrawBtn").click(withdraw);
  $("#move-myPage-btn").click(moveMyPage);
})


function withdraw(e) {
  e.preventDefault();

  // 동의 항목을 체크한 경우
  if ($("#withdrawConfirm").prop("checked")){
    if (confirm("계정을 삭제하시겠습니까?")){
      // userList에서 해당 계정 삭제하기 (로그인 회원 정보를 제외한 나머지 데이터만 localStorage에 저장하는 방식)
      // 로그인 회원 정보 가져오기
      const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
      // 회원 목록 정보 가져오기
      let userList = JSON.parse(localStorage.getItem("userList") || "[]");
      // 로그인 회원 정보를 제외한 나머지 결과 필터링하기
      const updatedUserList = userList.filter(user => user.email !== loggedInUser.email);
      // 가져온 나머지 결과를 다시 localStorage에 저장하기
      localStorage.setItem("userList", JSON.stringify(updatedUserList));

      // 로그인 회원 정보 삭제하기
      sessionStorage.removeItem("loggedInUser");
    
      alert("회원 탈퇴가 완료되었습니다.");
      window.location.href = "../index.html";
    } else {return;}
  } // 동의 항목을 체크하지 않은 경우
    else {
    $("#withdrawConfirm-error").addClass("error");
    $("#withdrawConfirm-error").text("내용 확인후 동의해 주세요.");
  }
}

function moveMyPage() {
  window.location.href = "myPage.html";
}