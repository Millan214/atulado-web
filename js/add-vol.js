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
          // Create vol with auth
          // Ask for data
          Swal.mixin({
            input: "password",
            confirmButtonText: "Next &rarr;",
            showCancelButton: true,
            progressSteps: ["1", "2"],
          })
            .queue([
              {
                title:
                  "<span class='montserrat'>Introduce your admin e-mail</span>",
                text: "Only admins can change use admin powers",
              },
              "<span class='montserrat'>Introduce your password</span>",
            ])
            .then((result) => {
              if (result.value) {
                // Log in with that user
                var log = result.value[0];
                var pswd = result.value[1];
                firebase
                  .auth()
                  .signInWithEmailAndPassword(log, pswd)
                  .then((userCredential) => {
                    // Signed in
                    // Create volunteer
                    firebase
                      .auth()
                      .createUserWithEmailAndPassword(
                        input_email.value,
                        input_pswd.value
                      )
                      .then((userCredential) => {
                        // Signed in
                        var vol = userCredential.user;

                        // Add user to firestore
                        db.collection("volunteers")
                          .doc(input_email.value)
                          .set({
                            name: input_name.value,
                            surname: input_surname.value,
                            email: input_email.value,
                            rate: 0,
                            available: true
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
                        firebase
                          .auth()
                          .signInWithEmailAndPassword(log, pswd)
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
