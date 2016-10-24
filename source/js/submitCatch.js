(function () {
    var my = {};

    addListener();

    function addListener() {
        $('form').on('submit', submitForm)
        console.log('listen');
    }

    function submitForm(ev) {
        console.log('preventDefault');

        var $form = $(this),
            url='',
            defObject   = ajaxForm($form, url);

        ev.preventDefault();
    }
    
    function ajaxForm(form, url) {
        if(!validation.validateForm(form)){
            return false;
        }
    }

})();