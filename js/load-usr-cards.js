const board = document.querySelector('.cards-board')
var cards = []

for (let i = 0; i < 309; i++) {
    var rateimg = ''
    var img = ''
    var randimg = Math.floor(Math.random() * 25)
    var rate = Math.floor(Math.random() * 5)

    for (let s = 0; s < rate; s++) {
        rateimg += '<img class="card-container-body-image-rate-star filledStar" src="../media/img/filledStar.svg"></img>'         
    }
    for (let se = 0; se < (5-rate); se++) {
        rateimg += '<img class="card-container-body-image-rate-star emptyStar" src="../media/img/emptyStar.svg"></img>'         
    }

    switch (randimg) {
        case 0:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/c9.jpeg"></img>'
            break;
        case 1:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/a4.jpg"></img>'
            break;
        case 2:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/a10.jpg"></img>'
            break;
        case 3:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/c4b.jpg"></img>'
            break;
        case 4:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/c6.jpg"></img>'
            break;
        case 5:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/c6d"></img>'
            break;
        case 6:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/c11.jpg"></img>'
            break;
        case 7:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/castor.jpg"></img>'
            break;
        case 8:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/delfin.jpg"></img>'
            break;
        case 9:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/dori.jpg"></img>'
            break;
        case 10:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/gatomeme.jpg"></img>'
            break;
        case 11:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/loro.jpg"></img>'
            break;
        case 12:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/mapache.jpg"></img>'
            break;
        case 13:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/star.jpg"></img>'
            break;
        case 14:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/p4.jpg"></img>'
            break;
        case 15:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/p6.jpg"></img>'
            break;
        case 16:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/pez.jpg"></img>'
            break;
        case 17:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/pollito.jpg"></img>'
            break;
        case 18:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/pollito2.jpg"></img>'
            break;
        case 19:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/pulpo.jpg"></img>'
            break;
        case 20:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/simba.jpg"></img>'
            break;
        case 21:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/ardilla.png"></img>'
            break;
        case 22:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/bobesponja_rosa.png"></img>'
            break;
        case 23:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/pato.png"></img>'
            break;
        case 24:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/perro.png"></img>'
            break;
        default:
            img = '<img class="card-container-body-image-container-photo" src="../media/img/perro.png"></img>'
            break;
    }

    var state = 'redContainer'
    var randstate = Math.floor(Math.random() * 2)
    if(randstate == 0){
        state = 'greenContainer'
    }

    var card = '<div class="card-container"><div class="card-container-delete"><img class="card-container-delete-icon" src="../media/img/delete.svg"></div><div class="card-container-body"><div class="card-container-body-image"><div class="card-container-body-image-container '+state+'">'+img+'</div><div class="card-container-body-image-rate">'+rateimg+'</div></div><div class="card-container-body-name"><p class="card-container-body-user-name">Name</p><p class="card-container-body-user-surname">Surname</p></div></div><div class="card-container-footer"><img class="card-container-footer-icon" src="../media/img/location.svg"><span class="card-container-footer-loctext">Location</span><span class="card-container-footer-location">Madrid</span></div></div>'
    cards += card
}

board.innerHTML = cards