//SIDEBAR position
var $sidebar = $('.sidebar');
var $footer = $('footer');
var offtop = $('.sidebar').offset().top;
var offbtm = $footer.offset().top - $sidebar.height();

$(window).on('scroll',function () {
    var scrtop = $(window).scrollTop();
    if (scrtop >= offtop && $sidebar.hasClass('sidebar-standart')) {
        $sidebar.addClass('sidebar-fixed').removeClass('sidebar-standart');
    }
    if (offtop > scrtop && $sidebar.hasClass('sidebar-fixed')) {
        $sidebar.removeClass('sidebar-fixed').addClass('sidebar-standart');
    }
    if (scrtop > offbtm && $sidebar.hasClass('sidebar-fixed')) {
        $sidebar.removeClass('sidebar-fixed').addClass('sidebar-bottom').css('top', (offbtm - $sidebar.height()));
    }
    if (offbtm > scrtop && $sidebar.hasClass('sidebar-bottom')) {
        $sidebar.removeClass('sidebar-bottom').addClass('sidebar-fixed').css('top', '');
    }
});
