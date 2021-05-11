var db = firebase.firestore();

const add_form = document.querySelector("#add_form");
const input_email = document.querySelector("#add_form_input_e-mail");
const input_pswd = document.querySelector("#add_form_input_pswd");
const input_pswd2 = document.querySelector("#add_form_input_pswd2");
const input_name = document.querySelector("#add_form_input_name");
const input_surname = document.querySelector("#add_form_input_surname");

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

add_form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    input_email.value == "" ||
    input_pswd.value == "" ||
    input_pswd2 == "" ||
    input_name == "" ||
    input_surname == ""
  ) {
    Swal.fire({
      icon: "error",
      title: "<span class='montserrat'>Fill all the fields!</span>",
      text: "There are unfilled fields",
    });
  } else {
    if (validateEmail(input_email.value)) {
      if (input_pswd.value === input_pswd2.value) {
        if (input_pswd.value.length >= 6) {
          // Create user with auth
          firebase
            .auth()
            .createUserWithEmailAndPassword(input_email.value, input_pswd.value)
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
          // Add volunteer to firestore
          db.collection("volunteers")
            .doc(input_email.value)
            .set({
              name: input_name.value,
              surname: input_surname.value,
              email: input_email.value,
              available: true
            })
            .then(() => {
              console.log("Document written successfully");
            })
            .catch((error) => {
              var errorMessage = error.message;
              Swal.fire({
                icon: "error",
                title: '<span class="montserrat">' + errorCode + "</span>",
                text: errorMessage,
              });
              console.error("Error adding document: ", error);
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "<span class='montserrat'>Insecure passwords!</span>",
            text: "Check the passwords, they need to be at least 6 characters long",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "<span class='montserrat'>Passwords don't match!</span>",
          text: "Check the passwords, they aren't the same",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "<span class='montserrat'>That's not an e-mail!</span>",
        text: "The format of the e-mail is incorrect",
      });
    }
  }
});
