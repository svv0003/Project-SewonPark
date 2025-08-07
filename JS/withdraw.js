$(function() {
  $("#withdrawBtn").click(withdraw);
})


// 동의합니다 checked True -> 회원 탈퇴 버튼 ok -> userList에서 삭제
// 동의합니다 checked False -> "내용 확인후 동의해 주세요." 문구 보이기 -> 
function withdraw(e) {
  e.preventDefault();
  if ($("#withdrawConfirm").prop("checked")){
    // userList에서 해당 계정 삭제하기
    alert("회원 탈퇴가 완료되었습니다.");
    window.location.href = "index.html";
  } else {
    $("#withdrawConfirm-error").addClass("error");
    $("#withdrawConfirm-error").text("내용 확인후 동의해 주세요.");
  }
}