$(function(){
  $("#login-btn").click(loginBtn);
  $("#move-register-btn").click(moveRegisterBtn);

})

function loginBtn(e) {
  e.preventDefault();
  const inputEmail = $("#email-input").val().trim();
  const inputPW = $("#pw-input").val().trim();
  let userList = JSON.parse(localStorage.getItem("userList") || "[]");
  const searchUser = userList.filter(data => data.email === inputEmail);

  if (searchUser.length > 0) {
    if ("데이터 속 입력된 이메일의 pw" === inputPW){
      // 로그인 상태 값 저장?
      alert("로그인 되었습니다.")
      window.close();
    } else {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.")
      return;
    }
  } else {
    alert("아이디 또는 비밀번호가 일치하지 않습니다.")
    return;
  }
}

function moveRegisterBtn(){
  opener.window.location.href = "register.html";
  window.close();
}