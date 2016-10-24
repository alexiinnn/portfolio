var validation = (function () {
    var init = function () {
        _setUpListeners();
    },

        validateForm = function (form) {
            var elements = form.find('input, textarea').not('input[type="hidden"]'),
                valid = true;

            $.each(elements, function (index, element) {
                var $element = $(element),
                    value = $element.val();

                if(!value.length){
                    _addError($element);
                    valid = false;
                    console.log($element);
                }
            });

            return valid;
        },

        _setUpListeners = function () {
            $('form').on('keydown', '.has-error', _removeError);
            $('form').on('click', '.has-error', _removeError);
        },

        _addError = function (element) {
            element.addClass('has-error');
        },

        _removeError = function () {
            $(this).removeClass('has-error');
        },

        _clearForm = function (ev) {
            
        };

    return {
        init: init,
        validateForm: validateForm
    };

})();

validation.init();