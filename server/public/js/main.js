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
        // $('.preloader').fadeIn();
        var formData = $(this);
        console.log(formData);
        // ajax запрос
        var defObj = commonAjax.ajaxForm(formData, './login');
        if(defObj){
            defObj.done(function (ans) {
                $('.auth__response').text(ans['status']);
                $('.preloader').fadeOut();
                // console.log("after"+ans);
                // $('.pop-up__message').text(ans);
                // $('.pop-up__log').fadeIn();
                // location.reload();
                if (typeof ans.redirect == 'string')
                    window.location = ans.redirect;

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
        $('.btn-send').text("Sending...");
        // $('.preloader').fadeIn();
        var formData = $(this);
        console.log(formData);
        // ajax запрос
        var defObj = commonAjax.ajaxForm(formData, './message');
        if(defObj){
            defObj.done(function (ans) {
                $('.btn-send').text("Done");
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

//set backround size
var setBgSize = function () {
    var lastBg = layer.first().find('img');
    var bgImgWidthRate = (document.documentElement.scrollHeight * lastBg.prop('naturalWidth') / (window.innerWidth * lastBg.prop('naturalHeight')));
    if (bgImgWidthRate < 1) {
        var bgImgHeightRate = 1 / bgImgWidthRate;
        var bgImgHeightShift = (1 - bgImgHeightRate* 1.1) / 2; //1.1 = 110% // 5% for every side of screen
        layer.find('img').css({'bottom': 100 * bgImgHeightShift + '%'});
    }
    else
        layer.find('img').css({'width': 100 * bgImgWidthRate + '%'});

}

setBgSize();

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNpcmNsZVNraWxsLmpzIiwiY29tbW9uQWpheC5qcyIsImZvcm1WYWxpZGF0aW9uLmpzIiwiaGlnaGxpZ2h0U2lkZWJhci5qcyIsImxvZ2luLmpzIiwibWVzc2FnZS5qcyIsInBhcmFsbGF4TW91c2UuanMiLCJwYXJhbGxheFNjcm9sbC5qcyIsInByZWxvYWRlci5qcyIsInNhdmVTa2lsbHMuanMiLCJzbGlkZXJDb29sLmpzIiwic21vb3RoU2Nyb2xsLmpzIiwic3VibWl0Q2F0Y2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBldmVudExpc3RlbmVycyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnI3RvZ2dsZScpLm9uKCdjbGljaycsIF90b2dnbGVOYXYpO1xyXG4gICAgICAgICQoJy5hbmdsZS1kb3duJykub24oJ2NsaWNrJywgX2FuZ2xlRG93blNjcm9sbCk7XHJcbiAgICAgICAgJCgnLmFuZ2xlLXVwJykub24oJ2NsaWNrJywgX2FuZ2xlVXBTY3JvbGwpO1xyXG4gICAgICAgICQoJy5hdXRoX190b2dnbGUtYnRuJykub24oJ2NsaWNrJyxfbG9nSW4pO1xyXG4gICAgICAgICQoJy5idG4taG9tZScpLm9uKCdjbGljaycsX2hvbWUpO1xyXG4gICAgICAgICQoJy5zd2lwZS1vdmVybGF5Jykub24oJ2NsaWNrJywgX3N3aXBlKTtcclxuICAgICAgICAkKCcuc3dpcGUnKS5vbignY2xpY2snLCBfc3dpcGUpO1xyXG4gICAgICAgICQoJy5zbGlkZXJfX2Fycm93LWRvd24nKS5vbignY2xpY2snLCBfc2xpZGVyUHJldik7XHJcbiAgICAgICAgJCgnLnNsaWRlcl9fYXJyb3ctdXAnKS5vbignY2xpY2snLCBfc2xpZGVyTmV4dCk7XHJcbiAgICAgICAgJCgnLmJ1dHRvbl9jb250YWluZXInKS5vbignY2xpY2snLCBfaGlkZVNjcm9sbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE5BVmlnYXRpb25cclxuICAgIHZhciBfdG9nZ2xlTmF2ID0gZnVuY3Rpb24oZXYpIHtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCcjb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vYW5nbGUtZG93blxyXG4gICAgdmFyIF9hbmdsZURvd25TY3JvbGwgPSBmdW5jdGlvbiAoZXYpe1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBoZWlnaHR9LCA1MDApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2FuZ2xlLXVwXHJcbiAgICB2YXIgX2FuZ2xlVXBTY3JvbGwgPSBmdW5jdGlvbiAoZXYpe1xyXG4gICAgICAgICQoJ2h0bWwsYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDUwMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vbG9nIGluIHRvZ2dsZVxyXG4gICAgdmFyIF9sb2dJbiA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICQoJy5hdXRoX190b2dnbGUtYnRuJykuY3NzKCd2aXNpYmlsaXR5JywnaGlkZGVuJyk7XHJcbiAgICAgICAgJCgnLndlbGNvbWVfX21lbnUnKS5jc3MoJ3RyYW5zZm9ybScsJ3JvdGF0ZVkoMTgwZGVnKScpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2hvbWUgdG9nZ2xlXHJcbiAgICB2YXIgX2hvbWUgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAkKCcuYXV0aF9fdG9nZ2xlLWJ0bicpLmNzcygndmlzaWJpbGl0eScsJ3Zpc2libGUnKTtcclxuICAgICAgICAkKCcud2VsY29tZV9fbWVudScpLmNzcygndHJhbnNmb3JtJywncm90YXRlWSgwZGVnKScpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2Jsb2dfc3dpcGVfc2lkZWJhclxyXG4gICAgdmFyIF9zd2lwZSA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICQoJy5zaWRlYmFyJykudG9nZ2xlQ2xhc3MoJ3NpZGViYXItb3BlbicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vc2xpZGVyIHByZXZpb3VzIHdvcmtcclxuICAgIHZhciAkc2xpZGVyX2xpc3RfcmV2ZXJzZSA9ICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXJldmVyc2UnKTtcclxuICAgIHZhciAkc2xpZGVyX2xpc3Rfc3RyYWlnaHQgPSAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1zdHJhaWdodCcpO1xyXG4gICAgdmFyICRzbGlkZXJfbGlzdF9iaWcgPSAkKCcuc2xpZGVyX19saXN0X19iaWcnKTtcclxuICAgIHZhciAkd29ya19fZGVzY19fbGlzdCA9ICQoJy53b3JrX19kZXNjX19saXN0Jyk7XHJcblxyXG4gICAgdmFyIF9zbGlkZXJQcmV2ID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgLy8gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtc3RyYWlnaHQnKS5jc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZVkoLTEwMCUpJyk7XHJcbiAgICAgICAgLy8gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtcmV2ZXJzZScpLmNzcygndHJhbnNmb3JtJywndHJhbnNsYXRlWSgwJSknKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3RfcmV2ZXJzZS5jaGlsZHJlbigpLmZpcnN0KCkuaW5zZXJ0QWZ0ZXIoJHNsaWRlcl9saXN0X3JldmVyc2UuY2hpbGRyZW4oKS5sYXN0KCkpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9zdHJhaWdodC5jaGlsZHJlbigpLmxhc3QoKS5pbnNlcnRCZWZvcmUoJHNsaWRlcl9saXN0X3N0cmFpZ2h0LmNoaWxkcmVuKCkuZmlyc3QoKSk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X2JpZy5jaGlsZHJlbigpLmxhc3QoKS5pbnNlcnRCZWZvcmUoJHNsaWRlcl9saXN0X2JpZy5jaGlsZHJlbigpLmZpcnN0KCkpO1xyXG4gICAgICAgICR3b3JrX19kZXNjX19saXN0LmNoaWxkcmVuKCkubGFzdCgpLmluc2VydEJlZm9yZSgkd29ya19fZGVzY19fbGlzdC5jaGlsZHJlbigpLmZpcnN0KCkpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy9zbGlkZXIgbmV4dCB3b3JrXHJcbiAgICB2YXIgX3NsaWRlck5leHQgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAvLyAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1yZXZlcnNlJykuY3NzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGVZKC0xMDAlKScpO1xyXG4gICAgICAgIC8vICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXN0cmFpZ2h0JykuY3NzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGVZKDAlKScpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9zdHJhaWdodC5jaGlsZHJlbigpLmZpcnN0KCkuaW5zZXJ0QWZ0ZXIoJHNsaWRlcl9saXN0X3N0cmFpZ2h0LmNoaWxkcmVuKCkubGFzdCgpKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3RfcmV2ZXJzZS5jaGlsZHJlbigpLmxhc3QoKS5pbnNlcnRCZWZvcmUoJHNsaWRlcl9saXN0X3JldmVyc2UuY2hpbGRyZW4oKS5maXJzdCgpKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3RfYmlnLmNoaWxkcmVuKCkuZmlyc3QoKS5pbnNlcnRBZnRlcigkc2xpZGVyX2xpc3RfYmlnLmNoaWxkcmVuKCkubGFzdCgpKTtcclxuICAgICAgICAkd29ya19fZGVzY19fbGlzdC5jaGlsZHJlbigpLmZpcnN0KCkuaW5zZXJ0QWZ0ZXIoJHdvcmtfX2Rlc2NfX2xpc3QuY2hpbGRyZW4oKS5sYXN0KCkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL3RvZ2dsZSBzY3JvbGwgYmFyIG9uIG5hdiBleHBhbmRcclxuICAgIHZhciBfaGlkZVNjcm9sbCA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnaGlkZS1zY3JvbGwnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0OiBpbml0XHJcbiAgICAgICAgfTtcclxuXHJcbn0pKCk7XHJcblxyXG5ldmVudExpc3RlbmVycy5pbml0KCk7XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQWxleGV5IG9uIDA5LURlYy0xNi5cclxuICovXHJcbi8vU1ZHIGFuaW1hdGVkIGNpcmNsZSBsZXZlbHNcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xyXG4gICAgdmFyIGlzUmVuZGVyZWQgPSAwO1xyXG4gICAgdmFyIHNraWxsQ2lyY2xlc09iaiA9IFtdO1xyXG4gICAgJC5lYWNoKCQoJy5za2lsbC1jaXJjbGUnKSwgZnVuY3Rpb24gKGluZCwgdmFsKSB7XHJcbiAgICAgICAgdmFyIGNpcmNsZUJvdHRvbSA9ICQodGhpcykuaGVpZ2h0KCkgKyAkKHRoaXMpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICBza2lsbENpcmNsZXNPYmoucHVzaCh7XHJcbiAgICAgICAgICAgIGNpcmNsZTogdmFsLFxyXG4gICAgICAgICAgICBjaXJjbGVCb3R0b206IGNpcmNsZUJvdHRvbSxcclxuICAgICAgICAgICAgaXNSZW5kZXJlZDogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlzUmVuZGVyZWQrKztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnMSAnKyBpc1JlbmRlcmVkKTtcclxuICAgIH0pXHJcblxyXG4gICAgdmFyIHNraWxsQ2lyY2xlU2V0ID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgdmFyIHNjcm9sbEJvdHRvbSA9IHdpbmRvdy5zY3JvbGxZICsgJHdpbmRvdy5oZWlnaHQoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhzY3JvbGxCb3R0b20pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCc0ICcraXNSZW5kZXJlZCk7XHJcbiAgICAgICAgJC5lYWNoKHNraWxsQ2lyY2xlc09iaiwgZnVuY3Rpb24gKGluZCwgdmFsKSB7XHJcbiAgICAgICAgICAgIGlmICghdmFsWydpc1JlbmRlcmVkJ10gJiYgc2Nyb2xsQm90dG9tID4gdmFsWydjaXJjbGVCb3R0b20nXSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRjaXJjbGUgPSAkKHZhbFsnY2lyY2xlJ10pO1xyXG4gICAgICAgICAgICAgICAgdmFyICRjaXJjbGVMZXZlbCA9ICRjaXJjbGUuYXR0cignZGF0YS1sZXZlbCcpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRjaXJjbGVCYXIgPSAkY2lyY2xlLmNoaWxkcmVuKCcuY2lyY2xlLWJhcicpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRjYWxjQ2lyY2xlTGV2ZWwgPSAoJGNpcmNsZUJhci5jc3MoJ3N0cm9rZS1kYXNob2Zmc2V0Jykuc2xpY2UoMCwgLTIpKSAqICgxMDAgLSAkY2lyY2xlTGV2ZWwpIC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgJGNpcmNsZUJhci5jc3MoJ3N0cm9rZS1kYXNob2Zmc2V0JywgJGNhbGNDaXJjbGVMZXZlbCk7XHJcbiAgICAgICAgICAgICAgICB2YWxbJ2lzUmVuZGVyZWQnXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpc1JlbmRlcmVkLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXNSZW5kZXJlZDw9MCl7XHJcbiAgICAgICAgICAgIC8vc2h1dGRvd24gZXZlbnRMaXN0ZW5lclxyXG4gICAgICAgICAgICAkd2luZG93Lm9mZignc2Nyb2xsJywgc2tpbGxDaXJjbGVTZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9tb2JpbGUgU2FmYXJpIHdvcmthcm91bmRcclxuICAgIHZhciB1c2VyQWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcclxuICAgIGlmICh1c2VyQWdlbnQubWF0Y2goLyhpUGFkfGlQaG9uZXxpUG9kKS9pKSApe1xyXG4gICAgICAgICQuZWFjaChza2lsbENpcmNsZXNPYmosIGZ1bmN0aW9uIChpbmQsIHZhbCkge1xyXG4gICAgICAgICAgICB2YXIgJGNpcmNsZSA9ICQodmFsWydjaXJjbGUnXSk7XHJcbiAgICAgICAgICAgIHZhciAkY2lyY2xlTGV2ZWwgPSAkY2lyY2xlLmF0dHIoJ2RhdGEtbGV2ZWwnKTtcclxuICAgICAgICAgICAgdmFyICRjaXJjbGVCYXIgPSAkY2lyY2xlLmNoaWxkcmVuKCcuY2lyY2xlLWJhcicpO1xyXG4gICAgICAgICAgICB2YXIgJGNhbGNDaXJjbGVMZXZlbCA9ICgkY2lyY2xlQmFyLmNzcygnc3Ryb2tlLWRhc2hvZmZzZXQnKS5zbGljZSgwLCAtMikpICogKDEwMCAtICRjaXJjbGVMZXZlbCkgLyAxMDA7XHJcbiAgICAgICAgICAgICRjaXJjbGVCYXIuY3NzKCdzdHJva2UtZGFzaG9mZnNldCcsICRjYWxjQ2lyY2xlTGV2ZWwpO1xyXG4gICAgICAgICAgICB2YWxbJ2lzUmVuZGVyZWQnXSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXNSZW5kZXJlZD0wO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc1JlbmRlcmVkID4gMCkge1xyXG4gICAgICAgICR3aW5kb3cub24oJ3Njcm9sbCcsIHNraWxsQ2lyY2xlU2V0KTtcclxuICAgIH07XHJcblxyXG59KSgpOyIsInZhciBjb21tb25BamF4ID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgYWpheEZvcm0gPSBmdW5jdGlvbiAoZm9ybURhdGEsIHVybCkge1xyXG4gICAgICAgIGlmICghdmFsaWRhdGlvbi52YWxpZGF0ZUZvcm0oZm9ybURhdGEpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gZm9ybURhdGEuZmluZCgnaW5wdXQsIHRleHRhcmVhJykubm90KCdpbnB1dFt0eXBlPVwiaGlkZGVuXCJdJyk7XHJcbiAgICAgICAgdmFyIERhdGEgPSB7fTtcclxuXHJcbiAgICAgICAgJC5lYWNoKGVsZW1lbnRzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKCRlbGVtZW50LnByb3AoXCJkZWZhdWx0VmFsdWVcIikgIT0gJGVsZW1lbnQucHJvcChcInZhbHVlXCIpKXtcclxuICAgICAgICAgICAgICAgIC8vIHZhciBwdXNoRWxlbWVudCA9ICRlbGVtZW50LnNlcmlhbGl6ZUFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBEYXRhLnB1c2gocHVzaEVsZW1lbnRbMF0pO1xyXG4gICAgICAgICAgICAgICAgRGF0YVskZWxlbWVudC5wcm9wKFwibmFtZVwiKV09JGVsZW1lbnQucHJvcChcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coWyRlbGVtZW50LnByb3AoXCJuYW1lXCIpXSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygkZWxlbWVudC5wcm9wKFwibmFtZVwiKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhEYXRhWyRlbGVtZW50LnByb3AoXCJuYW1lXCIpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhEYXRhKTtcclxuICAgICAgICB2YXIgYWpheERhdGEgPSBKU09OLnN0cmluZ2lmeShEYXRhKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhamF4RGF0YSk7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICQuYWpheCh7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGRhdGE6IGFqYXhEYXRhLFxyXG4gICAgICAgICAgICAvLyBhc3luYzogZmFsc2UsXHJcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGFucykge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYW5zKTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWpheEZvcm06IGFqYXhGb3JtXHJcbiAgICB9O1xyXG5cclxufSkoKTsiLCJ2YXIgdmFsaWRhdGlvbiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdmFsaWRhdGVGb3JtID0gZnVuY3Rpb24gKGZvcm0pIHtcclxuICAgICAgICAgICAgaWYgKCQoJyNodW1hbi1jaGVja2JveCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICgoISQoJyNodW1hbi1jaGVja2JveCcpLmlzKFwiOmNoZWNrZWRcIikpIHx8ICghJCgnI2JvdC1jaGVja19feWVzJykuaXMoXCI6Y2hlY2tlZFwiKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYXV0aF9fcmVzcG9uc2UnKS50ZXh0KFwiT25seSBmb3IgaHVtYW4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKS5ub3QoJ2lucHV0W3R5cGU9XCJoaWRkZW5cIl0nKSxcclxuICAgICAgICAgICAgICAgIHZhbGlkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaChlbGVtZW50cywgZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKGVsZW1lbnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJGVsZW1lbnQudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfYWRkRXJyb3IoJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2YWxpZDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJ2Zvcm0nKS5vbigna2V5ZG93bicsICcuaGFzLWVycm9yJywgX3JlbW92ZUVycm9yKTtcclxuICAgICAgICAgICAgJCgnZm9ybScpLm9uKCdjbGljaycsICcuaGFzLWVycm9yJywgX3JlbW92ZUVycm9yKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfYWRkRXJyb3IgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfcmVtb3ZlRXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBpbml0LFxyXG4gICAgICAgIHZhbGlkYXRlRm9ybTogdmFsaWRhdGVGb3JtXHJcbiAgICB9O1xyXG5cclxufSkoKTtcclxuXHJcbnZhbGlkYXRpb24uaW5pdCgpOyIsInZhciBhQ2hpbGRyZW4gPSAkKFwiLnNpZGViYXJfX2xpc3QgbGlcIikuY2hpbGRyZW4oKTsgLy8gZmluZCB0aGUgYSBjaGlsZHJlbiBvZiB0aGUgbGlzdCBpdGVtc1xyXG52YXIgYUFycmF5ID0gW107IC8vIGNyZWF0ZSB0aGUgZW1wdHkgYUFycmF5XHJcbmZvciAodmFyIGk9MDsgaSA8IGFDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGFDaGlsZCA9IGFDaGlsZHJlbltpXTtcclxuICAgIHZhciBhaHJlZiA9ICQoYUNoaWxkKS5hdHRyKCdocmVmJyk7XHJcbiAgICBhQXJyYXkucHVzaChhaHJlZik7XHJcbn0gLy8gdGhpcyBmb3IgbG9vcCBmaWxscyB0aGUgYUFycmF5IHdpdGggYXR0cmlidXRlIGhyZWYgdmFsdWVzXHJcblxyXG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgd2luZG93UG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpOyAvLyBnZXQgdGhlIG9mZnNldCBvZiB0aGUgd2luZG93IGZyb20gdGhlIHRvcCBvZiBwYWdlXHJcbiAgICB2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpOyAvLyBnZXQgdGhlIGhlaWdodCBvZiB0aGUgd2luZG93XHJcbiAgICB2YXIgZG9jSGVpZ2h0ID0gJChkb2N1bWVudCkuaGVpZ2h0KCk7XHJcblxyXG4gICAgZm9yICh2YXIgaT0wOyBpIDwgYUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHRoZUlEID0gYUFycmF5W2ldO1xyXG4gICAgICAgIHZhciBkaXZQb3MgPSAkKHRoZUlEKS5vZmZzZXQoKS50b3A7IC8vIGdldCB0aGUgb2Zmc2V0IG9mIHRoZSBkaXYgZnJvbSB0aGUgdG9wIG9mIHBhZ2VcclxuICAgICAgICB2YXIgZGl2SGVpZ2h0ID0gJCh0aGVJRCkuaGVpZ2h0KCk7IC8vIGdldCB0aGUgaGVpZ2h0IG9mIHRoZSBkaXYgaW4gcXVlc3Rpb25cclxuICAgICAgICBpZiAod2luZG93UG9zICs0MCA+PSBkaXZQb3MgJiYgd2luZG93UG9zIDwgKGRpdlBvcyArIGRpdkhlaWdodCkpIHtcclxuICAgICAgICAgICAgJChcImFbaHJlZj0nXCIgKyB0aGVJRCArIFwiJ11cIikucGFyZW50KCkuYWRkQ2xhc3MoXCJzaWRlYmFyX19pdGVtLWFjdGl2ZVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiYVtocmVmPSdcIiArIHRoZUlEICsgXCInXVwiKS5wYXJlbnQoKS5yZW1vdmVDbGFzcyhcInNpZGViYXJfX2l0ZW0tYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQWxleGV5IG9uIDE3LURlYy0xNi5cclxuICovXHJcblxyXG4vL2xvZ2luIGZvcm1cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyNsb2dpbicpLm9uKFwic3VibWl0XCIsIGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJCgnLmF1dGhfX3Jlc3BvbnNlJykudGV4dChcIlwiKTtcclxuICAgICAgICAvLyAkKCcucHJlbG9hZGVyJykuZmFkZUluKCk7XHJcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gJCh0aGlzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtRGF0YSk7XHJcbiAgICAgICAgLy8gYWpheCDQt9Cw0L/RgNC+0YFcclxuICAgICAgICB2YXIgZGVmT2JqID0gY29tbW9uQWpheC5hamF4Rm9ybShmb3JtRGF0YSwgJy4vbG9naW4nKTtcclxuICAgICAgICBpZihkZWZPYmope1xyXG4gICAgICAgICAgICBkZWZPYmouZG9uZShmdW5jdGlvbiAoYW5zKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuYXV0aF9fcmVzcG9uc2UnKS50ZXh0KGFuc1snc3RhdHVzJ10pO1xyXG4gICAgICAgICAgICAgICAgJCgnLnByZWxvYWRlcicpLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYWZ0ZXJcIithbnMpO1xyXG4gICAgICAgICAgICAgICAgLy8gJCgnLnBvcC11cF9fbWVzc2FnZScpLnRleHQoYW5zKTtcclxuICAgICAgICAgICAgICAgIC8vICQoJy5wb3AtdXBfX2xvZycpLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFucy5yZWRpcmVjdCA9PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBhbnMucmVkaXJlY3Q7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0pKCk7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFsZXhleSBvbiAxNy1EZWMtMTYuXHJcbiAqL1xyXG5cclxuLy9tZXNzYWdlIGZvcm1cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyNjb250YWN0LXVzJykub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCcuYnRuLXNlbmQnKS50ZXh0KFwiU2VuZGluZy4uLlwiKTtcclxuICAgICAgICAvLyAkKCcucHJlbG9hZGVyJykuZmFkZUluKCk7XHJcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gJCh0aGlzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtRGF0YSk7XHJcbiAgICAgICAgLy8gYWpheCDQt9Cw0L/RgNC+0YFcclxuICAgICAgICB2YXIgZGVmT2JqID0gY29tbW9uQWpheC5hamF4Rm9ybShmb3JtRGF0YSwgJy4vbWVzc2FnZScpO1xyXG4gICAgICAgIGlmKGRlZk9iail7XHJcbiAgICAgICAgICAgIGRlZk9iai5kb25lKGZ1bmN0aW9uIChhbnMpIHtcclxuICAgICAgICAgICAgICAgICQoJy5idG4tc2VuZCcpLnRleHQoXCJEb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gJCgnLnByZWxvYWRlcicpLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYWZ0ZXJcIithbnMpO1xyXG4gICAgICAgICAgICAgICAgLy8gJCgnLnBvcC11cF9fbWVzc2FnZScpLnRleHQoYW5zKTtcclxuICAgICAgICAgICAgICAgIC8vICQoJy5wb3AtdXBfX2xvZycpLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSkoKTtcclxuIiwiLy9cclxuLy9Nb3VzZSBwYXJhbGxheFxyXG5cclxudmFyIGxheWVyID0gJCgnLnBhcmFsbGF4JykuZmluZCgnLnBhcmFsbGF4X19sYXllcicpO1xyXG5cclxuLy9zZXQgYmFja3JvdW5kIHNpemVcclxudmFyIHNldEJnU2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBsYXN0QmcgPSBsYXllci5maXJzdCgpLmZpbmQoJ2ltZycpO1xyXG4gICAgdmFyIGJnSW1nV2lkdGhSYXRlID0gKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgKiBsYXN0QmcucHJvcCgnbmF0dXJhbFdpZHRoJykgLyAod2luZG93LmlubmVyV2lkdGggKiBsYXN0QmcucHJvcCgnbmF0dXJhbEhlaWdodCcpKSk7XHJcbiAgICBpZiAoYmdJbWdXaWR0aFJhdGUgPCAxKSB7XHJcbiAgICAgICAgdmFyIGJnSW1nSGVpZ2h0UmF0ZSA9IDEgLyBiZ0ltZ1dpZHRoUmF0ZTtcclxuICAgICAgICB2YXIgYmdJbWdIZWlnaHRTaGlmdCA9ICgxIC0gYmdJbWdIZWlnaHRSYXRlKiAxLjEpIC8gMjsgLy8xLjEgPSAxMTAlIC8vIDUlIGZvciBldmVyeSBzaWRlIG9mIHNjcmVlblxyXG4gICAgICAgIGxheWVyLmZpbmQoJ2ltZycpLmNzcyh7J2JvdHRvbSc6IDEwMCAqIGJnSW1nSGVpZ2h0U2hpZnQgKyAnJSd9KTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBsYXllci5maW5kKCdpbWcnKS5jc3Moeyd3aWR0aCc6IDEwMCAqIGJnSW1nV2lkdGhSYXRlICsgJyUnfSk7XHJcblxyXG59XHJcblxyXG5zZXRCZ1NpemUoKTtcclxuXHJcbiQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICBzZXRCZ1NpemUoZXYpO1xyXG59KTtcclxuXHJcbiQod2luZG93KS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICB2YXIgbW91c2VYID0gZXYucGFnZVgsXHJcbiAgICAgICAgbW91c2VZID0gZXYucGFnZVksXHJcbiAgICAgICAgd0Zyb21DZW50ZXIgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgLSBtb3VzZVgsXHJcbiAgICAgICAgaEZyb21DZW50ZXIgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIC0gbW91c2VZO1xyXG5cclxuICAgIGxheWVyLm1hcChmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciB3aWR0aFNoaWZ0ID0gd0Zyb21DZW50ZXIgKiAoKGtleSArIDEpIC8gMTAwKTtcclxuICAgICAgICB2YXIgaGVpZ2h0U2hpZnQgPSBoRnJvbUNlbnRlciAqICgoa2V5ICsgMSkgLyAxMDApO1xyXG4gICAgICAgICQodmFsdWUpLmNzcyh7XHJcbiAgICAgICAgICAgICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoJyArIHdpZHRoU2hpZnQgKyAncHgsICcgKyBoZWlnaHRTaGlmdCArICdweCwgMHB4KSdcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcbn0pOyIsIi8vXHJcbi8vIFBBUkFMTEFYIFNDUk9MTFxyXG52YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24oKXtcclxuICAgIHZhciBiZyA9ICQoJy5oZWFkZXJfX2JnJyksXHJcbiAgICAgICAgdXNlciA9ICQoJy5hdmF0YXInKSxcclxuICAgICAgICBzZWN0aW9uVGV4dCA9ICQoJy5oZWFkZXJfX2JnLXRleHQtaW1nJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb3ZlIDogZnVuY3Rpb24gKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG4gICAgICAgICAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJyxcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCcgKyBzdHJhZmUgKyAnLCAwKSc7XHJcblxyXG4gICAgICAgICAgICBibG9jay5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJ3RyYW5zZm9ybScgOiB0cmFuc2Zvcm1TdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nIDogdHJhbnNmb3JtU3RyaW5nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGluaXQgOiBmdW5jdGlvbiAod1Njcm9sbCkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIDQ1KTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKHNlY3Rpb25UZXh0LCB3U2Nyb2xsLCA4KTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTtcclxuXHJcbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcclxuICAgIHZhciB3U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgcGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxufSk7IC8vIC0+IHNjcm9sbF9lbmQ7IiwiLy9wcmVsb2FkZXJcclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGltZ3MgPSBbXTtcclxuXHJcbiAgICAkLmVhY2goJCgnKicpLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgYmFja2dyb3VuZHMgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5zcGxpdCgnLCcpLFxyXG4gICAgICAgICAgICBpbWcgPSAkdGhpcy5pcygnaW1nJyk7XHJcblxyXG4gICAgICAgIGlmIChiYWNrZ3JvdW5kcyAhPSAnbm9uZScpIHtcclxuICAgICAgICAgICAgJC5lYWNoKGJhY2tncm91bmRzLCBmdW5jdGlvbiAoaW5kZXgsIGJhY2tncm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xyXG4gICAgICAgICAgICAgICAgaW1ncy5wdXNoKHBhdGgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGltZykge1xyXG4gICAgICAgICAgICB2YXIgcGF0aCA9ICR0aGlzLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICAgICAgICAgIGltZ3MucHVzaChwYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdmFyIHBlcmNlbnRzVG90YWwgPSAxO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBpbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgICAgICBzcmM6IGltZ3NbaV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpbWFnZS5vbih7XHJcbiAgICAgICAgICAgIGxvYWQgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltZ3MubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFBlcmNlbnRzKHRvdGFsLCBjdXJyZW50KSB7XHJcbiAgICAgICAgdmFyIHBlcmNlbnQgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcclxuXHJcbiAgICAgICAgaWYgKHBlcmNlbnQgPj0gMTAwKSB7XHJcbiAgICAgICAgICAgICQoJy5wcmVsb2FkZXInKS5mYWRlT3V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50cycpLnRleHQocGVyY2VudCArICclJyk7XHJcbiAgICB9XHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFsZXhleSBvbiAxMi1EZWMtMTYuXHJcbiAqL1xyXG4vL3VwZGF0ZSBza2lsbHMgdmlhIGFkbWluIHBhZ2VcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyN0YWItYWJvdXRfX2NvbnRlbnQnKS5vbihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy5wcmVsb2FkZXInKS5mYWRlSW4oKTtcclxuICAgICAgICB2YXIgZm9ybURhdGEgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAvLyBhamF4INC30LDQv9GA0L7RgVxyXG4gICAgICAgIHZhciBkZWZPYmogPSBjb21tb25BamF4LmFqYXhGb3JtKGZvcm1EYXRhLCAnLi9zYXZlU2tpbGxzJyk7XHJcbiAgICAgICAgaWYoZGVmT2JqKXtcclxuICAgICAgICAgICAgZGVmT2JqLmRvbmUoZnVuY3Rpb24gKGFucykge1xyXG4gICAgICAgICAgICAgICAgJCgnLnByZWxvYWRlcicpLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgICAgICQoJy5wb3AtdXBfX21lc3NhZ2UnKS50ZXh0KGFucyk7XHJcbiAgICAgICAgICAgICAgICAkKCcucG9wLXVwX19sb2cnKS5mYWRlSW4oKTtcclxuICAgICAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgLy9cclxuICAgIH0pXHJcbn0pKClcclxuIiwiIiwiJChmdW5jdGlvbigpIHtcclxuICAgICQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSA9PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxyXG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG15ID0ge307XHJcblxyXG4gICAgYWRkTGlzdGVuZXIoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRMaXN0ZW5lcigpIHtcclxuICAgICAgICAkKCdmb3JtJykub24oJ3N1Ym1pdCcsIHN1Ym1pdEZvcm0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3VibWl0Rm9ybShldikge1xyXG5cclxuICAgICAgICB2YXIgJGZvcm0gPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICB1cmw9JycsXHJcbiAgICAgICAgICAgIGRlZk9iamVjdCAgID0gYWpheEZvcm0oJGZvcm0sIHVybCk7XHJcblxyXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGFqYXhGb3JtKGZvcm0sIHVybCkge1xyXG4gICAgICAgIGlmKCF2YWxpZGF0aW9uLnZhbGlkYXRlRm9ybShmb3JtKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
