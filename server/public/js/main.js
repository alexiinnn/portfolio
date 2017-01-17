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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNpcmNsZVNraWxsLmpzIiwiY29tbW9uQWpheC5qcyIsImZvcm1WYWxpZGF0aW9uLmpzIiwiaGlnaGxpZ2h0U2lkZWJhci5qcyIsImxvZ2luLmpzIiwibWVzc2FnZS5qcyIsInBhcmFsbGF4TW91c2UuanMiLCJwYXJhbGxheFNjcm9sbC5qcyIsInByZWxvYWRlci5qcyIsInNhdmVTa2lsbHMuanMiLCJzbGlkZXJDb29sLmpzIiwic21vb3RoU2Nyb2xsLmpzIiwic3VibWl0Q2F0Y2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZXZlbnRMaXN0ZW5lcnMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJyN0b2dnbGUnKS5vbignY2xpY2snLCBfdG9nZ2xlTmF2KTtcclxuICAgICAgICAkKCcuYW5nbGUtZG93bicpLm9uKCdjbGljaycsIF9hbmdsZURvd25TY3JvbGwpO1xyXG4gICAgICAgICQoJy5hbmdsZS11cCcpLm9uKCdjbGljaycsIF9hbmdsZVVwU2Nyb2xsKTtcclxuICAgICAgICAkKCcuYXV0aF9fdG9nZ2xlLWJ0bicpLm9uKCdjbGljaycsX2xvZ0luKTtcclxuICAgICAgICAkKCcuYnRuLWhvbWUnKS5vbignY2xpY2snLF9ob21lKTtcclxuICAgICAgICAkKCcuc3dpcGUtb3ZlcmxheScpLm9uKCdjbGljaycsIF9zd2lwZSk7XHJcbiAgICAgICAgJCgnLnN3aXBlJykub24oJ2NsaWNrJywgX3N3aXBlKTtcclxuICAgICAgICAkKCcuc2xpZGVyX19hcnJvdy1kb3duJykub24oJ2NsaWNrJywgX3NsaWRlclByZXYpO1xyXG4gICAgICAgICQoJy5zbGlkZXJfX2Fycm93LXVwJykub24oJ2NsaWNrJywgX3NsaWRlck5leHQpO1xyXG4gICAgICAgICQoJy5idXR0b25fY29udGFpbmVyJykub24oJ2NsaWNrJywgX2hpZGVTY3JvbGwpO1xyXG4gICAgICAgICQoJy5idG4tY2xlYXInKS5vbignY2xpY2snLCBfcmVzZXRNZXNzYWdlRm9ybSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE5BVmlnYXRpb25cclxuICAgIHZhciBfdG9nZ2xlTmF2ID0gZnVuY3Rpb24oZXYpIHtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCcjb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vYW5nbGUtZG93blxyXG4gICAgdmFyIF9hbmdsZURvd25TY3JvbGwgPSBmdW5jdGlvbiAoZXYpe1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBoZWlnaHR9LCA1MDApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2FuZ2xlLXVwXHJcbiAgICB2YXIgX2FuZ2xlVXBTY3JvbGwgPSBmdW5jdGlvbiAoZXYpe1xyXG4gICAgICAgICQoJ2h0bWwsYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDUwMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vbG9nIGluIHRvZ2dsZVxyXG4gICAgdmFyIF9sb2dJbiA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICQoJy5hdXRoX190b2dnbGUtYnRuJykuY3NzKCd2aXNpYmlsaXR5JywnaGlkZGVuJyk7XHJcbiAgICAgICAgJCgnLndlbGNvbWVfX21lbnUnKS5jc3MoJ3RyYW5zZm9ybScsJ3JvdGF0ZVkoMTgwZGVnKScpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2hvbWUgdG9nZ2xlXHJcbiAgICB2YXIgX2hvbWUgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAkKCcuYXV0aF9fdG9nZ2xlLWJ0bicpLmNzcygndmlzaWJpbGl0eScsJ3Zpc2libGUnKTtcclxuICAgICAgICAkKCcud2VsY29tZV9fbWVudScpLmNzcygndHJhbnNmb3JtJywncm90YXRlWSgwZGVnKScpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2Jsb2dfc3dpcGVfc2lkZWJhclxyXG4gICAgdmFyIF9zd2lwZSA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICQoJy5zaWRlYmFyJykudG9nZ2xlQ2xhc3MoJ3NpZGViYXItb3BlbicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vc2xpZGVyIHByZXZpb3VzIHdvcmtcclxuICAgIHZhciAkc2xpZGVyX2xpc3RfcmV2ZXJzZSA9ICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXJldmVyc2UnKTtcclxuICAgIHZhciAkc2xpZGVyX2xpc3Rfc3RyYWlnaHQgPSAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1zdHJhaWdodCcpO1xyXG4gICAgdmFyICRzbGlkZXJfbGlzdF9iaWcgPSAkKCcuc2xpZGVyX19saXN0X19iaWcnKTtcclxuICAgIHZhciAkd29ya19fZGVzY19fbGlzdCA9ICQoJy53b3JrX19kZXNjX19saXN0Jyk7XHJcblxyXG4gICAgdmFyIF9zbGlkZXJQcmV2ID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgLy8gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtc3RyYWlnaHQnKS5jc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZVkoLTEwMCUpJyk7XHJcbiAgICAgICAgLy8gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtcmV2ZXJzZScpLmNzcygndHJhbnNmb3JtJywndHJhbnNsYXRlWSgwJSknKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3RfcmV2ZXJzZS5jaGlsZHJlbigpLmZpcnN0KCkuaW5zZXJ0QWZ0ZXIoJHNsaWRlcl9saXN0X3JldmVyc2UuY2hpbGRyZW4oKS5sYXN0KCkpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9zdHJhaWdodC5jaGlsZHJlbigpLmxhc3QoKS5pbnNlcnRCZWZvcmUoJHNsaWRlcl9saXN0X3N0cmFpZ2h0LmNoaWxkcmVuKCkuZmlyc3QoKSk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X2JpZy5jaGlsZHJlbigpLmxhc3QoKS5pbnNlcnRCZWZvcmUoJHNsaWRlcl9saXN0X2JpZy5jaGlsZHJlbigpLmZpcnN0KCkpO1xyXG4gICAgICAgICR3b3JrX19kZXNjX19saXN0LmNoaWxkcmVuKCkubGFzdCgpLmluc2VydEJlZm9yZSgkd29ya19fZGVzY19fbGlzdC5jaGlsZHJlbigpLmZpcnN0KCkpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy9zbGlkZXIgbmV4dCB3b3JrXHJcbiAgICB2YXIgX3NsaWRlck5leHQgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAvLyAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1yZXZlcnNlJykuY3NzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGVZKC0xMDAlKScpO1xyXG4gICAgICAgIC8vICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXN0cmFpZ2h0JykuY3NzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGVZKDAlKScpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9zdHJhaWdodC5jaGlsZHJlbigpLmZpcnN0KCkuaW5zZXJ0QWZ0ZXIoJHNsaWRlcl9saXN0X3N0cmFpZ2h0LmNoaWxkcmVuKCkubGFzdCgpKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3RfcmV2ZXJzZS5jaGlsZHJlbigpLmxhc3QoKS5pbnNlcnRCZWZvcmUoJHNsaWRlcl9saXN0X3JldmVyc2UuY2hpbGRyZW4oKS5maXJzdCgpKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3RfYmlnLmNoaWxkcmVuKCkuZmlyc3QoKS5pbnNlcnRBZnRlcigkc2xpZGVyX2xpc3RfYmlnLmNoaWxkcmVuKCkubGFzdCgpKTtcclxuICAgICAgICAkd29ya19fZGVzY19fbGlzdC5jaGlsZHJlbigpLmZpcnN0KCkuaW5zZXJ0QWZ0ZXIoJHdvcmtfX2Rlc2NfX2xpc3QuY2hpbGRyZW4oKS5sYXN0KCkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL3RvZ2dsZSBzY3JvbGwgYmFyIG9uIG5hdiBleHBhbmRcclxuICAgIHZhciBfaGlkZVNjcm9sbCA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnaGlkZS1zY3JvbGwnKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3Jlc2V0IG1lc3NhZ2UgZm9ybVxyXG4gICAgdmFyIF9yZXNldE1lc3NhZ2VGb3JtID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJCgnLmJ0bi1zZW5kJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSkudGV4dCgnU2VuZCcpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0OiBpbml0XHJcbiAgICAgICAgfTtcclxuXHJcbn0pKCk7XHJcblxyXG5ldmVudExpc3RlbmVycy5pbml0KCk7XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQWxleGV5IG9uIDA5LURlYy0xNi5cclxuICovXHJcbi8vU1ZHIGFuaW1hdGVkIGNpcmNsZSBsZXZlbHNcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xyXG4gICAgdmFyIGlzUmVuZGVyZWQgPSAwO1xyXG4gICAgdmFyIHNraWxsQ2lyY2xlc09iaiA9IFtdO1xyXG4gICAgJC5lYWNoKCQoJy5za2lsbC1jaXJjbGUnKSwgZnVuY3Rpb24gKGluZCwgdmFsKSB7XHJcbiAgICAgICAgdmFyIGNpcmNsZUJvdHRvbSA9ICQodGhpcykuaGVpZ2h0KCkgKyAkKHRoaXMpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICBza2lsbENpcmNsZXNPYmoucHVzaCh7XHJcbiAgICAgICAgICAgIGNpcmNsZTogdmFsLFxyXG4gICAgICAgICAgICBjaXJjbGVCb3R0b206IGNpcmNsZUJvdHRvbSxcclxuICAgICAgICAgICAgaXNSZW5kZXJlZDogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlzUmVuZGVyZWQrKztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnMSAnKyBpc1JlbmRlcmVkKTtcclxuICAgIH0pXHJcblxyXG4gICAgdmFyIHNraWxsQ2lyY2xlU2V0ID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgdmFyIHNjcm9sbEJvdHRvbSA9IHdpbmRvdy5zY3JvbGxZICsgJHdpbmRvdy5oZWlnaHQoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhzY3JvbGxCb3R0b20pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCc0ICcraXNSZW5kZXJlZCk7XHJcbiAgICAgICAgJC5lYWNoKHNraWxsQ2lyY2xlc09iaiwgZnVuY3Rpb24gKGluZCwgdmFsKSB7XHJcbiAgICAgICAgICAgIGlmICghdmFsWydpc1JlbmRlcmVkJ10gJiYgc2Nyb2xsQm90dG9tID4gdmFsWydjaXJjbGVCb3R0b20nXSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRjaXJjbGUgPSAkKHZhbFsnY2lyY2xlJ10pO1xyXG4gICAgICAgICAgICAgICAgdmFyICRjaXJjbGVMZXZlbCA9ICRjaXJjbGUuYXR0cignZGF0YS1sZXZlbCcpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRjaXJjbGVCYXIgPSAkY2lyY2xlLmNoaWxkcmVuKCcuY2lyY2xlLWJhcicpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRjYWxjQ2lyY2xlTGV2ZWwgPSAoJGNpcmNsZUJhci5jc3MoJ3N0cm9rZS1kYXNob2Zmc2V0Jykuc2xpY2UoMCwgLTIpKSAqICgxMDAgLSAkY2lyY2xlTGV2ZWwpIC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgJGNpcmNsZUJhci5jc3MoJ3N0cm9rZS1kYXNob2Zmc2V0JywgJGNhbGNDaXJjbGVMZXZlbCk7XHJcbiAgICAgICAgICAgICAgICB2YWxbJ2lzUmVuZGVyZWQnXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpc1JlbmRlcmVkLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXNSZW5kZXJlZDw9MCl7XHJcbiAgICAgICAgICAgIC8vc2h1dGRvd24gZXZlbnRMaXN0ZW5lclxyXG4gICAgICAgICAgICAkd2luZG93Lm9mZignc2Nyb2xsJywgc2tpbGxDaXJjbGVTZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9tb2JpbGUgU2FmYXJpIHdvcmthcm91bmRcclxuICAgIHZhciB1c2VyQWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcclxuICAgIGlmICh1c2VyQWdlbnQubWF0Y2goLyhpUGFkfGlQaG9uZXxpUG9kKS9pKSApe1xyXG4gICAgICAgICQuZWFjaChza2lsbENpcmNsZXNPYmosIGZ1bmN0aW9uIChpbmQsIHZhbCkge1xyXG4gICAgICAgICAgICB2YXIgJGNpcmNsZSA9ICQodmFsWydjaXJjbGUnXSk7XHJcbiAgICAgICAgICAgIHZhciAkY2lyY2xlTGV2ZWwgPSAkY2lyY2xlLmF0dHIoJ2RhdGEtbGV2ZWwnKTtcclxuICAgICAgICAgICAgdmFyICRjaXJjbGVCYXIgPSAkY2lyY2xlLmNoaWxkcmVuKCcuY2lyY2xlLWJhcicpO1xyXG4gICAgICAgICAgICB2YXIgJGNhbGNDaXJjbGVMZXZlbCA9ICgkY2lyY2xlQmFyLmNzcygnc3Ryb2tlLWRhc2hvZmZzZXQnKS5zbGljZSgwLCAtMikpICogKDEwMCAtICRjaXJjbGVMZXZlbCkgLyAxMDA7XHJcbiAgICAgICAgICAgICRjaXJjbGVCYXIuY3NzKCdzdHJva2UtZGFzaG9mZnNldCcsICRjYWxjQ2lyY2xlTGV2ZWwpO1xyXG4gICAgICAgICAgICB2YWxbJ2lzUmVuZGVyZWQnXSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXNSZW5kZXJlZD0wO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc1JlbmRlcmVkID4gMCkge1xyXG4gICAgICAgICR3aW5kb3cub24oJ3Njcm9sbCcsIHNraWxsQ2lyY2xlU2V0KTtcclxuICAgIH07XHJcblxyXG59KSgpOyIsInZhciBjb21tb25BamF4ID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgYWpheEZvcm0gPSBmdW5jdGlvbiAoZm9ybURhdGEsIHVybCkge1xyXG4gICAgICAgIGlmICghdmFsaWRhdGlvbi52YWxpZGF0ZUZvcm0oZm9ybURhdGEpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gZm9ybURhdGEuZmluZCgnaW5wdXQsIHRleHRhcmVhJykubm90KCdpbnB1dFt0eXBlPVwiaGlkZGVuXCJdJyk7XHJcbiAgICAgICAgdmFyIERhdGEgPSB7fTtcclxuXHJcbiAgICAgICAgJC5lYWNoKGVsZW1lbnRzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKCRlbGVtZW50LnByb3AoXCJkZWZhdWx0VmFsdWVcIikgIT0gJGVsZW1lbnQucHJvcChcInZhbHVlXCIpKXtcclxuICAgICAgICAgICAgICAgIC8vIHZhciBwdXNoRWxlbWVudCA9ICRlbGVtZW50LnNlcmlhbGl6ZUFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBEYXRhLnB1c2gocHVzaEVsZW1lbnRbMF0pO1xyXG4gICAgICAgICAgICAgICAgRGF0YVskZWxlbWVudC5wcm9wKFwibmFtZVwiKV09JGVsZW1lbnQucHJvcChcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coWyRlbGVtZW50LnByb3AoXCJuYW1lXCIpXSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygkZWxlbWVudC5wcm9wKFwibmFtZVwiKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhEYXRhWyRlbGVtZW50LnByb3AoXCJuYW1lXCIpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhEYXRhKTtcclxuICAgICAgICB2YXIgYWpheERhdGEgPSBKU09OLnN0cmluZ2lmeShEYXRhKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhamF4RGF0YSk7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICQuYWpheCh7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGRhdGE6IGFqYXhEYXRhLFxyXG4gICAgICAgICAgICAvLyBhc3luYzogZmFsc2UsXHJcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGFucykge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYW5zKTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWpheEZvcm06IGFqYXhGb3JtXHJcbiAgICB9O1xyXG5cclxufSkoKTsiLCJ2YXIgdmFsaWRhdGlvbiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdmFsaWRhdGVGb3JtID0gZnVuY3Rpb24gKGZvcm0pIHtcclxuICAgICAgICAgICAgaWYgKCQoJyNodW1hbi1jaGVja2JveCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICgoISQoJyNodW1hbi1jaGVja2JveCcpLmlzKFwiOmNoZWNrZWRcIikpIHx8ICghJCgnI2JvdC1jaGVja19feWVzJykuaXMoXCI6Y2hlY2tlZFwiKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYXV0aF9fcmVzcG9uc2UnKS50ZXh0KFwiT25seSBmb3IgaHVtYW4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKS5ub3QoJ2lucHV0W3R5cGU9XCJoaWRkZW5cIl0nKSxcclxuICAgICAgICAgICAgICAgIHZhbGlkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaChlbGVtZW50cywgZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKGVsZW1lbnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJGVsZW1lbnQudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfYWRkRXJyb3IoJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2YWxpZDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJ2Zvcm0nKS5vbigna2V5ZG93bicsICcuaGFzLWVycm9yJywgX3JlbW92ZUVycm9yKTtcclxuICAgICAgICAgICAgJCgnZm9ybScpLm9uKCdjbGljaycsICcuaGFzLWVycm9yJywgX3JlbW92ZUVycm9yKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfYWRkRXJyb3IgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfcmVtb3ZlRXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBpbml0LFxyXG4gICAgICAgIHZhbGlkYXRlRm9ybTogdmFsaWRhdGVGb3JtXHJcbiAgICB9O1xyXG5cclxufSkoKTtcclxuXHJcbnZhbGlkYXRpb24uaW5pdCgpOyIsInZhciBhQ2hpbGRyZW4gPSAkKFwiLnNpZGViYXJfX2xpc3QgbGlcIikuY2hpbGRyZW4oKTsgLy8gZmluZCB0aGUgYSBjaGlsZHJlbiBvZiB0aGUgbGlzdCBpdGVtc1xyXG52YXIgYUFycmF5ID0gW107IC8vIGNyZWF0ZSB0aGUgZW1wdHkgYUFycmF5XHJcbmZvciAodmFyIGk9MDsgaSA8IGFDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGFDaGlsZCA9IGFDaGlsZHJlbltpXTtcclxuICAgIHZhciBhaHJlZiA9ICQoYUNoaWxkKS5hdHRyKCdocmVmJyk7XHJcbiAgICBhQXJyYXkucHVzaChhaHJlZik7XHJcbn0gLy8gdGhpcyBmb3IgbG9vcCBmaWxscyB0aGUgYUFycmF5IHdpdGggYXR0cmlidXRlIGhyZWYgdmFsdWVzXHJcblxyXG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgd2luZG93UG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpOyAvLyBnZXQgdGhlIG9mZnNldCBvZiB0aGUgd2luZG93IGZyb20gdGhlIHRvcCBvZiBwYWdlXHJcbiAgICB2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpOyAvLyBnZXQgdGhlIGhlaWdodCBvZiB0aGUgd2luZG93XHJcbiAgICB2YXIgZG9jSGVpZ2h0ID0gJChkb2N1bWVudCkuaGVpZ2h0KCk7XHJcblxyXG4gICAgZm9yICh2YXIgaT0wOyBpIDwgYUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHRoZUlEID0gYUFycmF5W2ldO1xyXG4gICAgICAgIHZhciBkaXZQb3MgPSAkKHRoZUlEKS5vZmZzZXQoKS50b3A7IC8vIGdldCB0aGUgb2Zmc2V0IG9mIHRoZSBkaXYgZnJvbSB0aGUgdG9wIG9mIHBhZ2VcclxuICAgICAgICB2YXIgZGl2SGVpZ2h0ID0gJCh0aGVJRCkuaGVpZ2h0KCk7IC8vIGdldCB0aGUgaGVpZ2h0IG9mIHRoZSBkaXYgaW4gcXVlc3Rpb25cclxuICAgICAgICBpZiAod2luZG93UG9zICs0MCA+PSBkaXZQb3MgJiYgd2luZG93UG9zIDwgKGRpdlBvcyArIGRpdkhlaWdodCkpIHtcclxuICAgICAgICAgICAgJChcImFbaHJlZj0nXCIgKyB0aGVJRCArIFwiJ11cIikucGFyZW50KCkuYWRkQ2xhc3MoXCJzaWRlYmFyX19pdGVtLWFjdGl2ZVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiYVtocmVmPSdcIiArIHRoZUlEICsgXCInXVwiKS5wYXJlbnQoKS5yZW1vdmVDbGFzcyhcInNpZGViYXJfX2l0ZW0tYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQWxleGV5IG9uIDE3LURlYy0xNi5cclxuICovXHJcblxyXG4vL2xvZ2luIGZvcm1cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyNsb2dpbicpLm9uKFwic3VibWl0XCIsIGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnLmF1dGhfX3Jlc3BvbnNlJykudGV4dChcIlwiKTtcclxuICAgICAgICAkKCcuYnRuLWxvZ2luJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKS50ZXh0KCdMb2dnaW5nIGluLi4uJyk7XHJcbiAgICAgICAgLy8gJCgnLnByZWxvYWRlcicpLmZhZGVJbigpO1xyXG4gICAgICAgIHZhciBmb3JtRGF0YSA9ICQodGhpcyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZm9ybURhdGEpO1xyXG4gICAgICAgIC8vIGFqYXgg0LfQsNC/0YDQvtGBXHJcbiAgICAgICAgdmFyIGRlZk9iaiA9IGNvbW1vbkFqYXguYWpheEZvcm0oZm9ybURhdGEsICcuL2xvZ2luJyk7XHJcbiAgICAgICAgaWYoZGVmT2JqKXtcclxuICAgICAgICAgICAgZGVmT2JqLmRvbmUoZnVuY3Rpb24gKGFucykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhbnMucmVkaXJlY3QgPT0gJ3N0cmluZycpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5idG4tbG9naW4nKS50ZXh0KGFuc1snc3RhdHVzJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGFucy5yZWRpcmVjdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5hdXRoX19yZXNwb25zZScpLnRleHQoYW5zWydzdGF0dXMnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bi1sb2dpbicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnRleHQoJ0xvZyBpbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICQoJy5wcmVsb2FkZXInKS5mYWRlT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJhZnRlclwiK2Fucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gJCgnLnBvcC11cF9fbWVzc2FnZScpLnRleHQoYW5zKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAkKCcucG9wLXVwX19sb2cnKS5mYWRlSW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59KSgpO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBbGV4ZXkgb24gMTctRGVjLTE2LlxyXG4gKi9cclxuXHJcbi8vbWVzc2FnZSBmb3JtXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjY29udGFjdC11cycpLm9uKFwic3VibWl0XCIsIGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyICRidG5TZW5kID0gJCgnLmJ0bi1zZW5kJyk7XHJcbiAgICAgICAgJGJ0blNlbmQucHJvcChcImRpc2FibGVkXCIsdHJ1ZSk7XHJcbiAgICAgICAgJGJ0blNlbmQudGV4dChcIlNlbmRpbmcuLi5cIik7XHJcbiAgICAgICAgLy8gJCgnLnByZWxvYWRlcicpLmZhZGVJbigpO1xyXG4gICAgICAgIHZhciBmb3JtRGF0YSA9ICQodGhpcyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZm9ybURhdGEpO1xyXG4gICAgICAgIC8vIGFqYXgg0LfQsNC/0YDQvtGBXHJcbiAgICAgICAgdmFyIGRlZk9iaiA9IGNvbW1vbkFqYXguYWpheEZvcm0oZm9ybURhdGEsICcuL21lc3NhZ2UnKTtcclxuICAgICAgICBpZihkZWZPYmope1xyXG4gICAgICAgICAgICBkZWZPYmouZG9uZShmdW5jdGlvbiAoYW5zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhbnMpO1xyXG4gICAgICAgICAgICAgICAgJGJ0blNlbmQudGV4dChhbnMpO1xyXG4gICAgICAgICAgICAgICAgLy8gJCgnLnByZWxvYWRlcicpLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYWZ0ZXJcIithbnMpO1xyXG4gICAgICAgICAgICAgICAgLy8gJCgnLnBvcC11cF9fbWVzc2FnZScpLnRleHQoYW5zKTtcclxuICAgICAgICAgICAgICAgIC8vICQoJy5wb3AtdXBfX2xvZycpLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSkoKTtcclxuIiwiLy9cclxuLy9Nb3VzZSBwYXJhbGxheFxyXG5cclxudmFyIGxheWVyID0gJCgnLnBhcmFsbGF4JykuZmluZCgnLnBhcmFsbGF4X19sYXllcicpO1xyXG52YXIgbGFzdEJnID0gbGF5ZXIuZmlyc3QoKS5maW5kKCdpbWcnKTtcclxuXHJcbi8vc2V0IGJhY2tyb3VuZCBzaXplXHJcbnZhciBzZXRCZ1NpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgYmdJbWdXaWR0aFJhdGUgPSAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCAqIGxhc3RCZy5wcm9wKCduYXR1cmFsV2lkdGgnKSAvICh3aW5kb3cuaW5uZXJXaWR0aCAqIGxhc3RCZy5wcm9wKCduYXR1cmFsSGVpZ2h0JykpKTtcclxuICAgIGlmIChiZ0ltZ1dpZHRoUmF0ZSA8IDEpIHtcclxuICAgICAgICB2YXIgYmdJbWdIZWlnaHRSYXRlID0gMSAvIGJnSW1nV2lkdGhSYXRlO1xyXG4gICAgICAgIHZhciBiZ0ltZ0hlaWdodFNoaWZ0ID0gKDEgLSBiZ0ltZ0hlaWdodFJhdGUqIDEuMSkgLyAyOyAvLzEuMSA9IDExMCUgLy8gNSUgZm9yIGV2ZXJ5IHNpZGUgb2Ygc2NyZWVuXHJcbiAgICAgICAgbGF5ZXIuZmluZCgnaW1nJykuY3NzKHsnYm90dG9tJzogMTAwICogYmdJbWdIZWlnaHRTaGlmdCArICclJ30pO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIGxheWVyLmZpbmQoJ2ltZycpLmNzcyh7J3dpZHRoJzogMTAwICogYmdJbWdXaWR0aFJhdGUgKyAnJSd9KTtcclxuXHJcbn1cclxuXHJcbmxhc3RCZy5sb2FkKGZ1bmN0aW9uKCkge1xyXG4gICAgc2V0QmdTaXplKCk7XHJcbn0pO1xyXG5cclxuXHJcbiQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICBzZXRCZ1NpemUoZXYpO1xyXG59KTtcclxuXHJcbiQod2luZG93KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICB2YXIgbW91c2VYID0gZXYucGFnZVgsXHJcbiAgICAgICAgbW91c2VZID0gZXYucGFnZVksXHJcbiAgICAgICAgd0Zyb21DZW50ZXIgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgLSBtb3VzZVgsXHJcbiAgICAgICAgaEZyb21DZW50ZXIgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIC0gbW91c2VZO1xyXG5cclxuICAgIGxheWVyLm1hcChmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciB3aWR0aFNoaWZ0ID0gd0Zyb21DZW50ZXIgKiAoKGtleSArIDEpIC8gMTAwKTtcclxuICAgICAgICB2YXIgaGVpZ2h0U2hpZnQgPSBoRnJvbUNlbnRlciAqICgoa2V5ICsgMSkgLyAxMDApO1xyXG4gICAgICAgICQodmFsdWUpLmNzcyh7XHJcbiAgICAgICAgICAgICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoJyArIHdpZHRoU2hpZnQgKyAncHgsICcgKyBoZWlnaHRTaGlmdCArICdweCwgMHB4KSdcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcbn0pOyIsIi8vXHJcbi8vIFBBUkFMTEFYIFNDUk9MTFxyXG52YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGJnID0gJCgnLmhlYWRlcl9fYmcnKSxcclxuICAgICAgICB1c2VyID0gJCgnLmF2YXRhcicpLFxyXG4gICAgICAgIHNlY3Rpb25UZXh0ID0gJCgnLmhlYWRlcl9fYmctdGV4dC1pbWcnKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1vdmU6IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuICAgICAgICAgICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJScsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywgMCknO1xyXG5cclxuICAgICAgICAgICAgYmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiB0cmFuc2Zvcm1TdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiB0cmFuc2Zvcm1TdHJpbmdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZShzZWN0aW9uVGV4dCwgd1Njcm9sbCwgOCk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCA1KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7XHJcblxyXG5pZiAod2luZG93LmlubmVyV2lkdGg+OTkyKSB7XHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgd1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICBwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG4gICAgfSk7IC8vIC0+IHNjcm9sbF9lbmQ7XHJcbn0iLCIvL3ByZWxvYWRlclxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgaW1ncyA9IFtdO1xyXG5cclxuICAgICQuZWFjaCgkKCcqJyksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kcyA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLnNwbGl0KCcsJyksXHJcbiAgICAgICAgICAgIGltZyA9ICR0aGlzLmlzKCdpbWcnKTtcclxuXHJcbiAgICAgICAgaWYgKGJhY2tncm91bmRzICE9ICdub25lJykge1xyXG4gICAgICAgICAgICAkLmVhY2goYmFja2dyb3VuZHMsIGZ1bmN0aW9uIChpbmRleCwgYmFja2dyb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICAgICAgICAgICAgICBpbWdzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW1nKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gJHRoaXMuYXR0cignc3JjJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICAgICAgaW1ncy5wdXNoKHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2YXIgcGVyY2VudHNUb3RhbCA9IDE7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGltYWdlID0gJCgnPGltZz4nLCB7XHJcbiAgICAgICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgICAgIHNyYzogaW1nc1tpXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGltYWdlLm9uKHtcclxuICAgICAgICAgICAgbG9hZCA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltZ3MubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UGVyY2VudHModG90YWwsIGN1cnJlbnQpIHtcclxuICAgICAgICB2YXIgcGVyY2VudCA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG5cclxuICAgICAgICBpZiAocGVyY2VudCA+PSAxMDApIHtcclxuICAgICAgICAgICAgJCgnLnByZWxvYWRlcicpLmZhZGVPdXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5wcmVsb2FkZXJfX3BlcmNlbnRzJykudGV4dChwZXJjZW50ICsgJyUnKTtcclxuICAgIH1cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQWxleGV5IG9uIDEyLURlYy0xNi5cclxuICovXHJcbi8vdXBkYXRlIHNraWxscyB2aWEgYWRtaW4gcGFnZVxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI3RhYi1hYm91dF9fY29udGVudCcpLm9uKFwic3VibWl0XCIsIGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnLnByZWxvYWRlcicpLmZhZGVJbigpO1xyXG4gICAgICAgIHZhciBmb3JtRGF0YSA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgIC8vIGFqYXgg0LfQsNC/0YDQvtGBXHJcbiAgICAgICAgdmFyIGRlZk9iaiA9IGNvbW1vbkFqYXguYWpheEZvcm0oZm9ybURhdGEsICcuL3NhdmVTa2lsbHMnKTtcclxuICAgICAgICBpZihkZWZPYmope1xyXG4gICAgICAgICAgICBkZWZPYmouZG9uZShmdW5jdGlvbiAoYW5zKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucHJlbG9hZGVyJykuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICAgICAgJCgnLnBvcC11cF9fbWVzc2FnZScpLnRleHQoYW5zKTtcclxuICAgICAgICAgICAgICAgICQoJy5wb3AtdXBfX2xvZycpLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvL1xyXG4gICAgfSlcclxufSkoKVxyXG4iLCIiLCIkKGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnYVtocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpICYmIGxvY2F0aW9uLmhvc3RuYW1lID09IHRoaXMuaG9zdG5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbXkgPSB7fTtcclxuXHJcbiAgICBhZGRMaXN0ZW5lcigpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZExpc3RlbmVyKCkge1xyXG4gICAgICAgICQoJ2Zvcm0nKS5vbignc3VibWl0Jywgc3VibWl0Rm9ybSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWJtaXRGb3JtKGV2KSB7XHJcblxyXG4gICAgICAgIHZhciAkZm9ybSA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIHVybD0nJyxcclxuICAgICAgICAgICAgZGVmT2JqZWN0ICAgPSBhamF4Rm9ybSgkZm9ybSwgdXJsKTtcclxuXHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gYWpheEZvcm0oZm9ybSwgdXJsKSB7XHJcbiAgICAgICAgaWYoIXZhbGlkYXRpb24udmFsaWRhdGVGb3JtKGZvcm0pKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
