function Delete(Url, id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel !",
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                {
                    ////debugger;
                    $.ajax({
                        url: Url,
                        type: 'DELETE',
                        data: {
                            ID: id
                        },
                        success: function (result) {
                            // Do something
                            debugger;
                            if (result.result != null) {
                                if (result.result.id == -99) {
                                    swal("Error!", "This " + result.type + " Cannot Be Deleted Because" + result.errorReasonMessage, "error");
                                    //if (Url.indexOf("Country") > -1) {

                                    //}
                                } else {
                                    swal("Deleted!", "Your imaginary file has been deleted.", "success");

                                    /*
                                    jQuery(document).ready(function(){
                                        jQuery('tbody > tr:first > td:nth-child(6) > input').prop("checked", true);
                                    }); 
                                    */
                                    $('#tr_' + id).remove();
                                    $('tbody > tr:first > td > input[type=checkbox]').prop("checked", true);
                                    /*window.Location.href = "";*/
                                }
                                //$('#DataTables_Table_0').load(' #DataTables_Table_0');

                                //    $('#tr_' + id).remove();
                                //setInterval('location.reload()', 500);
                            } else {
                                swal("Deleted!", "Your imaginary file has been deleted.", "success");

                                /*
                                jQuery(document).ready(function(){
                                    jQuery('tbody > tr:first > td:nth-child(6) > input').prop("checked", true);
                                }); 
                                */
                                debugger;
                                $('#tr_' + id).remove();
                                $('tbody > tr:first > td > input[type=checkbox]').prop("checked", true);
                          
                            }

                        },

                        error: function (result) {
                            debugger;
                            swal("Error Occurred While Operation!", {
                                icon: "error",
                            });
                        }
                    });
                }
            } else {
                swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
}