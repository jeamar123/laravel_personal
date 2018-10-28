$(document).ready(function() {
	new WOW().init();

	var headerHeight = $('#header-container').height();
	var bodysection = $( "#main-body-section" ).height();
	var one = headerHeight + $('#expertise-container').height();
	var two = one + $('#skillset-container').height();
	var three = two + $('#web-proj').height();
	var four = three + $('#mobile-proj').height();
	var footer = $('#footer-container').position().top;

  setTimeout(function() {
    $( '#main-body-loader' ).fadeOut();
  }, 3000);

  $(document).on('scroll', function() {
  	headerHeight = $('#header-container').height();
		bodysection = $( "#main-body-section" ).height();
		one = headerHeight + $('#expertise-container').height();
		two = one + $('#skillset-container').height();
		three = two + $('#web-proj').height();
		four = three + $('#mobile-proj').height();
		footer = $('#footer-container').position().top;
    
    if( $(this).scrollTop() >= ( headerHeight * .60 ) ){
      $(".sidenav-dots-container").fadeIn();
    }else{
    	$(".sidenav-dots-container").fadeOut();
    }

    if( $(this).scrollTop() <= one && two > $(this).scrollTop() ){
      $(".sidenav-ul li").removeClass('active');
      $(".sidenav-ul li:nth-child(2)").addClass('active');
    }else if( $(this).scrollTop() <= two && three > $(this).scrollTop() ){
      $(".sidenav-ul li").removeClass('active');
      $(".sidenav-ul li:nth-child(3)").addClass('active');
    }else if( $(this).scrollTop() <= three && four > $(this).scrollTop() ){
    	$(".sidenav-ul li").removeClass('active');
      $(".sidenav-ul li:nth-child(4)").addClass('active');
    }else if( $(this).scrollTop() <= four && footer > $(this).scrollTop() ){
    	$(".sidenav-ul li").removeClass('active');
      $(".sidenav-ul li:nth-child(5)").addClass('active');
    }else{
    	$(".sidenav-ul li").removeClass('active');
      $(".sidenav-ul li:nth-child(6)").addClass('active');
    }



    if( $(this).scrollTop() >= $('footer').position().top - 200 ){
      $('#backTop-container').show();   
    }else{
      $('#backTop-container').hide();
    }
  });

  $(document).on('click', 'a[href^="#"]', function(e) {
    var id = $(this).attr('href');
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }
    e.preventDefault();
    var pos = $id.offset().top;
    $('body, html').animate({scrollTop: pos},'slow');
  });

  if( $(window).width() > 640 ){

    $(document).scroll(function() {
      var pos = $(document).scrollTop();

      var parallax = parseInt(pos * -0.8) + 'px';
      var rgba     = ((pos / headerHeight) * .6 ) + .4;

      $('.header-box').css('margin-top', parallax);

      if( pos > headerHeight-20 ){
        $( "#logo-black" ).show();
        $( "#logo-white" ).hide();
      }else{
        $( "#logo-black" ).hide();
        $( "#logo-white" ).show();
      }

      if( pos == 0 ){
        $('.header-content').css('background-color', 'rgba(0,0,0,.3)');
      }else{
        $('.header-content').css('background-color', 'rgba(0,0,0,' + rgba);
      }
    });
  }

});