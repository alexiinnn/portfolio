var commonAjax = (function () {

    var ajaxForm = function (formData, url, dbFields) {
        if (!validation.validateForm(formData))
            return false;
        var elements = formData.find('input, textarea').not('input[type="hidden"]');
        var Data = [];
        var dbFields = dbFields;
        $.each(elements, function (index, element) {
            var $element = $(element);
            if ($element.prop("defaultValue") != $element.prop("value")){
                console.log($element.serializeArray());
                var pushElement = {};
                pushElement[dbFields[0]] = $element.prop("id"),
                pushElement[dbFields[1]] = $element.prop("value");

                Data.push(pushElement);
            }

        });
        var ajaxData = JSON.stringify(Data);

        var result = $.ajax({
            url: url,
            type: 'POST',
            // dataType: 'json',
            data: ajaxData,
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