//$(document).on("change", "#LeadSourceTypeID", function (LeadSourceTypeID) {

//    $.ajax({
//        //url: "../City/GetCitiesByCountryID",

//        url: "/LeadSourceValueType/GetLeadSourceValueTypesBySourceTypeID",
//        data: { LeadSourceTypeID: LeadSourceTypeID.target.value },
//        type: "GET",
//        success: function (result) {

//            $("#LeadSourceValueTypeID").empty();

//            $.each(result, function (index, value) {


//                $('#LeadSourceValueTypeID').append($('<option/>', {

//                    value: value.id,
//                    text: value.name
//                }));
//            });

//        }
//    });
//});

//01-12-2022
//function GetLeadSourceValueType(sender) {

//    // const LeadSourceValueTypeID = $('#Leades_0__LeadSourceValueTypeID');
//   ////debugger;
//    var LeadSourceValueTypeID = $("select[name*='LeadSourceValueTypeID']");

//    $.ajax({
//        //url: "../City/GetCitiesByCountryID",

//        url: "/LeadSourceValueType/GetLeadSourceValueTypesBySourceTypeID",
//        data: { LeadSourceTypeID: sender.value },
//        type: "GET",
//        success: function (result) {
//            ////debugger;
//            $(LeadSourceValueTypeID).empty();

//            $.each(result, function (index, value) {

//              // ////debugger;
//                $(LeadSourceValueTypeID).append($('<option/>', {

//                    value: value.id,
//                    text: value.name
//                }));
//            });

//        }
//    });

//};


$('#LeadSourceTypeID').change(function () {
//$("select[name*='LeadSourceTypeID']").change(function (sender) {
   ////debugger;
    
    var LeadSourceTypeID = $(this).val();
    LeadSourceValueType(LeadSourceTypeID);

    Commission(LeadSourceTypeID);
    //var LeadSourceValueTypeID = $("select[name*='LeadSourceValueTypeID']");

    
});


function Commission(LeadSourceTypeID) {
   //////debugger;
    
    var CountryId = $('#CountryID').val();
    console.log("CountryID: " + CountryId);
    $.ajax({
        url: '/LeadSourceCommission/GetCommissionByLeadSourceTypeId',
        data: {
            LeadSourceID: LeadSourceTypeID,
            CountryId: CountryId,
        },
        method: 'GET',
        type: 'JSON',
        success: function (data) {
            //console.log(data.length);
           //////debugger;

            if (data.length < 1) {
                percent = 0;
            } else {
                var percent = data[0].percentage;

            }
            //console.log("Percent: " + percent);
            $('#CommissionPercentage').prop('readonly', false);
            $('#CommissionPercentage').val(percent + ' %');
            $('#CommissionPercentage').prop('readonly', true);
            LeadSourceValueType(LeadSourceTypeID);
        }
    });
};

function LeadSourceValueType(/*sender*/LeadSourceTypeID) {

   ////debugger;
    //var LeadSourceValueTypeID = $("select[name*='LeadSourceValueTypeID']");
    var LeadSourceValueTypeID = $("#LeadSourceValueTypeID");
    $.ajax({
        //url: "../City/GetCitiesByCountryID",


        url: "/LeadSourceValueType/GetLeadSourceValueTypesBySourceTypeID",
        data: { LeadSourceTypeID: LeadSourceTypeID },
        type: "GET",
        success: function (result) {
           //////debugger;
            $("#LeadSourceValueTypeID").empty();
           ////debugger;
            $.each(result, function (index, value) {

                // ////debugger;
                //$("#LeadSourceValueTypeID").append($('<option/>', {
                $(/*LeadSourceValueTypeID*/"#LeadSourceValueTypeID").append($('<option/>', {

                    value: value.id,
                    text: value.name
                }));
            });

        }
    });
};


//$(document).ready(function () {
//    var LeadSourceTypeID = $('#LeadSourceTypeID').val();
//    $.ajax({
//        //url: "../City/GetCitiesByCountryID",

//        url: "/LeadSourceValueType/GetLeadSourceValueTypesBySourceTypeID",
//        data: { LeadSourceTypeID: LeadSourceTypeID.target.value },
//        type: "GET",
//        success: function (result) {

//            $("#LeadSourceValueTypeID").empty();

//            $.each(result, function (index, value) {


//                $('#LeadSourceValueTypeID').append($('<option/>', {

//                    value: value.id,
//                    text: value.name
//                }));
//            });

//        }
//    });
//});

