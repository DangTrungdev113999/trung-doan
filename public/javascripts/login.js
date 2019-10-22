function login() {
  $("#login").on("click", function() {
    let username = $("#username").val();
    let password = $("#password").val();

    $.post({
      url: "/user/login",
      data: {
        username,
        password
      }
    }, function(data) {
      localStorage.setItem("token", data);
      window.location.href = "/product";
    })
  })
}

$(document).ready(function() {
  login()
})