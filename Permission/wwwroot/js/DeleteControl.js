function Delete(Url, id) {
    swal({
        title: Resource.deleteTitle,
        text: Resource.deleteText,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: Resource.confirmText,
        cancelButtonText: Resource.cancelText,
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                {
                    $.ajax({
                        url: Url,

                        type: 'DELETE',
                        data: {
                            ID: id
                        },
                        success: function (result) {
                            // Do something
                            swal(Resource.deleteSuccessTitle, Resource.deleteSuccessText, "success");


                            $('#tr_' + id).remove();
                            /* $('#tr_' + id).remove();*/

                        },
                        error: function (result) {
                            swal(Resource.deleteErrorTitle, Resource.deleteErrorText, {
                                icon: "error",
                            });
                        }
                    });
                }
            } else {
                swal(Resource.deleteCancelTitle, Resource.deleteCancelText, "error");
            }
        });
}