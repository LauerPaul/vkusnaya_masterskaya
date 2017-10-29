var hh = $('header').height(),
	scroll,
	files_count = 0,
slide = function(t, s, o){
	switch(t) {
		case 'products':
			var obj = '.product-column';
			break;
		case 'feed':
			var obj = '.user-item';
			break;
		case 'ing':
			var obj = '.ing-item';
			break;
	}
	
	var active = $(obj + '.active'),
		ind = active.index(),
		lnth = $(obj).length;

	if(s == 'next' && !$(o).hasClass('disabled')) {
		if(ind + 1 <= lnth){
			active.removeClass('active');
			$($(obj)[ind + 1]).addClass('active');

			if(lnth == ind + 2){
				$(o).addClass('disabled').parent().find('.arrow-slide.left').removeClass('disabled');
			}else{$(o).parent().find('.arrow-slide.left').removeClass('disabled');}
		}
	}
	else if(s == 'prev' && !$(o).hasClass('disabled')){
		if(ind != 0){
			active.removeClass('active');
			$($(obj)[ind - 1]).addClass('active');

			if(0 == ind - 1){
				$(o).addClass('disabled').parent().find('.arrow-slide.right').removeClass('disabled');
			}else{$(o).parent().find('.arrow-slide.right').removeClass('disabled');}
		}
	}
};

$(document).on('scroll', function(){
	var st = $(document).scrollTop(),
		ft = $('footer').offset().top;

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
.on('click', '.btn-popup', function(){
	$('html').css({'overflow':'hidden'});
	$('.popup-wrapper').removeClass('hidden').show('slow');
	scroll = $('.popup-wrapper .wrapp').jScrollPane({
		// mouseWheelSpeed: 10
	}).data().jsp;
})
.on('click', '.popup-wrapper .close-btn', function(){
	$('html').css({'overflow':'auto'});
	$('.popup-wrapper').addClass('hidden');
	scroll.destroy()
})
.on('change', 'input[type=file]', function(){
	if (this.files[0]) {
		var fr = new FileReader(),
			img = $(this).val(),
			inp = '<input type="file" name="file_'+(files_count + 1)+'" class="d-none">';
	
		$('.input-group.w-600').append(inp);
		files_count += 1;

		inp = $('.input-group.w-600').find('input[name="file_' + files_count + '"]');
		inp.attr('value', img);

		if($(document).find('.prev-load').length < 4){
			fr.addEventListener("load", function () {
				$('.input-group.w-600').append('<div class="prev-load" data-id="file_'+files_count+'"><img src="'+ fr.result +'"></div>');
			}, false);
		}

		fr.readAsDataURL(this.files[0]);
		$(this).val('');
		setTimeout(function(){
			scroll = $('.popup-wrapper .wrapp').jScrollPane({
				// mouseWheelSpeed: 10
			}).data().jsp;
		}, 1000);
	}
})
.on('click', '.load-btn', function(e){
	 var $button = $(this).children('input[type="file"]');
    if (e.target !== $button[0]) {
        $button.click();
    }
})
.on('click', '.prev-load', function(){
	var id = $(this).attr('data-id');
	$(document).find('input[name="'+id+'"]').remove();
	$(this).remove();
	scroll = $('.popup-wrapper .wrapp').jScrollPane({
		// mouseWheelSpeed: 10
	}).data().jsp;
});