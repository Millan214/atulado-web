const db = firebase.firestore();
const auth = firebase.auth();

const COLLECTION = "volunteers";

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
    errorMsg("Fill all the fields!", "There are unfilled fields");
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
              },
            ])
            .then((result) => {
              if (result.value) {
                signInAndCreateUser(currentUser.email, result.value[0]);
              }
            });
        } else {
          errorMsg(
            "Non secure passwords!",
            "Check the passwords, they need to be at least 6 characters long"
          );
        }
      } else {
        errorMsg(
          "Passwords don't match!",
          "Check the passwords, they aren't the same"
        );
      }
    } else {
      errorMsg(
        "That's not an e-mail!",
        "The format of the e-mail is incorrect"
      );
    }
  }
});

/**
 * 1.
 * Se registra con el admin actual y crea el usuario
 */
 function signInAndCreateUser(adminEmail, adminPswd) {
  auth
    .signInWithEmailAndPassword(adminEmail, adminPswd)
    .then(() => {
      createUser(adminEmail,adminPswd);
    })
    .catch((error) => {
      errorMsg(error.code, error.message);
    });
}

/**
 * 2.
 * Crea un usuario con Firebase Auth
 */
 function createUser(currentUser,currentPassword) {
  auth
    .createUserWithEmailAndPassword(input_email.value, input_pswd.value)
    .then(() => {
      addToFirestore();
      adminSignIn(currentUser,currentPassword);
    })
    .catch((error) => {
      errorMsg(error.code, error.message);
    });
}

/**
 * 2.1
 * Aañade un usuario a Firebase
 */
function addToFirestore() {
  db.collection(COLLECTION)
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
      errorMsg(error.code, error.message);
    });
}

/**
 * 2.2
 * Se registra con el administrador actual
 */
function adminSignIn(currentUser,currentPassword) {
  auth
    .signInWithEmailAndPassword(currentUser,currentPassword)
    .then(() => {
      successMsg(
        "User Added !",
        "The user <b>" + input_email.value + "</b> has been added sucessfully"
      );
    })
    .catch((error) => {
      errorMsg("Error", error.message);
    });
}

/**
 * Comprueba que no hay inputs vacios
 * @returns boolean
 */
 function checkInputs() {
  return (
    input_email.value == "" ||
    input_pswd.value == "" ||
    input_pswd2 == "" ||
    input_name == "" ||
    input_surname == ""
  );
}

/**
 * Mensaje de operación satisfactoria
 * @param {String} title Título del mensaje
 * @param {String} msg Mensaje de información secundario
 */
function successMsg(title, msg) {
  Swal.fire("<span class='montserrat'>" + title + "</span>", msg, "success");
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
  return input_pswd.value === input_pswd2.value;
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}