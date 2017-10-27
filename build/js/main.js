var hh = $('header').height();
$(document).on('scroll', function(){
	var st = $(document).scrollTop(),
		ft = $('footer').offset().top;

		console.log(st+$(window).outerHeight());
		console.log(ft);
	if(st > 50){
		$('header').addClass('scroll');
		
		if(st+$(window).outerHeight() >= ft){
			$('header').addClass('hide');
		}
		else {
			$('header').removeClass('hide');
		}
	}
	else{
		$('header').removeClass('scroll hide');
	}
})