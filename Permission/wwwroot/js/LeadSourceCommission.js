//$(document).ready(function () {
//    $('#CommissionPercentage').prop('readonly', false);
//    $('#CommissionPercentage').val('0 %');
//    $('#CommissionPercentage').prop('readonly', true);
//});

$('#LeadSourceTypeID').change(function () {
    //console.log("asdaadasdasd");
    ////debugger;
    var LeadSourceId = $('#LeadSourceTypeID').val();
    var CountryId = $('#CountryID').val();
    console.log("CountryID: " + CountryId);
    
    $.ajax({
        url: '/LeadSourceCommission/GetCommissionByLeadSourceTypeId',
        data: {
            LeadSourceID: LeadSourceId,
            CountryId: CountryId,
        },
        method: 'GET',
        type: 'JSON',
        success: function (data) {
            //console.log(data.length);
            ////debugger;

            if (data.length < 1) {
                percent = 0;
            } else {
                var percent = data[0].percentage;
                
            }
            //console.log("Percent: " + percent);
            $('#CommissionPercentage').prop('readonly', false);
            $('#CommissionPercentage').val(percent + ' %');
            $('#CommissionPercentage').prop('readonly', true);
        }
    });
    $.ajax({
        //url: "../City/GetCitiesByCountryID",

        url: "/LeadSourceValueType/GetLeadSourceValueTypesBySourceTypeID",
        data: { LeadSourceTypeID: LeadSourceId },
        type: "GET",
        success: function (result) {
            ////debugger;
            $(LeadSourceValueTypeID).empty();

            $.each(result, function (index, value) {

                ////debugger;
                $("#LeadSourceValueTypeID").append($('<option/>', {

                    value: value.id,
                    text: value.name
                }));
            });

        }
    });
});

$('#CountryID').change(function () {
    //console.log("asdaadasdasd");

    var LeadSourceId = $('#LeadSourceTypeID').val();
    var CountryId = $('#CountryID').val();
    console.log("CountryID: " + CountryId);

    $.ajax({
        url: '/LeadSourceCommission/GetCommissionByLeadSourceTypeId',
        data: {
            LeadSourceID: LeadSourceId,
            CountryId: CountryId,
        },
        method: 'GET',
        type: 'JSON',
        success: function (data) {
            //console.log(data.length);

            if (data.length < 1) {
                percent = 0;
            } else {
                var percent = data[0].percentage;

            }
            //console.log("Percent: " + percent);
            $('#CommissionPercentage').prop('readonly', false);
            $('#CommissionPercentage').val(percent + ' %');
            $('#CommissionPercentage').prop('readonly', true);
        }
    });

});


//function Commission() {
//   ////debugger;
//    var LeadSourceId = $('#LeadSourceTypeID').val();
//    var CountryId = $('#CountryID').val();
//    console.log("CountryID: " + CountryId);
//    $.ajax({
//        url: '/LeadSourceCommission/GetCommissionByLeadSourceTypeId',
//        data: {
//            LeadSourceID: LeadSourceId,
//            CountryId: CountryId
//        },
//        method: 'GET',
//        type: 'JSON',
//        success: function (data) {
//            //console.log(data.length);
//           ////debugger;

//            if (data.length < 1) {
//                percent = 0;
//            } else {
//                var percent = data[0].percentage;

//            }
//            //console.log("Percent: " + percent);
//            $('#CommissionPercentage').prop('readonly', false);
//            $('#CommissionPercentage').val(percent + ' %');
//            $('#CommissionPercentage').prop('readonly', true);
//        }
//    });
//};

//function LeadSourceValueType(sender) {

//   ////debugger;
//    var LeadSourceValueTypeID = $("select[name*='LeadSourceValueTypeID']");
//    $.ajax({
//        //url: "../City/GetCitiesByCountryID",

        
//        url: "/LeadSourceValueType/GetLeadSourceValueTypesBySourceTypeID",
//        data: { LeadSourceTypeID: sender.value },
//        type: "GET",
//        success: function (result) {
//           ////debugger;
//            $(LeadSourceValueTypeID).empty();

//            $.each(result, function (index, value) {

//                // ////debugger;
//                $(LeadSourceValueTypeID).append($('<option/>', {

//                    value: value.id,
//                    text: value.name
//                }));
//            });

//        }
//    });
//};

