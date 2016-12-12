/**
 * Created by Alexey on 12-Dec-16.
 */

(function () {
    $('#tab-about__content').on("submit", function (ev) {
        ev.preventDefault();
        var formData = $(this);
        console.log(formData);
        var dbFields = ['skill', 'value'];

        // ajax запрос
        var defObj = commonAjax.ajaxForm(formData, './saveSkills', dbFields);
        if(defObj){
            console.log('skills updated');
            defObj.done(function (ans) {
                console.log(ans);
            })
        }
    })
})()
