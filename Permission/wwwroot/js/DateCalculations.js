var GlobalEstimatedDate = 0;
var GlobalDefaultClosingDate = 0;
$(document).ready(function () {

    if (window.location.href.indexOf("/CustomerInfo/AddEdit") > -1 ||
        window.location.href.indexOf("/LeadProductPrice/AddEdit") > -1
    ) {
        
        //$('#EstimatedDate').on('change', function () {
        //    ////debugger;
        //    var tempEstimatedDate = $('#EstimatedDate').val();
        //    if (new Date(tempEstimatedDate) < new Date(GlobalEstimatedDate)) {

        //        $('#WarningMessage').val("Date must not be less than " + GlobalDefaultClosingDate + " months for this product");
        //        $('#WarningMessage').text("Date must not be less than " + GlobalDefaultClosingDate + " months for this product");
        //        $('#WarningModal').modal('show').delay(1000).fadeIn(500);
                

        //        setTimeout(function () {
        //            $('#WarningModal').modal('hide').delay(1000).fadeOut(500);
        //        }, 1500);

        //        $('#EstimatedDate').val(GlobalEstimatedDate);
        //    }

        //});


    }

});


function CalculateDefaultClosingDate() {
    var SubProductID = $('#SubProductID option:Selected').val();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, 0);
    var mm = String(today.getMonth() + 1).padStart(2, 0); //January is 0
    var yyyy = String(today.getFullYear());
    today = mm + '/' + dd + '/' + yyyy;

    $.ajax({
        url: '/SubProduct/GetDefaultClosingDateBySubProductID',
        type: 'GET',
        data: { SubProductID: SubProductID },
        success: function (result) {
            /*debugger*/;

            var IntMM = parseInt(mm);
            var IntYYYY = parseInt(yyyy);
            IntMM += result;

            for (var i = 0; IntMM > 12; i++) {
                IntMM -= 12;
                IntYYYY++;
            }

            mm = String(IntMM).padStart(2, 0);
            yyyy = String(IntYYYY);

            today = mm + '/' + dd + '/' + yyyy;
            $('#EstimatedDate').val(today);
            GlobalEstimatedDate = today;
            GlobalDefaultClosingDate = result;
            ////debugger;
        }
    });


    

}


