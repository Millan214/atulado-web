const db = firebase.firestore();
const auth = firebase.auth()

const add_form = document.querySelector("#add_form");
const input_email = document.querySelector("#add_form_input_e-mail");
const input_pswd = document.querySelector("#add_form_input_pswd");
const input_pswd2 = document.querySelector("#add_form_input_pswd2");
const input_name = document.querySelector("#add_form_input_name");
const input_surname = document.querySelector("#add_form_input_surname");

add_form.addEventListener("submit", (e) => {
  //Elimina la acción por defecto que hace el formulario cuando se envia
  e.preventDefault();

  var currentUser = auth.currentUser;

  if (checkInputs()) {
    errorMsg("Fill all the fields!","There are unfilled fields")
  } else {
    if (validateEmail(input_email.value)) {
      if (pswdEquals()) {
        if (input_pswd.value.length >= 6) {
          // Create user with auth
          // Ask for data
          Swal.mixin({
            input: "password",
            confirmButtonText: "Next &rarr;",
            showCancelButton: true,
            progressSteps: ["1"],
          })
            .queue([
              {
                title:
                  "<span class='montserrat'>Introduce your password</span>",
                text: "Only admins can use admin powers",
              }
            ])
            .then((result) => {
              if (result.value) {
                // Log in with that user
                auth
                  .signInWithEmailAndPassword(currentUser.email, result.value[0])
                  .then((userCredential) => {
                    // Signed in
                    // Create user
                    auth
                      .createUserWithEmailAndPassword(
                        input_email.value,
                        input_pswd.value
                      )
                      .then((userCredential) => {
                        // Signed in
                        var user = userCredential.user;
                        // Add user to firestore
                        db.collection("users")
                          .doc(input_email.value)
                          .set({
                            name: input_name.value,
                            surname: input_surname.value,
                            email: input_email.value,
                          })
                          .then(() => {
                            console.log("Document written successfully");
                          })
                          .catch((error) => {
                            var errorMessage = error.message;
                            Swal.fire({
                              icon: "error",
                              title:
                                '<span class="montserrat">' +
                                errorCode +
                                "</span>",
                              text: errorMessage,
                            });
                            console.error("Error adding document: ", error);
                          });

                        // Log in with the other admin
                        auth
                          .signInWithEmailAndPassword(
                            currentUser.email,
                            result.value[0]
                          )
                          .then((userCredential) => {
                            // Signed in
                            var user = userCredential.user;
                            Swal.fire(
                              "<span class='montserrat'>User added !</span>",
                              "The user <b>" +
                                input_email.value +
                                "</b> has been added sucessfully",
                              "success"
                            );
                            result.value[0] = "";
                          })
                          .catch((error) => {
                            var errorMessage = error.message;

                            Swal.fire({
                              icon: "error",
                              title:
                                '<span class="montserrat">' +
                                "Error" +
                                "</span>",
                              text: errorMessage,
                            });
                          });
                      })
                      .catch((error) => {
                        var errorCode = error.code.substring(5);
                        var errorMessage = error.message;
                        Swal.fire({
                          icon: "error",
                          title:
                            '<span class="montserrat">' + errorCode + "</span>",
                          text: errorMessage,
                        });
                      });
                    var user = userCredential.user;
                  })
                  .catch((error) => {
                    var errorCode = error.code.substring(5);
                    var errorMessage = error.message;

                    Swal.fire({
                      icon: "error",
                      title:
                        '<span class="montserrat">' + errorCode + "</span>",
                      text: errorMessage,
                    });
                  });
              }
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

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Comprueba que no hay inputs vacios
 * @returns boolean
 */
 function checkInputs() {
  return input_email.value == "" || input_pswd.value == "" || input_pswd2 == "" || input_name == "" || input_surname == "";
}

/**
 * Mensaje de operación satisfactoria
 * @param {String} title Título del mensaje
 * @param {String} msg Mensaje de información secundario
 */
 function successMsg(title, msg) {
  Swal.fire(title, msg, "success");
}

/**
 * Mensaje de error usando sweetalert
 * @param {String} title Título del mensaje
 * @param {String} text Mensaje de información secundario
 */
function errorMsg(title, text) {
  Swal.fire({
    icon: "error",
    title: '<span class="montserrat">' + title + "</span>",
    text: text,
  });
}

/**
 * Comprueba si las contraseñas coinciden
 * @returns boolean
 */
 function pswdEquals() {
  return input_pswd.value === input_pswd2.value
}