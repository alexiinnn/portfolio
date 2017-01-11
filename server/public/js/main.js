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
})()

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNpcmNsZVNraWxsLmpzIiwiY29tbW9uQWpheC5qcyIsImZvcm1WYWxpZGF0aW9uLmpzIiwiaGlnaGxpZ2h0U2lkZWJhci5qcyIsImxvZ2luLmpzIiwicGFyYWxsYXhNb3VzZS5qcyIsInBhcmFsbGF4U2Nyb2xsLmpzIiwicHJlbG9hZGVyLmpzIiwic2F2ZVNraWxscy5qcyIsInNsaWRlckNvb2wuanMiLCJzbW9vdGhTY3JvbGwuanMiLCJzdWJtaXRDYXRjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZXZlbnRMaXN0ZW5lcnMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJyN0b2dnbGUnKS5vbignY2xpY2snLCBfdG9nZ2xlTmF2KTtcclxuICAgICAgICAkKCcuYW5nbGUtZG93bicpLm9uKCdjbGljaycsIF9hbmdsZURvd25TY3JvbGwpO1xyXG4gICAgICAgICQoJy5hbmdsZS11cCcpLm9uKCdjbGljaycsIF9hbmdsZVVwU2Nyb2xsKTtcclxuICAgICAgICAkKCcuYXV0aF9fdG9nZ2xlLWJ0bicpLm9uKCdjbGljaycsX2xvZ0luKTtcclxuICAgICAgICAkKCcuYnRuLWhvbWUnKS5vbignY2xpY2snLF9ob21lKTtcclxuICAgICAgICAkKCcuc3dpcGUtb3ZlcmxheScpLm9uKCdjbGljaycsIF9zd2lwZSk7XHJcbiAgICAgICAgJCgnLnN3aXBlJykub24oJ2NsaWNrJywgX3N3aXBlKTtcclxuICAgICAgICAkKCcuc2xpZGVyX19hcnJvdy1kb3duJykub24oJ2NsaWNrJywgX3NsaWRlclByZXYpO1xyXG4gICAgICAgICQoJy5zbGlkZXJfX2Fycm93LXVwJykub24oJ2NsaWNrJywgX3NsaWRlck5leHQpO1xyXG4gICAgICAgICQoJy5idXR0b25fY29udGFpbmVyJykub24oJ2NsaWNrJywgX2hpZGVTY3JvbGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBOQVZpZ2F0aW9uXHJcbiAgICB2YXIgX3RvZ2dsZU5hdiA9IGZ1bmN0aW9uKGV2KSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnI292ZXJsYXknKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2FuZ2xlLWRvd25cclxuICAgIHZhciBfYW5nbGVEb3duU2Nyb2xsID0gZnVuY3Rpb24gKGV2KXtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgICQoJ2h0bWwsYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogaGVpZ2h0fSwgNTAwKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9hbmdsZS11cFxyXG4gICAgdmFyIF9hbmdsZVVwU2Nyb2xsID0gZnVuY3Rpb24gKGV2KXtcclxuICAgICAgICAkKCdodG1sLGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCA1MDApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2xvZyBpbiB0b2dnbGVcclxuICAgIHZhciBfbG9nSW4gPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAkKCcuYXV0aF9fdG9nZ2xlLWJ0bicpLmNzcygndmlzaWJpbGl0eScsJ2hpZGRlbicpO1xyXG4gICAgICAgICQoJy53ZWxjb21lX19tZW51JykuY3NzKCd0cmFuc2Zvcm0nLCdyb3RhdGVZKDE4MGRlZyknKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9ob21lIHRvZ2dsZVxyXG4gICAgdmFyIF9ob21lID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJCgnLmF1dGhfX3RvZ2dsZS1idG4nKS5jc3MoJ3Zpc2liaWxpdHknLCd2aXNpYmxlJyk7XHJcbiAgICAgICAgJCgnLndlbGNvbWVfX21lbnUnKS5jc3MoJ3RyYW5zZm9ybScsJ3JvdGF0ZVkoMGRlZyknKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9ibG9nX3N3aXBlX3NpZGViYXJcclxuICAgIHZhciBfc3dpcGUgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAkKCcuc2lkZWJhcicpLnRvZ2dsZUNsYXNzKCdzaWRlYmFyLW9wZW4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3NsaWRlciBwcmV2aW91cyB3b3JrXHJcbiAgICB2YXIgJHNsaWRlcl9saXN0X3JldmVyc2UgPSAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1yZXZlcnNlJyk7XHJcbiAgICB2YXIgJHNsaWRlcl9saXN0X3N0cmFpZ2h0ID0gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtc3RyYWlnaHQnKTtcclxuICAgIHZhciAkc2xpZGVyX2xpc3RfYmlnID0gJCgnLnNsaWRlcl9fbGlzdF9fYmlnJyk7XHJcbiAgICB2YXIgJHdvcmtfX2Rlc2NfX2xpc3QgPSAkKCcud29ya19fZGVzY19fbGlzdCcpO1xyXG5cclxuICAgIHZhciBfc2xpZGVyUHJldiA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIC8vICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXN0cmFpZ2h0JykuY3NzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGVZKC0xMDAlKScpO1xyXG4gICAgICAgIC8vICQoJy5zbGlkZXJfX2xpc3RfX3NtYWxsLXJldmVyc2UnKS5jc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZVkoMCUpJyk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X3JldmVyc2UuY2hpbGRyZW4oKS5maXJzdCgpLmluc2VydEFmdGVyKCRzbGlkZXJfbGlzdF9yZXZlcnNlLmNoaWxkcmVuKCkubGFzdCgpKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3Rfc3RyYWlnaHQuY2hpbGRyZW4oKS5sYXN0KCkuaW5zZXJ0QmVmb3JlKCRzbGlkZXJfbGlzdF9zdHJhaWdodC5jaGlsZHJlbigpLmZpcnN0KCkpO1xyXG4gICAgICAgICRzbGlkZXJfbGlzdF9iaWcuY2hpbGRyZW4oKS5sYXN0KCkuaW5zZXJ0QmVmb3JlKCRzbGlkZXJfbGlzdF9iaWcuY2hpbGRyZW4oKS5maXJzdCgpKTtcclxuICAgICAgICAkd29ya19fZGVzY19fbGlzdC5jaGlsZHJlbigpLmxhc3QoKS5pbnNlcnRCZWZvcmUoJHdvcmtfX2Rlc2NfX2xpc3QuY2hpbGRyZW4oKS5maXJzdCgpKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vc2xpZGVyIG5leHQgd29ya1xyXG4gICAgdmFyIF9zbGlkZXJOZXh0ID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgLy8gJCgnLnNsaWRlcl9fbGlzdF9fc21hbGwtcmV2ZXJzZScpLmNzcygndHJhbnNmb3JtJywndHJhbnNsYXRlWSgtMTAwJSknKTtcclxuICAgICAgICAvLyAkKCcuc2xpZGVyX19saXN0X19zbWFsbC1zdHJhaWdodCcpLmNzcygndHJhbnNmb3JtJywndHJhbnNsYXRlWSgwJSknKTtcclxuICAgICAgICAkc2xpZGVyX2xpc3Rfc3RyYWlnaHQuY2hpbGRyZW4oKS5maXJzdCgpLmluc2VydEFmdGVyKCRzbGlkZXJfbGlzdF9zdHJhaWdodC5jaGlsZHJlbigpLmxhc3QoKSk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X3JldmVyc2UuY2hpbGRyZW4oKS5sYXN0KCkuaW5zZXJ0QmVmb3JlKCRzbGlkZXJfbGlzdF9yZXZlcnNlLmNoaWxkcmVuKCkuZmlyc3QoKSk7XHJcbiAgICAgICAgJHNsaWRlcl9saXN0X2JpZy5jaGlsZHJlbigpLmZpcnN0KCkuaW5zZXJ0QWZ0ZXIoJHNsaWRlcl9saXN0X2JpZy5jaGlsZHJlbigpLmxhc3QoKSk7XHJcbiAgICAgICAgJHdvcmtfX2Rlc2NfX2xpc3QuY2hpbGRyZW4oKS5maXJzdCgpLmluc2VydEFmdGVyKCR3b3JrX19kZXNjX19saXN0LmNoaWxkcmVuKCkubGFzdCgpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy90b2dnbGUgc2Nyb2xsIGJhciBvbiBuYXYgZXhwYW5kXHJcbiAgICB2YXIgX2hpZGVTY3JvbGwgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ2hpZGUtc2Nyb2xsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5pdDogaW5pdFxyXG4gICAgICAgIH07XHJcblxyXG59KSgpO1xyXG5cclxuZXZlbnRMaXN0ZW5lcnMuaW5pdCgpO1xyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFsZXhleSBvbiAwOS1EZWMtMTYuXHJcbiAqL1xyXG4vL1NWRyBhbmltYXRlZCBjaXJjbGUgbGV2ZWxzXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgJHdpbmRvdyA9ICQod2luZG93KTtcclxuICAgIHZhciBpc1JlbmRlcmVkID0gMDtcclxuICAgIHZhciBza2lsbENpcmNsZXNPYmogPSBbXTtcclxuICAgICQuZWFjaCgkKCcuc2tpbGwtY2lyY2xlJyksIGZ1bmN0aW9uIChpbmQsIHZhbCkge1xyXG4gICAgICAgIHZhciBjaXJjbGVCb3R0b20gPSAkKHRoaXMpLmhlaWdodCgpICsgJCh0aGlzKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgc2tpbGxDaXJjbGVzT2JqLnB1c2goe1xyXG4gICAgICAgICAgICBjaXJjbGU6IHZhbCxcclxuICAgICAgICAgICAgY2lyY2xlQm90dG9tOiBjaXJjbGVCb3R0b20sXHJcbiAgICAgICAgICAgIGlzUmVuZGVyZWQ6IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpc1JlbmRlcmVkKys7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJzEgJysgaXNSZW5kZXJlZCk7XHJcbiAgICB9KVxyXG5cclxuICAgIHZhciBza2lsbENpcmNsZVNldCA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgIHZhciBzY3JvbGxCb3R0b20gPSB3aW5kb3cuc2Nyb2xsWSArICR3aW5kb3cuaGVpZ2h0KCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coc2Nyb2xsQm90dG9tKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnNCAnK2lzUmVuZGVyZWQpO1xyXG4gICAgICAgICQuZWFjaChza2lsbENpcmNsZXNPYmosIGZ1bmN0aW9uIChpbmQsIHZhbCkge1xyXG4gICAgICAgICAgICBpZiAoIXZhbFsnaXNSZW5kZXJlZCddICYmIHNjcm9sbEJvdHRvbSA+IHZhbFsnY2lyY2xlQm90dG9tJ10pIHtcclxuICAgICAgICAgICAgICAgIHZhciAkY2lyY2xlID0gJCh2YWxbJ2NpcmNsZSddKTtcclxuICAgICAgICAgICAgICAgIHZhciAkY2lyY2xlTGV2ZWwgPSAkY2lyY2xlLmF0dHIoJ2RhdGEtbGV2ZWwnKTtcclxuICAgICAgICAgICAgICAgIHZhciAkY2lyY2xlQmFyID0gJGNpcmNsZS5jaGlsZHJlbignLmNpcmNsZS1iYXInKTtcclxuICAgICAgICAgICAgICAgIHZhciAkY2FsY0NpcmNsZUxldmVsID0gKCRjaXJjbGVCYXIuY3NzKCdzdHJva2UtZGFzaG9mZnNldCcpLnNsaWNlKDAsIC0yKSkgKiAoMTAwIC0gJGNpcmNsZUxldmVsKSAvIDEwMDtcclxuICAgICAgICAgICAgICAgICRjaXJjbGVCYXIuY3NzKCdzdHJva2UtZGFzaG9mZnNldCcsICRjYWxjQ2lyY2xlTGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgdmFsWydpc1JlbmRlcmVkJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXNSZW5kZXJlZC0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGlzUmVuZGVyZWQ8PTApe1xyXG4gICAgICAgICAgICAvL3NodXRkb3duIGV2ZW50TGlzdGVuZXJcclxuICAgICAgICAgICAgJHdpbmRvdy5vZmYoJ3Njcm9sbCcsIHNraWxsQ2lyY2xlU2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vbW9iaWxlIFNhZmFyaSB3b3JrYXJvdW5kXHJcbiAgICB2YXIgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XHJcbiAgICBpZiAodXNlckFnZW50Lm1hdGNoKC8oaVBhZHxpUGhvbmV8aVBvZCkvaSkgKXtcclxuICAgICAgICAkLmVhY2goc2tpbGxDaXJjbGVzT2JqLCBmdW5jdGlvbiAoaW5kLCB2YWwpIHtcclxuICAgICAgICAgICAgdmFyICRjaXJjbGUgPSAkKHZhbFsnY2lyY2xlJ10pO1xyXG4gICAgICAgICAgICB2YXIgJGNpcmNsZUxldmVsID0gJGNpcmNsZS5hdHRyKCdkYXRhLWxldmVsJyk7XHJcbiAgICAgICAgICAgIHZhciAkY2lyY2xlQmFyID0gJGNpcmNsZS5jaGlsZHJlbignLmNpcmNsZS1iYXInKTtcclxuICAgICAgICAgICAgdmFyICRjYWxjQ2lyY2xlTGV2ZWwgPSAoJGNpcmNsZUJhci5jc3MoJ3N0cm9rZS1kYXNob2Zmc2V0Jykuc2xpY2UoMCwgLTIpKSAqICgxMDAgLSAkY2lyY2xlTGV2ZWwpIC8gMTAwO1xyXG4gICAgICAgICAgICAkY2lyY2xlQmFyLmNzcygnc3Ryb2tlLWRhc2hvZmZzZXQnLCAkY2FsY0NpcmNsZUxldmVsKTtcclxuICAgICAgICAgICAgdmFsWydpc1JlbmRlcmVkJ10gPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlzUmVuZGVyZWQ9MDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNSZW5kZXJlZCA+IDApIHtcclxuICAgICAgICAkd2luZG93Lm9uKCdzY3JvbGwnLCBza2lsbENpcmNsZVNldCk7XHJcbiAgICB9O1xyXG5cclxufSkoKTsiLCJ2YXIgY29tbW9uQWpheCA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGFqYXhGb3JtID0gZnVuY3Rpb24gKGZvcm1EYXRhLCB1cmwpIHtcclxuICAgICAgICBpZiAoIXZhbGlkYXRpb24udmFsaWRhdGVGb3JtKGZvcm1EYXRhKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciBlbGVtZW50cyA9IGZvcm1EYXRhLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYScpLm5vdCgnaW5wdXRbdHlwZT1cImhpZGRlblwiXScpO1xyXG4gICAgICAgIHZhciBEYXRhID0ge307XHJcblxyXG4gICAgICAgICQuZWFjaChlbGVtZW50cywgZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGlmICgkZWxlbWVudC5wcm9wKFwiZGVmYXVsdFZhbHVlXCIpICE9ICRlbGVtZW50LnByb3AoXCJ2YWx1ZVwiKSl7XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgcHVzaEVsZW1lbnQgPSAkZWxlbWVudC5zZXJpYWxpemVBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gRGF0YS5wdXNoKHB1c2hFbGVtZW50WzBdKTtcclxuICAgICAgICAgICAgICAgIERhdGFbJGVsZW1lbnQucHJvcChcIm5hbWVcIildPSRlbGVtZW50LnByb3AoXCJ2YWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFskZWxlbWVudC5wcm9wKFwibmFtZVwiKV0pO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJGVsZW1lbnQucHJvcChcIm5hbWVcIikpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coRGF0YVskZWxlbWVudC5wcm9wKFwibmFtZVwiKV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coRGF0YSk7XHJcbiAgICAgICAgdmFyIGFqYXhEYXRhID0gSlNPTi5zdHJpbmdpZnkoRGF0YSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYWpheERhdGEpO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICBkYXRhOiBhamF4RGF0YSxcclxuICAgICAgICAgICAgLy8gYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChhbnMpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFucyk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFqYXhGb3JtOiBhamF4Rm9ybVxyXG4gICAgfTtcclxuXHJcbn0pKCk7IiwidmFyIHZhbGlkYXRpb24gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHZhbGlkYXRlRm9ybSA9IGZ1bmN0aW9uIChmb3JtKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCcjaHVtYW4tY2hlY2tib3gnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKCEkKCcjaHVtYW4tY2hlY2tib3gnKS5pcyhcIjpjaGVja2VkXCIpKSB8fCAoISQoJyNib3QtY2hlY2tfX3llcycpLmlzKFwiOmNoZWNrZWRcIikpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmF1dGhfX3Jlc3BvbnNlJykudGV4dChcIk9ubHkgZm9yIGh1bWFuIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhJykubm90KCdpbnB1dFt0eXBlPVwiaGlkZGVuXCJdJyksXHJcbiAgICAgICAgICAgICAgICB2YWxpZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAkLmVhY2goZWxlbWVudHMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICRlbGVtZW50LnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdmFsdWUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2FkZEVycm9yKCRlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdmFsaWQ7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCdmb3JtJykub24oJ2tleWRvd24nLCAnLmhhcy1lcnJvcicsIF9yZW1vdmVFcnJvcik7XHJcbiAgICAgICAgICAgICQoJ2Zvcm0nKS5vbignY2xpY2snLCAnLmhhcy1lcnJvcicsIF9yZW1vdmVFcnJvcik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX2FkZEVycm9yID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3JlbW92ZUVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogaW5pdCxcclxuICAgICAgICB2YWxpZGF0ZUZvcm06IHZhbGlkYXRlRm9ybVxyXG4gICAgfTtcclxuXHJcbn0pKCk7XHJcblxyXG52YWxpZGF0aW9uLmluaXQoKTsiLCJ2YXIgYUNoaWxkcmVuID0gJChcIi5zaWRlYmFyX19saXN0IGxpXCIpLmNoaWxkcmVuKCk7IC8vIGZpbmQgdGhlIGEgY2hpbGRyZW4gb2YgdGhlIGxpc3QgaXRlbXNcclxudmFyIGFBcnJheSA9IFtdOyAvLyBjcmVhdGUgdGhlIGVtcHR5IGFBcnJheVxyXG5mb3IgKHZhciBpPTA7IGkgPCBhQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBhQ2hpbGQgPSBhQ2hpbGRyZW5baV07XHJcbiAgICB2YXIgYWhyZWYgPSAkKGFDaGlsZCkuYXR0cignaHJlZicpO1xyXG4gICAgYUFycmF5LnB1c2goYWhyZWYpO1xyXG59IC8vIHRoaXMgZm9yIGxvb3AgZmlsbHMgdGhlIGFBcnJheSB3aXRoIGF0dHJpYnV0ZSBocmVmIHZhbHVlc1xyXG5cclxuJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHdpbmRvd1BvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTsgLy8gZ2V0IHRoZSBvZmZzZXQgb2YgdGhlIHdpbmRvdyBmcm9tIHRoZSB0b3Agb2YgcGFnZVxyXG4gICAgdmFyIHdpbmRvd0hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTsgLy8gZ2V0IHRoZSBoZWlnaHQgb2YgdGhlIHdpbmRvd1xyXG4gICAgdmFyIGRvY0hlaWdodCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpO1xyXG5cclxuICAgIGZvciAodmFyIGk9MDsgaSA8IGFBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0aGVJRCA9IGFBcnJheVtpXTtcclxuICAgICAgICB2YXIgZGl2UG9zID0gJCh0aGVJRCkub2Zmc2V0KCkudG9wOyAvLyBnZXQgdGhlIG9mZnNldCBvZiB0aGUgZGl2IGZyb20gdGhlIHRvcCBvZiBwYWdlXHJcbiAgICAgICAgdmFyIGRpdkhlaWdodCA9ICQodGhlSUQpLmhlaWdodCgpOyAvLyBnZXQgdGhlIGhlaWdodCBvZiB0aGUgZGl2IGluIHF1ZXN0aW9uXHJcbiAgICAgICAgaWYgKHdpbmRvd1BvcyArNDAgPj0gZGl2UG9zICYmIHdpbmRvd1BvcyA8IChkaXZQb3MgKyBkaXZIZWlnaHQpKSB7XHJcbiAgICAgICAgICAgICQoXCJhW2hyZWY9J1wiICsgdGhlSUQgKyBcIiddXCIpLnBhcmVudCgpLmFkZENsYXNzKFwic2lkZWJhcl9faXRlbS1hY3RpdmVcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJChcImFbaHJlZj0nXCIgKyB0aGVJRCArIFwiJ11cIikucGFyZW50KCkucmVtb3ZlQ2xhc3MoXCJzaWRlYmFyX19pdGVtLWFjdGl2ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFsZXhleSBvbiAxNy1EZWMtMTYuXHJcbiAqL1xyXG5cclxuLy9sb2dpbiBmb3JtXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjbG9naW4nKS5vbihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy5hdXRoX19yZXNwb25zZScpLnRleHQoXCJcIik7XHJcbiAgICAgICAgLy8gJCgnLnByZWxvYWRlcicpLmZhZGVJbigpO1xyXG4gICAgICAgIHZhciBmb3JtRGF0YSA9ICQodGhpcyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZm9ybURhdGEpO1xyXG4gICAgICAgIC8vIGFqYXgg0LfQsNC/0YDQvtGBXHJcbiAgICAgICAgdmFyIGRlZk9iaiA9IGNvbW1vbkFqYXguYWpheEZvcm0oZm9ybURhdGEsICcuL2xvZ2luJyk7XHJcbiAgICAgICAgaWYoZGVmT2JqKXtcclxuICAgICAgICAgICAgZGVmT2JqLmRvbmUoZnVuY3Rpb24gKGFucykge1xyXG4gICAgICAgICAgICAgICAgJCgnLmF1dGhfX3Jlc3BvbnNlJykudGV4dChhbnNbJ3N0YXR1cyddKTtcclxuICAgICAgICAgICAgICAgICQoJy5wcmVsb2FkZXInKS5mYWRlT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFmdGVyXCIrYW5zKTtcclxuICAgICAgICAgICAgICAgIC8vICQoJy5wb3AtdXBfX21lc3NhZ2UnKS50ZXh0KGFucyk7XHJcbiAgICAgICAgICAgICAgICAvLyAkKCcucG9wLXVwX19sb2cnKS5mYWRlSW4oKTtcclxuICAgICAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhbnMucmVkaXJlY3QgPT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gYW5zLnJlZGlyZWN0O1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59KSgpXHJcbiIsIi8vXHJcbi8vTW91c2UgcGFyYWxsYXhcclxuXHJcbnZhciBsYXllciA9ICQoJy5wYXJhbGxheCcpLmZpbmQoJy5wYXJhbGxheF9fbGF5ZXInKTtcclxuXHJcbi8vc2V0IGJhY2tyb3VuZCBzaXplXHJcbnZhciBzZXRCZ1NpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbGFzdEJnID0gbGF5ZXIuZmlyc3QoKS5maW5kKCdpbWcnKTtcclxuICAgIHZhciBiZ0ltZ1dpZHRoUmF0ZSA9IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0ICogbGFzdEJnLnByb3AoJ25hdHVyYWxXaWR0aCcpIC8gKHdpbmRvdy5pbm5lcldpZHRoICogbGFzdEJnLnByb3AoJ25hdHVyYWxIZWlnaHQnKSkpO1xyXG4gICAgaWYgKGJnSW1nV2lkdGhSYXRlIDwgMSkge1xyXG4gICAgICAgIHZhciBiZ0ltZ0hlaWdodFJhdGUgPSAxIC8gYmdJbWdXaWR0aFJhdGU7XHJcbiAgICAgICAgdmFyIGJnSW1nSGVpZ2h0U2hpZnQgPSAoMSAtIGJnSW1nSGVpZ2h0UmF0ZSogMS4xKSAvIDI7IC8vMS4xID0gMTEwJSAvLyA1JSBmb3IgZXZlcnkgc2lkZSBvZiBzY3JlZW5cclxuICAgICAgICBsYXllci5maW5kKCdpbWcnKS5jc3Moeydib3R0b20nOiAxMDAgKiBiZ0ltZ0hlaWdodFNoaWZ0ICsgJyUnfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgbGF5ZXIuZmluZCgnaW1nJykuY3NzKHsnd2lkdGgnOiAxMDAgKiBiZ0ltZ1dpZHRoUmF0ZSArICclJ30pO1xyXG5cclxufVxyXG5cclxuc2V0QmdTaXplKCk7XHJcblxyXG4kKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uIChldikge1xyXG4gICAgc2V0QmdTaXplKGV2KTtcclxufSk7XHJcblxyXG4kKHdpbmRvdykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChldikge1xyXG4gICAgdmFyIG1vdXNlWCA9IGV2LnBhZ2VYLFxyXG4gICAgICAgIG1vdXNlWSA9IGV2LnBhZ2VZLFxyXG4gICAgICAgIHdGcm9tQ2VudGVyID0gd2luZG93LmlubmVyV2lkdGggLyAyIC0gbW91c2VYLFxyXG4gICAgICAgIGhGcm9tQ2VudGVyID0gd2luZG93LmlubmVySGVpZ2h0IC8gMiAtIG1vdXNlWTtcclxuXHJcbiAgICBsYXllci5tYXAoZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgd2lkdGhTaGlmdCA9IHdGcm9tQ2VudGVyICogKChrZXkgKyAxKSAvIDEwMCk7XHJcbiAgICAgICAgdmFyIGhlaWdodFNoaWZ0ID0gaEZyb21DZW50ZXIgKiAoKGtleSArIDEpIC8gMTAwKTtcclxuICAgICAgICAkKHZhbHVlKS5jc3Moe1xyXG4gICAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcgKyB3aWR0aFNoaWZ0ICsgJ3B4LCAnICsgaGVpZ2h0U2hpZnQgKyAncHgsIDBweCknXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG59KTsiLCIvL1xyXG4vLyBQQVJBTExBWCBTQ1JPTExcclxudmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgYmcgPSAkKCcuaGVhZGVyX19iZycpLFxyXG4gICAgICAgIHVzZXIgPSAkKCcuYXZhdGFyJyksXHJcbiAgICAgICAgc2VjdGlvblRleHQgPSAkKCcuaGVhZGVyX19iZy10ZXh0LWltZycpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbW92ZSA6IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuICAgICAgICAgICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJScsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywgMCknO1xyXG5cclxuICAgICAgICAgICAgYmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nIDogdHJhbnNmb3JtU3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJyA6IHRyYW5zZm9ybVN0cmluZ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0IDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZShzZWN0aW9uVGV4dCwgd1Njcm9sbCwgOCk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCA1KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0oKSk7XHJcblxyXG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgd1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgIHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcbn0pOyAvLyAtPiBzY3JvbGxfZW5kOyIsIi8vcHJlbG9hZGVyXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBpbWdzID0gW107XHJcblxyXG4gICAgJC5lYWNoKCQoJyonKSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgICAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRzID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykuc3BsaXQoJywnKSxcclxuICAgICAgICAgICAgaW1nID0gJHRoaXMuaXMoJ2ltZycpO1xyXG5cclxuICAgICAgICBpZiAoYmFja2dyb3VuZHMgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICQuZWFjaChiYWNrZ3JvdW5kcywgZnVuY3Rpb24gKGluZGV4LCBiYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuICAgICAgICAgICAgICAgIGltZ3MucHVzaChwYXRoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbWcpIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSAkdGhpcy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICBpbWdzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgaW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICAgICAgc3JjOiBpbWdzW2ldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW1hZ2Uub24oe1xyXG4gICAgICAgICAgICBsb2FkIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRQZXJjZW50cyh0b3RhbCwgY3VycmVudCkge1xyXG4gICAgICAgIHZhciBwZXJjZW50ID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcblxyXG4gICAgICAgIGlmIChwZXJjZW50ID49IDEwMCkge1xyXG4gICAgICAgICAgICAkKCcucHJlbG9hZGVyJykuZmFkZU91dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLnByZWxvYWRlcl9fcGVyY2VudHMnKS50ZXh0KHBlcmNlbnQgKyAnJScpO1xyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBbGV4ZXkgb24gMTItRGVjLTE2LlxyXG4gKi9cclxuLy91cGRhdGUgc2tpbGxzIHZpYSBhZG1pbiBwYWdlXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjdGFiLWFib3V0X19jb250ZW50Jykub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCcucHJlbG9hZGVyJykuZmFkZUluKCk7XHJcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gYWpheCDQt9Cw0L/RgNC+0YFcclxuICAgICAgICB2YXIgZGVmT2JqID0gY29tbW9uQWpheC5hamF4Rm9ybShmb3JtRGF0YSwgJy4vc2F2ZVNraWxscycpO1xyXG4gICAgICAgIGlmKGRlZk9iail7XHJcbiAgICAgICAgICAgIGRlZk9iai5kb25lKGZ1bmN0aW9uIChhbnMpIHtcclxuICAgICAgICAgICAgICAgICQoJy5wcmVsb2FkZXInKS5mYWRlT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAkKCcucG9wLXVwX19tZXNzYWdlJykudGV4dChhbnMpO1xyXG4gICAgICAgICAgICAgICAgJCgnLnBvcC11cF9fbG9nJykuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBsb2NhdGlvbi5yZWxvYWQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8vXHJcbiAgICB9KVxyXG59KSgpXHJcbiIsIiIsIiQoZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArJ10nKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3BcclxuICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBteSA9IHt9O1xyXG5cclxuICAgIGFkZExpc3RlbmVyKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgJCgnZm9ybScpLm9uKCdzdWJtaXQnLCBzdWJtaXRGb3JtKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN1Ym1pdEZvcm0oZXYpIHtcclxuXHJcbiAgICAgICAgdmFyICRmb3JtID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgdXJsPScnLFxyXG4gICAgICAgICAgICBkZWZPYmplY3QgICA9IGFqYXhGb3JtKCRmb3JtLCB1cmwpO1xyXG5cclxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBhamF4Rm9ybShmb3JtLCB1cmwpIHtcclxuICAgICAgICBpZighdmFsaWRhdGlvbi52YWxpZGF0ZUZvcm0oZm9ybSkpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
