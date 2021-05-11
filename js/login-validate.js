const form = document.getElementById("form");
const login = document.getElementById("input-login");
const passwd = document.getElementById("input-password");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  firebase
    .auth()
    .signInWithEmailAndPassword(login.value, passwd.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      document.location.href = "html\\show_vols.html";
    })
    .catch((error) => {
      var errorCode = error.code.substring(5);
      var errorMessage = error.message;

      Swal.fire({
        icon: "error",
        title: '<span class="montserrat">' + errorCode + "</span>",
        text: errorMessage,
      });
    });
});
