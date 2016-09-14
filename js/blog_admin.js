// Initialize Firebase
var config = {
  apiKey: "AIzaSyC7X--ndbMggSIgeg8dTfHvHLodUcExRoM",
  authDomain: "eventables.firebaseapp.com",
  databaseURL: "https://eventables.firebaseio.com",
  storageBucket: "project-7784170663557907192.appspot.com"
};
firebase.initializeApp(config);

var txtEMail = document.getElementById('login_email');
var txtPassword = document.getElementById("login_pass");
var btnLogin = document.getElementById("eventables-sign-in");
var btnLogout = document.getElementById("eventables-logout");

function login() {
  console.log("you just clicked the login button");
  $('#error-message').text("");
  $('#loading-icon').removeClass('hide');
  var email = txtEMail.value;
  var pass = txtPassword.value;
  var auth = firebase.auth();

  if (email.length < 4) {
    $('#error-message').text("Please enter a valid email");
    $('#loading-icon').addClass('hide');
    return;
  }
  if (pass.length < 4) {
    $('#error-message').text("Please enter a valid password");
    $('#loading-icon').addClass('hide');
    return;
  }

  auth.signInWithEmailAndPassword(email, pass).then(function () {
    $('#loading-icon').addClass('hide');
    $('.login_handles').hide();
    console.log("sucessful log in!");
    $('#eventables-sign-in').hide();
    $("#eventables-logout").show();
    $("#page-splash").hide();
    $("body").removeClass("noscroll");
  }, function (error) {
    // Errors on sign in.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      $('#error-message').text('Wrong password.');
    } else {
      $('#error-message').text(errorMessage);
    }
    console.log(error);
    if (error.message === "The email address is badly formatted") {
      $('#error-messgae').text("please enter a valid email");
    }
    console.log(error.message);
    $('#loading-icon').addClass('hide');
  });
}

function logout() {
  $('#loading-icon').removeClass('hide');
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    $("#page-splash").show();
    $('#loading-icon').addClass('hide');
    console.log("Sign out Successfull");
    $('.login_handles').show();
    $('#eventables-sign-in').show();
    $("#eventables-logout").hide();
  }, function (error) {
    console.log("failed to sign out \n here is what happend\n" + error);
    $('#error-message').text(error);
    $("#page-splash").show();
    $("body").addClass("noscroll");
    $("body").addClass("noscroll");
    $('#loading-icon').addClass('hide');
  });
}

function sendPasswordReset() {
  var email = document.getElementById('login_email').value;
  firebase.auth().sendPasswordResetEmail(email).then(function () {
    alert('Password Reset Email will be Sent to ' + email + 'in less than 5 minutes!');
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    $('#error-message').text(errorMessage);
    console.log(error);
  });
}

function writeNewPost() {
  var postTitle = $("input#new-post-title").val();
  var postSummary = $('#new-post-description').val();
  var postContent = $("#new-post-content").val();
  var active = $('.switch input:checked').val();
  var newPostImage = $('newPostImage').val()
  if (active == "on") {
    active = true;
  } else {
    active = false;
  }

  // A post entry.
  var featuredImage = localStorage.getItem('imageUploaded');
  var postData = {
    author: "Admin",
    title: postTitle,
    summary: postSummary,
    content: postContent,
    active: active,
    likes: 0,
    shares: 0,
    tags: [],
    featuredImage: featuredImage
  };

  firebase.database().ref('blog/').child('posts').push(postData);
  return false;
}

function displayBlogPosts() {
  var singlePost = '';
  firebase.database().ref('blog/').child('posts/').on('child_added', function (snap) {
    var postData = snap.val();
    var postKey = snap.key;
    currentFeaturedImage = firebase.storage().ref('blog/post_images'+postData.featuredImage);
    console.log(currentFeaturedImage);
    singlePost = '<div class="post col s12 m6 l6" id="' + postKey + '">';
    singlePost += '<div style="background-image:url(images/blog_batoul_table.jpg);background-size:cover" class="card center">';
    singlePost += '<div class="overlay white-text">';
    singlePost += '<span class="modify-post">';
    singlePost += '<span id="' + postKey + '" class="edit btn green waves-effect waves-light" title="edit"><i class="fa fa-pencil-square-o"></i></span>';
    singlePost += '<span id="' + postKey + '" class="delete btn red waves-effect waves-light" title="delete"><i class="fa fa-trash-o"></i></span>';
    singlePost += '</span>';
    singlePost += '<span class="post_tag"> Birthday </span>';
    singlePost += '<h3 class="post_title">' + postData.title + '</h3>';
    singlePost += '<div class="post_short">';
    singlePost += '<p>' + postData.summary + ' </p>';
    singlePost += '</div>';
    singlePost += '<button id="' + postKey + '" class="view_post blue btn waves-effect waves-light"><i class="fa fa-align-left"></i> &nbsp; View post </button>';
    singlePost += '<p class="post-details white-text">';
    singlePost += '</p>';
    singlePost += '</div>';
    singlePost += '</div>';
    singlePost += '</div>';
    $('#blog_posts').prepend(singlePost);
    if($('#blog_posts .post').length < 1){
      $('#loading_posts').html('<h2 class"center purple-text">Welcome! Let\'s get started by adding a new post</h2><p class="center flow-text">You can add a new post by clicking or tapping the pencil icon');
      $("#loading_posts").show();
    }
    $("#loading_posts").hide();
    $('.view_post').click(function (e) {
      var clickedPostId = e.currentTarget.id;
      firebase.database().ref('blog/').child('posts/' + clickedPostId).on('value', function (snap) {
        var currentPostValue = snap.val();
        console.log(currentPostValue);
        $('#blog-splash .title').text(currentPostValue.title);
        $('#blog-splash .content').text(currentPostValue.content);
        $('#blog-splash').removeClass('hide');
      });
    });
    $(".delete").click(function (e) {
      var clickedPostId = e.currentTarget.id;
      var sure = confirm("are you sure to delete this post?");
      if (sure) {
        firebase.database().ref('blog/').child('posts/' + clickedPostId).remove().then(function () {
          alert("post deleted!");
          $("#" + clickedPostId).fadeOut('slow');
        });
      }
    });
    $('.edit').click(function (e) {
      var clickedPostId = e.currentTarget.id;
      firebase.database().ref('blog/').child('posts/' + clickedPostId).on('value', function (snap) {
        var currentPostValue = snap.val();
        $('#post-title').val(currentPostValue.title);
        $('#post-description').val(currentPostValue.summary);
        $('#post-content').val(currentPostValue.content);
        $('.switch input:checked').val(currentPostValue.active);
        $('#editPost').openModal();
      });
      $('#submit-edited-post').click(function () {
        var postTitle = $("input#post-title").val();
        var postSummary = $('#post-description').val();
        var postContent = $("#post-content").val();
        var active = $('.switch input:checked').val();
        if (active == "on") {
          active = true;
        } else {
          active = false;
        }

        // console.log(postTitle,postSummary,postContent);
        // A post entry.
        var featuredImage = localStorage.getItem('imageUploaded');
        var postData = {
          author: "Admin",
          title: postTitle,
          summary: postSummary,
          content: postContent,
          active: active,
          likes: 0,
          shares: 0,
          tags: [],
          featuredImage: featuredImage
        };
        console.log(postData);

        $('#' + clickedPostId + '>.card>.overlay>.post_title').text(postData.title);
        $('#' + clickedPostId + '>.card>.overlay>.post_short>p').text(postData.summary);
        Materialize.updateTextFields();

        $('#editPost').closeModal();

        return firebase.database().ref('blog/').child('posts/' + clickedPostId).update(postData);
      });
    });
  });
}


function initApp() {
  $('#eventables-logout').hide();
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $("#page-splash").hide();
      var displayName = "Eventables Admin";
      var uid = user.uid;
      var refreshToken = user.refreshToken;
      $('#error-messgae').text('');
      $("#eventables-sign-in-status").text('logged in as Eventables Admin');
      $('#eventables-sign-in').hide();
      $('#eventables-logout').show('hide');
      $('.login_handles').hide();
    } else {
      $("#page-splash").show();
      $("body").addClass("noscroll");
      $("body").addClass("noscroll");
      $("#eventables-sign-in-status").text('Please login');
      $('.login_handles').show();
      $('#eventables-sign-in').show();
      $("#eventables-logout").hide();
    }

    document.getElementById('eventables-sign-in').addEventListener('click', login, false);
    document.getElementById('eventables-logout').addEventListener('click', logout, false);
    document.getElementById('eventables-password-reset').addEventListener('click', sendPasswordReset, false);
    $('#submit-post').click(function () {
      writeNewPost();
    });

    displayBlogPosts();
  });
}

$(document).ready(function () {
  initApp();
  tinymce.init({
        selector: 'textarea#new-post-content',  // change this value according to your HTML
        menubar: false
        // plugins: [
        // 'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
        // 'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
        // 'save table contextmenu directionality emoticons template paste textcolor'
        // ],
        // content_css: 'css/content.css',
        // toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons'
    });
});
$(window).load(function () {
  // handling file upload
  var fileButton = document.getElementById('newPostImage');
  fileButton.addEventListener('change', function (e) {
    $('#submit-post').html('<i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>uploading image');
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('blog/post_images/' + file.name);
    localStorage.setItem('imageUploaded', file.name);
    var task = storageRef.put(file);

    task.on('state_changed',

      function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        $('#uploader>.determinate').css('width', percentage + '%');
      },

      function error(err) {

      },

      function complete() {
        $('#submit-post').html('<i class="fa fa-send left"></i>Post ');
      }
    );
  });
  // handling file upload
});

// contact@eventables.com.ng