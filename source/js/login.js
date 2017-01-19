/**
 * Created by Alexey on 17-Dec-16.
 */

//login form
(function () {
    $('#login').on("submit", function (ev) {
        ev.preventDefault();
        $('.auth__response').text("");
        // ajax запрос
        var formData = $(this);
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
