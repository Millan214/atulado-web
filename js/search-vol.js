const btnSearch = document.querySelector(".search-icon");
const search = document.querySelector(".search-search");
const cardsBoard = document.querySelector(".cards-board");

search.addEventListener("input", () => {
  if (search.value == "") {
    cardsBoard.innerHTML = "";
    db.collection("volunteers")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((volunteer) => {
          var volunteer = volunteer.data();

          var state = "redContainer";
          if (volunteer.available) {
            state = "greenContainer";
          }
          var img =
            '<img class="card-container-body-image-container-photo" src="../media/img/ardilla.png"></img>';
          var rate = volunteer.rate;
          var rateimg = "";
          for (let s = 0; s < Math.round(rate); s++) {
            rateimg +=
              '<img class="card-container-body-image-rate-star filledStar" src="../media/img/filledStar.svg"></img>';
          }
          for (let se = 0; se < 5 - Math.round(rate); se++) {
            rateimg +=
              '<img class="card-container-body-image-rate-star emptyStar" src="../media/img/emptyStar.svg"></img>';
          }

          var location = volunteer.locationName;

          var card =
            '<div class="card-container"><div class="card-container-delete"><img class="card-container-delete-icon" id="' +
            volunteer.email +
            '" src="../media/img/delete.svg"></div><div class="card-container-body"><div class="card-container-body-image"><div class="card-container-body-image-container ' +
            state +
            '">' +
            img +
            '</div><div class="card-container-body-image-rate">' +
            rateimg +
            '</div></div><div class="card-container-body-name"><p class="card-container-body-user-name">' +
            volunteer.name +
            '</p><p class="card-container-body-user-surname">' +
            volunteer.surname +
            '</p></div></div><div class="card-container-footer"><img class="card-container-footer-icon" src="../media/img/location.svg"><span class="card-container-footer-loctext">Location</span><span class="card-container-footer-location">' +
            location +
            "</span></div></div>";
          cardsBoard.innerHTML += card;
          /**
           * Primero cargo todos las cartas y luego les añado los click listener
           * Cada icono de eliminar en la tarjeta tiene como id el correo del voluntario -> id:"correo@gmail.com"
           */
          document
            .getElementById(volunteer.email)
            .addEventListener("load", () => {
              document
                .getElementById(volunteer.email)
                .addEventListener("click", () => {
                  Swal.fire({
                    title:
                      "<span class='montserrat'>Do you really want to delete " +
                      volunteer.email +
                      "?</span>",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // Delete from firestore
                      db.collection("volunteers")
                        .doc(volunteer.email)
                        .delete()
                        .then(() => {
                          console.log("Document successfully deleted!");
                          Swal.fire(
                            "<span class='montserrat'>Volunteer deleted!</span>",
                            "The volunteer <b>" +
                              volunteer.email +
                              "</b> has been deleted scuccessfully!",
                            "success"
                          );
                          window.location.reload();
                        })
                        .catch((error) => {
                          console.error("Error removing document: ", error);
                          Swal.fire({
                            icon: "error",
                            title:
                              '<span class="montserrat">' +
                              "Server error" +
                              "</span>",
                            text: error,
                          });
                        });
                    }
                  });
                });
            });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  } else {
    cardsBoard.innerHTML = "";
    db.collection("volunteers")
      .where("name", "==", search.value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((volunteer) => {
          var volunteer = volunteer.data();

          var state = "redContainer";
          if (volunteer.available) {
            state = "greenContainer";
          }
          var img =
            '<img class="card-container-body-image-container-photo" src="../media/img/ardilla.png"></img>';
          var rate = volunteer.rate;
          var rateimg = "";
          for (let s = 0; s < Math.round(rate); s++) {
            rateimg +=
              '<img class="card-container-body-image-rate-star filledStar" src="../media/img/filledStar.svg"></img>';
          }
          for (let se = 0; se < 5 - Math.round(rate); se++) {
            rateimg +=
              '<img class="card-container-body-image-rate-star emptyStar" src="../media/img/emptyStar.svg"></img>';
          }

          var location = volunteer.locationName;

          var card =
            '<div class="card-container"><div class="card-container-delete"><img class="card-container-delete-icon" id="' +
            volunteer.email +
            '" src="../media/img/delete.svg"></div><div class="card-container-body"><div class="card-container-body-image"><div class="card-container-body-image-container ' +
            state +
            '">' +
            img +
            '</div><div class="card-container-body-image-rate">' +
            rateimg +
            '</div></div><div class="card-container-body-name"><p class="card-container-body-user-name">' +
            volunteer.name +
            '</p><p class="card-container-body-user-surname">' +
            volunteer.surname +
            '</p></div></div><div class="card-container-footer"><img class="card-container-footer-icon" src="../media/img/location.svg"><span class="card-container-footer-loctext">Location</span><span class="card-container-footer-location">' +
            location +
            "</span></div></div>";
          cardsBoard.innerHTML += card;
          /**
           * Primero cargo todos las cartas y luego les añado los click listener
           * Cada icono de eliminar en la tarjeta tiene como id el correo del voluntario -> id:"correo@gmail.com"
           */
          document
            .getElementById(volunteer.email)
            .addEventListener("load", () => {
              document
                .getElementById(volunteer.email)
                .addEventListener("click", () => {
                  Swal.fire({
                    title:
                      "<span class='montserrat'>Do you really want to delete " +
                      volunteer.email +
                      "?</span>",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // Delete from firestore
                      db.collection("volunteers")
                        .doc(volunteer.email)
                        .delete()
                        .then(() => {
                          console.log("Document successfully deleted!");
                          Swal.fire(
                            "<span class='montserrat'>Volunteer deleted!</span>",
                            "The volunteer <b>" +
                              volunteer.email +
                              "</b> has been deleted scuccessfully!",
                            "success"
                          );
                          window.location.reload();
                        })
                        .catch((error) => {
                          console.error("Error removing document: ", error);
                          Swal.fire({
                            icon: "error",
                            title:
                              '<span class="montserrat">' +
                              "Server error" +
                              "</span>",
                            text: error,
                          });
                        });
                    }
                  });
                });
            });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
});
