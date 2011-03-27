$(document).ready(function(){

	// ALIGN CANVAS IN THE CENTER OF THE SCREEN
	var topY = ($(window).height() - 500) / 2;
	if( topY-50 < 0 ) { topY = 50; }
	else { topY -= 8; }
	
	$('#canvas').css({ top : topY });
	$('#return').css({ top : topY-40 }).fadeTo(2500,0.5);

	// SET WIDTH OF CANVAS
	var total = $('#header').outerWidth() + $('#work').outerWidth() + $('#display').outerWidth() + $('#about').outerWidth() + $('.end').outerWidth() + 110;
	$('#canvas').css({ width : total });

	// insert email address
        var emailaddress = 'hello' + '@' + 'ifekt.net';
        $('.email').append('<a href="mailto:'+emailaddress+'">'+emailaddress+'</a>');


	// IMAGE SLIDESHOWS
	var y = 0; // background position
	var interval; // interval function

	$('#bookmarks,#skua,#delaney,#egypt,#greece,#russian,#cassis_logos,#newborn,#china').hover(
		// MOUSEOVER
		function() {
			var d = this.id;
			y = $( '#'+d+' img:first' ).css('top'); // find the the current position of the image
			y = parseFloat(y); // filter out any letters
			y = Math.ceil((y/470)) * 470; // make sure the slide fits exactly in the frame, makes sure it is a factor of 470
			y -= 470; // subtract amount of first move

			var max = -$( '#'+d+' img:first' ).height(); // maximum image movement
			if( y <= max ) { y = 0; }

			$( '#'+d+' img:first' ).animate({ top: y },400); // slide the background on first entering the frame

			interval = setInterval( // slide the background on a set interval
				function () {
					y -= 470; // height of one image, background image contains all images stacked
					if( y <= max ) { y = 0; }
					$( '#'+d+' img:first' ).animate({ top: y },400);
				},
				1400 // interval time
			);
		},
		// MOUSEOUT
		// by clearing interval, stops cycle but finishes animation
		function(){ clearInterval(interval); }
	);


	// SHOW PIECE INFORMATION
	$('.more').toggle(
		function(){
			var d = $( this ).parent().get(0).id;
			$( '#'+d+' .more' ).attr('src','images/info_less.png');
			var infoY = -$( '#'+d+' .info' ).outerHeight();
			$( '#'+d+' .info' ).css({ top : infoY }).css({ display : 'block' }).animate({ top : '0px' },300);
		},
		function(){
			var d = $( this ).parent().get(0).id;
			$( '#'+d+' .more' ).attr('src','images/info_more.png');
			var infoY = -$( '#'+d+' .info' ).outerHeight();
			$( '#'+d+' .info' ).animate({ top : infoY },300);
		}
	);



	// ----- INTERNAL NAVIGATION

	// Work links, Information
	// scroll to view each piece, link.className = piece.idName
	$('ul.link li[class!="all"]').click( function() {
		var ele = this.className;
		var p = $('#'+ele).offset();

		// scroll to align piece center
		var x = $(window).width() - $('#'+ele).width();
		x = Math.ceil( x / 2 );
		x = p.left - x;

		// DISPLAY POINTERS, do not display on about or inquiry
		if(ele != 'inquiry' && ele != 'about') {
			$('html,body').animate({scrollLeft: x}, 1000);
			x = ($('#'+ele).width()/2) + p.left - 15; // 15 is half of the pointer width
			var y = parseFloat( $('#canvas').css('top') ) - 35; // 25 height of pointer, 10 padding
			var y2 = y + 510 + 35; // y plus canvas height and padding plus cancel out the y alignment
			$('#pointer').css({top:y}).animate({left:x},1100).fadeIn(1000).fadeTo(500,1.0).fadeOut(1000); // the fadeTo is merely a pause
			$('#pointer2').css({top:y2}).animate({left:x},1100).fadeIn(1000).fadeTo(500,1.0).fadeOut(1000); // the fadeTo is merely a pause
		}
		else if(ele == 'about') {
			$('html,body').animate({scrollLeft: x+37}, 1000);
		}
		else {
			$('html,body').animate({scrollLeft: p.left}, 1000);
		}
	});

	// Browse All
	$('li.all').click( function() {
		var p = $('.piece:last').offset(); // detects last piece in display div
		p = p.left - ($(window).width() - $('.piece:last').width()) + 17 + 75; // the end of the display div with padding
		$('html,body').animate({scrollLeft: p}, 28000);
	});

	// return left
	$('#return').hover(
		function() { $('#return').stop().fadeTo(100,1.0).animate({ marginRight: -4 },200); },
		function() { $('#return').stop().animate({ marginRight: -70 },200).fadeTo(2500,0.5); }
	);
	$('#return').click( function() {
		$('html,body').stop().animate({scrollLeft: '0'}, 1000);
	});



	// CUSTOM DRAG SCROLLER

	var padding = 110;
	var intX = null;
	var once = 0;
	
	$('#canvas').mousedown( function( event ) {
		$('html,body').stop(); // for stopping browse animation
		intX = event.pageX;
		return false; // disabled selection
	});

	$(document).mousemove( function( event ) {
		if( intX !== null ) {
			var moveX = $(window).scrollLeft() + -(event.pageX - intX); // scrolling mathematics
			$(window).scrollLeft(moveX); // scroll the site

			// scroll past left edge by moving canvas
			if($(window).scrollLeft() == 0 ){
				if(!once){
					intX = event.pageX;
					once = 1;
				}
				$('#canvas').css({ left: padding+-moveX });
			}

			$(this).css({ 'MozUserSelect' : 'none' }); // should disable selection in Firefox Win
			return false; // disables selection in Safari Mac, Firefox Mac, IE7
		}
	});

	$(document).mouseup( function( event ) {
		if( intX !== null ) {
			once = 0;
			intX = null;
			
			// reset canvas position is it was moved
			if( parseFloat($('#canvas').css('left')) !== padding ){
				$('#canvas').animate({ left: padding },500);
			}
			
		}
	});



	// Enable selection of important elements
	// select, option, and button have not been tested
	$('input, select, option, label, textarea, button').mousedown( function(){
		$( this ).focus();
	});


});
