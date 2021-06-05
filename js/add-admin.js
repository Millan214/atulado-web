const db = firebase.firestore();
const auth = firebase.auth();

const COLLECTION = "admins";

const email = document.querySelector("#add_form_input_e-mail");
const password = document.querySelector("#add_form_input_pswd");
const password2 = document.querySelector("#add_form_input_pswd2");
const form = document.getElementById("add_form");

form.addEventListener("submit", (e) => {
  //Elimina la acción por defecto que hace el formulario cuando se envia
  e.preventDefault();

  if (!checkInputs()) {
    if (pswdEquals()) {
      // Ask for data
      inputMsg(auth.currentUser);
    } else {
      errorMsg("Check the passwords !", "Passwords dont match");
    }
  } else {
    errorMsg("Empty fields", "Please fill all the inputs");
  }
});

/**
 * 1.
 * Muestra un mensaje para introducir la contraseña del administrador
 * Después se registra
 * @param {String} currentUser El administrador actual
 */
function inputMsg(currentUser) {
  Swal.mixin({
    input: "password",
    confirmButtonText: "Next &rarr;",
    showCancelButton: true,
    progressSteps: ["1"],
  })
    .queue([
      {
        title: "<span class='montserrat'>Introduce your password</span>",
        text: "Only admins can use admin powers",
      },
    ])
    .then((result) => {
      if (result.value) {
        //Si ha metido la contraseña...
        let inputPswd = result.value[0];
        adminSignIn(currentUser.email, inputPswd);
      }
    });
}

/**
 * 2.
 * Se registra con el admin
 * @param {String} currEmail Email del admin actual
 * @param {String} currPswd Contraseña del admin actual
 */
 function adminSignIn(currEmail, currPswd) {
  auth
    .signInWithEmailAndPassword(currEmail, currPswd)
    .then(() => {
      // Create admin con auth
      addAdminAuth(email.value, password.value, currEmail, currPswd);
    })
    .catch((error) => {
      var errorCode = error.code.substring(5);
      var errorMessage = error.message;
      errorMsg(
        '<span class="montserrat">' + errorCode + "</span>",
        errorMessage
      );
    });
}

/**
 * 3.
 * Crea el Admin y se registra con el admin actual
 * @param {String} newAdminEmail Email del admin a añadir
 * @param {String} newAdminPswd Contraseña del admin a añdir
 * @param {String} currentAdminEmail Email del admin actual
 * @param {String} currentAdminPswd Contraseña del admin actual
 */
 function addAdminAuth(
  newAdminEmail,
  newAdminPswd,
  currentAdminEmail,
  currentAdminPswd
) {
  auth
    .createUserWithEmailAndPassword(newAdminEmail, newAdminPswd)
    .then(() => {
      // Signed in
      // Log in with the other admin
      loginAdminAuth(newAdminEmail, currentAdminEmail, currentAdminPswd);
    })
    .catch((error) => {
      var errorCode = error.code.substring(5);
      var errorMessage = error.message;
      errorMsg(errorCode, errorMessage);
    });
}

/**
 * 4.
 * Se registra con el admin actual y crea el nuevo admin
 * @param {String} newEmail Email del nuevo admin
 * @param {String} currEmail Email del admin actual
 * @param {String} currPswd Contraseña del admin actual
 */
 function loginAdminAuth(newEmail, currEmail, currPswd) {
  auth
    .signInWithEmailAndPassword(currEmail, currPswd)
    .then(() => {
      // Signed in
      addAdminFirestore(newEmail);
      inputPswd = "";
    })
    .catch((error) => {
      errorMsg(error.code, error.message);
    });
}

/**
 * 5.
 * Añade un administrador a Firestore
 * @param {String} myemail Email del admin a crear
 */
function addAdminFirestore(myemail) {
  db.collection(COLLECTION)
    .doc(myemail)
    .set({
      email: myemail,
    })
    .then(() => {
      //Si se añade correctamente
      successMsg(
        "Admin added !",
        "The admin <b>" + myemail + "</b> has been added sucessfully"
      );
    });
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
  return password.value === password2.value;
}

/**
 * Comprueba que no hay inputs vacios
 * @returns boolean
 */
function checkInputs() {
  return password.value == "" || password2.value == "" || email.value == "";
}