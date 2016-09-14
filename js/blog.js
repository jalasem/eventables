$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC7X--ndbMggSIgeg8dTfHvHLodUcExRoM",
    authDomain: "eventables.firebaseapp.com",
    databaseURL: "https://eventables.firebaseio.com",
    storageBucket: "project-7784170663557907192.appspot.com",
  };
  firebase.initializeApp(config);

  displayBlogPosts();

});

function displayBlogPosts() {
  var singlePost = '';

  firebase.database().ref('blog/').child('posts/').on('child_added', function (snap) {
    var postData = snap.val();
    var postKey = snap.key;
    singlePost = '<div class="post col s12 m6 l6" id="' + postKey + '">';
    singlePost += '<div style="background-image:url(images/blog_batoul_table.jpg);background-size:cover" class="card center">';
    singlePost += '<div class="overlay white-text">';
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
    $("#loading_posts").hide();
    $('.view_post').click(function (e) {
      var clickedPostId = e.currentTarget.id;
      firebase.database().ref('blog/').child('posts/' + clickedPostId).on('value', function (snap) {
        var currentPostValue = snap.val();
        $('#blog-splash .title').text(currentPostValue.title);
        $('#blog-splash .content').text(currentPostValue.content);
        $('#blog-splash').removeClass('hide');
      });
    });
  });
}