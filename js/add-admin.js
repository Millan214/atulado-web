const email = document.querySelector("#add_form_input_e-mail");
const password = document.querySelector("#add_form_input_pswd");
const password2 = document.querySelector("#add_form_input_pswd2");
const form = document.getElementById("add_form");
const db = firebase.firestore();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  var currentUser = firebase.auth().currentUser;

  if (password.value == "" || password2.value == "" || email.value == "") {
    Swal.fire({
      icon: "error",
      title: '<span class="montserrat">Empty fields</span>',
      text: "Please fill all the inputs",
    });
  } else {
    if (password.value === password2.value) {
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
            firebase
              .auth()
              .signInWithEmailAndPassword(currentUser.email, result.value[0])
              .then((userCredential) => {
                // Signed in
                // Create admin
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(email.value, password.value)
                  .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    // Log in with the other admin
                    firebase
                      .auth()
                      .signInWithEmailAndPassword(
                        currentUser.email,
                        result.value[0]
                      )
                      .then((userCredential) => {
                        // Signed in
                        var user = userCredential.user;
                        db.collection("admins")
                          .doc(email.value)
                          .set({
                            email: email.value,
                          })
                          .then(() => {
                            console.log("Document written successfully");
                            Swal.fire(
                              "<span class='montserrat'>Admin added !</span>",
                              "The admin <b>" +
                                email.value +
                                "</b> has been added sucessfully",
                              "success"
                            );
                          });
                        result.value[0] = "";
                      })
                      .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;

                        Swal.fire({
                          icon: "error",
                          title:
                            '<span class="montserrat">' + errorCode + "</span>",
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
                  title: '<span class="montserrat">' + errorCode + "</span>",
                  text: errorMessage,
                });
              });
          }
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
