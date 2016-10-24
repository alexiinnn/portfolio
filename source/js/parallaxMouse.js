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