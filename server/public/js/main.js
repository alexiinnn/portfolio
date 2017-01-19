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
        $('.btn-clear').on('click', _resetMessageForm);
        $(document).ready(_initSlider);
        $(window).on('resize', _initSlider);
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

    //reset message form
    var _resetMessageForm = function (ev) {
        $('.btn-send').prop('disabled', false).text('Send');
    }

    //set slider description height
    var _initSlider = function (ev) {
        $work__desc__list = $('.work__desc__list');
        if (window.innerWidth<=992){
            $work__desc__list.css('height', 'auto');
        }
        else{
            var desktopHeight = $('.work__desc__item').length*100+'%';
            $work__desc__list.css('height', desktopHeight);
        }
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
    var $window = $(window);
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
        var scrollBottom = window.scrollY + $window.height();
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
            $window.off('scroll', skillCircleSet);
        }
    };

    //mobile Safari workaround
    var userAgent = window.navigator.userAgent;
    if (userAgent.match(/(iPad|iPhone|iPod)/i) ){
        $.each(skillCirclesObj, function (ind, val) {
            var $circle = $(val['circle']);
            var $circleLevel = $circle.attr('data-level');
            var $circleBar = $circle.children('.circle-bar');
            var $calcCircleLevel = ($circleBar.css('stroke-dashoffset').slice(0, -2)) * (100 - $circleLevel) / 100;
            $circleBar.css('stroke-dashoffset', $calcCircleLevel);
            val['isRendered'] = true;
        });
        isRendered=0;
    }

    if (isRendered > 0) {
        $window.on('scroll', skillCircleSet);
    };

})();
var commonAjax = (function () {

    var ajaxForm = function (formData, url) {
        if (!validation.validateForm(formData))
            return false;
        var elements = formData.find('input, textarea').not('input[type="hidden"]');
        var Data = {};

        $.each(elements, function (index, element) {
            var $element = $(element);
            if ($element.prop("defaultValue") != $element.prop("value")){
                // var pushElement = $element.serializeArray();
                // Data.push(pushElement[0]);
                Data[$element.prop("name")]=$element.prop("value");
                // console.log([$element.prop("name")]);
                // console.log($element.prop("name"));
                // console.log(Data[$element.prop("name")]);
            }
        });
        // console.log(Data);
        var ajaxData = JSON.stringify(Data);
        // console.log(ajaxData);
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
                // console.log(ans);

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
                    $('.auth__response').text("Human only!");
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
        // ajax запрос
        var formData = $(this);
        var defObj = commonAjax.ajaxForm(formData, './login');

        if(defObj){
            defObj.done(function (ans) {
                if (typeof ans.redirect == 'string'){
                    $('.btn-login').text(ans['status']);
                    window.location = ans.redirect;
                }
                else {
                    $('.auth__response').text(ans['status']);
                    $('.btn-login').prop('disabled', false).text('Log in');
                    // $('.preloader').fadeOut();
                    // console.log("after"+ans);
                    // $('.pop-up__message').text(ans);
                    // $('.pop-up__log').fadeIn();
                    // location.reload();
                }
            })
        }
    })
})();

/**
 * Created by Alexey on 17-Dec-16.
 */

//message form
(function () {
    $('#contact-us').on("submit", function (ev) {
        ev.preventDefault();
        var $btnSend = $('.btn-send');
        $btnSend.prop("disabled",true);
        $btnSend.text("Sending...");
        // $('.preloader').fadeIn();
        var formData = $(this);
        // console.log(formData);
        // ajax запрос
        var defObj = commonAjax.ajaxForm(formData, './message');
        if(defObj){
            defObj.done(function (ans) {
                console.log(ans);
                $btnSend.text(ans);
                // $('.preloader').fadeOut();
                // console.log("after"+ans);
                // $('.pop-up__message').text(ans);
                // $('.pop-up__log').fadeIn();
                // location.reload();
            })
        }
    })
})();

//
//Mouse parallax

var layer = $('.parallax').find('.parallax__layer');
var lastBg = layer.first().find('img');

//set backround size
var setBgSize = function () {
    var bgImgWidthRate = (document.documentElement.scrollHeight * lastBg.prop('naturalWidth') / (window.innerWidth * lastBg.prop('naturalHeight')));
    if (bgImgWidthRate < 1) {
        var bgImgHeightRate = 1 / bgImgWidthRate;
        var bgImgHeightShift = (1 - bgImgHeightRate* 1.1) / 2; //1.1 = 110% // 5% for every side of screen
        layer.find('img').css({'bottom': 100 * bgImgHeightShift + '%'});
    }
    else
        layer.find('img').css({'width': 100 * bgImgWidthRate + '%'});

}

lastBg.load(function() {
    setBgSize();
});


$(window).on('resize', function (ev) {
    setBgSize(ev);
});

$(window).on('mousemove', function (ev) {
    var mouseX = ev.pageX,
        mouseY = ev.pageY,
        wFromCenter = window.innerWidth / 2 - mouseX,
        hFromCenter = window.innerHeight / 2 - mouseY;

    layer.map(function (key, value) {
        var widthShift = wFromCenter * ((key + 1) / 100);
        var heightShift = hFromCenter * ((key + 1) / 100);
        $(value).css({
            'transform': 'translate3d(' + widthShift + 'px, ' + heightShift + 'px, 0px)'
        });
    })
});
//
// PARALLAX SCROLL
var parallax = (function () {
    var bg = $('.header__bg'),
        user = $('.avatar'),
        sectionText = $('.header__bg-text-img');

    return {
        move: function (block, windowScroll, strafeAmount) {
            var strafe = windowScroll / -strafeAmount + '%',
                transformString = 'translate3d(0,' + strafe + ', 0)';

            block.css({
                'transform': transformString,
                '-webkit-transform': transformString
            });
        },

        init: function (wScroll) {
            this.move(bg, wScroll, 45);
            this.move(sectionText, wScroll, 8);
            this.move(user, wScroll, 5);
        }
    }
}());

if (window.innerWidth>992) {
    $(window).scroll(function () {
        var wScroll = $(window).scrollTop();
        parallax.init(wScroll);
    }); // -> scroll_end;
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNpcmNsZVNraWxsLmpzIiwiY29tbW9uQWpheC5qcyIsImZvcm1WYWxpZGF0aW9uLmpzIiwiaGlnaGxpZ2h0U2lkZWJhci5qcyIsImxvZ2luLmpzIiwibWVzc2FnZS5qcyIsInBhcmFsbGF4TW91c2UuanMiLCJwYXJhbGxheFNjcm9sbC5qcyIsInByZWxvYWRlci5qcyIsInNhdmVTa2lsbHMuanMiLCJzbGlkZXJDb29sLmpzIiwic21vb3RoU2Nyb2xsLmpzIiwic3VibWl0Q2F0Y2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGV2ZW50TGlzdGVuZXJzID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcjdG9nZ2xlJykub24oJ2NsaWNrJywgX3RvZ2dsZU5hdik7XHJcbiAgICAgICAgJCgnLmFuZ2xlLWRvd24nKS5vbignY2xpY2snLCBfYW5nbGVEb3duU2Nyb2xsKTtcclxuICAgICAgICAkKCcuYW5nbGUtdXAnKS5vbignY2xpY2snLCBfYW5nbGVVcFNjcm9sbCk7XHJcbiAgICAgICAgJCgnLmF1dGhfX3RvZ2dsZS1idG4nKS5vbignY2xpY2snLF9sb2dJbik7XHJcbiAgICAgICAgJCgnLmJ0bi1ob21lJykub24oJ2NsaWNrJyxfaG9tZSk7XHJcbiAgICAgICAgJCgnLnN3aXBlLW92ZXJsYXknKS5vbignY2xpY2snLCBfc3dpcGUpO1xyXG4gICAgICAgICQoJy5zd2lwZScpLm9uKCdjbGljaycsIF9zd2lwZSk7XHJcbiAgICAgICAgJCgnLnNsaWRlcl9fYXJyb3ctZG93bicpLm9uKCdjbGljaycsIF9zbGlkZXJQcmV2KTtcclxuICAgICAgICAkKCcuc2xpZGVyX19hcnJvdy11cCcpLm9uKCdjbGljaycsIF9zbGlkZXJOZXh0KTtcclxuICAgICAgICAkKCcuYnV0dG9uX2NvbnRhaW5lcicpLm9uKCdjbGljaycsIF9oaWRlU2Nyb2xsKTtcclxuICAgICAgICAkKCcuYnRuLWNsZWFyJykub24oJ2NsaWNrJywgX3Jlc2V0TWVzc2FnZUZvcm0pO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KF9pbml0U2xpZGVyKTtcclxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIF9pbml0U2xpZGVyKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gTkFWaWdhdGlvblxyXG4gICAgdmFyIF90b2dnbGVOYXYgPSBmdW5jdGlvbihldikge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoJyNvdmVybGF5JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9hbmdsZS1kb3duXHJcbiAgICB2YXIgX2FuZ2xlRG93blNjcm9sbCA9IGZ1bmN0aW9uIChldil7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuICAgICAgICAkKCdodG1sLGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IGhlaWdodH0sIDUwMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vYW5nbGUtdXBcclxuICAgIHZhciBfYW5nbGVVcFNjcm9sbCA9IGZ1bmN0aW9uIChldil7XHJcbiAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgNTAwKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9sb2cgaW4gdG9nZ2xlXHJcbiAgICB2YXIgX2xvZ0luID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJCgnLmF1dGhfX3RvZ2dsZS1idG4nKS5jc3MoJ3Zpc2liaWxpdHknLCdoaWRkZW4nKTtcclxuICAgICAgICAkKCcud2VsY29tZV9fbWVudScpLmNzcygndHJhbnNmb3JtJywncm90YXRlWSgxODBkZWcpJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vaG9tZSB0b2dnbGVcclxuICAgIHZhciBfaG9tZSA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICQoJy5hdXRoX190b2dnbGUtYnRuJykuY3NzKCd2aXNpYmlsaXR5JywndmlzaWJsZScpO1xyXG4gICAgICAgICQoJy53ZWxjb21lX19tZW51JykuY3NzKCd0cmFuc2Zvcm0nLCdyb3RhdGVZKDBkZWcpJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vYmxvZ19zd2lwZV9zaWRlYmFyXHJcbiAgICB2YXIgX3N3aXBlID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJCgnLnNpZGViYXInKS50b2dnbGVDbGFzcygnc2lkZWJhci1vcGVuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9zbGlkZXIgcHJldmlvdXMgd29ya1xyXG4gICAgdmFyICRzbGlkZXJfbGlzdF9yZXZlcnNlID0gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtcmV2ZXJzZScpO1xyXG4gICAgdmFyICRzbGlkZXJfbGlzdF9zdHJhaWdodCA9ICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXN0cmFpZ2h0Jyk7XHJcbiAgICB2YXIgJHNsaWRlcl9saXN0X2JpZyA9ICQoJy5zbGlkZXJfX2xpc3RfX2JpZycpO1xyXG4gICAgdmFyICR3b3JrX19kZXNjX19saXN0ID0gJCgnLndvcmtfX2Rlc2NfX2xpc3QnKTtcclxuXHJcbiAgICB2YXIgX3NsaWRlclByZXYgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAvLyAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1zdHJhaWdodCcpLmNzcygndHJhbnNmb3JtJywndHJhbnNsYXRlWSgtMTAwJSknKTtcclxuICAgICAgICAvLyAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1yZXZlcnNlJykuY3NzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGVZKDAlKScpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9yZXZlcnNlLmNoaWxkcmVuKCkuZmlyc3QoKS5pbnNlcnRBZnRlcigkc2xpZGVyX2xpc3RfcmV2ZXJzZS5jaGlsZHJlbigpLmxhc3QoKSk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X3N0cmFpZ2h0LmNoaWxkcmVuKCkubGFzdCgpLmluc2VydEJlZm9yZSgkc2xpZGVyX2xpc3Rfc3RyYWlnaHQuY2hpbGRyZW4oKS5maXJzdCgpKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3RfYmlnLmNoaWxkcmVuKCkubGFzdCgpLmluc2VydEJlZm9yZSgkc2xpZGVyX2xpc3RfYmlnLmNoaWxkcmVuKCkuZmlyc3QoKSk7XHJcbiAgICAgICAgJHdvcmtfX2Rlc2NfX2xpc3QuY2hpbGRyZW4oKS5sYXN0KCkuaW5zZXJ0QmVmb3JlKCR3b3JrX19kZXNjX19saXN0LmNoaWxkcmVuKCkuZmlyc3QoKSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL3NsaWRlciBuZXh0IHdvcmtcclxuICAgIHZhciBfc2xpZGVyTmV4dCA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIC8vICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXJldmVyc2UnKS5jc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZVkoLTEwMCUpJyk7XHJcbiAgICAgICAgLy8gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtc3RyYWlnaHQnKS5jc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZVkoMCUpJyk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X3N0cmFpZ2h0LmNoaWxkcmVuKCkuZmlyc3QoKS5pbnNlcnRBZnRlcigkc2xpZGVyX2xpc3Rfc3RyYWlnaHQuY2hpbGRyZW4oKS5sYXN0KCkpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9yZXZlcnNlLmNoaWxkcmVuKCkubGFzdCgpLmluc2VydEJlZm9yZSgkc2xpZGVyX2xpc3RfcmV2ZXJzZS5jaGlsZHJlbigpLmZpcnN0KCkpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9iaWcuY2hpbGRyZW4oKS5maXJzdCgpLmluc2VydEFmdGVyKCRzbGlkZXJfbGlzdF9iaWcuY2hpbGRyZW4oKS5sYXN0KCkpO1xyXG4gICAgICAgICR3b3JrX19kZXNjX19saXN0LmNoaWxkcmVuKCkuZmlyc3QoKS5pbnNlcnRBZnRlcigkd29ya19fZGVzY19fbGlzdC5jaGlsZHJlbigpLmxhc3QoKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vdG9nZ2xlIHNjcm9sbCBiYXIgb24gbmF2IGV4cGFuZFxyXG4gICAgdmFyIF9oaWRlU2Nyb2xsID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdoaWRlLXNjcm9sbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcmVzZXQgbWVzc2FnZSBmb3JtXHJcbiAgICB2YXIgX3Jlc2V0TWVzc2FnZUZvcm0gPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAkKCcuYnRuLXNlbmQnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS50ZXh0KCdTZW5kJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9zZXQgc2xpZGVyIGRlc2NyaXB0aW9uIGhlaWdodFxyXG4gICAgdmFyIF9pbml0U2xpZGVyID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJHdvcmtfX2Rlc2NfX2xpc3QgPSAkKCcud29ya19fZGVzY19fbGlzdCcpO1xyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aDw9OTkyKXtcclxuICAgICAgICAgICAgJHdvcmtfX2Rlc2NfX2xpc3QuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB2YXIgZGVza3RvcEhlaWdodCA9ICQoJy53b3JrX19kZXNjX19pdGVtJykubGVuZ3RoKjEwMCsnJSc7XHJcbiAgICAgICAgICAgICR3b3JrX19kZXNjX19saXN0LmNzcygnaGVpZ2h0JywgZGVza3RvcEhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGluaXRcclxuICAgICAgICB9O1xyXG5cclxufSkoKTtcclxuXHJcbmV2ZW50TGlzdGVuZXJzLmluaXQoKTtcclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBbGV4ZXkgb24gMDktRGVjLTE2LlxyXG4gKi9cclxuLy9TVkcgYW5pbWF0ZWQgY2lyY2xlIGxldmVsc1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyICR3aW5kb3cgPSAkKHdpbmRvdyk7XHJcbiAgICB2YXIgaXNSZW5kZXJlZCA9IDA7XHJcbiAgICB2YXIgc2tpbGxDaXJjbGVzT2JqID0gW107XHJcbiAgICAkLmVhY2goJCgnLnNraWxsLWNpcmNsZScpLCBmdW5jdGlvbiAoaW5kLCB2YWwpIHtcclxuICAgICAgICB2YXIgY2lyY2xlQm90dG9tID0gJCh0aGlzKS5oZWlnaHQoKSArICQodGhpcykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgIHNraWxsQ2lyY2xlc09iai5wdXNoKHtcclxuICAgICAgICAgICAgY2lyY2xlOiB2YWwsXHJcbiAgICAgICAgICAgIGNpcmNsZUJvdHRvbTogY2lyY2xlQm90dG9tLFxyXG4gICAgICAgICAgICBpc1JlbmRlcmVkOiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaXNSZW5kZXJlZCsrO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCcxICcrIGlzUmVuZGVyZWQpO1xyXG4gICAgfSlcclxuXHJcbiAgICB2YXIgc2tpbGxDaXJjbGVTZXQgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICB2YXIgc2Nyb2xsQm90dG9tID0gd2luZG93LnNjcm9sbFkgKyAkd2luZG93LmhlaWdodCgpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNjcm9sbEJvdHRvbSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJzQgJytpc1JlbmRlcmVkKTtcclxuICAgICAgICAkLmVhY2goc2tpbGxDaXJjbGVzT2JqLCBmdW5jdGlvbiAoaW5kLCB2YWwpIHtcclxuICAgICAgICAgICAgaWYgKCF2YWxbJ2lzUmVuZGVyZWQnXSAmJiBzY3JvbGxCb3R0b20gPiB2YWxbJ2NpcmNsZUJvdHRvbSddKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNpcmNsZSA9ICQodmFsWydjaXJjbGUnXSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNpcmNsZUxldmVsID0gJGNpcmNsZS5hdHRyKCdkYXRhLWxldmVsJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNpcmNsZUJhciA9ICRjaXJjbGUuY2hpbGRyZW4oJy5jaXJjbGUtYmFyJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNhbGNDaXJjbGVMZXZlbCA9ICgkY2lyY2xlQmFyLmNzcygnc3Ryb2tlLWRhc2hvZmZzZXQnKS5zbGljZSgwLCAtMikpICogKDEwMCAtICRjaXJjbGVMZXZlbCkgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICAkY2lyY2xlQmFyLmNzcygnc3Ryb2tlLWRhc2hvZmZzZXQnLCAkY2FsY0NpcmNsZUxldmVsKTtcclxuICAgICAgICAgICAgICAgIHZhbFsnaXNSZW5kZXJlZCddID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlzUmVuZGVyZWQtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpc1JlbmRlcmVkPD0wKXtcclxuICAgICAgICAgICAgLy9zaHV0ZG93biBldmVudExpc3RlbmVyXHJcbiAgICAgICAgICAgICR3aW5kb3cub2ZmKCdzY3JvbGwnLCBza2lsbENpcmNsZVNldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL21vYmlsZSBTYWZhcmkgd29ya2Fyb3VuZFxyXG4gICAgdmFyIHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xyXG4gICAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvKGlQYWR8aVBob25lfGlQb2QpL2kpICl7XHJcbiAgICAgICAgJC5lYWNoKHNraWxsQ2lyY2xlc09iaiwgZnVuY3Rpb24gKGluZCwgdmFsKSB7XHJcbiAgICAgICAgICAgIHZhciAkY2lyY2xlID0gJCh2YWxbJ2NpcmNsZSddKTtcclxuICAgICAgICAgICAgdmFyICRjaXJjbGVMZXZlbCA9ICRjaXJjbGUuYXR0cignZGF0YS1sZXZlbCcpO1xyXG4gICAgICAgICAgICB2YXIgJGNpcmNsZUJhciA9ICRjaXJjbGUuY2hpbGRyZW4oJy5jaXJjbGUtYmFyJyk7XHJcbiAgICAgICAgICAgIHZhciAkY2FsY0NpcmNsZUxldmVsID0gKCRjaXJjbGVCYXIuY3NzKCdzdHJva2UtZGFzaG9mZnNldCcpLnNsaWNlKDAsIC0yKSkgKiAoMTAwIC0gJGNpcmNsZUxldmVsKSAvIDEwMDtcclxuICAgICAgICAgICAgJGNpcmNsZUJhci5jc3MoJ3N0cm9rZS1kYXNob2Zmc2V0JywgJGNhbGNDaXJjbGVMZXZlbCk7XHJcbiAgICAgICAgICAgIHZhbFsnaXNSZW5kZXJlZCddID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpc1JlbmRlcmVkPTA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzUmVuZGVyZWQgPiAwKSB7XHJcbiAgICAgICAgJHdpbmRvdy5vbignc2Nyb2xsJywgc2tpbGxDaXJjbGVTZXQpO1xyXG4gICAgfTtcclxuXHJcbn0pKCk7IiwidmFyIGNvbW1vbkFqYXggPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBhamF4Rm9ybSA9IGZ1bmN0aW9uIChmb3JtRGF0YSwgdXJsKSB7XHJcbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uLnZhbGlkYXRlRm9ybShmb3JtRGF0YSkpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgZWxlbWVudHMgPSBmb3JtRGF0YS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKS5ub3QoJ2lucHV0W3R5cGU9XCJoaWRkZW5cIl0nKTtcclxuICAgICAgICB2YXIgRGF0YSA9IHt9O1xyXG5cclxuICAgICAgICAkLmVhY2goZWxlbWVudHMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoJGVsZW1lbnQucHJvcChcImRlZmF1bHRWYWx1ZVwiKSAhPSAkZWxlbWVudC5wcm9wKFwidmFsdWVcIikpe1xyXG4gICAgICAgICAgICAgICAgLy8gdmFyIHB1c2hFbGVtZW50ID0gJGVsZW1lbnQuc2VyaWFsaXplQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIC8vIERhdGEucHVzaChwdXNoRWxlbWVudFswXSk7XHJcbiAgICAgICAgICAgICAgICBEYXRhWyRlbGVtZW50LnByb3AoXCJuYW1lXCIpXT0kZWxlbWVudC5wcm9wKFwidmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhbJGVsZW1lbnQucHJvcChcIm5hbWVcIildKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCRlbGVtZW50LnByb3AoXCJuYW1lXCIpKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKERhdGFbJGVsZW1lbnQucHJvcChcIm5hbWVcIildKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKERhdGEpO1xyXG4gICAgICAgIHZhciBhamF4RGF0YSA9IEpTT04uc3RyaW5naWZ5KERhdGEpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFqYXhEYXRhKTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gJC5hamF4KHtcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgZGF0YTogYWpheERhdGEsXHJcbiAgICAgICAgICAgIC8vIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoYW5zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhbnMpO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhamF4Rm9ybTogYWpheEZvcm1cclxuICAgIH07XHJcblxyXG59KSgpOyIsInZhciB2YWxpZGF0aW9uID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB2YWxpZGF0ZUZvcm0gPSBmdW5jdGlvbiAoZm9ybSkge1xyXG4gICAgICAgICAgICBpZiAoJCgnI2h1bWFuLWNoZWNrYm94JykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCghJCgnI2h1bWFuLWNoZWNrYm94JykuaXMoXCI6Y2hlY2tlZFwiKSkgfHwgKCEkKCcjYm90LWNoZWNrX195ZXMnKS5pcyhcIjpjaGVja2VkXCIpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5hdXRoX19yZXNwb25zZScpLnRleHQoXCJIdW1hbiBvbmx5IVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhJykubm90KCdpbnB1dFt0eXBlPVwiaGlkZGVuXCJdJyksXHJcbiAgICAgICAgICAgICAgICB2YWxpZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAkLmVhY2goZWxlbWVudHMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICRlbGVtZW50LnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdmFsdWUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2FkZEVycm9yKCRlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdmFsaWQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCdmb3JtJykub24oJ2tleWRvd24nLCAnLmhhcy1lcnJvcicsIF9yZW1vdmVFcnJvcik7XHJcbiAgICAgICAgICAgICQoJ2Zvcm0nKS5vbignY2xpY2snLCAnLmhhcy1lcnJvcicsIF9yZW1vdmVFcnJvcik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX2FkZEVycm9yID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3JlbW92ZUVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogaW5pdCxcclxuICAgICAgICB2YWxpZGF0ZUZvcm06IHZhbGlkYXRlRm9ybVxyXG4gICAgfTtcclxuXHJcbn0pKCk7XHJcblxyXG52YWxpZGF0aW9uLmluaXQoKTsiLCJ2YXIgYUNoaWxkcmVuID0gJChcIi5zaWRlYmFyX19saXN0IGxpXCIpLmNoaWxkcmVuKCk7IC8vIGZpbmQgdGhlIGEgY2hpbGRyZW4gb2YgdGhlIGxpc3QgaXRlbXNcclxudmFyIGFBcnJheSA9IFtdOyAvLyBjcmVhdGUgdGhlIGVtcHR5IGFBcnJheVxyXG5mb3IgKHZhciBpPTA7IGkgPCBhQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBhQ2hpbGQgPSBhQ2hpbGRyZW5baV07XHJcbiAgICB2YXIgYWhyZWYgPSAkKGFDaGlsZCkuYXR0cignaHJlZicpO1xyXG4gICAgYUFycmF5LnB1c2goYWhyZWYpO1xyXG59IC8vIHRoaXMgZm9yIGxvb3AgZmlsbHMgdGhlIGFBcnJheSB3aXRoIGF0dHJpYnV0ZSBocmVmIHZhbHVlc1xyXG5cclxuJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHdpbmRvd1BvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTsgLy8gZ2V0IHRoZSBvZmZzZXQgb2YgdGhlIHdpbmRvdyBmcm9tIHRoZSB0b3Agb2YgcGFnZVxyXG4gICAgdmFyIHdpbmRvd0hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTsgLy8gZ2V0IHRoZSBoZWlnaHQgb2YgdGhlIHdpbmRvd1xyXG4gICAgdmFyIGRvY0hlaWdodCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpO1xyXG5cclxuICAgIGZvciAodmFyIGk9MDsgaSA8IGFBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0aGVJRCA9IGFBcnJheVtpXTtcclxuICAgICAgICB2YXIgZGl2UG9zID0gJCh0aGVJRCkub2Zmc2V0KCkudG9wOyAvLyBnZXQgdGhlIG9mZnNldCBvZiB0aGUgZGl2IGZyb20gdGhlIHRvcCBvZiBwYWdlXHJcbiAgICAgICAgdmFyIGRpdkhlaWdodCA9ICQodGhlSUQpLmhlaWdodCgpOyAvLyBnZXQgdGhlIGhlaWdodCBvZiB0aGUgZGl2IGluIHF1ZXN0aW9uXHJcbiAgICAgICAgaWYgKHdpbmRvd1BvcyArNDAgPj0gZGl2UG9zICYmIHdpbmRvd1BvcyA8IChkaXZQb3MgKyBkaXZIZWlnaHQpKSB7XHJcbiAgICAgICAgICAgICQoXCJhW2hyZWY9J1wiICsgdGhlSUQgKyBcIiddXCIpLnBhcmVudCgpLmFkZENsYXNzKFwic2lkZWJhcl9faXRlbS1hY3RpdmVcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJChcImFbaHJlZj0nXCIgKyB0aGVJRCArIFwiJ11cIikucGFyZW50KCkucmVtb3ZlQ2xhc3MoXCJzaWRlYmFyX19pdGVtLWFjdGl2ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFsZXhleSBvbiAxNy1EZWMtMTYuXHJcbiAqL1xyXG5cclxuLy9sb2dpbiBmb3JtXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjbG9naW4nKS5vbihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy5hdXRoX19yZXNwb25zZScpLnRleHQoXCJcIik7XHJcbiAgICAgICAgLy8gYWpheCDQt9Cw0L/RgNC+0YFcclxuICAgICAgICB2YXIgZm9ybURhdGEgPSAkKHRoaXMpO1xyXG4gICAgICAgIHZhciBkZWZPYmogPSBjb21tb25BamF4LmFqYXhGb3JtKGZvcm1EYXRhLCAnLi9sb2dpbicpO1xyXG5cclxuICAgICAgICBpZihkZWZPYmope1xyXG4gICAgICAgICAgICBkZWZPYmouZG9uZShmdW5jdGlvbiAoYW5zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFucy5yZWRpcmVjdCA9PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bi1sb2dpbicpLnRleHQoYW5zWydzdGF0dXMnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gYW5zLnJlZGlyZWN0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmF1dGhfX3Jlc3BvbnNlJykudGV4dChhbnNbJ3N0YXR1cyddKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYnRuLWxvZ2luJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSkudGV4dCgnTG9nIGluJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gJCgnLnByZWxvYWRlcicpLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFmdGVyXCIrYW5zKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAkKCcucG9wLXVwX19tZXNzYWdlJykudGV4dChhbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICQoJy5wb3AtdXBfX2xvZycpLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0pKCk7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFsZXhleSBvbiAxNy1EZWMtMTYuXHJcbiAqL1xyXG5cclxuLy9tZXNzYWdlIGZvcm1cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyNjb250YWN0LXVzJykub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgJGJ0blNlbmQgPSAkKCcuYnRuLXNlbmQnKTtcclxuICAgICAgICAkYnRuU2VuZC5wcm9wKFwiZGlzYWJsZWRcIix0cnVlKTtcclxuICAgICAgICAkYnRuU2VuZC50ZXh0KFwiU2VuZGluZy4uLlwiKTtcclxuICAgICAgICAvLyAkKCcucHJlbG9hZGVyJykuZmFkZUluKCk7XHJcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gJCh0aGlzKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmb3JtRGF0YSk7XHJcbiAgICAgICAgLy8gYWpheCDQt9Cw0L/RgNC+0YFcclxuICAgICAgICB2YXIgZGVmT2JqID0gY29tbW9uQWpheC5hamF4Rm9ybShmb3JtRGF0YSwgJy4vbWVzc2FnZScpO1xyXG4gICAgICAgIGlmKGRlZk9iail7XHJcbiAgICAgICAgICAgIGRlZk9iai5kb25lKGZ1bmN0aW9uIChhbnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFucyk7XHJcbiAgICAgICAgICAgICAgICAkYnRuU2VuZC50ZXh0KGFucyk7XHJcbiAgICAgICAgICAgICAgICAvLyAkKCcucHJlbG9hZGVyJykuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJhZnRlclwiK2Fucyk7XHJcbiAgICAgICAgICAgICAgICAvLyAkKCcucG9wLXVwX19tZXNzYWdlJykudGV4dChhbnMpO1xyXG4gICAgICAgICAgICAgICAgLy8gJCgnLnBvcC11cF9fbG9nJykuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59KSgpO1xyXG4iLCIvL1xyXG4vL01vdXNlIHBhcmFsbGF4XHJcblxyXG52YXIgbGF5ZXIgPSAkKCcucGFyYWxsYXgnKS5maW5kKCcucGFyYWxsYXhfX2xheWVyJyk7XHJcbnZhciBsYXN0QmcgPSBsYXllci5maXJzdCgpLmZpbmQoJ2ltZycpO1xyXG5cclxuLy9zZXQgYmFja3JvdW5kIHNpemVcclxudmFyIHNldEJnU2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBiZ0ltZ1dpZHRoUmF0ZSA9IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0ICogbGFzdEJnLnByb3AoJ25hdHVyYWxXaWR0aCcpIC8gKHdpbmRvdy5pbm5lcldpZHRoICogbGFzdEJnLnByb3AoJ25hdHVyYWxIZWlnaHQnKSkpO1xyXG4gICAgaWYgKGJnSW1nV2lkdGhSYXRlIDwgMSkge1xyXG4gICAgICAgIHZhciBiZ0ltZ0hlaWdodFJhdGUgPSAxIC8gYmdJbWdXaWR0aFJhdGU7XHJcbiAgICAgICAgdmFyIGJnSW1nSGVpZ2h0U2hpZnQgPSAoMSAtIGJnSW1nSGVpZ2h0UmF0ZSogMS4xKSAvIDI7IC8vMS4xID0gMTEwJSAvLyA1JSBmb3IgZXZlcnkgc2lkZSBvZiBzY3JlZW5cclxuICAgICAgICBsYXllci5maW5kKCdpbWcnKS5jc3Moeydib3R0b20nOiAxMDAgKiBiZ0ltZ0hlaWdodFNoaWZ0ICsgJyUnfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgbGF5ZXIuZmluZCgnaW1nJykuY3NzKHsnd2lkdGgnOiAxMDAgKiBiZ0ltZ1dpZHRoUmF0ZSArICclJ30pO1xyXG5cclxufVxyXG5cclxubGFzdEJnLmxvYWQoZnVuY3Rpb24oKSB7XHJcbiAgICBzZXRCZ1NpemUoKTtcclxufSk7XHJcblxyXG5cclxuJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgIHNldEJnU2l6ZShldik7XHJcbn0pO1xyXG5cclxuJCh3aW5kb3cpLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgIHZhciBtb3VzZVggPSBldi5wYWdlWCxcclxuICAgICAgICBtb3VzZVkgPSBldi5wYWdlWSxcclxuICAgICAgICB3RnJvbUNlbnRlciA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMiAtIG1vdXNlWCxcclxuICAgICAgICBoRnJvbUNlbnRlciA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDIgLSBtb3VzZVk7XHJcblxyXG4gICAgbGF5ZXIubWFwKGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIHdpZHRoU2hpZnQgPSB3RnJvbUNlbnRlciAqICgoa2V5ICsgMSkgLyAxMDApO1xyXG4gICAgICAgIHZhciBoZWlnaHRTaGlmdCA9IGhGcm9tQ2VudGVyICogKChrZXkgKyAxKSAvIDEwMCk7XHJcbiAgICAgICAgJCh2YWx1ZSkuY3NzKHtcclxuICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgnICsgd2lkdGhTaGlmdCArICdweCwgJyArIGhlaWdodFNoaWZ0ICsgJ3B4LCAwcHgpJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxufSk7IiwiLy9cclxuLy8gUEFSQUxMQVggU0NST0xMXHJcbnZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgYmcgPSAkKCcuaGVhZGVyX19iZycpLFxyXG4gICAgICAgIHVzZXIgPSAkKCcuYXZhdGFyJyksXHJcbiAgICAgICAgc2VjdGlvblRleHQgPSAkKCcuaGVhZGVyX19iZy10ZXh0LWltZycpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbW92ZTogZnVuY3Rpb24gKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG4gICAgICAgICAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJyxcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCcgKyBzdHJhZmUgKyAnLCAwKSc7XHJcblxyXG4gICAgICAgICAgICBibG9jay5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6IHRyYW5zZm9ybVN0cmluZyxcclxuICAgICAgICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6IHRyYW5zZm9ybVN0cmluZ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIDQ1KTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKHNlY3Rpb25UZXh0LCB3U2Nyb2xsLCA4KTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTtcclxuXHJcbmlmICh3aW5kb3cuaW5uZXJXaWR0aD45OTIpIHtcclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB3U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcbiAgICB9KTsgLy8gLT4gc2Nyb2xsX2VuZDtcclxufSIsIi8vcHJlbG9hZGVyXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBpbWdzID0gW107XHJcblxyXG4gICAgJC5lYWNoKCQoJyonKSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgICAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRzID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykuc3BsaXQoJywnKSxcclxuICAgICAgICAgICAgaW1nID0gJHRoaXMuaXMoJ2ltZycpO1xyXG5cclxuICAgICAgICBpZiAoYmFja2dyb3VuZHMgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICQuZWFjaChiYWNrZ3JvdW5kcywgZnVuY3Rpb24gKGluZGV4LCBiYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuICAgICAgICAgICAgICAgIGltZ3MucHVzaChwYXRoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbWcpIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSAkdGhpcy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICBpbWdzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgaW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICAgICAgc3JjOiBpbWdzW2ldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW1hZ2Uub24oe1xyXG4gICAgICAgICAgICBsb2FkIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRQZXJjZW50cyh0b3RhbCwgY3VycmVudCkge1xyXG4gICAgICAgIHZhciBwZXJjZW50ID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcblxyXG4gICAgICAgIGlmIChwZXJjZW50ID49IDEwMCkge1xyXG4gICAgICAgICAgICAkKCcucHJlbG9hZGVyJykuZmFkZU91dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLnByZWxvYWRlcl9fcGVyY2VudHMnKS50ZXh0KHBlcmNlbnQgKyAnJScpO1xyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBbGV4ZXkgb24gMTItRGVjLTE2LlxyXG4gKi9cclxuLy91cGRhdGUgc2tpbGxzIHZpYSBhZG1pbiBwYWdlXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjdGFiLWFib3V0X19jb250ZW50Jykub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCcucHJlbG9hZGVyJykuZmFkZUluKCk7XHJcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gYWpheCDQt9Cw0L/RgNC+0YFcclxuICAgICAgICB2YXIgZGVmT2JqID0gY29tbW9uQWpheC5hamF4Rm9ybShmb3JtRGF0YSwgJy4vc2F2ZVNraWxscycpO1xyXG4gICAgICAgIGlmKGRlZk9iail7XHJcbiAgICAgICAgICAgIGRlZk9iai5kb25lKGZ1bmN0aW9uIChhbnMpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcmVsb2FkZXInKS5mYWRlT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAkKCcucG9wLXVwX19tZXNzYWdlJykudGV4dChhbnMpO1xyXG4gICAgICAgICAgICAgICAgJCgnLnBvcC11cF9fbG9nJykuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbi5yZWxvYWQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8vXHJcbiAgICB9KVxyXG59KSgpXHJcbiIsIiIsIiQoZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArJ10nKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3BcclxuICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBteSA9IHt9O1xyXG5cclxuICAgIGFkZExpc3RlbmVyKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgJCgnZm9ybScpLm9uKCdzdWJtaXQnLCBzdWJtaXRGb3JtKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN1Ym1pdEZvcm0oZXYpIHtcclxuXHJcbiAgICAgICAgdmFyICRmb3JtID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgdXJsPScnLFxyXG4gICAgICAgICAgICBkZWZPYmplY3QgICA9IGFqYXhGb3JtKCRmb3JtLCB1cmwpO1xyXG5cclxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBhamF4Rm9ybShmb3JtLCB1cmwpIHtcclxuICAgICAgICBpZighdmFsaWRhdGlvbi52YWxpZGF0ZUZvcm0oZm9ybSkpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
