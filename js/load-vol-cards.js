const board = document.querySelector(".cards-board");
var cards = [];
var db = firebase.firestore();

async function getMarker() {
  const snapshot = await firebase.firestore().collection("volunteers").get();
  return snapshot.docs.map((doc) => doc.data());
}

Promise.resolve(getMarker()).then((volunteers) => {
  volunteers.forEach((volunteer) => {
    var state = "redContainer";
    if (volunteer.available) {
      state = "greenContainer";
    }
    var img =
      '<img class="card-container-body-image-container-photo" src="../media/img/ardilla.png"></img>';
    var rate = 4;
    var rateimg = "";
    for (let s = 0; s < rate; s++) {
      rateimg +=
        '<img class="card-container-body-image-rate-star filledStar" src="../media/img/filledStar.svg"></img>';
    }
    for (let se = 0; se < 5 - rate; se++) {
      rateimg +=
        '<img class="card-container-body-image-rate-star emptyStar" src="../media/img/emptyStar.svg"></img>';
    }
    var location = "Madrid";
    var card =
      '<div class="card-container"><div class="card-container-delete"><img class="card-container-delete-icon" id="'+volunteer.email+'" src="../media/img/delete.svg"></div><div class="card-container-body"><div class="card-container-body-image"><div class="card-container-body-image-container ' +
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
      // TODO : Añadir <script></script> para el event listener de eliminar -=> con id:e-mail
    board.innerHTML += card;
    
  });
});
