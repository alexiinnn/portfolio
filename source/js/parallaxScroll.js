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