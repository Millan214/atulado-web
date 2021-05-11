const email = document.querySelector("#add_form_input_e-mail");
const password = document.querySelector("#add_form_input_pswd");
const password2 = document.querySelector("#add_form_input_pswd2");
const form = document.getElementById("add_form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  var user = firebase.auth().currentUser;
  console.log("🚀 ~ file: add-admin.js ~ line 7 ~ user", user);

  if (password.value == "" || password2.value == "" || email.value == "") {
    Swal.fire({
      icon: "error",
      title: '<span class="montserrat">Empty fields</span>',
      text: "Please fill all the inputs",
    });
  } else {
    if (password.value === password2.value) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          Swal.fire(
            "<span class='montserrat'>User added !</span>",
            "The user <b>" + user.email + "</b> has been added sucessfully",
            "success"
          );
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
    } else {
      Swal.fire({
        icon: "error",
        title: '<span class="montserrat">Check the passwords !</span>',
        text: "Passwords dont match",
      });
    }
  }
});
