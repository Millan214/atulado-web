firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // The user has to click the logout button to reach the login
        console.log("signed in")
        console.log(document.location.pathname)
        if(document.location.pathname == "/"){
            document.location.href = "html/show_vols.html"
        }
    } else {
        // User is signed out
        // If the user is not signed he cant reach anything that's not index.html        
        console.log("signed out")
        console.log(document.location.pathname)
        if(document.location.pathname != "/"){
            document.location.href = "/"
        }
    }
  });