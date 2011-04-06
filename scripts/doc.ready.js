$(document).ready(function(){
  
  // set width of canvas
  var total = $('#intro').outerWidth() + $('#about').outerWidth() + $('#school').outerWidth(true) + $('#contact').outerWidth(true) + $('#awards').outerWidth(true) + $('#fun').outerWidth(true);
  $('#canvas').css({width: total });

  var emailaddress = 'ebuz' + '@' + 'bcs.rochester.edu';
  $('#email').append('<a href="mailto:'+emailaddress+'">'+emailaddress+'</a>');

  // nav
  $('ul.link li').click( function() {
    var ele = this.className;
    var p = $('#'+ele).offset();

    //scroll
    var x = $(window).width() - $('#'+ele).width();
    x = Math.ceil(x/2);
    x = p.left - x;
    $('html,body').animate({scrollLeft: x}, 1000);
  });
});
