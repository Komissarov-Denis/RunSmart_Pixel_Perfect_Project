// window.addEventListener('DOMContentLoaded', () => {
//     const menu = document.querySelector('.promo_header_hamburger-box-menu_menu_list'),
//     menuItem = document.querySelectorAll('.promo_header_hamburger-box-menu_menu_list_item'),
//     hamburger = document.querySelector('.promo_header_hamburger-box-menu_hamburger');

//     hamburger.addEventListener('click', () => {
//         hamburger.classList.toggle('promo_header_hamburger-box-menu_hamburger_active');
//         menu.classList.toggle('promo_header_hamburger-box-menu_menu_list_active');
//     });

//     menuItem.forEach(item => {
//         item.addEventListener('click', () => {
//             hamburger.classList.toggle('promo_header_hamburger-box-menu_hamburger_active');
//             menu.classList.toggle('promo_header_hamburger-box-menu_menu_list_active');
//         })
//     })
// });

//карусель
$(document).ready(function(){
	$('.carousel__inner-wrapper').slick({
		// dots: true,
		// infinite: true,
		speed: 1000,
		slidesToShow: 1,
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 3000,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel/arrow_left.png" alt="arrow_left"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/arrow_right.png" alt="arrow_right"></button>',
		responsive: [{
			breakpoint: 991.98,
			settings: {
				dots: true,
				arrows: false
			}
		}]
	});


	//каталог - табы
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	//каталог - слайдер
	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};
	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__list-link');


	//modal-window  $('')-получаем данные документа по атрибуту
	$('[data-modal=consultation]').on('click', function() {
		$('.modal-window__overlay, #consultation').fadeIn('slow');
		$('[data-modal=consultation]').fadeOut('slow');
	});
	$('.modal-window__close').on('click', function() {
		$('.modal-window__overlay, #consultation, #order, #thanks').fadeOut('slow');
		$('[data-modal=consultation]').fadeIn('slow');
		$('.button_mini').fadeIn('slow');
	});
	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal-window__description').text($('.catalog-item__subtitle').eq(i).text());
			$('.modal-window__overlay, #order').fadeIn('slow');
			$('.button_mini').fadeOut('slow');
		});
	});

	//валидация форм
	function validateForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 3
				},
				phone: 'required',
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите своё имя!",
					minlength: jQuery.validator.format("Введите {0} символа!")
				},
				phone: "Пожалуйста, введите свой номер телефона!",
				email: {
				  required: "Пожалуйста, введите свою почту!",
				  email: "Неправильно введен адрес почты!"
				}
			}
		});
	};
	validateForms('#main-form');
	validateForms('#consultation');
	validateForms('#order');

	//маска формы номера телефона
	$('input[name=phone]').mask('+7(999) 999-99-99');

	//отправка формы
	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: 'mailer/smart.php',
			data: $(this).serialize()
		}).done(function() {
			$(this).find('input').val('');
			$('#consultation, #order, #main-form').fadeOut();
			$('.modal-window__overlay, #thanks').fadeIn('slow');
			$('form').trigger('reset');
		});
		return false;
	});

});