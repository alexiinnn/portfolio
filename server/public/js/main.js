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
        $('.btn-login').prop('disabled', true).text('Logging in...');
        // $('.preloader').fadeIn();
        var formData = $(this);
        // console.log(formData);
        // ajax запрос
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNpcmNsZVNraWxsLmpzIiwiY29tbW9uQWpheC5qcyIsImZvcm1WYWxpZGF0aW9uLmpzIiwiaGlnaGxpZ2h0U2lkZWJhci5qcyIsImxvZ2luLmpzIiwibWVzc2FnZS5qcyIsInBhcmFsbGF4TW91c2UuanMiLCJwYXJhbGxheFNjcm9sbC5qcyIsInByZWxvYWRlci5qcyIsInNhdmVTa2lsbHMuanMiLCJzbGlkZXJDb29sLmpzIiwic21vb3RoU2Nyb2xsLmpzIiwic3VibWl0Q2F0Y2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBldmVudExpc3RlbmVycyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnI3RvZ2dsZScpLm9uKCdjbGljaycsIF90b2dnbGVOYXYpO1xyXG4gICAgICAgICQoJy5hbmdsZS1kb3duJykub24oJ2NsaWNrJywgX2FuZ2xlRG93blNjcm9sbCk7XHJcbiAgICAgICAgJCgnLmFuZ2xlLXVwJykub24oJ2NsaWNrJywgX2FuZ2xlVXBTY3JvbGwpO1xyXG4gICAgICAgICQoJy5hdXRoX190b2dnbGUtYnRuJykub24oJ2NsaWNrJyxfbG9nSW4pO1xyXG4gICAgICAgICQoJy5idG4taG9tZScpLm9uKCdjbGljaycsX2hvbWUpO1xyXG4gICAgICAgICQoJy5zd2lwZS1vdmVybGF5Jykub24oJ2NsaWNrJywgX3N3aXBlKTtcclxuICAgICAgICAkKCcuc3dpcGUnKS5vbignY2xpY2snLCBfc3dpcGUpO1xyXG4gICAgICAgICQoJy5zbGlkZXJfX2Fycm93LWRvd24nKS5vbignY2xpY2snLCBfc2xpZGVyUHJldik7XHJcbiAgICAgICAgJCgnLnNsaWRlcl9fYXJyb3ctdXAnKS5vbignY2xpY2snLCBfc2xpZGVyTmV4dCk7XHJcbiAgICAgICAgJCgnLmJ1dHRvbl9jb250YWluZXInKS5vbignY2xpY2snLCBfaGlkZVNjcm9sbCk7XHJcbiAgICAgICAgJCgnLmJ0bi1jbGVhcicpLm9uKCdjbGljaycsIF9yZXNldE1lc3NhZ2VGb3JtKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gTkFWaWdhdGlvblxyXG4gICAgdmFyIF90b2dnbGVOYXYgPSBmdW5jdGlvbihldikge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoJyNvdmVybGF5JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9hbmdsZS1kb3duXHJcbiAgICB2YXIgX2FuZ2xlRG93blNjcm9sbCA9IGZ1bmN0aW9uIChldil7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuICAgICAgICAkKCdodG1sLGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IGhlaWdodH0sIDUwMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vYW5nbGUtdXBcclxuICAgIHZhciBfYW5nbGVVcFNjcm9sbCA9IGZ1bmN0aW9uIChldil7XHJcbiAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgNTAwKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9sb2cgaW4gdG9nZ2xlXHJcbiAgICB2YXIgX2xvZ0luID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJCgnLmF1dGhfX3RvZ2dsZS1idG4nKS5jc3MoJ3Zpc2liaWxpdHknLCdoaWRkZW4nKTtcclxuICAgICAgICAkKCcud2VsY29tZV9fbWVudScpLmNzcygndHJhbnNmb3JtJywncm90YXRlWSgxODBkZWcpJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vaG9tZSB0b2dnbGVcclxuICAgIHZhciBfaG9tZSA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICQoJy5hdXRoX190b2dnbGUtYnRuJykuY3NzKCd2aXNpYmlsaXR5JywndmlzaWJsZScpO1xyXG4gICAgICAgICQoJy53ZWxjb21lX19tZW51JykuY3NzKCd0cmFuc2Zvcm0nLCdyb3RhdGVZKDBkZWcpJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vYmxvZ19zd2lwZV9zaWRlYmFyXHJcbiAgICB2YXIgX3N3aXBlID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJCgnLnNpZGViYXInKS50b2dnbGVDbGFzcygnc2lkZWJhci1vcGVuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9zbGlkZXIgcHJldmlvdXMgd29ya1xyXG4gICAgdmFyICRzbGlkZXJfbGlzdF9yZXZlcnNlID0gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtcmV2ZXJzZScpO1xyXG4gICAgdmFyICRzbGlkZXJfbGlzdF9zdHJhaWdodCA9ICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXN0cmFpZ2h0Jyk7XHJcbiAgICB2YXIgJHNsaWRlcl9saXN0X2JpZyA9ICQoJy5zbGlkZXJfX2xpc3RfX2JpZycpO1xyXG4gICAgdmFyICR3b3JrX19kZXNjX19saXN0ID0gJCgnLndvcmtfX2Rlc2NfX2xpc3QnKTtcclxuXHJcbiAgICB2YXIgX3NsaWRlclByZXYgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAvLyAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1zdHJhaWdodCcpLmNzcygndHJhbnNmb3JtJywndHJhbnNsYXRlWSgtMTAwJSknKTtcclxuICAgICAgICAvLyAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1yZXZlcnNlJykuY3NzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGVZKDAlKScpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9yZXZlcnNlLmNoaWxkcmVuKCkuZmlyc3QoKS5pbnNlcnRBZnRlcigkc2xpZGVyX2xpc3RfcmV2ZXJzZS5jaGlsZHJlbigpLmxhc3QoKSk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X3N0cmFpZ2h0LmNoaWxkcmVuKCkubGFzdCgpLmluc2VydEJlZm9yZSgkc2xpZGVyX2xpc3Rfc3RyYWlnaHQuY2hpbGRyZW4oKS5maXJzdCgpKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3RfYmlnLmNoaWxkcmVuKCkubGFzdCgpLmluc2VydEJlZm9yZSgkc2xpZGVyX2xpc3RfYmlnLmNoaWxkcmVuKCkuZmlyc3QoKSk7XHJcbiAgICAgICAgJHdvcmtfX2Rlc2NfX2xpc3QuY2hpbGRyZW4oKS5sYXN0KCkuaW5zZXJ0QmVmb3JlKCR3b3JrX19kZXNjX19saXN0LmNoaWxkcmVuKCkuZmlyc3QoKSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL3NsaWRlciBuZXh0IHdvcmtcclxuICAgIHZhciBfc2xpZGVyTmV4dCA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIC8vICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXJldmVyc2UnKS5jc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZVkoLTEwMCUpJyk7XHJcbiAgICAgICAgLy8gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtc3RyYWlnaHQnKS5jc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZVkoMCUpJyk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X3N0cmFpZ2h0LmNoaWxkcmVuKCkuZmlyc3QoKS5pbnNlcnRBZnRlcigkc2xpZGVyX2xpc3Rfc3RyYWlnaHQuY2hpbGRyZW4oKS5sYXN0KCkpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9yZXZlcnNlLmNoaWxkcmVuKCkubGFzdCgpLmluc2VydEJlZm9yZSgkc2xpZGVyX2xpc3RfcmV2ZXJzZS5jaGlsZHJlbigpLmZpcnN0KCkpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9iaWcuY2hpbGRyZW4oKS5maXJzdCgpLmluc2VydEFmdGVyKCRzbGlkZXJfbGlzdF9iaWcuY2hpbGRyZW4oKS5sYXN0KCkpO1xyXG4gICAgICAgICR3b3JrX19kZXNjX19saXN0LmNoaWxkcmVuKCkuZmlyc3QoKS5pbnNlcnRBZnRlcigkd29ya19fZGVzY19fbGlzdC5jaGlsZHJlbigpLmxhc3QoKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vdG9nZ2xlIHNjcm9sbCBiYXIgb24gbmF2IGV4cGFuZFxyXG4gICAgdmFyIF9oaWRlU2Nyb2xsID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdoaWRlLXNjcm9sbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcmVzZXQgbWVzc2FnZSBmb3JtXHJcbiAgICB2YXIgX3Jlc2V0TWVzc2FnZUZvcm0gPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAkKCcuYnRuLXNlbmQnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS50ZXh0KCdTZW5kJyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGluaXRcclxuICAgICAgICB9O1xyXG5cclxufSkoKTtcclxuXHJcbmV2ZW50TGlzdGVuZXJzLmluaXQoKTtcclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBbGV4ZXkgb24gMDktRGVjLTE2LlxyXG4gKi9cclxuLy9TVkcgYW5pbWF0ZWQgY2lyY2xlIGxldmVsc1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyICR3aW5kb3cgPSAkKHdpbmRvdyk7XHJcbiAgICB2YXIgaXNSZW5kZXJlZCA9IDA7XHJcbiAgICB2YXIgc2tpbGxDaXJjbGVzT2JqID0gW107XHJcbiAgICAkLmVhY2goJCgnLnNraWxsLWNpcmNsZScpLCBmdW5jdGlvbiAoaW5kLCB2YWwpIHtcclxuICAgICAgICB2YXIgY2lyY2xlQm90dG9tID0gJCh0aGlzKS5oZWlnaHQoKSArICQodGhpcykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgIHNraWxsQ2lyY2xlc09iai5wdXNoKHtcclxuICAgICAgICAgICAgY2lyY2xlOiB2YWwsXHJcbiAgICAgICAgICAgIGNpcmNsZUJvdHRvbTogY2lyY2xlQm90dG9tLFxyXG4gICAgICAgICAgICBpc1JlbmRlcmVkOiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaXNSZW5kZXJlZCsrO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCcxICcrIGlzUmVuZGVyZWQpO1xyXG4gICAgfSlcclxuXHJcbiAgICB2YXIgc2tpbGxDaXJjbGVTZXQgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICB2YXIgc2Nyb2xsQm90dG9tID0gd2luZG93LnNjcm9sbFkgKyAkd2luZG93LmhlaWdodCgpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNjcm9sbEJvdHRvbSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJzQgJytpc1JlbmRlcmVkKTtcclxuICAgICAgICAkLmVhY2goc2tpbGxDaXJjbGVzT2JqLCBmdW5jdGlvbiAoaW5kLCB2YWwpIHtcclxuICAgICAgICAgICAgaWYgKCF2YWxbJ2lzUmVuZGVyZWQnXSAmJiBzY3JvbGxCb3R0b20gPiB2YWxbJ2NpcmNsZUJvdHRvbSddKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNpcmNsZSA9ICQodmFsWydjaXJjbGUnXSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNpcmNsZUxldmVsID0gJGNpcmNsZS5hdHRyKCdkYXRhLWxldmVsJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNpcmNsZUJhciA9ICRjaXJjbGUuY2hpbGRyZW4oJy5jaXJjbGUtYmFyJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGNhbGNDaXJjbGVMZXZlbCA9ICgkY2lyY2xlQmFyLmNzcygnc3Ryb2tlLWRhc2hvZmZzZXQnKS5zbGljZSgwLCAtMikpICogKDEwMCAtICRjaXJjbGVMZXZlbCkgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICAkY2lyY2xlQmFyLmNzcygnc3Ryb2tlLWRhc2hvZmZzZXQnLCAkY2FsY0NpcmNsZUxldmVsKTtcclxuICAgICAgICAgICAgICAgIHZhbFsnaXNSZW5kZXJlZCddID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlzUmVuZGVyZWQtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpc1JlbmRlcmVkPD0wKXtcclxuICAgICAgICAgICAgLy9zaHV0ZG93biBldmVudExpc3RlbmVyXHJcbiAgICAgICAgICAgICR3aW5kb3cub2ZmKCdzY3JvbGwnLCBza2lsbENpcmNsZVNldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL21vYmlsZSBTYWZhcmkgd29ya2Fyb3VuZFxyXG4gICAgdmFyIHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xyXG4gICAgaWYgKHVzZXJBZ2VudC5tYXRjaCgvKGlQYWR8aVBob25lfGlQb2QpL2kpICl7XHJcbiAgICAgICAgJC5lYWNoKHNraWxsQ2lyY2xlc09iaiwgZnVuY3Rpb24gKGluZCwgdmFsKSB7XHJcbiAgICAgICAgICAgIHZhciAkY2lyY2xlID0gJCh2YWxbJ2NpcmNsZSddKTtcclxuICAgICAgICAgICAgdmFyICRjaXJjbGVMZXZlbCA9ICRjaXJjbGUuYXR0cignZGF0YS1sZXZlbCcpO1xyXG4gICAgICAgICAgICB2YXIgJGNpcmNsZUJhciA9ICRjaXJjbGUuY2hpbGRyZW4oJy5jaXJjbGUtYmFyJyk7XHJcbiAgICAgICAgICAgIHZhciAkY2FsY0NpcmNsZUxldmVsID0gKCRjaXJjbGVCYXIuY3NzKCdzdHJva2UtZGFzaG9mZnNldCcpLnNsaWNlKDAsIC0yKSkgKiAoMTAwIC0gJGNpcmNsZUxldmVsKSAvIDEwMDtcclxuICAgICAgICAgICAgJGNpcmNsZUJhci5jc3MoJ3N0cm9rZS1kYXNob2Zmc2V0JywgJGNhbGNDaXJjbGVMZXZlbCk7XHJcbiAgICAgICAgICAgIHZhbFsnaXNSZW5kZXJlZCddID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpc1JlbmRlcmVkPTA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzUmVuZGVyZWQgPiAwKSB7XHJcbiAgICAgICAgJHdpbmRvdy5vbignc2Nyb2xsJywgc2tpbGxDaXJjbGVTZXQpO1xyXG4gICAgfTtcclxuXHJcbn0pKCk7IiwidmFyIGNvbW1vbkFqYXggPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBhamF4Rm9ybSA9IGZ1bmN0aW9uIChmb3JtRGF0YSwgdXJsKSB7XHJcbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uLnZhbGlkYXRlRm9ybShmb3JtRGF0YSkpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgZWxlbWVudHMgPSBmb3JtRGF0YS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKS5ub3QoJ2lucHV0W3R5cGU9XCJoaWRkZW5cIl0nKTtcclxuICAgICAgICB2YXIgRGF0YSA9IHt9O1xyXG5cclxuICAgICAgICAkLmVhY2goZWxlbWVudHMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoJGVsZW1lbnQucHJvcChcImRlZmF1bHRWYWx1ZVwiKSAhPSAkZWxlbWVudC5wcm9wKFwidmFsdWVcIikpe1xyXG4gICAgICAgICAgICAgICAgLy8gdmFyIHB1c2hFbGVtZW50ID0gJGVsZW1lbnQuc2VyaWFsaXplQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIC8vIERhdGEucHVzaChwdXNoRWxlbWVudFswXSk7XHJcbiAgICAgICAgICAgICAgICBEYXRhWyRlbGVtZW50LnByb3AoXCJuYW1lXCIpXT0kZWxlbWVudC5wcm9wKFwidmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhbJGVsZW1lbnQucHJvcChcIm5hbWVcIildKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCRlbGVtZW50LnByb3AoXCJuYW1lXCIpKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKERhdGFbJGVsZW1lbnQucHJvcChcIm5hbWVcIildKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKERhdGEpO1xyXG4gICAgICAgIHZhciBhamF4RGF0YSA9IEpTT04uc3RyaW5naWZ5KERhdGEpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFqYXhEYXRhKTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gJC5hamF4KHtcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgZGF0YTogYWpheERhdGEsXHJcbiAgICAgICAgICAgIC8vIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoYW5zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhbnMpO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhamF4Rm9ybTogYWpheEZvcm1cclxuICAgIH07XHJcblxyXG59KSgpOyIsInZhciB2YWxpZGF0aW9uID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB2YWxpZGF0ZUZvcm0gPSBmdW5jdGlvbiAoZm9ybSkge1xyXG4gICAgICAgICAgICBpZiAoJCgnI2h1bWFuLWNoZWNrYm94JykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCghJCgnI2h1bWFuLWNoZWNrYm94JykuaXMoXCI6Y2hlY2tlZFwiKSkgfHwgKCEkKCcjYm90LWNoZWNrX195ZXMnKS5pcyhcIjpjaGVja2VkXCIpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5hdXRoX19yZXNwb25zZScpLnRleHQoXCJPbmx5IGZvciBodW1hbiFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYScpLm5vdCgnaW5wdXRbdHlwZT1cImhpZGRlblwiXScpLFxyXG4gICAgICAgICAgICAgICAgdmFsaWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKGVsZW1lbnRzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCksXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAkZWxlbWVudC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9hZGRFcnJvcigkZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnZm9ybScpLm9uKCdrZXlkb3duJywgJy5oYXMtZXJyb3InLCBfcmVtb3ZlRXJyb3IpO1xyXG4gICAgICAgICAgICAkKCdmb3JtJykub24oJ2NsaWNrJywgJy5oYXMtZXJyb3InLCBfcmVtb3ZlRXJyb3IpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9hZGRFcnJvciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9yZW1vdmVFcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGluaXQsXHJcbiAgICAgICAgdmFsaWRhdGVGb3JtOiB2YWxpZGF0ZUZvcm1cclxuICAgIH07XHJcblxyXG59KSgpO1xyXG5cclxudmFsaWRhdGlvbi5pbml0KCk7IiwidmFyIGFDaGlsZHJlbiA9ICQoXCIuc2lkZWJhcl9fbGlzdCBsaVwiKS5jaGlsZHJlbigpOyAvLyBmaW5kIHRoZSBhIGNoaWxkcmVuIG9mIHRoZSBsaXN0IGl0ZW1zXHJcbnZhciBhQXJyYXkgPSBbXTsgLy8gY3JlYXRlIHRoZSBlbXB0eSBhQXJyYXlcclxuZm9yICh2YXIgaT0wOyBpIDwgYUNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgYUNoaWxkID0gYUNoaWxkcmVuW2ldO1xyXG4gICAgdmFyIGFocmVmID0gJChhQ2hpbGQpLmF0dHIoJ2hyZWYnKTtcclxuICAgIGFBcnJheS5wdXNoKGFocmVmKTtcclxufSAvLyB0aGlzIGZvciBsb29wIGZpbGxzIHRoZSBhQXJyYXkgd2l0aCBhdHRyaWJ1dGUgaHJlZiB2YWx1ZXNcclxuXHJcbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcclxuICAgIHZhciB3aW5kb3dQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7IC8vIGdldCB0aGUgb2Zmc2V0IG9mIHRoZSB3aW5kb3cgZnJvbSB0aGUgdG9wIG9mIHBhZ2VcclxuICAgIHZhciB3aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7IC8vIGdldCB0aGUgaGVpZ2h0IG9mIHRoZSB3aW5kb3dcclxuICAgIHZhciBkb2NIZWlnaHQgPSAkKGRvY3VtZW50KS5oZWlnaHQoKTtcclxuXHJcbiAgICBmb3IgKHZhciBpPTA7IGkgPCBhQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdGhlSUQgPSBhQXJyYXlbaV07XHJcbiAgICAgICAgdmFyIGRpdlBvcyA9ICQodGhlSUQpLm9mZnNldCgpLnRvcDsgLy8gZ2V0IHRoZSBvZmZzZXQgb2YgdGhlIGRpdiBmcm9tIHRoZSB0b3Agb2YgcGFnZVxyXG4gICAgICAgIHZhciBkaXZIZWlnaHQgPSAkKHRoZUlEKS5oZWlnaHQoKTsgLy8gZ2V0IHRoZSBoZWlnaHQgb2YgdGhlIGRpdiBpbiBxdWVzdGlvblxyXG4gICAgICAgIGlmICh3aW5kb3dQb3MgKzQwID49IGRpdlBvcyAmJiB3aW5kb3dQb3MgPCAoZGl2UG9zICsgZGl2SGVpZ2h0KSkge1xyXG4gICAgICAgICAgICAkKFwiYVtocmVmPSdcIiArIHRoZUlEICsgXCInXVwiKS5wYXJlbnQoKS5hZGRDbGFzcyhcInNpZGViYXJfX2l0ZW0tYWN0aXZlXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoXCJhW2hyZWY9J1wiICsgdGhlSUQgKyBcIiddXCIpLnBhcmVudCgpLnJlbW92ZUNsYXNzKFwic2lkZWJhcl9faXRlbS1hY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBbGV4ZXkgb24gMTctRGVjLTE2LlxyXG4gKi9cclxuXHJcbi8vbG9naW4gZm9ybVxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI2xvZ2luJykub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCcuYXV0aF9fcmVzcG9uc2UnKS50ZXh0KFwiXCIpO1xyXG4gICAgICAgICQoJy5idG4tbG9naW4nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpLnRleHQoJ0xvZ2dpbmcgaW4uLi4nKTtcclxuICAgICAgICAvLyAkKCcucHJlbG9hZGVyJykuZmFkZUluKCk7XHJcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gJCh0aGlzKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmb3JtRGF0YSk7XHJcbiAgICAgICAgLy8gYWpheCDQt9Cw0L/RgNC+0YFcclxuICAgICAgICB2YXIgZGVmT2JqID0gY29tbW9uQWpheC5hamF4Rm9ybShmb3JtRGF0YSwgJy4vbG9naW4nKTtcclxuICAgICAgICBpZihkZWZPYmope1xyXG4gICAgICAgICAgICBkZWZPYmouZG9uZShmdW5jdGlvbiAoYW5zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFucy5yZWRpcmVjdCA9PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bi1sb2dpbicpLnRleHQoYW5zWydzdGF0dXMnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gYW5zLnJlZGlyZWN0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmF1dGhfX3Jlc3BvbnNlJykudGV4dChhbnNbJ3N0YXR1cyddKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYnRuLWxvZ2luJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSkudGV4dCgnTG9nIGluJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gJCgnLnByZWxvYWRlcicpLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFmdGVyXCIrYW5zKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAkKCcucG9wLXVwX19tZXNzYWdlJykudGV4dChhbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICQoJy5wb3AtdXBfX2xvZycpLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0pKCk7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFsZXhleSBvbiAxNy1EZWMtMTYuXHJcbiAqL1xyXG5cclxuLy9tZXNzYWdlIGZvcm1cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyNjb250YWN0LXVzJykub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgJGJ0blNlbmQgPSAkKCcuYnRuLXNlbmQnKTtcclxuICAgICAgICAkYnRuU2VuZC5wcm9wKFwiZGlzYWJsZWRcIix0cnVlKTtcclxuICAgICAgICAkYnRuU2VuZC50ZXh0KFwiU2VuZGluZy4uLlwiKTtcclxuICAgICAgICAvLyAkKCcucHJlbG9hZGVyJykuZmFkZUluKCk7XHJcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gJCh0aGlzKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmb3JtRGF0YSk7XHJcbiAgICAgICAgLy8gYWpheCDQt9Cw0L/RgNC+0YFcclxuICAgICAgICB2YXIgZGVmT2JqID0gY29tbW9uQWpheC5hamF4Rm9ybShmb3JtRGF0YSwgJy4vbWVzc2FnZScpO1xyXG4gICAgICAgIGlmKGRlZk9iail7XHJcbiAgICAgICAgICAgIGRlZk9iai5kb25lKGZ1bmN0aW9uIChhbnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFucyk7XHJcbiAgICAgICAgICAgICAgICAkYnRuU2VuZC50ZXh0KGFucyk7XHJcbiAgICAgICAgICAgICAgICAvLyAkKCcucHJlbG9hZGVyJykuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJhZnRlclwiK2Fucyk7XHJcbiAgICAgICAgICAgICAgICAvLyAkKCcucG9wLXVwX19tZXNzYWdlJykudGV4dChhbnMpO1xyXG4gICAgICAgICAgICAgICAgLy8gJCgnLnBvcC11cF9fbG9nJykuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59KSgpO1xyXG4iLCIvL1xyXG4vL01vdXNlIHBhcmFsbGF4XHJcblxyXG52YXIgbGF5ZXIgPSAkKCcucGFyYWxsYXgnKS5maW5kKCcucGFyYWxsYXhfX2xheWVyJyk7XHJcbnZhciBsYXN0QmcgPSBsYXllci5maXJzdCgpLmZpbmQoJ2ltZycpO1xyXG5cclxuLy9zZXQgYmFja3JvdW5kIHNpemVcclxudmFyIHNldEJnU2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBiZ0ltZ1dpZHRoUmF0ZSA9IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0ICogbGFzdEJnLnByb3AoJ25hdHVyYWxXaWR0aCcpIC8gKHdpbmRvdy5pbm5lcldpZHRoICogbGFzdEJnLnByb3AoJ25hdHVyYWxIZWlnaHQnKSkpO1xyXG4gICAgaWYgKGJnSW1nV2lkdGhSYXRlIDwgMSkge1xyXG4gICAgICAgIHZhciBiZ0ltZ0hlaWdodFJhdGUgPSAxIC8gYmdJbWdXaWR0aFJhdGU7XHJcbiAgICAgICAgdmFyIGJnSW1nSGVpZ2h0U2hpZnQgPSAoMSAtIGJnSW1nSGVpZ2h0UmF0ZSogMS4xKSAvIDI7IC8vMS4xID0gMTEwJSAvLyA1JSBmb3IgZXZlcnkgc2lkZSBvZiBzY3JlZW5cclxuICAgICAgICBsYXllci5maW5kKCdpbWcnKS5jc3Moeydib3R0b20nOiAxMDAgKiBiZ0ltZ0hlaWdodFNoaWZ0ICsgJyUnfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgbGF5ZXIuZmluZCgnaW1nJykuY3NzKHsnd2lkdGgnOiAxMDAgKiBiZ0ltZ1dpZHRoUmF0ZSArICclJ30pO1xyXG5cclxufVxyXG5cclxubGFzdEJnLmxvYWQoZnVuY3Rpb24oKSB7XHJcbiAgICBzZXRCZ1NpemUoKTtcclxufSk7XHJcblxyXG5cclxuJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgIHNldEJnU2l6ZShldik7XHJcbn0pO1xyXG5cclxuJCh3aW5kb3cpLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgIHZhciBtb3VzZVggPSBldi5wYWdlWCxcclxuICAgICAgICBtb3VzZVkgPSBldi5wYWdlWSxcclxuICAgICAgICB3RnJvbUNlbnRlciA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMiAtIG1vdXNlWCxcclxuICAgICAgICBoRnJvbUNlbnRlciA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDIgLSBtb3VzZVk7XHJcblxyXG4gICAgbGF5ZXIubWFwKGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIHdpZHRoU2hpZnQgPSB3RnJvbUNlbnRlciAqICgoa2V5ICsgMSkgLyAxMDApO1xyXG4gICAgICAgIHZhciBoZWlnaHRTaGlmdCA9IGhGcm9tQ2VudGVyICogKChrZXkgKyAxKSAvIDEwMCk7XHJcbiAgICAgICAgJCh2YWx1ZSkuY3NzKHtcclxuICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgnICsgd2lkdGhTaGlmdCArICdweCwgJyArIGhlaWdodFNoaWZ0ICsgJ3B4LCAwcHgpJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxufSk7IiwiLy9cclxuLy8gUEFSQUxMQVggU0NST0xMXHJcbnZhciBwYXJhbGxheCA9IChmdW5jdGlvbigpe1xyXG4gICAgdmFyIGJnID0gJCgnLmhlYWRlcl9fYmcnKSxcclxuICAgICAgICB1c2VyID0gJCgnLmF2YXRhcicpLFxyXG4gICAgICAgIHNlY3Rpb25UZXh0ID0gJCgnLmhlYWRlcl9fYmctdGV4dC1pbWcnKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1vdmUgOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcbiAgICAgICAgICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsJyArIHN0cmFmZSArICcsIDApJztcclxuXHJcbiAgICAgICAgICAgIGJsb2NrLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAndHJhbnNmb3JtJyA6IHRyYW5zZm9ybVN0cmluZyxcclxuICAgICAgICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybScgOiB0cmFuc2Zvcm1TdHJpbmdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5pdCA6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZShiZywgd1Njcm9sbCwgNDUpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUoc2VjdGlvblRleHQsIHdTY3JvbGwsIDgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUodXNlciwgd1Njcm9sbCwgNSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG5cclxuJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHdTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICBwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG59KTsgLy8gLT4gc2Nyb2xsX2VuZDsiLCIvL3ByZWxvYWRlclxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgaW1ncyA9IFtdO1xyXG5cclxuICAgICQuZWFjaCgkKCcqJyksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kcyA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLnNwbGl0KCcsJyksXHJcbiAgICAgICAgICAgIGltZyA9ICR0aGlzLmlzKCdpbWcnKTtcclxuXHJcbiAgICAgICAgaWYgKGJhY2tncm91bmRzICE9ICdub25lJykge1xyXG4gICAgICAgICAgICAkLmVhY2goYmFja2dyb3VuZHMsIGZ1bmN0aW9uIChpbmRleCwgYmFja2dyb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICAgICAgICAgICAgICBpbWdzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW1nKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gJHRoaXMuYXR0cignc3JjJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICAgICAgaW1ncy5wdXNoKHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2YXIgcGVyY2VudHNUb3RhbCA9IDE7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGltYWdlID0gJCgnPGltZz4nLCB7XHJcbiAgICAgICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgICAgIHNyYzogaW1nc1tpXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGltYWdlLm9uKHtcclxuICAgICAgICAgICAgbG9hZCA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltZ3MubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UGVyY2VudHModG90YWwsIGN1cnJlbnQpIHtcclxuICAgICAgICB2YXIgcGVyY2VudCA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG5cclxuICAgICAgICBpZiAocGVyY2VudCA+PSAxMDApIHtcclxuICAgICAgICAgICAgJCgnLnByZWxvYWRlcicpLmZhZGVPdXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5wcmVsb2FkZXJfX3BlcmNlbnRzJykudGV4dChwZXJjZW50ICsgJyUnKTtcclxuICAgIH1cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQWxleGV5IG9uIDEyLURlYy0xNi5cclxuICovXHJcbi8vdXBkYXRlIHNraWxscyB2aWEgYWRtaW4gcGFnZVxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI3RhYi1hYm91dF9fY29udGVudCcpLm9uKFwic3VibWl0XCIsIGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnLnByZWxvYWRlcicpLmZhZGVJbigpO1xyXG4gICAgICAgIHZhciBmb3JtRGF0YSA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgIC8vIGFqYXgg0LfQsNC/0YDQvtGBXHJcbiAgICAgICAgdmFyIGRlZk9iaiA9IGNvbW1vbkFqYXguYWpheEZvcm0oZm9ybURhdGEsICcuL3NhdmVTa2lsbHMnKTtcclxuICAgICAgICBpZihkZWZPYmope1xyXG4gICAgICAgICAgICBkZWZPYmouZG9uZShmdW5jdGlvbiAoYW5zKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJlbG9hZGVyJykuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICAgICAgJCgnLnBvcC11cF9fbWVzc2FnZScpLnRleHQoYW5zKTtcclxuICAgICAgICAgICAgICAgICQoJy5wb3AtdXBfX2xvZycpLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvL1xyXG4gICAgfSlcclxufSkoKVxyXG4iLCIiLCIkKGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnYVtocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpICYmIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbXkgPSB7fTtcclxuXHJcbiAgICBhZGRMaXN0ZW5lcigpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZExpc3RlbmVyKCkge1xyXG4gICAgICAgICQoJ2Zvcm0nKS5vbignc3VibWl0Jywgc3VibWl0Rm9ybSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWJtaXRGb3JtKGV2KSB7XHJcblxyXG4gICAgICAgIHZhciAkZm9ybSA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIHVybD0nJyxcclxuICAgICAgICAgICAgZGVmT2JqZWN0ICAgPSBhamF4Rm9ybSgkZm9ybSwgdXJsKTtcclxuXHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gYWpheEZvcm0oZm9ybSwgdXJsKSB7XHJcbiAgICAgICAgaWYoIXZhbGlkYXRpb24udmFsaWRhdGVGb3JtKGZvcm0pKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
