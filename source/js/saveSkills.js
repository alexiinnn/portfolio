/**
 * Created by Alexey on 12-Dec-16.
 */

(function () {
    $('#tab-about__content').on("submit", function (ev) {
        ev.preventDefault();
        var ajaxData = $(this);
        var dbFotmat = ['skill', 'value'];
        var elements = ajaxData.find('input, textarea').not('input[type="hidden"]');
        var Data = [];
        $.each(elements, function (index, element) {
            var $element = $(element);
            if ($element.prop("defaultValue") != $element.prop("value")){
                console.log(Data);

                console.log($element.prop("value"));
                console.log($element.prop("id"));
                Data.push({skill: $element.prop("id"), level: $element.prop("value")});
                console.log(Data);

            }

        });
            // console.log(ajaxData);
        // ajax запрос
        // var defObj = commonAjax.ajaxForm(ajaxData, './saveSkills');
        // if(defObj){
        //     console.log('skills updated');
        //     defObj.done(function (ans) {
        //         console.log(ans);
        //     })
        // }
    })
})()
