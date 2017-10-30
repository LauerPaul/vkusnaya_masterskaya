var hh = $('header').height(),
	scroll,
	files_count = 0,
slide = function(t, s, o){
	switch(t) {
		case 'products':
			var obj = 'products';
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
	if(obj != 'products'){
		if(s == 'next' && !$(o).hasClass('disabled')) {
			if(ind + 1 != lnth){
				active.removeClass('active');
				$($(obj)[ind + 1]).addClass('active');
				$(o).parent().find('.arrow-slide.left').removeClass('disabled');
			} else {
				active.removeClass('active');
				$($(obj)[0]).addClass('active');
			}
		}
		else if(s == 'prev' && !$(o).hasClass('disabled')){
			if(ind != 0){
				active.removeClass('active');
				$($(obj)[ind - 1]).addClass('active');
			}else {
				active.removeClass('active');
				$($(obj)[lnth - 1]).addClass('active');
			}
		}
	}else{
		products.slide(o, s);
	}
},
products = {
	init: function(){
		var pro = $('.product-column'),
			products_l = pro.length,
			pro_w = pro.width(),
			wrap_w = products_l * pro_w;

		$('.wrapper-product').css('width', wrap_w);
	},
	slide: function(o, s){
		console.log('products slide');
		var pro = $('.product-column'),
			pro_w = pro.width(),
			products_l = pro.length,
			wrap_w = products_l * pro_w;
			margin = $('.wrapper-product').css('margin-left');

			if($(window).width() < 1879){
				var size = -wrap_w + (pro_w);
			}else{
				var size = -wrap_w + (pro_w * 2);
			}

		if(s == 'next' && !$(o).hasClass('disabled')) {
			$(o).parent().find('.arrow-slide.left').removeClass('disabled');
			if(size < parseInt(margin) - parseInt(pro_w)){
				$('.wrapper-product').animate({'margin-left': parseInt(margin) - parseInt(pro_w)});
			}
			else {
				$('.wrapper-product').animate({'margin-left': 0});
			}
		}
		else if(s == 'prev' && !$(o).hasClass('disabled')){
			if((parseInt(margin) + parseInt(pro_w) - parseInt(pro_w)) < 0){
				$('.wrapper-product').animate({'margin-left': parseInt(margin) + parseInt(pro_w)});
			}
			else {
				$('.wrapper-product').animate({'margin-left': size + pro_w});
			}
		}
	}
},
form_submit = function(obj){
	var serialize = $(obj).serialize();

	$.ajax({
		url: '/send.php',
		type: 'POST',
		dataType: 'json',
		data: serialize,
		success: function(data){
			if(data == 'SENDED') {
				console.log('test');	
			}
		},
		error: function(er_log){
			console.log(er_log);
		}
	});		
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
.on('submit', 'form#feed', function(e){
	e.preventDefault();
	e.stopPropagation();
	form_submit(this);
})
// .on('click', '.btn-popup', function(){
// 	$('html').css({'overflow':'hidden'});
// 	$('.popup-wrapper').removeClass('hidden').show('slow');
// 	scroll = $('.popup-wrapper .wrapp').jScrollPane({
// 		// mouseWheelSpeed: 10
// 	}).data().jsp;
// })
// .on('click', '.popup-wrapper .close-btn', function(){
// 	$('html').css({'overflow':'auto'});
// 	$('.popup-wrapper').addClass('hidden');
// 	scroll.destroy()
// })
.on('change', 'input[type=file]', function(){
	if (this.files[0]) {
		var form_data = new FormData($('form').get(0)),
			folder = localStorage.getItem('folder');
			console.log(folder);
			// form_data = form_data.append('folder', folder);
		$.ajax({
			url: '/load.php',
			type: 'POST',
			dataType: 'json',
			data: form_data,
			cache:false,
			processData: false,
	        contentType: false,
			success: function(data){
				if($(document).find('.prev-load').length < 4){
					var a = data.replace('/home/zakaztortov/public_html/', 'http://zakaz-tortov.com.ua/');
					$('.input-group.w-600').append('<div class="prev-load" ><img src="'+ a +'"></div>');
					$('input[name="files"]').val($('input[name="files"]').val() + a + ';');
					console.log($('input[name="files"]').val());
				}
			},
			error: function(er_log){
				console.log(er_log);
			}
		});
	}
})
.on('click', '.load-btn', function(e){
	 var $button = $(this).children('input[type="file"]');
    if (e.target !== $button[0]) {
        $button.click();
    }
})
.on('click', '.prev-load', function(){
	var id = $(this).find('img').attr('src');
	$(this).remove();

	// $.ajax({
	// 	url: '/load.php',
	// 	type: 'POST',
	// 	dataType: 'json',
	// 	data: form_data,
	// 	cache:false,
	// 	processData: false,
 //        contentType: false,
	// 	success: function(data){
	// 		if($(document).find('.prev-load').length < 4){
	// 			var a = data.replace('/home/zakaztortov/public_html/', 'http://zakaz-tortov.com.ua/');
	// 			$('.input-group.w-600').append('<div class="prev-load" ><img src="'+ a +'"></div>');
	// 		}
	// 	},
	// 	error: function(er_log){
	// 		console.log(er_log);
	// 	}
	// });
})
.ready(function(){
	if(localStorage.getItem('folder') == null || localStorage.getItem('folder') == ''){
		var R = Math.random() * (4000456000 - 456000) + 456000;
		localStorage.setItem('folder', R);
	}
	products.init();
});

$(window).resize(function(){
	products.init();
	$('.wrapper-product').animate({'margin-left': 0});
})