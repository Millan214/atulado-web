const form = document.getElementById("form");
const login = document.getElementById("input-login");
const passwd = document.getElementById("input-password");
const db = firebase.firestore();
form.addEventListener("submit", (e) => {
  e.preventDefault();

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

        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: '<span class="montserrat">' + "Only Admins!" + "</span>",
            text: "Only admins can enter the admin console",
          });
        }, 1000);
        
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
});
