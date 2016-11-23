/**
 * Created by Alexey on 23-Nov-16.
 */
//change google copyright position based on footer height
(function () {

    var oldFooterHeight;

    var setPosition = function () {
        $('.gm-style-cc').css({
            'transform': 'translateY(' + -oldFooterHeight + 'px)'
        });
        $('.gm-style').children('div:nth-child(2)').css({
            'margin-bottom': + oldFooterHeight
        });

    }

    $(window).on('load', function () {
        oldFooterHeight = $('.footer').height();
        setPosition();
    });

    $(window).on('resize', function () {
        if (oldFooterHeight != $('.footer').height()) {
            var currentFooterHeight = $('.footer').height();
            oldFooterHeight = currentFooterHeight;
            setPosition();
        }
    });
})();