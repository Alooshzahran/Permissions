 function initializeComponents() {
    $(document).ready(function () {

        

        $('#data_1 .input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: false,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true
        });

        $('#data_2 .input-group.date').datepicker({
            startView: 1,
            todayBtn: "linked",
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true
        });
        $('.clockpicker').clockpicker({
            placement: 'top',
            align: 'left',
            donetext: 'Done'
        });
        $('#data_3 .input-group.date').datepicker({
            startView: 2,
            todayBtn: "linked",
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true
        });

        $('#data_4 .input-group.date').datepicker({
            minViewMode: 1,
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true,
            todayHighlight: true
        });

        $('#data_5 .input-daterange').datepicker({
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true
        });

        $('.clockpicker').clockpicker({
            placement: 'top',
            align: 'left',
            donetext: 'Done'
        });

        $('form').on('keyup keypress', function (e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                e.preventDefault();
                return false;
            }
        });

        $('.chosen-select').chosen({ width: "100%" });


        $('.clockpicker').clockpicker();


        $('.tagsinput').tagsinput({
            tagClass: 'label label-primary'
        });


        Dropzone.options.myDropzone = {
            uploadMultiple: true,
            paramName: () => "files",
        }

        var $inputImage = $("#inputImage");

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });
        $('.summernote').summernote();

        $('.click2edit').summernote({ focus: true });

        //$("button").mouseenter(function () {
        //    $(this).css("color", "#996a37");
        //});
        //$("button").mouseleave(function () {
        //    $(this).css("color", "##17de1a");

        //});

        //hover take 2 function (mouseenter,mouseleave)
        //$("button").hover(function () {
        //    $(this).css("color","#996a37")
             
        //},
        //    function () {
        //        $(this).css("color", "##17de1a");
        //    }
        //);
    });
}