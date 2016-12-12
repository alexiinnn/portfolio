var commonAjax = (function () {

    var ajaxForm = function (ajaxData, url) {
        if (!validation.validateForm(ajaxData))
            return false;
        var data = {}
        var elements = ajaxData.find('input, textarea').not('input[type="hidden"]');

        var result = $.ajax({
            url: url,
            type: 'POST',
            // dataType: 'json',
            data: data,
            // async: false,
            processData: false,
            success: function (ans) {
                console.log(ans);
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