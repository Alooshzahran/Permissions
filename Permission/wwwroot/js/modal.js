$(document).ready(function () {

    $("a[data-toggle='modal']").on('click', function (sender) {

        var url = $(this).data('url');
        $.get(url).done(function (data) {
            
            $("#modal-form .modal-body").html(data);

            initializeComponents();

            //placeHolderElement.find('.modal').modal('show');
        })

    });

    ////debugger;
    //$('#data_3 .input-group.date').datepicker({
    //    startView: 2,
    //    todayBtn: "linked",
    //    keyboardNavigation: false,
    //    forceParse: false,
    //    autoclose: true
    //});

    
});