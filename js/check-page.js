/**
 * Compureba que haya un usuario registrado
 * Si hay un usuario registrado que está en index.html le redirecciona a show_vols.html
 * Si no hay nadie registrado que esté en cualquier sitio que no sea index.html le redirecciona a index.html
 */
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // The user has to click the logout button to reach the login
        if(document.location.pathname == "/"){
            document.location.href = "html/show_vols.html"
        }
    } else {
        // User is signed out
        // If the user is not signed he cant reach anything that's not index.html
        if(document.location.pathname != "/"){
            document.location.href = "/"
        }
    }
  });