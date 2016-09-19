$.fn.extend({
  animateCss: function (animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(this).addClass('animated ' + animationName).one(animationEnd, function () {
      $(this).removeClass('animated ' + animationName);
    });
  }
});
$(function () {
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

$(document).ready(function () {
  // $('#yourElement').animateCss('bounce');
  $('.button-collapse').sideNav({
    menuWidth: 250, // Default is 240
    edge: 'left',
    closeOnClick: true
  }
  );
  $('.collapsible').collapsible();
  $('nav.purple.accent-3').pushpin({ top: $('nav.purple.accent-3').offset().top });
  $('.fixed-action-btn').openFAB();
  $(document).ready(function () {
    $('.modal-trigger').leanModal();
  });
  $("#blog-splash .close").click(function () {
    $('#blog-splash').addClass('hide');
  });
});
$(document).ready(function () {
  $('.slider').slider({ height:580 });
});
