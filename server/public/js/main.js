var eventListeners = (function () {
    var init = function () {
        _setUpListeners();
    };
    
    var _setUpListeners = function () {
        $('#toggle').on('click', _toggleNav);
        $('.angle-down').on('click', _angleDownScroll);
        $('.angle-up').on('click', _angleUpScroll);
        $('.auth__toggle-btn').on('click',_logIn);
        $('.btn-home').on('click',_home);
        $('.swipe-overlay').on('click', _swipe);
        $('.swipe').on('click', _swipe);
        $('.slider__arrow-down').on('click', _sliderPrev);
        $('.slider__arrow-up').on('click', _sliderNext);
    };

    // NAVigation
    var _toggleNav = function(ev) {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
    };

    //angle-down
    var _angleDownScroll = function (ev){
        var height = $(window).height();
        $('html,body').animate({scrollTop: height}, 500);
    };

    //angle-up
    var _angleUpScroll = function (ev){
        $('html,body').animate({scrollTop: 0}, 500);
    };

    //log in toggle
    var _logIn = function (ev) {
        $('.auth__toggle-btn').css('visibility','hidden');
        $('.welcome__menu').css('transform','rotateY(180deg)');
    };

    //home toggle
    var _home = function (ev) {
        $('.auth__toggle-btn').css('visibility','visible');
        $('.welcome__menu').css('transform','rotateY(0deg)');
    };

    //blog_swipe_sidebar
    var _swipe = function (ev) {
        $('.sidebar').toggleClass('sidebar-open');
    }

    //slider previous work
    var $slider_list_reverse = $('.slider__list__small-reverse');
    var $slider_list_straight = $('.slider__list__small-straight');
    var $slider_list_big = $('.slider__list__big');
    var $work__desc__list = $('.work__desc__list');

    var _sliderPrev = function (ev) {
        // $('.slider__list__small-straight').css('transform','translateY(-100%)');
        // $('.slider__list__small-reverse').css('transform','translateY(0%)');
        $slider_list_reverse.children().first().insertAfter($slider_list_reverse.children().last());
        $slider_list_straight.children().last().insertBefore($slider_list_straight.children().first());
        $slider_list_big.children().last().insertBefore($slider_list_big.children().first());
        $work__desc__list.children().last().insertBefore($work__desc__list.children().first());


    }

    //slider next work
    var _sliderNext = function (ev) {
        // $('.slider__list__small-reverse').css('transform','translateY(-100%)');
        // $('.slider__list__small-straight').css('transform','translateY(0%)');
        $slider_list_straight.children().first().insertAfter($slider_list_straight.children().last());
        $slider_list_reverse.children().last().insertBefore($slider_list_reverse.children().first());
        $slider_list_big.children().first().insertAfter($slider_list_big.children().last());
        $work__desc__list.children().first().insertAfter($work__desc__list.children().last());

    }



    return {
            init: init
        };

})();

eventListeners.init();



/**
 * Created by Alexey on 09-Dec-16.
 */
//SVG animated circle levels
(function () {
    var isRendered = 0;
    var skillCirclesObj = [];
    $.each($('.skill-circle'), function (ind, val) {
        var circleBottom = $(this).height() + $(this).offset().top;
        skillCirclesObj.push({
            circle: val,
            circleBottom: circleBottom,
            isRendered: false
        })
        isRendered++;
        console.log('1 '+ isRendered);
    })

    var skillCircleSet = function (ev) {
        var scrollBottom = $(window).scrollTop() + $(window).height();
        console.log(scrollBottom);
        console.log('4 '+isRendered);
        $.each(skillCirclesObj, function (ind, val) {
            if (!val['isRendered'] && scrollBottom > val['circleBottom']) {
                var $circle = $(val['circle']);
                var $circleLevel = $circle.attr('data-level');
                var $circleBar = $circle.children('.circle-bar');
                var $calcCircleLevel = ($circleBar.css('stroke-dashoffset').slice(0, -2)) * (100 - $circleLevel) / 100;
                $circleBar.css('stroke-dashoffset', $calcCircleLevel);
                val['isRendered'] = true;
                isRendered--;
            }
        });
        if (isRendered<=0){
            //shutdown eventListener
            $(window).off('scroll', skillCircleSet);
        }
    };

    if (isRendered > 0) {
        $(window).on('scroll', skillCircleSet);
    };

})();
var validation = (function () {
    var init = function () {
        _setUpListeners();
    },

        validateForm = function (form) {
            var elements = form.find('input, textarea').not('input[type="hidden"]'),
                valid = true;

            $.each(elements, function (index, element) {
                var $element = $(element),
                    value = $element.val();

                if(!value.length){
                    _addError($element);
                    valid = false;
                    console.log($element);
                }
            });

            return valid;
        },

        _setUpListeners = function () {
            $('form').on('keydown', '.has-error', _removeError);
            $('form').on('click', '.has-error', _removeError);
        },

        _addError = function (element) {
            element.addClass('has-error');
        },

        _removeError = function () {
            $(this).removeClass('has-error');
        },

        _clearForm = function (ev) {
            
        };

    return {
        init: init,
        validateForm: validateForm
    };

})();

validation.init();
var aChildren = $(".sidebar__list li").children(); // find the a children of the list items
var aArray = []; // create the empty aArray
for (var i=0; i < aChildren.length; i++) {
    var aChild = aChildren[i];
    var ahref = $(aChild).attr('href');
    aArray.push(ahref);
} // this for loop fills the aArray with attribute href values

$(window).scroll(function(){
    var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
    var windowHeight = $(window).height(); // get the height of the window
    var docHeight = $(document).height();

    for (var i=0; i < aArray.length; i++) {
        var theID = aArray[i];
        var divPos = $(theID).offset().top; // get the offset of the div from the top of page
        var divHeight = $(theID).height(); // get the height of the div in question
        if (windowPos +40 >= divPos && windowPos < (divPos + divHeight)) {
            $("a[href='" + theID + "']").parent().addClass("sidebar__item-active");
        } else {
            $("a[href='" + theID + "']").parent().removeClass("sidebar__item-active");
        }
    }
});
//
//Mouse parallax

var layer = $('.parallax').find('.parallax__layer');
$(window).on('mousemove', function (ev) {
    var mouseX = ev.pageX,
        mouseY = ev.pageY,
        wFromCenter = window.innerWidth/2 - mouseX,
        hFromCenter = window.innerHeight/2 - mouseY;

    layer.map(function (key, value) {
        var widthShift = wFromCenter * ((key + 1)/100);
        var heightShift = hFromCenter * ((key + 1)/100);
        $(value).css({
            'transform':'translate3d(' + widthShift + 'px, ' + heightShift + 'px, 0px)'
        });
    })
});
//
// PARALLAX SCROLL
var parallax = (function(){
    var bg = $('.header__bg'),
        user = $('.avatar'),
        sectionText = $('.header__bg-text-img');

    return {
        move : function (block, windowScroll, strafeAmount) {
            var strafe = windowScroll / -strafeAmount + '%',
                transformString = 'translate3d(0,' + strafe + ', 0)';

            block.css({
                'transform' : transformString,
                '-webkit-transform' : transformString
            });
        },

        init : function (wScroll) {
            this.move(bg, wScroll, 45);
            this.move(sectionText, wScroll, 8);
            this.move(user, wScroll, 5);
        }
    }
}());

$(window).scroll(function(){
    var wScroll = $(window).scrollTop();
    parallax.init(wScroll);
}); // -> scroll_end;
//preloader
$(function () {

    var imgs = [];

    $.each($('*'), function () {
        var
            $this = $(this),
            backgrounds = $this.css('background-image').split(','),
            img = $this.is('img');

        if (backgrounds != 'none') {
            $.each(backgrounds, function (index, background) {
                var path = background.replace('url("', '').replace('")', '');
                imgs.push(path);
            })
        }

        if (img) {
            var path = $this.attr('src');

            if (path) {
                imgs.push(path);
            }
        }
    });
    var percentsTotal = 1;

    for (var i = 0; i < imgs.length; i++) {
        var image = $('<img>', {
            attr: {
                src: imgs[i]
            }
        });

        image.on({
            load : function () {
                setPercents(imgs.length, percentsTotal);
                percentsTotal++;
            },

            error : function () {
                setPercents(imgs.length, percentsTotal);
                percentsTotal++;
            }
        });
    }

    function setPercents(total, current) {
        var percent = Math.ceil(current / total * 100);

        if (percent >= 100) {
            $('.preloader').fadeOut();
        }

        $('.preloader__percents').text(percent + '%');
    }
});

$(function() {
    $('a[href*="#"]:not([href="#"])').on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });
});
(function () {
    var my = {};

    addListener();

    function addListener() {
        $('form').on('submit', submitForm)
    }

    function submitForm(ev) {

        var $form = $(this),
            url='',
            defObject   = ajaxForm($form, url);

        ev.preventDefault();
    }
    
    function ajaxForm(form, url) {
        if(!validation.validateForm(form)){
            return false;
        }
    }

})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNpcmNsZVNraWxsLmpzIiwiZm9ybVZhbGlkYXRpb24uanMiLCJoaWdobGlnaHRTaWRlYmFyLmpzIiwicGFyYWxsYXhNb3VzZS5qcyIsInBhcmFsbGF4U2Nyb2xsLmpzIiwicHJlbG9hZGVyLmpzIiwic2xpZGVyQ29vbC5qcyIsInNtb290aFNjcm9sbC5qcyIsInN1Ym1pdENhdGNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZXZlbnRMaXN0ZW5lcnMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJyN0b2dnbGUnKS5vbignY2xpY2snLCBfdG9nZ2xlTmF2KTtcclxuICAgICAgICAkKCcuYW5nbGUtZG93bicpLm9uKCdjbGljaycsIF9hbmdsZURvd25TY3JvbGwpO1xyXG4gICAgICAgICQoJy5hbmdsZS11cCcpLm9uKCdjbGljaycsIF9hbmdsZVVwU2Nyb2xsKTtcclxuICAgICAgICAkKCcuYXV0aF9fdG9nZ2xlLWJ0bicpLm9uKCdjbGljaycsX2xvZ0luKTtcclxuICAgICAgICAkKCcuYnRuLWhvbWUnKS5vbignY2xpY2snLF9ob21lKTtcclxuICAgICAgICAkKCcuc3dpcGUtb3ZlcmxheScpLm9uKCdjbGljaycsIF9zd2lwZSk7XHJcbiAgICAgICAgJCgnLnN3aXBlJykub24oJ2NsaWNrJywgX3N3aXBlKTtcclxuICAgICAgICAkKCcuc2xpZGVyX19hcnJvdy1kb3duJykub24oJ2NsaWNrJywgX3NsaWRlclByZXYpO1xyXG4gICAgICAgICQoJy5zbGlkZXJfX2Fycm93LXVwJykub24oJ2NsaWNrJywgX3NsaWRlck5leHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBOQVZpZ2F0aW9uXHJcbiAgICB2YXIgX3RvZ2dsZU5hdiA9IGZ1bmN0aW9uKGV2KSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnI292ZXJsYXknKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2FuZ2xlLWRvd25cclxuICAgIHZhciBfYW5nbGVEb3duU2Nyb2xsID0gZnVuY3Rpb24gKGV2KXtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgICQoJ2h0bWwsYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogaGVpZ2h0fSwgNTAwKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9hbmdsZS11cFxyXG4gICAgdmFyIF9hbmdsZVVwU2Nyb2xsID0gZnVuY3Rpb24gKGV2KXtcclxuICAgICAgICAkKCdodG1sLGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCA1MDApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2xvZyBpbiB0b2dnbGVcclxuICAgIHZhciBfbG9nSW4gPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAkKCcuYXV0aF9fdG9nZ2xlLWJ0bicpLmNzcygndmlzaWJpbGl0eScsJ2hpZGRlbicpO1xyXG4gICAgICAgICQoJy53ZWxjb21lX19tZW51JykuY3NzKCd0cmFuc2Zvcm0nLCdyb3RhdGVZKDE4MGRlZyknKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9ob21lIHRvZ2dsZVxyXG4gICAgdmFyIF9ob21lID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJCgnLmF1dGhfX3RvZ2dsZS1idG4nKS5jc3MoJ3Zpc2liaWxpdHknLCd2aXNpYmxlJyk7XHJcbiAgICAgICAgJCgnLndlbGNvbWVfX21lbnUnKS5jc3MoJ3RyYW5zZm9ybScsJ3JvdGF0ZVkoMGRlZyknKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9ibG9nX3N3aXBlX3NpZGViYXJcclxuICAgIHZhciBfc3dpcGUgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAkKCcuc2lkZWJhcicpLnRvZ2dsZUNsYXNzKCdzaWRlYmFyLW9wZW4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3NsaWRlciBwcmV2aW91cyB3b3JrXHJcbiAgICB2YXIgJHNsaWRlcl9saXN0X3JldmVyc2UgPSAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1yZXZlcnNlJyk7XHJcbiAgICB2YXIgJHNsaWRlcl9saXN0X3N0cmFpZ2h0ID0gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtc3RyYWlnaHQnKTtcclxuICAgIHZhciAkc2xpZGVyX2xpc3RfYmlnID0gJCgnLnNsaWRlcl9fbGlzdF9fYmlnJyk7XHJcbiAgICB2YXIgJHdvcmtfX2Rlc2NfX2xpc3QgPSAkKCcud29ya19fZGVzY19fbGlzdCcpO1xyXG5cclxuICAgIHZhciBfc2xpZGVyUHJldiA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIC8vICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXN0cmFpZ2h0JykuY3NzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGVZKC0xMDAlKScpO1xyXG4gICAgICAgIC8vICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXJldmVyc2UnKS5jc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZVkoMCUpJyk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X3JldmVyc2UuY2hpbGRyZW4oKS5maXJzdCgpLmluc2VydEFmdGVyKCRzbGlkZXJfbGlzdF9yZXZlcnNlLmNoaWxkcmVuKCkubGFzdCgpKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3Rfc3RyYWlnaHQuY2hpbGRyZW4oKS5sYXN0KCkuaW5zZXJ0QmVmb3JlKCRzbGlkZXJfbGlzdF9zdHJhaWdodC5jaGlsZHJlbigpLmZpcnN0KCkpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9iaWcuY2hpbGRyZW4oKS5sYXN0KCkuaW5zZXJ0QmVmb3JlKCRzbGlkZXJfbGlzdF9iaWcuY2hpbGRyZW4oKS5maXJzdCgpKTtcclxuICAgICAgICAkd29ya19fZGVzY19fbGlzdC5jaGlsZHJlbigpLmxhc3QoKS5pbnNlcnRCZWZvcmUoJHdvcmtfX2Rlc2NfX2xpc3QuY2hpbGRyZW4oKS5maXJzdCgpKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vc2xpZGVyIG5leHQgd29ya1xyXG4gICAgdmFyIF9zbGlkZXJOZXh0ID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgLy8gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtcmV2ZXJzZScpLmNzcygndHJhbnNmb3JtJywndHJhbnNsYXRlWSgtMTAwJSknKTtcclxuICAgICAgICAvLyAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1zdHJhaWdodCcpLmNzcygndHJhbnNmb3JtJywndHJhbnNsYXRlWSgwJSknKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3Rfc3RyYWlnaHQuY2hpbGRyZW4oKS5maXJzdCgpLmluc2VydEFmdGVyKCRzbGlkZXJfbGlzdF9zdHJhaWdodC5jaGlsZHJlbigpLmxhc3QoKSk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X3JldmVyc2UuY2hpbGRyZW4oKS5sYXN0KCkuaW5zZXJ0QmVmb3JlKCRzbGlkZXJfbGlzdF9yZXZlcnNlLmNoaWxkcmVuKCkuZmlyc3QoKSk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X2JpZy5jaGlsZHJlbigpLmZpcnN0KCkuaW5zZXJ0QWZ0ZXIoJHNsaWRlcl9saXN0X2JpZy5jaGlsZHJlbigpLmxhc3QoKSk7XHJcbiAgICAgICAgJHdvcmtfX2Rlc2NfX2xpc3QuY2hpbGRyZW4oKS5maXJzdCgpLmluc2VydEFmdGVyKCR3b3JrX19kZXNjX19saXN0LmNoaWxkcmVuKCkubGFzdCgpKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0OiBpbml0XHJcbiAgICAgICAgfTtcclxuXHJcbn0pKCk7XHJcblxyXG5ldmVudExpc3RlbmVycy5pbml0KCk7XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQWxleGV5IG9uIDA5LURlYy0xNi5cclxuICovXHJcbi8vU1ZHIGFuaW1hdGVkIGNpcmNsZSBsZXZlbHNcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpc1JlbmRlcmVkID0gMDtcclxuICAgIHZhciBza2lsbENpcmNsZXNPYmogPSBbXTtcclxuICAgICQuZWFjaCgkKCcuc2tpbGwtY2lyY2xlJyksIGZ1bmN0aW9uIChpbmQsIHZhbCkge1xyXG4gICAgICAgIHZhciBjaXJjbGVCb3R0b20gPSAkKHRoaXMpLmhlaWdodCgpICsgJCh0aGlzKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgc2tpbGxDaXJjbGVzT2JqLnB1c2goe1xyXG4gICAgICAgICAgICBjaXJjbGU6IHZhbCxcclxuICAgICAgICAgICAgY2lyY2xlQm90dG9tOiBjaXJjbGVCb3R0b20sXHJcbiAgICAgICAgICAgIGlzUmVuZGVyZWQ6IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpc1JlbmRlcmVkKys7XHJcbiAgICAgICAgY29uc29sZS5sb2coJzEgJysgaXNSZW5kZXJlZCk7XHJcbiAgICB9KVxyXG5cclxuICAgIHZhciBza2lsbENpcmNsZVNldCA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIHZhciBzY3JvbGxCb3R0b20gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2Nyb2xsQm90dG9tKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnNCAnK2lzUmVuZGVyZWQpO1xyXG4gICAgICAgICQuZWFjaChza2lsbENpcmNsZXNPYmosIGZ1bmN0aW9uIChpbmQsIHZhbCkge1xyXG4gICAgICAgICAgICBpZiAoIXZhbFsnaXNSZW5kZXJlZCddICYmIHNjcm9sbEJvdHRvbSA+IHZhbFsnY2lyY2xlQm90dG9tJ10pIHtcclxuICAgICAgICAgICAgICAgIHZhciAkY2lyY2xlID0gJCh2YWxbJ2NpcmNsZSddKTtcclxuICAgICAgICAgICAgICAgIHZhciAkY2lyY2xlTGV2ZWwgPSAkY2lyY2xlLmF0dHIoJ2RhdGEtbGV2ZWwnKTtcclxuICAgICAgICAgICAgICAgIHZhciAkY2lyY2xlQmFyID0gJGNpcmNsZS5jaGlsZHJlbignLmNpcmNsZS1iYXInKTtcclxuICAgICAgICAgICAgICAgIHZhciAkY2FsY0NpcmNsZUxldmVsID0gKCRjaXJjbGVCYXIuY3NzKCdzdHJva2UtZGFzaG9mZnNldCcpLnNsaWNlKDAsIC0yKSkgKiAoMTAwIC0gJGNpcmNsZUxldmVsKSAvIDEwMDtcclxuICAgICAgICAgICAgICAgICRjaXJjbGVCYXIuY3NzKCdzdHJva2UtZGFzaG9mZnNldCcsICRjYWxjQ2lyY2xlTGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgdmFsWydpc1JlbmRlcmVkJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXNSZW5kZXJlZC0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGlzUmVuZGVyZWQ8PTApe1xyXG4gICAgICAgICAgICAvL3NodXRkb3duIGV2ZW50TGlzdGVuZXJcclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9mZignc2Nyb2xsJywgc2tpbGxDaXJjbGVTZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKGlzUmVuZGVyZWQgPiAwKSB7XHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBza2lsbENpcmNsZVNldCk7XHJcbiAgICB9O1xyXG5cclxufSkoKTsiLCJ2YXIgdmFsaWRhdGlvbiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgICAgIHZhbGlkYXRlRm9ybSA9IGZ1bmN0aW9uIChmb3JtKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhJykubm90KCdpbnB1dFt0eXBlPVwiaGlkZGVuXCJdJyksXHJcbiAgICAgICAgICAgICAgICB2YWxpZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAkLmVhY2goZWxlbWVudHMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICRlbGVtZW50LnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCF2YWx1ZS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIF9hZGRFcnJvcigkZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnZm9ybScpLm9uKCdrZXlkb3duJywgJy5oYXMtZXJyb3InLCBfcmVtb3ZlRXJyb3IpO1xyXG4gICAgICAgICAgICAkKCdmb3JtJykub24oJ2NsaWNrJywgJy5oYXMtZXJyb3InLCBfcmVtb3ZlRXJyb3IpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9hZGRFcnJvciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9yZW1vdmVFcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX2NsZWFyRm9ybSA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogaW5pdCxcclxuICAgICAgICB2YWxpZGF0ZUZvcm06IHZhbGlkYXRlRm9ybVxyXG4gICAgfTtcclxuXHJcbn0pKCk7XHJcblxyXG52YWxpZGF0aW9uLmluaXQoKTsiLCJ2YXIgYUNoaWxkcmVuID0gJChcIi5zaWRlYmFyX19saXN0IGxpXCIpLmNoaWxkcmVuKCk7IC8vIGZpbmQgdGhlIGEgY2hpbGRyZW4gb2YgdGhlIGxpc3QgaXRlbXNcclxudmFyIGFBcnJheSA9IFtdOyAvLyBjcmVhdGUgdGhlIGVtcHR5IGFBcnJheVxyXG5mb3IgKHZhciBpPTA7IGkgPCBhQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBhQ2hpbGQgPSBhQ2hpbGRyZW5baV07XHJcbiAgICB2YXIgYWhyZWYgPSAkKGFDaGlsZCkuYXR0cignaHJlZicpO1xyXG4gICAgYUFycmF5LnB1c2goYWhyZWYpO1xyXG59IC8vIHRoaXMgZm9yIGxvb3AgZmlsbHMgdGhlIGFBcnJheSB3aXRoIGF0dHJpYnV0ZSBocmVmIHZhbHVlc1xyXG5cclxuJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHdpbmRvd1BvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTsgLy8gZ2V0IHRoZSBvZmZzZXQgb2YgdGhlIHdpbmRvdyBmcm9tIHRoZSB0b3Agb2YgcGFnZVxyXG4gICAgdmFyIHdpbmRvd0hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTsgLy8gZ2V0IHRoZSBoZWlnaHQgb2YgdGhlIHdpbmRvd1xyXG4gICAgdmFyIGRvY0hlaWdodCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpO1xyXG5cclxuICAgIGZvciAodmFyIGk9MDsgaSA8IGFBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0aGVJRCA9IGFBcnJheVtpXTtcclxuICAgICAgICB2YXIgZGl2UG9zID0gJCh0aGVJRCkub2Zmc2V0KCkudG9wOyAvLyBnZXQgdGhlIG9mZnNldCBvZiB0aGUgZGl2IGZyb20gdGhlIHRvcCBvZiBwYWdlXHJcbiAgICAgICAgdmFyIGRpdkhlaWdodCA9ICQodGhlSUQpLmhlaWdodCgpOyAvLyBnZXQgdGhlIGhlaWdodCBvZiB0aGUgZGl2IGluIHF1ZXN0aW9uXHJcbiAgICAgICAgaWYgKHdpbmRvd1BvcyArNDAgPj0gZGl2UG9zICYmIHdpbmRvd1BvcyA8IChkaXZQb3MgKyBkaXZIZWlnaHQpKSB7XHJcbiAgICAgICAgICAgICQoXCJhW2hyZWY9J1wiICsgdGhlSUQgKyBcIiddXCIpLnBhcmVudCgpLmFkZENsYXNzKFwic2lkZWJhcl9faXRlbS1hY3RpdmVcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJChcImFbaHJlZj0nXCIgKyB0aGVJRCArIFwiJ11cIikucGFyZW50KCkucmVtb3ZlQ2xhc3MoXCJzaWRlYmFyX19pdGVtLWFjdGl2ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pOyIsIi8vXHJcbi8vTW91c2UgcGFyYWxsYXhcclxuXHJcbnZhciBsYXllciA9ICQoJy5wYXJhbGxheCcpLmZpbmQoJy5wYXJhbGxheF9fbGF5ZXInKTtcclxuJCh3aW5kb3cpLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgIHZhciBtb3VzZVggPSBldi5wYWdlWCxcclxuICAgICAgICBtb3VzZVkgPSBldi5wYWdlWSxcclxuICAgICAgICB3RnJvbUNlbnRlciA9IHdpbmRvdy5pbm5lcldpZHRoLzIgLSBtb3VzZVgsXHJcbiAgICAgICAgaEZyb21DZW50ZXIgPSB3aW5kb3cuaW5uZXJIZWlnaHQvMiAtIG1vdXNlWTtcclxuXHJcbiAgICBsYXllci5tYXAoZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgd2lkdGhTaGlmdCA9IHdGcm9tQ2VudGVyICogKChrZXkgKyAxKS8xMDApO1xyXG4gICAgICAgIHZhciBoZWlnaHRTaGlmdCA9IGhGcm9tQ2VudGVyICogKChrZXkgKyAxKS8xMDApO1xyXG4gICAgICAgICQodmFsdWUpLmNzcyh7XHJcbiAgICAgICAgICAgICd0cmFuc2Zvcm0nOid0cmFuc2xhdGUzZCgnICsgd2lkdGhTaGlmdCArICdweCwgJyArIGhlaWdodFNoaWZ0ICsgJ3B4LCAwcHgpJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxufSk7IiwiLy9cclxuLy8gUEFSQUxMQVggU0NST0xMXHJcbnZhciBwYXJhbGxheCA9IChmdW5jdGlvbigpe1xyXG4gICAgdmFyIGJnID0gJCgnLmhlYWRlcl9fYmcnKSxcclxuICAgICAgICB1c2VyID0gJCgnLmF2YXRhcicpLFxyXG4gICAgICAgIHNlY3Rpb25UZXh0ID0gJCgnLmhlYWRlcl9fYmctdGV4dC1pbWcnKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1vdmUgOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcbiAgICAgICAgICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsJyArIHN0cmFmZSArICcsIDApJztcclxuXHJcbiAgICAgICAgICAgIGJsb2NrLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAndHJhbnNmb3JtJyA6IHRyYW5zZm9ybVN0cmluZyxcclxuICAgICAgICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybScgOiB0cmFuc2Zvcm1TdHJpbmdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5pdCA6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZShiZywgd1Njcm9sbCwgNDUpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUoc2VjdGlvblRleHQsIHdTY3JvbGwsIDgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUodXNlciwgd1Njcm9sbCwgNSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG5cclxuJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHdTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICBwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG59KTsgLy8gLT4gc2Nyb2xsX2VuZDsiLCIvL3ByZWxvYWRlclxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgaW1ncyA9IFtdO1xyXG5cclxuICAgICQuZWFjaCgkKCcqJyksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kcyA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLnNwbGl0KCcsJyksXHJcbiAgICAgICAgICAgIGltZyA9ICR0aGlzLmlzKCdpbWcnKTtcclxuXHJcbiAgICAgICAgaWYgKGJhY2tncm91bmRzICE9ICdub25lJykge1xyXG4gICAgICAgICAgICAkLmVhY2goYmFja2dyb3VuZHMsIGZ1bmN0aW9uIChpbmRleCwgYmFja2dyb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICAgICAgICAgICAgICBpbWdzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW1nKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gJHRoaXMuYXR0cignc3JjJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICAgICAgaW1ncy5wdXNoKHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2YXIgcGVyY2VudHNUb3RhbCA9IDE7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGltYWdlID0gJCgnPGltZz4nLCB7XHJcbiAgICAgICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgICAgIHNyYzogaW1nc1tpXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGltYWdlLm9uKHtcclxuICAgICAgICAgICAgbG9hZCA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltZ3MubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UGVyY2VudHModG90YWwsIGN1cnJlbnQpIHtcclxuICAgICAgICB2YXIgcGVyY2VudCA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG5cclxuICAgICAgICBpZiAocGVyY2VudCA+PSAxMDApIHtcclxuICAgICAgICAgICAgJCgnLnByZWxvYWRlcicpLmZhZGVPdXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5wcmVsb2FkZXJfX3BlcmNlbnRzJykudGV4dChwZXJjZW50ICsgJyUnKTtcclxuICAgIH1cclxufSk7IiwiIiwiJChmdW5jdGlvbigpIHtcclxuICAgICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxyXG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG15ID0ge307XHJcblxyXG4gICAgYWRkTGlzdGVuZXIoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRMaXN0ZW5lcigpIHtcclxuICAgICAgICAkKCdmb3JtJykub24oJ3N1Ym1pdCcsIHN1Ym1pdEZvcm0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3VibWl0Rm9ybShldikge1xyXG5cclxuICAgICAgICB2YXIgJGZvcm0gPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICB1cmw9JycsXHJcbiAgICAgICAgICAgIGRlZk9iamVjdCAgID0gYWpheEZvcm0oJGZvcm0sIHVybCk7XHJcblxyXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGFqYXhGb3JtKGZvcm0sIHVybCkge1xyXG4gICAgICAgIGlmKCF2YWxpZGF0aW9uLnZhbGlkYXRlRm9ybShmb3JtKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
