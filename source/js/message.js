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
