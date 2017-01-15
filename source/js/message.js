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
