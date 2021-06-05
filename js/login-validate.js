const form = document.getElementById("form");
const login = document.getElementById("input-login");
const passwd = document.getElementById("input-password");
const progressbar = document.querySelector(".progressbar");
const db = firebase.firestore();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (login.value != "" && passwd.value != "") {
    db.collection("admins")
      .get()
      .then((querySnapshot) => {
        var logged = false;
        querySnapshot.forEach((doc) => {
          if (doc.data().email == login.value) {
            firebase
              .auth()
              .signInWithEmailAndPassword(login.value, passwd.value)
              .then((userCredential) => {
                logged = true;
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
          //animate progress bar
          progressbar.animate([
            // keyframes
            { width: '0%' },
            { width: '100%' }
          ], {
            // timing options
            duration: 1000
          });

          setTimeout(() => {
            Swal.fire({
              icon: "error",
              title:
                '<span class="montserrat">' +
                "That's not an ADMIN!" +
                "</span>",
              text: "Only admins can enter the admin console",
            });
          }, 1000);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  } else {
    Swal.fire({
      icon: "error",
      title: '<span class="montserrat">' + "Fill all inputs" + "</span>",
      text: "There are unfilled inputs, please introduce email and password",
    });
  }
});
