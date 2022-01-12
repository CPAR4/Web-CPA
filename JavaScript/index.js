firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      document.getElementById("User").style.display = "block";
      document.getElementById("Login").style.display = "none";
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        document.getElementById("user_para").innerHTML = "Hola : " + email_id;
  
      }
  
    } else {
      // No user is signed in.
  
      document.getElementById("User").style.display = "none";
      document.getElementById("Login").style.display = "flex";
  
    }
  });
  
  function login(){
  
    var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value;
    
    if(userEmail){
      document.getElementById("email").value;
    }
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("¡Oh no! 😱 algo salio mal, " + "por favor verifica tus credenciales.");
     
  
      // ...
    });
    
  
  }
  
  function logout(){
    firebase.auth().signOut();
  }
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
