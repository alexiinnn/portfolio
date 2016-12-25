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

    var ajaxForm = function (formData, url) {
        if (!validation.validateForm(formData))
            return false;
        var elements = formData.find('input, textarea').not('input[type="hidden"]');
        var Data = [];

        $.each(elements, function (index, element) {
            var $element = $(element);
            if ($element.prop("defaultValue") != $element.prop("value")){
                var pushElement = $element.serializeArray();
                Data.push(pushElement[0]);
            }
        });
        var ajaxData = JSON.stringify(Data);

        var result = $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: url,
            type: 'POST',
            data: ajaxData,
            // async: false,
            processData: false,
            success: function (ans) {
                console.log(ans);
                if (typeof ans.redirect == 'string')
                    window.location = ans.redirect;
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
            if ($('#human-checkbox').length > 0) {
                if ((!$('#human-checkbox').is(":checked")) || (!$('#bot-check__yes').is(":checked"))) {
                    $('.auth__response').text("Only for human!");
                    return false;

                }
            }
            var elements = form.find('input, textarea').not('input[type="hidden"]'),
                valid = true;

            $.each(elements, function (index, element) {
                var $element = $(element),
                    value = $element.val();

                if (!value.length) {
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
/**
 * Created by Alexey on 17-Dec-16.
 */

//login form
(function () {
    $('#login').on("submit", function (ev) {
        ev.preventDefault();
        $('.auth__response').text("");
        // $('.preloader').fadeIn();
        var formData = $(this);
        console.log(formData);
        // ajax запрос
        var defObj = commonAjax.ajaxForm(formData, './login');
        if(defObj){
            defObj.done(function (ans) {
                // $('.preloader').fadeOut();
                console.log("after"+ans);
                // $('.pop-up__message').text(ans);
                // $('.pop-up__log').fadeIn();
                // location.reload();

            })
        }
    })
})()

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
//update skills via admin page
(function () {
    $('#tab-about__content').on("submit", function (ev) {
        ev.preventDefault();
        $('.preloader').fadeIn();
        var formData = $(this);

        // ajax запрос
        var defObj = commonAjax.ajaxForm(formData, './saveSkills');
        if(defObj){
            defObj.done(function (ans) {
                $('.preloader').fadeOut();
                $('.pop-up__message').text(ans);
                $('.pop-up__log').fadeIn();
                // location.reload();

            })
        }




    //
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNpcmNsZVNraWxsLmpzIiwiY29tbW9uQWpheC5qcyIsImZvcm1WYWxpZGF0aW9uLmpzIiwiaGlnaGxpZ2h0U2lkZWJhci5qcyIsImxvZ2luLmpzIiwicGFyYWxsYXhNb3VzZS5qcyIsInBhcmFsbGF4U2Nyb2xsLmpzIiwicHJlbG9hZGVyLmpzIiwic2F2ZVNraWxscy5qcyIsInNsaWRlckNvb2wuanMiLCJzbW9vdGhTY3JvbGwuanMiLCJzdWJtaXRDYXRjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGV2ZW50TGlzdGVuZXJzID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcjdG9nZ2xlJykub24oJ2NsaWNrJywgX3RvZ2dsZU5hdik7XHJcbiAgICAgICAgJCgnLmFuZ2xlLWRvd24nKS5vbignY2xpY2snLCBfYW5nbGVEb3duU2Nyb2xsKTtcclxuICAgICAgICAkKCcuYW5nbGUtdXAnKS5vbignY2xpY2snLCBfYW5nbGVVcFNjcm9sbCk7XHJcbiAgICAgICAgJCgnLmF1dGhfX3RvZ2dsZS1idG4nKS5vbignY2xpY2snLF9sb2dJbik7XHJcbiAgICAgICAgJCgnLmJ0bi1ob21lJykub24oJ2NsaWNrJyxfaG9tZSk7XHJcbiAgICAgICAgJCgnLnN3aXBlLW92ZXJsYXknKS5vbignY2xpY2snLCBfc3dpcGUpO1xyXG4gICAgICAgICQoJy5zd2lwZScpLm9uKCdjbGljaycsIF9zd2lwZSk7XHJcbiAgICAgICAgJCgnLnNsaWRlcl9fYXJyb3ctZG93bicpLm9uKCdjbGljaycsIF9zbGlkZXJQcmV2KTtcclxuICAgICAgICAkKCcuc2xpZGVyX19hcnJvdy11cCcpLm9uKCdjbGljaycsIF9zbGlkZXJOZXh0KTtcclxuICAgICAgICAkKCcuYnV0dG9uX2NvbnRhaW5lcicpLm9uKCdjbGljaycsIF9oaWRlU2Nyb2xsKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gTkFWaWdhdGlvblxyXG4gICAgdmFyIF90b2dnbGVOYXYgPSBmdW5jdGlvbihldikge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoJyNvdmVybGF5JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9hbmdsZS1kb3duXHJcbiAgICB2YXIgX2FuZ2xlRG93blNjcm9sbCA9IGZ1bmN0aW9uIChldil7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuICAgICAgICAkKCdodG1sLGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IGhlaWdodH0sIDUwMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vYW5nbGUtdXBcclxuICAgIHZhciBfYW5nbGVVcFNjcm9sbCA9IGZ1bmN0aW9uIChldil7XHJcbiAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgNTAwKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9sb2cgaW4gdG9nZ2xlXHJcbiAgICB2YXIgX2xvZ0luID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJCgnLmF1dGhfX3RvZ2dsZS1idG4nKS5jc3MoJ3Zpc2liaWxpdHknLCdoaWRkZW4nKTtcclxuICAgICAgICAkKCcud2VsY29tZV9fbWVudScpLmNzcygndHJhbnNmb3JtJywncm90YXRlWSgxODBkZWcpJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vaG9tZSB0b2dnbGVcclxuICAgIHZhciBfaG9tZSA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICQoJy5hdXRoX190b2dnbGUtYnRuJykuY3NzKCd2aXNpYmlsaXR5JywndmlzaWJsZScpO1xyXG4gICAgICAgICQoJy53ZWxjb21lX19tZW51JykuY3NzKCd0cmFuc2Zvcm0nLCdyb3RhdGVZKDBkZWcpJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vYmxvZ19zd2lwZV9zaWRlYmFyXHJcbiAgICB2YXIgX3N3aXBlID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJCgnLnNpZGViYXInKS50b2dnbGVDbGFzcygnc2lkZWJhci1vcGVuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9zbGlkZXIgcHJldmlvdXMgd29ya1xyXG4gICAgdmFyICRzbGlkZXJfbGlzdF9yZXZlcnNlID0gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtcmV2ZXJzZScpO1xyXG4gICAgdmFyICRzbGlkZXJfbGlzdF9zdHJhaWdodCA9ICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXN0cmFpZ2h0Jyk7XHJcbiAgICB2YXIgJHNsaWRlcl9saXN0X2JpZyA9ICQoJy5zbGlkZXJfX2xpc3RfX2JpZycpO1xyXG4gICAgdmFyICR3b3JrX19kZXNjX19saXN0ID0gJCgnLndvcmtfX2Rlc2NfX2xpc3QnKTtcclxuXHJcbiAgICB2YXIgX3NsaWRlclByZXYgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAvLyAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1zdHJhaWdodCcpLmNzcygndHJhbnNmb3JtJywndHJhbnNsYXRlWSgtMTAwJSknKTtcclxuICAgICAgICAvLyAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1yZXZlcnNlJykuY3NzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGVZKDAlKScpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9yZXZlcnNlLmNoaWxkcmVuKCkuZmlyc3QoKS5pbnNlcnRBZnRlcigkc2xpZGVyX2xpc3RfcmV2ZXJzZS5jaGlsZHJlbigpLmxhc3QoKSk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X3N0cmFpZ2h0LmNoaWxkcmVuKCkubGFzdCgpLmluc2VydEJlZm9yZSgkc2xpZGVyX2xpc3Rfc3RyYWlnaHQuY2hpbGRyZW4oKS5maXJzdCgpKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3RfYmlnLmNoaWxkcmVuKCkubGFzdCgpLmluc2VydEJlZm9yZSgkc2xpZGVyX2xpc3RfYmlnLmNoaWxkcmVuKCkuZmlyc3QoKSk7XHJcbiAgICAgICAgJHdvcmtfX2Rlc2NfX2xpc3QuY2hpbGRyZW4oKS5sYXN0KCkuaW5zZXJ0QmVmb3JlKCR3b3JrX19kZXNjX19saXN0LmNoaWxkcmVuKCkuZmlyc3QoKSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL3NsaWRlciBuZXh0IHdvcmtcclxuICAgIHZhciBfc2xpZGVyTmV4dCA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIC8vICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXJldmVyc2UnKS5jc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZVkoLTEwMCUpJyk7XHJcbiAgICAgICAgLy8gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtc3RyYWlnaHQnKS5jc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZVkoMCUpJyk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X3N0cmFpZ2h0LmNoaWxkcmVuKCkuZmlyc3QoKS5pbnNlcnRBZnRlcigkc2xpZGVyX2xpc3Rfc3RyYWlnaHQuY2hpbGRyZW4oKS5sYXN0KCkpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9yZXZlcnNlLmNoaWxkcmVuKCkubGFzdCgpLmluc2VydEJlZm9yZSgkc2xpZGVyX2xpc3RfcmV2ZXJzZS5jaGlsZHJlbigpLmZpcnN0KCkpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9iaWcuY2hpbGRyZW4oKS5maXJzdCgpLmluc2VydEFmdGVyKCRzbGlkZXJfbGlzdF9iaWcuY2hpbGRyZW4oKS5sYXN0KCkpO1xyXG4gICAgICAgICR3b3JrX19kZXNjX19saXN0LmNoaWxkcmVuKCkuZmlyc3QoKS5pbnNlcnRBZnRlcigkd29ya19fZGVzY19fbGlzdC5jaGlsZHJlbigpLmxhc3QoKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vdG9nZ2xlIHNjcm9sbCBiYXIgb24gbmF2IGV4cGFuZFxyXG4gICAgdmFyIF9oaWRlU2Nyb2xsID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdoaWRlLXNjcm9sbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGluaXRcclxuICAgICAgICB9O1xyXG5cclxufSkoKTtcclxuXHJcbmV2ZW50TGlzdGVuZXJzLmluaXQoKTtcclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBbGV4ZXkgb24gMDktRGVjLTE2LlxyXG4gKi9cclxuLy9TVkcgYW5pbWF0ZWQgY2lyY2xlIGxldmVsc1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGlzUmVuZGVyZWQgPSAwO1xyXG4gICAgdmFyIHNraWxsQ2lyY2xlc09iaiA9IFtdO1xyXG4gICAgJC5lYWNoKCQoJy5za2lsbC1jaXJjbGUnKSwgZnVuY3Rpb24gKGluZCwgdmFsKSB7XHJcbiAgICAgICAgdmFyIGNpcmNsZUJvdHRvbSA9ICQodGhpcykuaGVpZ2h0KCkgKyAkKHRoaXMpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICBza2lsbENpcmNsZXNPYmoucHVzaCh7XHJcbiAgICAgICAgICAgIGNpcmNsZTogdmFsLFxyXG4gICAgICAgICAgICBjaXJjbGVCb3R0b206IGNpcmNsZUJvdHRvbSxcclxuICAgICAgICAgICAgaXNSZW5kZXJlZDogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlzUmVuZGVyZWQrKztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnMSAnKyBpc1JlbmRlcmVkKTtcclxuICAgIH0pXHJcblxyXG4gICAgdmFyIHNraWxsQ2lyY2xlU2V0ID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgdmFyIHNjcm9sbEJvdHRvbSA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhzY3JvbGxCb3R0b20pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCc0ICcraXNSZW5kZXJlZCk7XHJcbiAgICAgICAgJC5lYWNoKHNraWxsQ2lyY2xlc09iaiwgZnVuY3Rpb24gKGluZCwgdmFsKSB7XHJcbiAgICAgICAgICAgIGlmICghdmFsWydpc1JlbmRlcmVkJ10gJiYgc2Nyb2xsQm90dG9tID4gdmFsWydjaXJjbGVCb3R0b20nXSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRjaXJjbGUgPSAkKHZhbFsnY2lyY2xlJ10pO1xyXG4gICAgICAgICAgICAgICAgdmFyICRjaXJjbGVMZXZlbCA9ICRjaXJjbGUuYXR0cignZGF0YS1sZXZlbCcpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRjaXJjbGVCYXIgPSAkY2lyY2xlLmNoaWxkcmVuKCcuY2lyY2xlLWJhcicpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRjYWxjQ2lyY2xlTGV2ZWwgPSAoJGNpcmNsZUJhci5jc3MoJ3N0cm9rZS1kYXNob2Zmc2V0Jykuc2xpY2UoMCwgLTIpKSAqICgxMDAgLSAkY2lyY2xlTGV2ZWwpIC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgJGNpcmNsZUJhci5jc3MoJ3N0cm9rZS1kYXNob2Zmc2V0JywgJGNhbGNDaXJjbGVMZXZlbCk7XHJcbiAgICAgICAgICAgICAgICB2YWxbJ2lzUmVuZGVyZWQnXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpc1JlbmRlcmVkLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXNSZW5kZXJlZDw9MCl7XHJcbiAgICAgICAgICAgIC8vc2h1dGRvd24gZXZlbnRMaXN0ZW5lclxyXG4gICAgICAgICAgICAkKHdpbmRvdykub2ZmKCdzY3JvbGwnLCBza2lsbENpcmNsZVNldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoaXNSZW5kZXJlZCA+IDApIHtcclxuICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIHNraWxsQ2lyY2xlU2V0KTtcclxuICAgIH07XHJcblxyXG59KSgpOyIsInZhciBjb21tb25BamF4ID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgYWpheEZvcm0gPSBmdW5jdGlvbiAoZm9ybURhdGEsIHVybCkge1xyXG4gICAgICAgIGlmICghdmFsaWRhdGlvbi52YWxpZGF0ZUZvcm0oZm9ybURhdGEpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gZm9ybURhdGEuZmluZCgnaW5wdXQsIHRleHRhcmVhJykubm90KCdpbnB1dFt0eXBlPVwiaGlkZGVuXCJdJyk7XHJcbiAgICAgICAgdmFyIERhdGEgPSBbXTtcclxuXHJcbiAgICAgICAgJC5lYWNoKGVsZW1lbnRzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKCRlbGVtZW50LnByb3AoXCJkZWZhdWx0VmFsdWVcIikgIT0gJGVsZW1lbnQucHJvcChcInZhbHVlXCIpKXtcclxuICAgICAgICAgICAgICAgIHZhciBwdXNoRWxlbWVudCA9ICRlbGVtZW50LnNlcmlhbGl6ZUFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICBEYXRhLnB1c2gocHVzaEVsZW1lbnRbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGFqYXhEYXRhID0gSlNPTi5zdHJpbmdpZnkoRGF0YSk7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICBkYXRhOiBhamF4RGF0YSxcclxuICAgICAgICAgICAgLy8gYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChhbnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFucyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFucy5yZWRpcmVjdCA9PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBhbnMucmVkaXJlY3Q7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWpheEZvcm06IGFqYXhGb3JtXHJcbiAgICB9O1xyXG5cclxufSkoKTsiLCJ2YXIgdmFsaWRhdGlvbiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdmFsaWRhdGVGb3JtID0gZnVuY3Rpb24gKGZvcm0pIHtcclxuICAgICAgICAgICAgaWYgKCQoJyNodW1hbi1jaGVja2JveCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICgoISQoJyNodW1hbi1jaGVja2JveCcpLmlzKFwiOmNoZWNrZWRcIikpIHx8ICghJCgnI2JvdC1jaGVja19feWVzJykuaXMoXCI6Y2hlY2tlZFwiKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYXV0aF9fcmVzcG9uc2UnKS50ZXh0KFwiT25seSBmb3IgaHVtYW4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKS5ub3QoJ2lucHV0W3R5cGU9XCJoaWRkZW5cIl0nKSxcclxuICAgICAgICAgICAgICAgIHZhbGlkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaChlbGVtZW50cywgZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKGVsZW1lbnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJGVsZW1lbnQudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfYWRkRXJyb3IoJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2YWxpZDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJ2Zvcm0nKS5vbigna2V5ZG93bicsICcuaGFzLWVycm9yJywgX3JlbW92ZUVycm9yKTtcclxuICAgICAgICAgICAgJCgnZm9ybScpLm9uKCdjbGljaycsICcuaGFzLWVycm9yJywgX3JlbW92ZUVycm9yKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfYWRkRXJyb3IgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfcmVtb3ZlRXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBpbml0LFxyXG4gICAgICAgIHZhbGlkYXRlRm9ybTogdmFsaWRhdGVGb3JtXHJcbiAgICB9O1xyXG5cclxufSkoKTtcclxuXHJcbnZhbGlkYXRpb24uaW5pdCgpOyIsInZhciBhQ2hpbGRyZW4gPSAkKFwiLnNpZGViYXJfX2xpc3QgbGlcIikuY2hpbGRyZW4oKTsgLy8gZmluZCB0aGUgYSBjaGlsZHJlbiBvZiB0aGUgbGlzdCBpdGVtc1xyXG52YXIgYUFycmF5ID0gW107IC8vIGNyZWF0ZSB0aGUgZW1wdHkgYUFycmF5XHJcbmZvciAodmFyIGk9MDsgaSA8IGFDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGFDaGlsZCA9IGFDaGlsZHJlbltpXTtcclxuICAgIHZhciBhaHJlZiA9ICQoYUNoaWxkKS5hdHRyKCdocmVmJyk7XHJcbiAgICBhQXJyYXkucHVzaChhaHJlZik7XHJcbn0gLy8gdGhpcyBmb3IgbG9vcCBmaWxscyB0aGUgYUFycmF5IHdpdGggYXR0cmlidXRlIGhyZWYgdmFsdWVzXHJcblxyXG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgd2luZG93UG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpOyAvLyBnZXQgdGhlIG9mZnNldCBvZiB0aGUgd2luZG93IGZyb20gdGhlIHRvcCBvZiBwYWdlXHJcbiAgICB2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpOyAvLyBnZXQgdGhlIGhlaWdodCBvZiB0aGUgd2luZG93XHJcbiAgICB2YXIgZG9jSGVpZ2h0ID0gJChkb2N1bWVudCkuaGVpZ2h0KCk7XHJcblxyXG4gICAgZm9yICh2YXIgaT0wOyBpIDwgYUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHRoZUlEID0gYUFycmF5W2ldO1xyXG4gICAgICAgIHZhciBkaXZQb3MgPSAkKHRoZUlEKS5vZmZzZXQoKS50b3A7IC8vIGdldCB0aGUgb2Zmc2V0IG9mIHRoZSBkaXYgZnJvbSB0aGUgdG9wIG9mIHBhZ2VcclxuICAgICAgICB2YXIgZGl2SGVpZ2h0ID0gJCh0aGVJRCkuaGVpZ2h0KCk7IC8vIGdldCB0aGUgaGVpZ2h0IG9mIHRoZSBkaXYgaW4gcXVlc3Rpb25cclxuICAgICAgICBpZiAod2luZG93UG9zICs0MCA+PSBkaXZQb3MgJiYgd2luZG93UG9zIDwgKGRpdlBvcyArIGRpdkhlaWdodCkpIHtcclxuICAgICAgICAgICAgJChcImFbaHJlZj0nXCIgKyB0aGVJRCArIFwiJ11cIikucGFyZW50KCkuYWRkQ2xhc3MoXCJzaWRlYmFyX19pdGVtLWFjdGl2ZVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiYVtocmVmPSdcIiArIHRoZUlEICsgXCInXVwiKS5wYXJlbnQoKS5yZW1vdmVDbGFzcyhcInNpZGViYXJfX2l0ZW0tYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQWxleGV5IG9uIDE3LURlYy0xNi5cclxuICovXHJcblxyXG4vL2xvZ2luIGZvcm1cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyNsb2dpbicpLm9uKFwic3VibWl0XCIsIGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnLmF1dGhfX3Jlc3BvbnNlJykudGV4dChcIlwiKTtcclxuICAgICAgICAvLyAkKCcucHJlbG9hZGVyJykuZmFkZUluKCk7XHJcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gJCh0aGlzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtRGF0YSk7XHJcbiAgICAgICAgLy8gYWpheCDQt9Cw0L/RgNC+0YFcclxuICAgICAgICB2YXIgZGVmT2JqID0gY29tbW9uQWpheC5hamF4Rm9ybShmb3JtRGF0YSwgJy4vbG9naW4nKTtcclxuICAgICAgICBpZihkZWZPYmope1xyXG4gICAgICAgICAgICBkZWZPYmouZG9uZShmdW5jdGlvbiAoYW5zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAkKCcucHJlbG9hZGVyJykuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZnRlclwiK2Fucyk7XHJcbiAgICAgICAgICAgICAgICAvLyAkKCcucG9wLXVwX19tZXNzYWdlJykudGV4dChhbnMpO1xyXG4gICAgICAgICAgICAgICAgLy8gJCgnLnBvcC11cF9fbG9nJykuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbi5yZWxvYWQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSkoKVxyXG4iLCIvL1xyXG4vL01vdXNlIHBhcmFsbGF4XHJcblxyXG52YXIgbGF5ZXIgPSAkKCcucGFyYWxsYXgnKS5maW5kKCcucGFyYWxsYXhfX2xheWVyJyk7XHJcbiQod2luZG93KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICB2YXIgbW91c2VYID0gZXYucGFnZVgsXHJcbiAgICAgICAgbW91c2VZID0gZXYucGFnZVksXHJcbiAgICAgICAgd0Zyb21DZW50ZXIgPSB3aW5kb3cuaW5uZXJXaWR0aC8yIC0gbW91c2VYLFxyXG4gICAgICAgIGhGcm9tQ2VudGVyID0gd2luZG93LmlubmVySGVpZ2h0LzIgLSBtb3VzZVk7XHJcblxyXG4gICAgbGF5ZXIubWFwKGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIHdpZHRoU2hpZnQgPSB3RnJvbUNlbnRlciAqICgoa2V5ICsgMSkvMTAwKTtcclxuICAgICAgICB2YXIgaGVpZ2h0U2hpZnQgPSBoRnJvbUNlbnRlciAqICgoa2V5ICsgMSkvMTAwKTtcclxuICAgICAgICAkKHZhbHVlKS5jc3Moe1xyXG4gICAgICAgICAgICAndHJhbnNmb3JtJzondHJhbnNsYXRlM2QoJyArIHdpZHRoU2hpZnQgKyAncHgsICcgKyBoZWlnaHRTaGlmdCArICdweCwgMHB4KSdcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcbn0pOyIsIi8vXHJcbi8vIFBBUkFMTEFYIFNDUk9MTFxyXG52YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24oKXtcclxuICAgIHZhciBiZyA9ICQoJy5oZWFkZXJfX2JnJyksXHJcbiAgICAgICAgdXNlciA9ICQoJy5hdmF0YXInKSxcclxuICAgICAgICBzZWN0aW9uVGV4dCA9ICQoJy5oZWFkZXJfX2JnLXRleHQtaW1nJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb3ZlIDogZnVuY3Rpb24gKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG4gICAgICAgICAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJyxcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCcgKyBzdHJhZmUgKyAnLCAwKSc7XHJcblxyXG4gICAgICAgICAgICBibG9jay5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJ3RyYW5zZm9ybScgOiB0cmFuc2Zvcm1TdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nIDogdHJhbnNmb3JtU3RyaW5nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGluaXQgOiBmdW5jdGlvbiAod1Njcm9sbCkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIDQ1KTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKHNlY3Rpb25UZXh0LCB3U2Nyb2xsLCA4KTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTtcclxuXHJcbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcclxuICAgIHZhciB3U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgcGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxufSk7IC8vIC0+IHNjcm9sbF9lbmQ7IiwiLy9wcmVsb2FkZXJcclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGltZ3MgPSBbXTtcclxuXHJcbiAgICAkLmVhY2goJCgnKicpLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgYmFja2dyb3VuZHMgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5zcGxpdCgnLCcpLFxyXG4gICAgICAgICAgICBpbWcgPSAkdGhpcy5pcygnaW1nJyk7XHJcblxyXG4gICAgICAgIGlmIChiYWNrZ3JvdW5kcyAhPSAnbm9uZScpIHtcclxuICAgICAgICAgICAgJC5lYWNoKGJhY2tncm91bmRzLCBmdW5jdGlvbiAoaW5kZXgsIGJhY2tncm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xyXG4gICAgICAgICAgICAgICAgaW1ncy5wdXNoKHBhdGgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGltZykge1xyXG4gICAgICAgICAgICB2YXIgcGF0aCA9ICR0aGlzLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICAgICAgICAgIGltZ3MucHVzaChwYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdmFyIHBlcmNlbnRzVG90YWwgPSAxO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBpbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgICAgICBzcmM6IGltZ3NbaV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpbWFnZS5vbih7XHJcbiAgICAgICAgICAgIGxvYWQgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltZ3MubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFBlcmNlbnRzKHRvdGFsLCBjdXJyZW50KSB7XHJcbiAgICAgICAgdmFyIHBlcmNlbnQgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcclxuXHJcbiAgICAgICAgaWYgKHBlcmNlbnQgPj0gMTAwKSB7XHJcbiAgICAgICAgICAgICQoJy5wcmVsb2FkZXInKS5mYWRlT3V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50cycpLnRleHQocGVyY2VudCArICclJyk7XHJcbiAgICB9XHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFsZXhleSBvbiAxMi1EZWMtMTYuXHJcbiAqL1xyXG4vL3VwZGF0ZSBza2lsbHMgdmlhIGFkbWluIHBhZ2VcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyN0YWItYWJvdXRfX2NvbnRlbnQnKS5vbihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy5wcmVsb2FkZXInKS5mYWRlSW4oKTtcclxuICAgICAgICB2YXIgZm9ybURhdGEgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAvLyBhamF4INC30LDQv9GA0L7RgVxyXG4gICAgICAgIHZhciBkZWZPYmogPSBjb21tb25BamF4LmFqYXhGb3JtKGZvcm1EYXRhLCAnLi9zYXZlU2tpbGxzJyk7XHJcbiAgICAgICAgaWYoZGVmT2JqKXtcclxuICAgICAgICAgICAgZGVmT2JqLmRvbmUoZnVuY3Rpb24gKGFucykge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByZWxvYWRlcicpLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgICAgICQoJy5wb3AtdXBfX21lc3NhZ2UnKS50ZXh0KGFucyk7XHJcbiAgICAgICAgICAgICAgICAkKCcucG9wLXVwX19sb2cnKS5mYWRlSW4oKTtcclxuICAgICAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgLy9cclxuICAgIH0pXHJcbn0pKClcclxuIiwiIiwiJChmdW5jdGlvbigpIHtcclxuICAgICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxyXG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG15ID0ge307XHJcblxyXG4gICAgYWRkTGlzdGVuZXIoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRMaXN0ZW5lcigpIHtcclxuICAgICAgICAkKCdmb3JtJykub24oJ3N1Ym1pdCcsIHN1Ym1pdEZvcm0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3VibWl0Rm9ybShldikge1xyXG5cclxuICAgICAgICB2YXIgJGZvcm0gPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICB1cmw9JycsXHJcbiAgICAgICAgICAgIGRlZk9iamVjdCAgID0gYWpheEZvcm0oJGZvcm0sIHVybCk7XHJcblxyXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGFqYXhGb3JtKGZvcm0sIHVybCkge1xyXG4gICAgICAgIGlmKCF2YWxpZGF0aW9uLnZhbGlkYXRlRm9ybShmb3JtKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
