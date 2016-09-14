// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyC7X--ndbMggSIgeg8dTfHvHLodUcExRoM",
//   authDomain: "eventables.firebaseapp.com",
//   databaseURL: "https://eventables.firebaseio.com",
//   storageBucket: "project-7784170663557907192.appspot.com",
// };
// firebase.initializeApp(config);

// var toggleSignIn = function () {
//   if (firebase.auth().currentUser) {
//     // [START signout]
//     firebase.auth().signOut();
//     // [END signout]
//   } else {
//     var email = document.getElementById('login_email').value;
//     var password = document.getElementById('login_pass').value;
//     if (email.length < 4) {
//       alert('Please enter an email address.');
//       return;
//     }
//     if (password.length < 4) {
//       alert('Please enter a password.');
//       return;
//     }
//     // Sign in with email and pass.
//     // [START authwithemail]
//     firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // [START_EXCLUDE]
//       if (errorCode === 'auth/wrong-password') {
//         alert('Wrong password.');
//       } else {
//         alert(errorMessage);
//       }
//       console.log(error);
//       $("#eventables-sign-in-toggle").text("login");
//       $('.login_handles').hide();
//       alert("not logged in!");
//       // [END_EXCLUDE]
//     });
//     // [END authwithemail]
//   }
//   $("#eventables-sign-in-toggle").text("logout");
//   alert("logged in!");
// };

// var sendPasswordReset = function () {
//   var email = document.getElementById('login_email').value;
//   // [START sendpasswordemail]
//   firebase.auth().sendPasswordResetEmail(email).then(function () {
//     // Password Reset Email Sent!
//     // [START_EXCLUDE]
//     alert('Password Reset Email Sent!');
//     // [END_EXCLUDE]
//   }).catch(function (error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // [START_EXCLUDE]
//     if (errorCode == 'auth/invalid-email') {
//       alert(errorMessage);
//     } else if (errorCode == 'auth/user-not-found') {
//       alert(errorMessage);
//     }
//     console.log(error);
//     // [END_EXCLUDE]
//   });
//   // [END sendpasswordemail];
// };

// var initApp = function () {
//   // Listening for auth state changes.
//   // [START authstatelistener]
//   firebase.auth().onAuthStateChanged(function (user) {
//     // [START_EXCLUDE silent]
//     // document.getElementById('eventables-verify-email').disabled = true;
//     // [END_EXCLUDE]

//     if (user) {
//       // User is signed in.
//       var displayName = user.displayName;
//       var altdisplayname;
//       firebase.database().ref().child(uid).on('value', function(snap) {
//         altdisplayname = snap.val().displayName;
//       });
//       var email = user.email;
//       // var photoURL = user.photoURL;
//       var uid = user.uid;
//       var refreshToken = user.refreshToken;
//       var providerData = user.providerData;
//       // [START_EXCLUDE silent]
//       document.getElementById('eventables-sign-in-status').textContent = 'Logged in as ' + altdisplayname;
//       document.getElementById('eventables-sign-in-toggle').textContent = 'Sign out';
//       // document.getElementById('eventables-account-details').textContent = JSON.stringify({
//       //   displayName: displayName,
//       //   email: email,
//       //   photoURL: photoURL,
//       //   isAnonymous: isAnonymous,
//       //   uid: uid,
//       //   refreshToken: refreshToken,
//       //   providerData: providerData
//       // }, null, '  ');
//       // if (!emailVerified) {
//       //   document.getElementById('eventables-verify-email').disabled = false;
//       // }
//       // [END_EXCLUDE]
//     } else {
//       // User is signed out.
//       // [START_EXCLUDE silent]
//       document.getElementById('eventables-sign-in-status').textContent = 'Signed out';
//       document.getElementById('eventables-sign-in-toggle').textContent = 'Sign in';
//       // [END_EXCLUDE]
//     }
//     // [START_EXCLUDE silent]
//     // document.getElementById('eventables-sign-in').disabled = false;
//     // [END_EXCLUDE]
//   });
//   // [END authstatelistener]

//   document.getElementById('eventables-sign-in-toggle').addEventListener('click', toggleSignIn, false);
//   document.getElementById('eventables-password-reset').addEventListener('click', sendPasswordReset, false);
// };

// $(document).ready(function () {
//   initApp();
// });
$("#eventables-logout").hide();
// Initialize Firebase
var config = {
  apiKey: "AIzaSyC7X--ndbMggSIgeg8dTfHvHLodUcExRoM",
  authDomain: "eventables.firebaseapp.com",
  databaseURL: "https://eventables.firebaseio.com",
  storageBucket: "project-7784170663557907192.appspot.com",
};
firebase.initializeApp(config);

const txtEMail = document.getElementById('login_email');
const txtPassword = document.getElementById("login_pass");
const btnLogin = document.getElementById("eventables-sign-in");
const btnLogout = document.getElementById("eventables-logout");

// btnLogin.addEventListener('click', e => {
//   // Get Email and pass
//   console.log("just click the login button");

//   const email = txtEMail.value;
//   const pass = txtPassword.value;
//   const auth = firebase.auth();
//   // sign in
//   const promise = auth.signInWithEmailAndPassword(email, pass);
//   promise.catch(e => console.log(e.message));
//   $('#eventables-sign-in').hide();
//   $("#eventables-logout").fadeIn();
// });

$('#eventables-sign-in').click(function () {
  console.log("just click the login button");
  const email = txtEMail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

  auth.signInWithEmailAndPassword(email, pass).then(function () {
    $('#eventables-sign-in').hide();
    $("#eventables-logout").fadeIn();
  }, function (error) {
    console.log(e.message);
  });
});

$('#eventables-logout').click(function () {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    console.log("Sign Out Successfull");
    $('#eventables-sign-in').fadeIn();
    $("#eventables-logout").hide();
  }, function (error) {
    // An error happened.
    console.log("failed to sign out \n here is what happend\n" + error);
  });
});
// btnLogout.addEventListener('click', e => {
//   firebase.auth().signOut().then(function () {
//     // Sign-out successful.
//     console.log("Sign Out Successfull");
//     $('#eventables-sign-in').fadeIn();
//     $("#eventables-logout").hide();
//   }, function (error) {
//     // An error happened.
//     console.log("failed to sign out \n here is what happend\n" + error);
//   });
// });

// firebase.auth().onAuthStateChanged(function (user) {
//   function toggleSignIn() {
//     console.log("just click the login button");
//     // Get Email and pass
//     if (user) {
//       const email = txtEMail.value;
//       const pass = txtPassword.value;
//       const auth = firebase.auth();
//       // sign in
//       const promise = auth.signInWithEmailAndPassword(email, pass);
//       promise.catch(e => console.log(e.message));
//       $('#eventables-sign-in-toggle').text('log out');
//       $('#eventables-sign-in-status').text('logged in!');
//     } else {
//       firebase.auth().signOut().then(function () {
//         // Sign-out successful.
//         console.log("Sign Out Successfull");
//         $('#eventables-sign-in-toggle').text('log in');
//       $('#eventables-sign-in-status').text('not logged in!');
//       }, function (error) {
//         // An error happened.
//         console.log("failed to sign out \n here is what happend\n" + error);
//       });
//     }
//   }
// });

// firebase.database().ref('blog/').child('posts/').on('child_added', function (snap) {
//   console.log(snap.val()); // value of the post
//   var postData = snap.val();
//   var postKey = snap.key;
//   var singlePost = '<div class="col s12 m6 l6">';
//   for (var post in postData) {
//     $('#blog_posts').append(singlePost);
//   }
//   console.log(snap.key); // ID of the post
// });

function getTimeStamp() {
  // Create a date object with the current time
  var now = new Date();

  // Create an array with the current month, day and time
  var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

  // Create an array with the current hour, minute and second
  var time = [now.getHours(), now.getMinutes(), now.getSeconds()];

  // Determine AM or PM suffix based on the hour
  var suffix = (time[0] < 12) ? "AM" : "PM";

  // Convert hour from military time
  time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

  // If hour is 0, set it to 12
  time[0] = time[0] || 12;

  // If seconds and minutes are less than 10, add a zero
  for (var i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = "0" + time[i];
    }
  }

  return date.join("-");

}
function nth(d) {
  if (d > 3 && d < 21) return 'th'; // thanks kennebec
  switch (d % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}
function getDayName(someinput) {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(someinput).getDay()];
}
function getMonthName(someinput){
  return ["january","february","march","april","may","june","july","august","september","october","november","december"][new Date(someinput).getMonth()];
}
var someTime  = 1473238862000;
console.log( getDayName(someTime) + someTime.getDate() + nth(someTime) + "," + getMonthName(someTime) + getFullYear());
