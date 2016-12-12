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
        $('.button_container').on('click', _hideScroll);
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

    //toggle scroll bar on nav expand
    var _hideScroll = function (ev) {
        $('body').toggleClass('hide-scroll');
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
        // console.log('1 '+ isRendered);
    })

    var skillCircleSet = function (ev) {
        var scrollBottom = $(window).scrollTop() + $(window).height();
        // console.log(scrollBottom);
        // console.log('4 '+isRendered);
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
var commonAjax = (function () {

    var ajaxForm = function (ajaxData, url) {
        if (!validation.validateForm(ajaxData))
            return false;
        var data = {}
        var elements = ajaxData.find('input, textarea').not('input[type="hidden"]');

        var result = $.ajax({
            url: url,
            type: 'POST',
            // dataType: 'json',
            data: data,
            // async: false,
            processData: false,
            success: function (ans) {
                console.log(ans);
            },
            error: function () {
                console.log('error');
            },
            cache: false,
            contentType: false
        });

        return result;

    };

    return {
        ajaxForm: ajaxForm
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
/**
 * Created by Alexey on 12-Dec-16.
 */

(function () {
    $('#tab-about__content').on("submit", function (ev) {
        ev.preventDefault();
        var ajaxData = $(this);
        var dbFotmat = ['skill', 'value'];
        var elements = ajaxData.find('input, textarea').not('input[type="hidden"]');
        var Data = {};
        $.each(elements, function (index, element) {
            var $element = $(element);
            if ($element.prop("defaultValue") != $element.prop("value")){
                // console.log($element.prop("value"));
                // console.log($element.prop("id"));
                Data.append({
                    dbFotmat[0]:$element.prop("id"),
                    dbFotmat[1]:$element.prop("value")
                })

            }

        });
        console.log(Data);
            // console.log(ajaxData);
        // ajax запрос
        // var defObj = commonAjax.ajaxForm(ajaxData, './saveSkills');
        // if(defObj){
        //     console.log('skills updated');
        //     defObj.done(function (ans) {
        //         console.log(ans);
        //     })
        // }
    })
})()


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNpcmNsZVNraWxsLmpzIiwiY29tbW9uQWpheC5qcyIsImZvcm1WYWxpZGF0aW9uLmpzIiwiaGlnaGxpZ2h0U2lkZWJhci5qcyIsInBhcmFsbGF4TW91c2UuanMiLCJwYXJhbGxheFNjcm9sbC5qcyIsInByZWxvYWRlci5qcyIsInNhdmVTa2lsbHMuanMiLCJzbGlkZXJDb29sLmpzIiwic21vb3RoU2Nyb2xsLmpzIiwic3VibWl0Q2F0Y2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBldmVudExpc3RlbmVycyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnI3RvZ2dsZScpLm9uKCdjbGljaycsIF90b2dnbGVOYXYpO1xyXG4gICAgICAgICQoJy5hbmdsZS1kb3duJykub24oJ2NsaWNrJywgX2FuZ2xlRG93blNjcm9sbCk7XHJcbiAgICAgICAgJCgnLmFuZ2xlLXVwJykub24oJ2NsaWNrJywgX2FuZ2xlVXBTY3JvbGwpO1xyXG4gICAgICAgICQoJy5hdXRoX190b2dnbGUtYnRuJykub24oJ2NsaWNrJyxfbG9nSW4pO1xyXG4gICAgICAgICQoJy5idG4taG9tZScpLm9uKCdjbGljaycsX2hvbWUpO1xyXG4gICAgICAgICQoJy5zd2lwZS1vdmVybGF5Jykub24oJ2NsaWNrJywgX3N3aXBlKTtcclxuICAgICAgICAkKCcuc3dpcGUnKS5vbignY2xpY2snLCBfc3dpcGUpO1xyXG4gICAgICAgICQoJy5zbGlkZXJfX2Fycm93LWRvd24nKS5vbignY2xpY2snLCBfc2xpZGVyUHJldik7XHJcbiAgICAgICAgJCgnLnNsaWRlcl9fYXJyb3ctdXAnKS5vbignY2xpY2snLCBfc2xpZGVyTmV4dCk7XHJcbiAgICAgICAgJCgnLmJ1dHRvbl9jb250YWluZXInKS5vbignY2xpY2snLCBfaGlkZVNjcm9sbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE5BVmlnYXRpb25cclxuICAgIHZhciBfdG9nZ2xlTmF2ID0gZnVuY3Rpb24oZXYpIHtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCcjb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vYW5nbGUtZG93blxyXG4gICAgdmFyIF9hbmdsZURvd25TY3JvbGwgPSBmdW5jdGlvbiAoZXYpe1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBoZWlnaHR9LCA1MDApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2FuZ2xlLXVwXHJcbiAgICB2YXIgX2FuZ2xlVXBTY3JvbGwgPSBmdW5jdGlvbiAoZXYpe1xyXG4gICAgICAgICQoJ2h0bWwsYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDUwMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vbG9nIGluIHRvZ2dsZVxyXG4gICAgdmFyIF9sb2dJbiA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICQoJy5hdXRoX190b2dnbGUtYnRuJykuY3NzKCd2aXNpYmlsaXR5JywnaGlkZGVuJyk7XHJcbiAgICAgICAgJCgnLndlbGNvbWVfX21lbnUnKS5jc3MoJ3RyYW5zZm9ybScsJ3JvdGF0ZVkoMTgwZGVnKScpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2hvbWUgdG9nZ2xlXHJcbiAgICB2YXIgX2hvbWUgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAkKCcuYXV0aF9fdG9nZ2xlLWJ0bicpLmNzcygndmlzaWJpbGl0eScsJ3Zpc2libGUnKTtcclxuICAgICAgICAkKCcud2VsY29tZV9fbWVudScpLmNzcygndHJhbnNmb3JtJywncm90YXRlWSgwZGVnKScpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2Jsb2dfc3dpcGVfc2lkZWJhclxyXG4gICAgdmFyIF9zd2lwZSA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICQoJy5zaWRlYmFyJykudG9nZ2xlQ2xhc3MoJ3NpZGViYXItb3BlbicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vc2xpZGVyIHByZXZpb3VzIHdvcmtcclxuICAgIHZhciAkc2xpZGVyX2xpc3RfcmV2ZXJzZSA9ICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXJldmVyc2UnKTtcclxuICAgIHZhciAkc2xpZGVyX2xpc3Rfc3RyYWlnaHQgPSAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1zdHJhaWdodCcpO1xyXG4gICAgdmFyICRzbGlkZXJfbGlzdF9iaWcgPSAkKCcuc2xpZGVyX19saXN0X19iaWcnKTtcclxuICAgIHZhciAkd29ya19fZGVzY19fbGlzdCA9ICQoJy53b3JrX19kZXNjX19saXN0Jyk7XHJcblxyXG4gICAgdmFyIF9zbGlkZXJQcmV2ID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgLy8gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtc3RyYWlnaHQnKS5jc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZVkoLTEwMCUpJyk7XHJcbiAgICAgICAgLy8gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtcmV2ZXJzZScpLmNzcygndHJhbnNmb3JtJywndHJhbnNsYXRlWSgwJSknKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3RfcmV2ZXJzZS5jaGlsZHJlbigpLmZpcnN0KCkuaW5zZXJ0QWZ0ZXIoJHNsaWRlcl9saXN0X3JldmVyc2UuY2hpbGRyZW4oKS5sYXN0KCkpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9zdHJhaWdodC5jaGlsZHJlbigpLmxhc3QoKS5pbnNlcnRCZWZvcmUoJHNsaWRlcl9saXN0X3N0cmFpZ2h0LmNoaWxkcmVuKCkuZmlyc3QoKSk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X2JpZy5jaGlsZHJlbigpLmxhc3QoKS5pbnNlcnRCZWZvcmUoJHNsaWRlcl9saXN0X2JpZy5jaGlsZHJlbigpLmZpcnN0KCkpO1xyXG4gICAgICAgICR3b3JrX19kZXNjX19saXN0LmNoaWxkcmVuKCkubGFzdCgpLmluc2VydEJlZm9yZSgkd29ya19fZGVzY19fbGlzdC5jaGlsZHJlbigpLmZpcnN0KCkpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy9zbGlkZXIgbmV4dCB3b3JrXHJcbiAgICB2YXIgX3NsaWRlck5leHQgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAvLyAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1yZXZlcnNlJykuY3NzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGVZKC0xMDAlKScpO1xyXG4gICAgICAgIC8vICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXN0cmFpZ2h0JykuY3NzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGVZKDAlKScpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9zdHJhaWdodC5jaGlsZHJlbigpLmZpcnN0KCkuaW5zZXJ0QWZ0ZXIoJHNsaWRlcl9saXN0X3N0cmFpZ2h0LmNoaWxkcmVuKCkubGFzdCgpKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3RfcmV2ZXJzZS5jaGlsZHJlbigpLmxhc3QoKS5pbnNlcnRCZWZvcmUoJHNsaWRlcl9saXN0X3JldmVyc2UuY2hpbGRyZW4oKS5maXJzdCgpKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3RfYmlnLmNoaWxkcmVuKCkuZmlyc3QoKS5pbnNlcnRBZnRlcigkc2xpZGVyX2xpc3RfYmlnLmNoaWxkcmVuKCkubGFzdCgpKTtcclxuICAgICAgICAkd29ya19fZGVzY19fbGlzdC5jaGlsZHJlbigpLmZpcnN0KCkuaW5zZXJ0QWZ0ZXIoJHdvcmtfX2Rlc2NfX2xpc3QuY2hpbGRyZW4oKS5sYXN0KCkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL3RvZ2dsZSBzY3JvbGwgYmFyIG9uIG5hdiBleHBhbmRcclxuICAgIHZhciBfaGlkZVNjcm9sbCA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnaGlkZS1zY3JvbGwnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0OiBpbml0XHJcbiAgICAgICAgfTtcclxuXHJcbn0pKCk7XHJcblxyXG5ldmVudExpc3RlbmVycy5pbml0KCk7XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQWxleGV5IG9uIDA5LURlYy0xNi5cclxuICovXHJcbi8vU1ZHIGFuaW1hdGVkIGNpcmNsZSBsZXZlbHNcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpc1JlbmRlcmVkID0gMDtcclxuICAgIHZhciBza2lsbENpcmNsZXNPYmogPSBbXTtcclxuICAgICQuZWFjaCgkKCcuc2tpbGwtY2lyY2xlJyksIGZ1bmN0aW9uIChpbmQsIHZhbCkge1xyXG4gICAgICAgIHZhciBjaXJjbGVCb3R0b20gPSAkKHRoaXMpLmhlaWdodCgpICsgJCh0aGlzKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgc2tpbGxDaXJjbGVzT2JqLnB1c2goe1xyXG4gICAgICAgICAgICBjaXJjbGU6IHZhbCxcclxuICAgICAgICAgICAgY2lyY2xlQm90dG9tOiBjaXJjbGVCb3R0b20sXHJcbiAgICAgICAgICAgIGlzUmVuZGVyZWQ6IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpc1JlbmRlcmVkKys7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJzEgJysgaXNSZW5kZXJlZCk7XHJcbiAgICB9KVxyXG5cclxuICAgIHZhciBza2lsbENpcmNsZVNldCA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIHZhciBzY3JvbGxCb3R0b20gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coc2Nyb2xsQm90dG9tKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnNCAnK2lzUmVuZGVyZWQpO1xyXG4gICAgICAgICQuZWFjaChza2lsbENpcmNsZXNPYmosIGZ1bmN0aW9uIChpbmQsIHZhbCkge1xyXG4gICAgICAgICAgICBpZiAoIXZhbFsnaXNSZW5kZXJlZCddICYmIHNjcm9sbEJvdHRvbSA+IHZhbFsnY2lyY2xlQm90dG9tJ10pIHtcclxuICAgICAgICAgICAgICAgIHZhciAkY2lyY2xlID0gJCh2YWxbJ2NpcmNsZSddKTtcclxuICAgICAgICAgICAgICAgIHZhciAkY2lyY2xlTGV2ZWwgPSAkY2lyY2xlLmF0dHIoJ2RhdGEtbGV2ZWwnKTtcclxuICAgICAgICAgICAgICAgIHZhciAkY2lyY2xlQmFyID0gJGNpcmNsZS5jaGlsZHJlbignLmNpcmNsZS1iYXInKTtcclxuICAgICAgICAgICAgICAgIHZhciAkY2FsY0NpcmNsZUxldmVsID0gKCRjaXJjbGVCYXIuY3NzKCdzdHJva2UtZGFzaG9mZnNldCcpLnNsaWNlKDAsIC0yKSkgKiAoMTAwIC0gJGNpcmNsZUxldmVsKSAvIDEwMDtcclxuICAgICAgICAgICAgICAgICRjaXJjbGVCYXIuY3NzKCdzdHJva2UtZGFzaG9mZnNldCcsICRjYWxjQ2lyY2xlTGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgdmFsWydpc1JlbmRlcmVkJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXNSZW5kZXJlZC0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGlzUmVuZGVyZWQ8PTApe1xyXG4gICAgICAgICAgICAvL3NodXRkb3duIGV2ZW50TGlzdGVuZXJcclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9mZignc2Nyb2xsJywgc2tpbGxDaXJjbGVTZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKGlzUmVuZGVyZWQgPiAwKSB7XHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBza2lsbENpcmNsZVNldCk7XHJcbiAgICB9O1xyXG5cclxufSkoKTsiLCJ2YXIgY29tbW9uQWpheCA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGFqYXhGb3JtID0gZnVuY3Rpb24gKGFqYXhEYXRhLCB1cmwpIHtcclxuICAgICAgICBpZiAoIXZhbGlkYXRpb24udmFsaWRhdGVGb3JtKGFqYXhEYXRhKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciBkYXRhID0ge31cclxuICAgICAgICB2YXIgZWxlbWVudHMgPSBhamF4RGF0YS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKS5ub3QoJ2lucHV0W3R5cGU9XCJoaWRkZW5cIl0nKTtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIC8vIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgIC8vIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoYW5zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhbnMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFqYXhGb3JtOiBhamF4Rm9ybVxyXG4gICAgfTtcclxuXHJcbn0pKCk7IiwidmFyIHZhbGlkYXRpb24gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgICAgICB2YWxpZGF0ZUZvcm0gPSBmdW5jdGlvbiAoZm9ybSkge1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYScpLm5vdCgnaW5wdXRbdHlwZT1cImhpZGRlblwiXScpLFxyXG4gICAgICAgICAgICAgICAgdmFsaWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKGVsZW1lbnRzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAkZWxlbWVudC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZighdmFsdWUubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICBfYWRkRXJyb3IoJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2YWxpZDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJ2Zvcm0nKS5vbigna2V5ZG93bicsICcuaGFzLWVycm9yJywgX3JlbW92ZUVycm9yKTtcclxuICAgICAgICAgICAgJCgnZm9ybScpLm9uKCdjbGljaycsICcuaGFzLWVycm9yJywgX3JlbW92ZUVycm9yKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfYWRkRXJyb3IgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfcmVtb3ZlRXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBpbml0LFxyXG4gICAgICAgIHZhbGlkYXRlRm9ybTogdmFsaWRhdGVGb3JtXHJcbiAgICB9O1xyXG5cclxufSkoKTtcclxuXHJcbnZhbGlkYXRpb24uaW5pdCgpOyIsInZhciBhQ2hpbGRyZW4gPSAkKFwiLnNpZGViYXJfX2xpc3QgbGlcIikuY2hpbGRyZW4oKTsgLy8gZmluZCB0aGUgYSBjaGlsZHJlbiBvZiB0aGUgbGlzdCBpdGVtc1xyXG52YXIgYUFycmF5ID0gW107IC8vIGNyZWF0ZSB0aGUgZW1wdHkgYUFycmF5XHJcbmZvciAodmFyIGk9MDsgaSA8IGFDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGFDaGlsZCA9IGFDaGlsZHJlbltpXTtcclxuICAgIHZhciBhaHJlZiA9ICQoYUNoaWxkKS5hdHRyKCdocmVmJyk7XHJcbiAgICBhQXJyYXkucHVzaChhaHJlZik7XHJcbn0gLy8gdGhpcyBmb3IgbG9vcCBmaWxscyB0aGUgYUFycmF5IHdpdGggYXR0cmlidXRlIGhyZWYgdmFsdWVzXHJcblxyXG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgd2luZG93UG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpOyAvLyBnZXQgdGhlIG9mZnNldCBvZiB0aGUgd2luZG93IGZyb20gdGhlIHRvcCBvZiBwYWdlXHJcbiAgICB2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpOyAvLyBnZXQgdGhlIGhlaWdodCBvZiB0aGUgd2luZG93XHJcbiAgICB2YXIgZG9jSGVpZ2h0ID0gJChkb2N1bWVudCkuaGVpZ2h0KCk7XHJcblxyXG4gICAgZm9yICh2YXIgaT0wOyBpIDwgYUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHRoZUlEID0gYUFycmF5W2ldO1xyXG4gICAgICAgIHZhciBkaXZQb3MgPSAkKHRoZUlEKS5vZmZzZXQoKS50b3A7IC8vIGdldCB0aGUgb2Zmc2V0IG9mIHRoZSBkaXYgZnJvbSB0aGUgdG9wIG9mIHBhZ2VcclxuICAgICAgICB2YXIgZGl2SGVpZ2h0ID0gJCh0aGVJRCkuaGVpZ2h0KCk7IC8vIGdldCB0aGUgaGVpZ2h0IG9mIHRoZSBkaXYgaW4gcXVlc3Rpb25cclxuICAgICAgICBpZiAod2luZG93UG9zICs0MCA+PSBkaXZQb3MgJiYgd2luZG93UG9zIDwgKGRpdlBvcyArIGRpdkhlaWdodCkpIHtcclxuICAgICAgICAgICAgJChcImFbaHJlZj0nXCIgKyB0aGVJRCArIFwiJ11cIikucGFyZW50KCkuYWRkQ2xhc3MoXCJzaWRlYmFyX19pdGVtLWFjdGl2ZVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiYVtocmVmPSdcIiArIHRoZUlEICsgXCInXVwiKS5wYXJlbnQoKS5yZW1vdmVDbGFzcyhcInNpZGViYXJfX2l0ZW0tYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7IiwiLy9cclxuLy9Nb3VzZSBwYXJhbGxheFxyXG5cclxudmFyIGxheWVyID0gJCgnLnBhcmFsbGF4JykuZmluZCgnLnBhcmFsbGF4X19sYXllcicpO1xyXG4kKHdpbmRvdykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChldikge1xyXG4gICAgdmFyIG1vdXNlWCA9IGV2LnBhZ2VYLFxyXG4gICAgICAgIG1vdXNlWSA9IGV2LnBhZ2VZLFxyXG4gICAgICAgIHdGcm9tQ2VudGVyID0gd2luZG93LmlubmVyV2lkdGgvMiAtIG1vdXNlWCxcclxuICAgICAgICBoRnJvbUNlbnRlciA9IHdpbmRvdy5pbm5lckhlaWdodC8yIC0gbW91c2VZO1xyXG5cclxuICAgIGxheWVyLm1hcChmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciB3aWR0aFNoaWZ0ID0gd0Zyb21DZW50ZXIgKiAoKGtleSArIDEpLzEwMCk7XHJcbiAgICAgICAgdmFyIGhlaWdodFNoaWZ0ID0gaEZyb21DZW50ZXIgKiAoKGtleSArIDEpLzEwMCk7XHJcbiAgICAgICAgJCh2YWx1ZSkuY3NzKHtcclxuICAgICAgICAgICAgJ3RyYW5zZm9ybSc6J3RyYW5zbGF0ZTNkKCcgKyB3aWR0aFNoaWZ0ICsgJ3B4LCAnICsgaGVpZ2h0U2hpZnQgKyAncHgsIDBweCknXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG59KTsiLCIvL1xyXG4vLyBQQVJBTExBWCBTQ1JPTExcclxudmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgYmcgPSAkKCcuaGVhZGVyX19iZycpLFxyXG4gICAgICAgIHVzZXIgPSAkKCcuYXZhdGFyJyksXHJcbiAgICAgICAgc2VjdGlvblRleHQgPSAkKCcuaGVhZGVyX19iZy10ZXh0LWltZycpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbW92ZSA6IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuICAgICAgICAgICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJScsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywgMCknO1xyXG5cclxuICAgICAgICAgICAgYmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nIDogdHJhbnNmb3JtU3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJyA6IHRyYW5zZm9ybVN0cmluZ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0IDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZShzZWN0aW9uVGV4dCwgd1Njcm9sbCwgOCk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCA1KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7XHJcblxyXG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgd1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgIHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcbn0pOyAvLyAtPiBzY3JvbGxfZW5kOyIsIi8vcHJlbG9hZGVyXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBpbWdzID0gW107XHJcblxyXG4gICAgJC5lYWNoKCQoJyonKSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgICAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRzID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykuc3BsaXQoJywnKSxcclxuICAgICAgICAgICAgaW1nID0gJHRoaXMuaXMoJ2ltZycpO1xyXG5cclxuICAgICAgICBpZiAoYmFja2dyb3VuZHMgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICQuZWFjaChiYWNrZ3JvdW5kcywgZnVuY3Rpb24gKGluZGV4LCBiYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuICAgICAgICAgICAgICAgIGltZ3MucHVzaChwYXRoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbWcpIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSAkdGhpcy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICBpbWdzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgaW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICAgICAgc3JjOiBpbWdzW2ldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW1hZ2Uub24oe1xyXG4gICAgICAgICAgICBsb2FkIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRQZXJjZW50cyh0b3RhbCwgY3VycmVudCkge1xyXG4gICAgICAgIHZhciBwZXJjZW50ID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcblxyXG4gICAgICAgIGlmIChwZXJjZW50ID49IDEwMCkge1xyXG4gICAgICAgICAgICAkKCcucHJlbG9hZGVyJykuZmFkZU91dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLnByZWxvYWRlcl9fcGVyY2VudHMnKS50ZXh0KHBlcmNlbnQgKyAnJScpO1xyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBbGV4ZXkgb24gMTItRGVjLTE2LlxyXG4gKi9cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjdGFiLWFib3V0X19jb250ZW50Jykub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgYWpheERhdGEgPSAkKHRoaXMpO1xyXG4gICAgICAgIHZhciBkYkZvdG1hdCA9IFsnc2tpbGwnLCAndmFsdWUnXTtcclxuICAgICAgICB2YXIgZWxlbWVudHMgPSBhamF4RGF0YS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKS5ub3QoJ2lucHV0W3R5cGU9XCJoaWRkZW5cIl0nKTtcclxuICAgICAgICB2YXIgRGF0YSA9IHt9O1xyXG4gICAgICAgICQuZWFjaChlbGVtZW50cywgZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGlmICgkZWxlbWVudC5wcm9wKFwiZGVmYXVsdFZhbHVlXCIpICE9ICRlbGVtZW50LnByb3AoXCJ2YWx1ZVwiKSl7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygkZWxlbWVudC5wcm9wKFwidmFsdWVcIikpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJGVsZW1lbnQucHJvcChcImlkXCIpKTtcclxuICAgICAgICAgICAgICAgIERhdGEuYXBwZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICBkYkZvdG1hdFswXTokZWxlbWVudC5wcm9wKFwiaWRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgZGJGb3RtYXRbMV06JGVsZW1lbnQucHJvcChcInZhbHVlXCIpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhEYXRhKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYWpheERhdGEpO1xyXG4gICAgICAgIC8vIGFqYXgg0LfQsNC/0YDQvtGBXHJcbiAgICAgICAgLy8gdmFyIGRlZk9iaiA9IGNvbW1vbkFqYXguYWpheEZvcm0oYWpheERhdGEsICcuL3NhdmVTa2lsbHMnKTtcclxuICAgICAgICAvLyBpZihkZWZPYmope1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnc2tpbGxzIHVwZGF0ZWQnKTtcclxuICAgICAgICAvLyAgICAgZGVmT2JqLmRvbmUoZnVuY3Rpb24gKGFucykge1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYW5zKTtcclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyB9XHJcbiAgICB9KVxyXG59KSgpXHJcbiIsIiIsIiQoZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArJ10nKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3BcclxuICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBteSA9IHt9O1xyXG5cclxuICAgIGFkZExpc3RlbmVyKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgJCgnZm9ybScpLm9uKCdzdWJtaXQnLCBzdWJtaXRGb3JtKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN1Ym1pdEZvcm0oZXYpIHtcclxuXHJcbiAgICAgICAgdmFyICRmb3JtID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgdXJsPScnLFxyXG4gICAgICAgICAgICBkZWZPYmplY3QgICA9IGFqYXhGb3JtKCRmb3JtLCB1cmwpO1xyXG5cclxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBhamF4Rm9ybShmb3JtLCB1cmwpIHtcclxuICAgICAgICBpZighdmFsaWRhdGlvbi52YWxpZGF0ZUZvcm0oZm9ybSkpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
