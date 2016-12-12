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

    var ajaxForm = function (formData, url, dbFields) {
        if (!validation.validateForm(formData))
            return false;
        var elements = formData.find('input, textarea').not('input[type="hidden"]');
        var Data = [];
        var dbFields = dbFields;
        $.each(elements, function (index, element) {
            var $element = $(element);
            if ($element.prop("defaultValue") != $element.prop("value")){
                console.log($element.serializeArray());
                var pushElement = {};
                pushElement[dbFields[0]] = $element.prop("id"),
                pushElement[dbFields[1]] = $element.prop("value");

                Data.push(pushElement);
            }

        });
        var ajaxData = JSON.stringify(Data);

        var result = $.ajax({
            url: url,
            type: 'POST',
            // dataType: 'json',
            data: ajaxData,
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
        var formData = $(this);
        console.log(formData);
        var dbFields = ['skill', 'value'];

        // ajax запрос
        var defObj = commonAjax.ajaxForm(formData, './saveSkills', dbFields);
        if(defObj){
            console.log('skills updated');
            defObj.done(function (ans) {
                console.log(ans);
            })
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNpcmNsZVNraWxsLmpzIiwiY29tbW9uQWpheC5qcyIsImZvcm1WYWxpZGF0aW9uLmpzIiwiaGlnaGxpZ2h0U2lkZWJhci5qcyIsInBhcmFsbGF4TW91c2UuanMiLCJwYXJhbGxheFNjcm9sbC5qcyIsInByZWxvYWRlci5qcyIsInNhdmVTa2lsbHMuanMiLCJzbGlkZXJDb29sLmpzIiwic21vb3RoU2Nyb2xsLmpzIiwic3VibWl0Q2F0Y2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZXZlbnRMaXN0ZW5lcnMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJyN0b2dnbGUnKS5vbignY2xpY2snLCBfdG9nZ2xlTmF2KTtcclxuICAgICAgICAkKCcuYW5nbGUtZG93bicpLm9uKCdjbGljaycsIF9hbmdsZURvd25TY3JvbGwpO1xyXG4gICAgICAgICQoJy5hbmdsZS11cCcpLm9uKCdjbGljaycsIF9hbmdsZVVwU2Nyb2xsKTtcclxuICAgICAgICAkKCcuYXV0aF9fdG9nZ2xlLWJ0bicpLm9uKCdjbGljaycsX2xvZ0luKTtcclxuICAgICAgICAkKCcuYnRuLWhvbWUnKS5vbignY2xpY2snLF9ob21lKTtcclxuICAgICAgICAkKCcuc3dpcGUtb3ZlcmxheScpLm9uKCdjbGljaycsIF9zd2lwZSk7XHJcbiAgICAgICAgJCgnLnN3aXBlJykub24oJ2NsaWNrJywgX3N3aXBlKTtcclxuICAgICAgICAkKCcuc2xpZGVyX19hcnJvdy1kb3duJykub24oJ2NsaWNrJywgX3NsaWRlclByZXYpO1xyXG4gICAgICAgICQoJy5zbGlkZXJfX2Fycm93LXVwJykub24oJ2NsaWNrJywgX3NsaWRlck5leHQpO1xyXG4gICAgICAgICQoJy5idXR0b25fY29udGFpbmVyJykub24oJ2NsaWNrJywgX2hpZGVTY3JvbGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBOQVZpZ2F0aW9uXHJcbiAgICB2YXIgX3RvZ2dsZU5hdiA9IGZ1bmN0aW9uKGV2KSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnI292ZXJsYXknKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2FuZ2xlLWRvd25cclxuICAgIHZhciBfYW5nbGVEb3duU2Nyb2xsID0gZnVuY3Rpb24gKGV2KXtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgICQoJ2h0bWwsYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogaGVpZ2h0fSwgNTAwKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9hbmdsZS11cFxyXG4gICAgdmFyIF9hbmdsZVVwU2Nyb2xsID0gZnVuY3Rpb24gKGV2KXtcclxuICAgICAgICAkKCdodG1sLGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCA1MDApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2xvZyBpbiB0b2dnbGVcclxuICAgIHZhciBfbG9nSW4gPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAkKCcuYXV0aF9fdG9nZ2xlLWJ0bicpLmNzcygndmlzaWJpbGl0eScsJ2hpZGRlbicpO1xyXG4gICAgICAgICQoJy53ZWxjb21lX19tZW51JykuY3NzKCd0cmFuc2Zvcm0nLCdyb3RhdGVZKDE4MGRlZyknKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9ob21lIHRvZ2dsZVxyXG4gICAgdmFyIF9ob21lID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJCgnLmF1dGhfX3RvZ2dsZS1idG4nKS5jc3MoJ3Zpc2liaWxpdHknLCd2aXNpYmxlJyk7XHJcbiAgICAgICAgJCgnLndlbGNvbWVfX21lbnUnKS5jc3MoJ3RyYW5zZm9ybScsJ3JvdGF0ZVkoMGRlZyknKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9ibG9nX3N3aXBlX3NpZGViYXJcclxuICAgIHZhciBfc3dpcGUgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAkKCcuc2lkZWJhcicpLnRvZ2dsZUNsYXNzKCdzaWRlYmFyLW9wZW4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3NsaWRlciBwcmV2aW91cyB3b3JrXHJcbiAgICB2YXIgJHNsaWRlcl9saXN0X3JldmVyc2UgPSAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1yZXZlcnNlJyk7XHJcbiAgICB2YXIgJHNsaWRlcl9saXN0X3N0cmFpZ2h0ID0gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtc3RyYWlnaHQnKTtcclxuICAgIHZhciAkc2xpZGVyX2xpc3RfYmlnID0gJCgnLnNsaWRlcl9fbGlzdF9fYmlnJyk7XHJcbiAgICB2YXIgJHdvcmtfX2Rlc2NfX2xpc3QgPSAkKCcud29ya19fZGVzY19fbGlzdCcpO1xyXG5cclxuICAgIHZhciBfc2xpZGVyUHJldiA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIC8vICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXN0cmFpZ2h0JykuY3NzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGVZKC0xMDAlKScpO1xyXG4gICAgICAgIC8vICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXJldmVyc2UnKS5jc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZVkoMCUpJyk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X3JldmVyc2UuY2hpbGRyZW4oKS5maXJzdCgpLmluc2VydEFmdGVyKCRzbGlkZXJfbGlzdF9yZXZlcnNlLmNoaWxkcmVuKCkubGFzdCgpKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3Rfc3RyYWlnaHQuY2hpbGRyZW4oKS5sYXN0KCkuaW5zZXJ0QmVmb3JlKCRzbGlkZXJfbGlzdF9zdHJhaWdodC5jaGlsZHJlbigpLmZpcnN0KCkpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9iaWcuY2hpbGRyZW4oKS5sYXN0KCkuaW5zZXJ0QmVmb3JlKCRzbGlkZXJfbGlzdF9iaWcuY2hpbGRyZW4oKS5maXJzdCgpKTtcclxuICAgICAgICAkd29ya19fZGVzY19fbGlzdC5jaGlsZHJlbigpLmxhc3QoKS5pbnNlcnRCZWZvcmUoJHdvcmtfX2Rlc2NfX2xpc3QuY2hpbGRyZW4oKS5maXJzdCgpKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vc2xpZGVyIG5leHQgd29ya1xyXG4gICAgdmFyIF9zbGlkZXJOZXh0ID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgLy8gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtcmV2ZXJzZScpLmNzcygndHJhbnNmb3JtJywndHJhbnNsYXRlWSgtMTAwJSknKTtcclxuICAgICAgICAvLyAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1zdHJhaWdodCcpLmNzcygndHJhbnNmb3JtJywndHJhbnNsYXRlWSgwJSknKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3Rfc3RyYWlnaHQuY2hpbGRyZW4oKS5maXJzdCgpLmluc2VydEFmdGVyKCRzbGlkZXJfbGlzdF9zdHJhaWdodC5jaGlsZHJlbigpLmxhc3QoKSk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X3JldmVyc2UuY2hpbGRyZW4oKS5sYXN0KCkuaW5zZXJ0QmVmb3JlKCRzbGlkZXJfbGlzdF9yZXZlcnNlLmNoaWxkcmVuKCkuZmlyc3QoKSk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X2JpZy5jaGlsZHJlbigpLmZpcnN0KCkuaW5zZXJ0QWZ0ZXIoJHNsaWRlcl9saXN0X2JpZy5jaGlsZHJlbigpLmxhc3QoKSk7XHJcbiAgICAgICAgJHdvcmtfX2Rlc2NfX2xpc3QuY2hpbGRyZW4oKS5maXJzdCgpLmluc2VydEFmdGVyKCR3b3JrX19kZXNjX19saXN0LmNoaWxkcmVuKCkubGFzdCgpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy90b2dnbGUgc2Nyb2xsIGJhciBvbiBuYXYgZXhwYW5kXHJcbiAgICB2YXIgX2hpZGVTY3JvbGwgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ2hpZGUtc2Nyb2xsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5pdDogaW5pdFxyXG4gICAgICAgIH07XHJcblxyXG59KSgpO1xyXG5cclxuZXZlbnRMaXN0ZW5lcnMuaW5pdCgpO1xyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFsZXhleSBvbiAwOS1EZWMtMTYuXHJcbiAqL1xyXG4vL1NWRyBhbmltYXRlZCBjaXJjbGUgbGV2ZWxzXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaXNSZW5kZXJlZCA9IDA7XHJcbiAgICB2YXIgc2tpbGxDaXJjbGVzT2JqID0gW107XHJcbiAgICAkLmVhY2goJCgnLnNraWxsLWNpcmNsZScpLCBmdW5jdGlvbiAoaW5kLCB2YWwpIHtcclxuICAgICAgICB2YXIgY2lyY2xlQm90dG9tID0gJCh0aGlzKS5oZWlnaHQoKSArICQodGhpcykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgIHNraWxsQ2lyY2xlc09iai5wdXNoKHtcclxuICAgICAgICAgICAgY2lyY2xlOiB2YWwsXHJcbiAgICAgICAgICAgIGNpcmNsZUJvdHRvbTogY2lyY2xlQm90dG9tLFxyXG4gICAgICAgICAgICBpc1JlbmRlcmVkOiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaXNSZW5kZXJlZCsrO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCcxICcrIGlzUmVuZGVyZWQpO1xyXG4gICAgfSlcclxuXHJcbiAgICB2YXIgc2tpbGxDaXJjbGVTZXQgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICB2YXIgc2Nyb2xsQm90dG9tID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNjcm9sbEJvdHRvbSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJzQgJytpc1JlbmRlcmVkKTtcclxuICAgICAgICAkLmVhY2goc2tpbGxDaXJjbGVzT2JqLCBmdW5jdGlvbiAoaW5kLCB2YWwpIHtcclxuICAgICAgICAgICAgaWYgKCF2YWxbJ2lzUmVuZGVyZWQnXSAmJiBzY3JvbGxCb3R0b20gPiB2YWxbJ2NpcmNsZUJvdHRvbSddKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNpcmNsZSA9ICQodmFsWydjaXJjbGUnXSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNpcmNsZUxldmVsID0gJGNpcmNsZS5hdHRyKCdkYXRhLWxldmVsJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNpcmNsZUJhciA9ICRjaXJjbGUuY2hpbGRyZW4oJy5jaXJjbGUtYmFyJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNhbGNDaXJjbGVMZXZlbCA9ICgkY2lyY2xlQmFyLmNzcygnc3Ryb2tlLWRhc2hvZmZzZXQnKS5zbGljZSgwLCAtMikpICogKDEwMCAtICRjaXJjbGVMZXZlbCkgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICAkY2lyY2xlQmFyLmNzcygnc3Ryb2tlLWRhc2hvZmZzZXQnLCAkY2FsY0NpcmNsZUxldmVsKTtcclxuICAgICAgICAgICAgICAgIHZhbFsnaXNSZW5kZXJlZCddID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlzUmVuZGVyZWQtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpc1JlbmRlcmVkPD0wKXtcclxuICAgICAgICAgICAgLy9zaHV0ZG93biBldmVudExpc3RlbmVyXHJcbiAgICAgICAgICAgICQod2luZG93KS5vZmYoJ3Njcm9sbCcsIHNraWxsQ2lyY2xlU2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChpc1JlbmRlcmVkID4gMCkge1xyXG4gICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgc2tpbGxDaXJjbGVTZXQpO1xyXG4gICAgfTtcclxuXHJcbn0pKCk7IiwidmFyIGNvbW1vbkFqYXggPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBhamF4Rm9ybSA9IGZ1bmN0aW9uIChmb3JtRGF0YSwgdXJsLCBkYkZpZWxkcykge1xyXG4gICAgICAgIGlmICghdmFsaWRhdGlvbi52YWxpZGF0ZUZvcm0oZm9ybURhdGEpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gZm9ybURhdGEuZmluZCgnaW5wdXQsIHRleHRhcmVhJykubm90KCdpbnB1dFt0eXBlPVwiaGlkZGVuXCJdJyk7XHJcbiAgICAgICAgdmFyIERhdGEgPSBbXTtcclxuICAgICAgICB2YXIgZGJGaWVsZHMgPSBkYkZpZWxkcztcclxuICAgICAgICAkLmVhY2goZWxlbWVudHMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoJGVsZW1lbnQucHJvcChcImRlZmF1bHRWYWx1ZVwiKSAhPSAkZWxlbWVudC5wcm9wKFwidmFsdWVcIikpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJGVsZW1lbnQuc2VyaWFsaXplQXJyYXkoKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHVzaEVsZW1lbnQgPSB7fTtcclxuICAgICAgICAgICAgICAgIHB1c2hFbGVtZW50W2RiRmllbGRzWzBdXSA9ICRlbGVtZW50LnByb3AoXCJpZFwiKSxcclxuICAgICAgICAgICAgICAgIHB1c2hFbGVtZW50W2RiRmllbGRzWzFdXSA9ICRlbGVtZW50LnByb3AoXCJ2YWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBEYXRhLnB1c2gocHVzaEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBhamF4RGF0YSA9IEpTT04uc3RyaW5naWZ5KERhdGEpO1xyXG5cclxuICAgICAgICB2YXIgcmVzdWx0ID0gJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgLy8gZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogYWpheERhdGEsXHJcbiAgICAgICAgICAgIC8vIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoYW5zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhbnMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFqYXhGb3JtOiBhamF4Rm9ybVxyXG4gICAgfTtcclxuXHJcbn0pKCk7IiwidmFyIHZhbGlkYXRpb24gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgICAgICB2YWxpZGF0ZUZvcm0gPSBmdW5jdGlvbiAoZm9ybSkge1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYScpLm5vdCgnaW5wdXRbdHlwZT1cImhpZGRlblwiXScpLFxyXG4gICAgICAgICAgICAgICAgdmFsaWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKGVsZW1lbnRzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAkZWxlbWVudC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZighdmFsdWUubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICBfYWRkRXJyb3IoJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2YWxpZDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJ2Zvcm0nKS5vbigna2V5ZG93bicsICcuaGFzLWVycm9yJywgX3JlbW92ZUVycm9yKTtcclxuICAgICAgICAgICAgJCgnZm9ybScpLm9uKCdjbGljaycsICcuaGFzLWVycm9yJywgX3JlbW92ZUVycm9yKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfYWRkRXJyb3IgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfcmVtb3ZlRXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBpbml0LFxyXG4gICAgICAgIHZhbGlkYXRlRm9ybTogdmFsaWRhdGVGb3JtXHJcbiAgICB9O1xyXG5cclxufSkoKTtcclxuXHJcbnZhbGlkYXRpb24uaW5pdCgpOyIsInZhciBhQ2hpbGRyZW4gPSAkKFwiLnNpZGViYXJfX2xpc3QgbGlcIikuY2hpbGRyZW4oKTsgLy8gZmluZCB0aGUgYSBjaGlsZHJlbiBvZiB0aGUgbGlzdCBpdGVtc1xyXG52YXIgYUFycmF5ID0gW107IC8vIGNyZWF0ZSB0aGUgZW1wdHkgYUFycmF5XHJcbmZvciAodmFyIGk9MDsgaSA8IGFDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGFDaGlsZCA9IGFDaGlsZHJlbltpXTtcclxuICAgIHZhciBhaHJlZiA9ICQoYUNoaWxkKS5hdHRyKCdocmVmJyk7XHJcbiAgICBhQXJyYXkucHVzaChhaHJlZik7XHJcbn0gLy8gdGhpcyBmb3IgbG9vcCBmaWxscyB0aGUgYUFycmF5IHdpdGggYXR0cmlidXRlIGhyZWYgdmFsdWVzXHJcblxyXG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgd2luZG93UG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpOyAvLyBnZXQgdGhlIG9mZnNldCBvZiB0aGUgd2luZG93IGZyb20gdGhlIHRvcCBvZiBwYWdlXHJcbiAgICB2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpOyAvLyBnZXQgdGhlIGhlaWdodCBvZiB0aGUgd2luZG93XHJcbiAgICB2YXIgZG9jSGVpZ2h0ID0gJChkb2N1bWVudCkuaGVpZ2h0KCk7XHJcblxyXG4gICAgZm9yICh2YXIgaT0wOyBpIDwgYUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHRoZUlEID0gYUFycmF5W2ldO1xyXG4gICAgICAgIHZhciBkaXZQb3MgPSAkKHRoZUlEKS5vZmZzZXQoKS50b3A7IC8vIGdldCB0aGUgb2Zmc2V0IG9mIHRoZSBkaXYgZnJvbSB0aGUgdG9wIG9mIHBhZ2VcclxuICAgICAgICB2YXIgZGl2SGVpZ2h0ID0gJCh0aGVJRCkuaGVpZ2h0KCk7IC8vIGdldCB0aGUgaGVpZ2h0IG9mIHRoZSBkaXYgaW4gcXVlc3Rpb25cclxuICAgICAgICBpZiAod2luZG93UG9zICs0MCA+PSBkaXZQb3MgJiYgd2luZG93UG9zIDwgKGRpdlBvcyArIGRpdkhlaWdodCkpIHtcclxuICAgICAgICAgICAgJChcImFbaHJlZj0nXCIgKyB0aGVJRCArIFwiJ11cIikucGFyZW50KCkuYWRkQ2xhc3MoXCJzaWRlYmFyX19pdGVtLWFjdGl2ZVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiYVtocmVmPSdcIiArIHRoZUlEICsgXCInXVwiKS5wYXJlbnQoKS5yZW1vdmVDbGFzcyhcInNpZGViYXJfX2l0ZW0tYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7IiwiLy9cclxuLy9Nb3VzZSBwYXJhbGxheFxyXG5cclxudmFyIGxheWVyID0gJCgnLnBhcmFsbGF4JykuZmluZCgnLnBhcmFsbGF4X19sYXllcicpO1xyXG4kKHdpbmRvdykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChldikge1xyXG4gICAgdmFyIG1vdXNlWCA9IGV2LnBhZ2VYLFxyXG4gICAgICAgIG1vdXNlWSA9IGV2LnBhZ2VZLFxyXG4gICAgICAgIHdGcm9tQ2VudGVyID0gd2luZG93LmlubmVyV2lkdGgvMiAtIG1vdXNlWCxcclxuICAgICAgICBoRnJvbUNlbnRlciA9IHdpbmRvdy5pbm5lckhlaWdodC8yIC0gbW91c2VZO1xyXG5cclxuICAgIGxheWVyLm1hcChmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciB3aWR0aFNoaWZ0ID0gd0Zyb21DZW50ZXIgKiAoKGtleSArIDEpLzEwMCk7XHJcbiAgICAgICAgdmFyIGhlaWdodFNoaWZ0ID0gaEZyb21DZW50ZXIgKiAoKGtleSArIDEpLzEwMCk7XHJcbiAgICAgICAgJCh2YWx1ZSkuY3NzKHtcclxuICAgICAgICAgICAgJ3RyYW5zZm9ybSc6J3RyYW5zbGF0ZTNkKCcgKyB3aWR0aFNoaWZ0ICsgJ3B4LCAnICsgaGVpZ2h0U2hpZnQgKyAncHgsIDBweCknXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG59KTsiLCIvL1xyXG4vLyBQQVJBTExBWCBTQ1JPTExcclxudmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgYmcgPSAkKCcuaGVhZGVyX19iZycpLFxyXG4gICAgICAgIHVzZXIgPSAkKCcuYXZhdGFyJyksXHJcbiAgICAgICAgc2VjdGlvblRleHQgPSAkKCcuaGVhZGVyX19iZy10ZXh0LWltZycpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbW92ZSA6IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuICAgICAgICAgICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJScsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywgMCknO1xyXG5cclxuICAgICAgICAgICAgYmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nIDogdHJhbnNmb3JtU3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJyA6IHRyYW5zZm9ybVN0cmluZ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0IDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZShzZWN0aW9uVGV4dCwgd1Njcm9sbCwgOCk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCA1KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7XHJcblxyXG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgd1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgIHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcbn0pOyAvLyAtPiBzY3JvbGxfZW5kOyIsIi8vcHJlbG9hZGVyXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBpbWdzID0gW107XHJcblxyXG4gICAgJC5lYWNoKCQoJyonKSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgICAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRzID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykuc3BsaXQoJywnKSxcclxuICAgICAgICAgICAgaW1nID0gJHRoaXMuaXMoJ2ltZycpO1xyXG5cclxuICAgICAgICBpZiAoYmFja2dyb3VuZHMgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICQuZWFjaChiYWNrZ3JvdW5kcywgZnVuY3Rpb24gKGluZGV4LCBiYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuICAgICAgICAgICAgICAgIGltZ3MucHVzaChwYXRoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbWcpIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSAkdGhpcy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICBpbWdzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgaW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICAgICAgc3JjOiBpbWdzW2ldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW1hZ2Uub24oe1xyXG4gICAgICAgICAgICBsb2FkIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRQZXJjZW50cyh0b3RhbCwgY3VycmVudCkge1xyXG4gICAgICAgIHZhciBwZXJjZW50ID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcblxyXG4gICAgICAgIGlmIChwZXJjZW50ID49IDEwMCkge1xyXG4gICAgICAgICAgICAkKCcucHJlbG9hZGVyJykuZmFkZU91dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLnByZWxvYWRlcl9fcGVyY2VudHMnKS50ZXh0KHBlcmNlbnQgKyAnJScpO1xyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBbGV4ZXkgb24gMTItRGVjLTE2LlxyXG4gKi9cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjdGFiLWFib3V0X19jb250ZW50Jykub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgZm9ybURhdGEgPSAkKHRoaXMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZvcm1EYXRhKTtcclxuICAgICAgICB2YXIgZGJGaWVsZHMgPSBbJ3NraWxsJywgJ3ZhbHVlJ107XHJcblxyXG4gICAgICAgIC8vIGFqYXgg0LfQsNC/0YDQvtGBXHJcbiAgICAgICAgdmFyIGRlZk9iaiA9IGNvbW1vbkFqYXguYWpheEZvcm0oZm9ybURhdGEsICcuL3NhdmVTa2lsbHMnLCBkYkZpZWxkcyk7XHJcbiAgICAgICAgaWYoZGVmT2JqKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NraWxscyB1cGRhdGVkJyk7XHJcbiAgICAgICAgICAgIGRlZk9iai5kb25lKGZ1bmN0aW9uIChhbnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFucyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSkoKVxyXG4iLCIiLCIkKGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnYVtocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpICYmIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbXkgPSB7fTtcclxuXHJcbiAgICBhZGRMaXN0ZW5lcigpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZExpc3RlbmVyKCkge1xyXG4gICAgICAgICQoJ2Zvcm0nKS5vbignc3VibWl0Jywgc3VibWl0Rm9ybSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWJtaXRGb3JtKGV2KSB7XHJcblxyXG4gICAgICAgIHZhciAkZm9ybSA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIHVybD0nJyxcclxuICAgICAgICAgICAgZGVmT2JqZWN0ICAgPSBhamF4Rm9ybSgkZm9ybSwgdXJsKTtcclxuXHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gYWpheEZvcm0oZm9ybSwgdXJsKSB7XHJcbiAgICAgICAgaWYoIXZhbGlkYXRpb24udmFsaWRhdGVGb3JtKGZvcm0pKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
