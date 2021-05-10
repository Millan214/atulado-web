document.getElementById("logout").addEventListener('click', (e) => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logged out!")
    }).catch((error) => {
        // An error happened.
        console.log(error)
    });
})
