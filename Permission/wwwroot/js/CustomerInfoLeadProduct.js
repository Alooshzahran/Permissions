$(document).on("click",".EditLeadProduct",function (sender) {


    var ID = $(this).attr("data-value");
    //var trID = $(this).parent().parent().attr('id');
    //alert(trID);
    //var date = //$('td:nth-child(1)', $(this).parents('tr')).text();
    //var ID = $(this).parent().parent().find("td").first().find("input[name$='.ID']").val();// $("#customerInfo_Leades_0__LeadProduct_" + trID + "__ID").val();
    var ProductID = $("#customerInfo_Leades_0__LeadProduct_" + ID + "__ProductID").val(); //$('td:nth-child(2)', $(this).parents('tr')).attr('id');
    var SubProductID = $("#customerInfo_Leades_0__LeadProduct_" + ID + "__SubProductID").val();//$('td:nth-child(3)', $(this).parents('tr')).attr('id');
    //var ExpectedValue = $("#customerInfo_Leades_0__ExpectedValue");//$('td:nth-child(4)', $(this).parents('tr')).text();
    var CurrencyID = $("#customerInfo_Leades_0__LeadProduct_" + ID + "__CurrencyID").val();//$('td:nth-child(4)', $(this).parents('tr')).attr('id');
    //var ExpectedValueCurrency = //ExpectedValue.split(" ");
    var ExpectedValue = $("#customerInfo_Leades_0__LeadProduct_" + ID + "__ExpectedValue").val();//ExpectedValueCurrency[16];
    var NextStepID = $("#customerInfo_Leades_0__LeadProduct_" + ID + "__NextStepID").val();//$('td:nth-child(5)', $(this).parents('tr')).attr('id');
    var Note = $("#customerInfo_Leades_0__LeadProduct_" + ID + "__Note").val();//$('td:nth-child(6)', $(this).parents('tr')).text();
    var EstimationDate = $("#customerInfo_Leades_0__LeadProduct_" + ID + "__EstimatedDate").val();

    $('#LeadProductID').val(ID);
    $('#EstimatedDate').val(EstimationDate);
    $('#ProductID').val(ProductID).change();
    $('#SubProductID').val(SubProductID).change();
    $('#CurrencyID').val(CurrencyID).change();
    $('#ExpectedValue').val(ExpectedValue);
    $('#NextStepID').val(NextStepID);//.change();
    $('#Note').val(Note);

    // $(this).parent().parent().remove();


});

$(document).on("click", ".DeleteLeadProduct", function (sender) {
    ////debugger;
    var ID = $(this).attr("data-value");
    $("#LeadProduct_" + ID).remove();

    $("#AddProductTable tbody tr").each(function (index) {
        $(this).attr("id", "LeadProduct_" + index);
        var inputs = $(this).find("td").first().find("input");

       //////debugger;
        $(inputs[0]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__ID");
        $(inputs[0]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].ID");

        $(inputs[1]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__ProductID");
        $(inputs[1]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].ProductID");

        $(inputs[2]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__SubProductID");
        $(inputs[2]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].SubProductID");

        $(inputs[3]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__CurrencyID");
        $(inputs[3]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].CurrencyID");

        $(inputs[4]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__NextStepID");
        $(inputs[4]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].NextStepID");

        $(inputs[5]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__Note");
        $(inputs[5]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].Note");

        $(inputs[6]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__EstimationDate");
        $(inputs[6]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].EstimationDate");

        $(inputs[7]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__ExpectedValue");
        $(inputs[7]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].ExpectedValue");


    });


});


///////////////////////////////////////// YourWork
$(document).ready(function () {
    $('#OneMoreLeadProduct').on("click", function (e) {


       ////debugger;
        e.preventDefault();

        //        e.preventDefault();

        /*********************************************
                EMPTY THE ERROR MESSAGES
        *********************************************/
        $('#EstimatedDateError').text('');
        $('#Product').text('');
        $('#SubProduct').text('');
        $('#ExpectedVal').text('');
        $('#NextSt').text('');
        /*********************************************
            End Of => EMPTY THE ERROR MESSAGES
        *********************************************/
       ////debugger;

        var rowCount = $('#AddProductTable tbody tr').length;

        var LeadProduct = {};

        //var LeadProduct = {};

        //var ID = $('#LeadProductID').val();
        //if (ID != "") {
        //    rowCount = ID;
        //}

        //        var EstimatedDate = $('#EstimatedDate').val();
        //        var ProductID = $('#ProductID').val();
        //        var ProductName = $('#ProductID option:Selected').text();
        //        var SubProductID = $('#SubProductID').val();
        //        var SubProductName = $('#SubProductID option:Selected').text();
        //        var CurrencyID = $('#CurrencyID').val();
        //        var Currency = $('#CurrencyID option:Selected').text();
        //        var ExpectedValue = $('#ExpectedValue').val();
        //        var NextStepID = $('#NextStepID').val();
        //        var NextStep = $('#NextStepID option:Selected').text();
        //        var Note = $('#Note').val();


        //        //var EstimatedDate = $('#Leades_0__LeadProduct_0__EstimatedDate').val();
        //        //var ProductID = $('#ProductID').val();
        //        //var ProductName = $('#ProductID option:Selected').text();
        //        //var SubProductID = $('#SubProductID').val();
        //        //var CurrencyID = $('#Leades_0__LeadProduct_0__CurrencyID').val();
        //        //var Currency = $('#Leades_0__LeadProduct_0__CurrencyID option:Selected').text();
        //        //var ExpectedValue = $('#Leades_0__LeadProduct_0__ExpectedValue').val();
        //        //var NextStepID = $('#Leades_0__LeadProduct_0__NextStepID').val();
        //        //var NextStep = $('#Leades_0__LeadProduct_0__NextStepID option:selected').text();
        //        //var Note = $('#Leades_0__LeadProduct_0__Note').val();

        //        LeadProduct = {
        //            "ID": ID,
        //            "EstimatedDate": EstimatedDate,
        //            "ProductID": parseInt(ProductID),
        //            "Product.Name": ProductName,
        //            "SubProductID": parseInt(SubProductID),
        //            "SubProduct.Name": SubProductName,
        //            "CurrencyID": parseInt(CurrencyID),
        //            "Currency.Name": Currency,
        //            "ExpectedValue": ExpectedValue,
        //            "NextStepID": parseInt(NextStepID),
        //            "NextStep.Name": NextStep,
        //            "Note": Note
        //        }
        //        ////debugger;
        //        //var valid = LeadProductValidation(LeadProduct);
        //        // let { ErrorMessages, valid } = LeadProductValidation(LeadProduct);
        //        // if (valid) {
        //        $('#AddProductTable').css("visibility", "visible");

        //$.post('/CustomerInfo/LeadProduct', { LeadProduct, rowCount }, function (result) {

        //    var ErrorMessages = result.errors;
        //    if (result.isSuccess == null) {
        //        $("#LeadProductID").val('');
        //        $('#EstimatedDate').val('');
        //        $('#ProductID').prop('selectedIndex', 0);
        //        $('#SubProductID').prop('selectedIndex', 0);
        //        $('#SubProductID').find('option').remove();
        //        $('#ExpectedValue').val('');
        //        $('#EstimatedDate').val('');
        //        $('#NextStepID').prop('selectedIndex', 0);
        //        $('#Note').val('');


        //        $("#products").append(result);


        //        $('#RowId').attr('id', 'ROW');
        //        //////debugger;

        //        setTimeout(function () {
        //            $(document).ready(function () {
        //                $(".EditLeadProduct").unbind().click(function () {

        //$('#RowId').attr('id', 'ROW');
        //////debugger;

        //setTimeout(function () {
        //     $(document).ready(function () {
        //$(".EditLeadProduct").unbind().click(function (sender) {


        //    var ID = $(this).attr("data-value");
        //    //var trID = $(this).parent().parent().attr('id');
        //    //alert(trID);
        //    //var date = //$('td:nth-child(1)', $(this).parents('tr')).text();
        //    //var ID = $(this).parent().parent().find("td").first().find("input[name$='.ID']").val();// $("#customerInfo_Leades_0__LeadProduct_" + trID + "__ID").val();
        //    var ProductID = $("#customerInfo_Leades_0__LeadProduct_" + ID +"__ProductID").val(); //$('td:nth-child(2)', $(this).parents('tr')).attr('id');
        //    var SubProductID = $("#customerInfo_Leades_0__LeadProduct_" + ID +"__SubProductID").val();//$('td:nth-child(3)', $(this).parents('tr')).attr('id');
        //    //var ExpectedValue = $("#customerInfo_Leades_0__ExpectedValue");//$('td:nth-child(4)', $(this).parents('tr')).text();
        //    var CurrencyID = $("#customerInfo_Leades_0__LeadProduct_" + ID +"__CurrencyID").val();//$('td:nth-child(4)', $(this).parents('tr')).attr('id');
        //    //var ExpectedValueCurrency = //ExpectedValue.split(" ");
        //    var ExpectedValue = $("#customerInfo_Leades_0__LeadProduct_" + ID +"__ExpectedValue").val();//ExpectedValueCurrency[16];
        //    var NextStepID = $("#customerInfo_Leades_0__LeadProduct_" + ID +"__NextStepID").val();//$('td:nth-child(5)', $(this).parents('tr')).attr('id');
        //    var Note = $("#customerInfo_Leades_0__LeadProduct_" + ID +"__Note").val();//$('td:nth-child(6)', $(this).parents('tr')).text();
        //    var EstimationDate = $("#customerInfo_Leades_0__LeadProduct_" + ID +"__EstimatedDate").val();

        //    $('#LeadProductID').val(ID);
        //    $('#EstimatedDate').val(EstimationDate);
        //    $('#ProductID').val(ProductID).change();
        //    $('#SubProductID').val(SubProductID).change();
        //    $('#CurrencyID').val(CurrencyID).change();
        //    $('#ExpectedValue').val(ExpectedValue);
        //    $('#NextStepID').val(NextStepID);//.change();
        //    $('#Note').val(Note);

        //   // $(this).parent().parent().remove();


        //});

        //$(".DeleteLeadProduct").unbind().click(function (sender) {
        //   ////debugger;
        //    var ID = $(this).attr("data-value");
        //    $("#LeadProduct_" + ID).remove();

        //    $("#AddProductTable tbody tr").each(function (index) {
        //        $(this).attr("id", "LeadProduct_" + index);
        //        var inputs = $(this).find("td").first().find("input");

        //       ////debugger;
        //        $(inputs[0]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__ID");
        //        $(inputs[0]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].ID");

        //        $(inputs[1]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__ProductID");
        //        $(inputs[1]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].ProductID");

        //        $(inputs[2]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__SubProductID");
        //        $(inputs[2]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].SubProductID");

        //        $(inputs[3]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__CurrencyID");
        //        $(inputs[3]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].CurrencyID");

        //        $(inputs[4]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__NextStepID");
        //        $(inputs[4]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].NextStepID");

        //        $(inputs[5]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__Note");
        //        $(inputs[5]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].Note");

        //        $(inputs[6]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__EstimationDate");
        //        $(inputs[6]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].EstimationDate");

        //        $(inputs[7]).attr("id", "customerInfo_Leades_0__LeadProduct_" + index + "__ExpectedValue");
        //        $(inputs[7]).attr("name", "customerInfo.Leades[0].LeadProduct[" + index + "].ExpectedValue");







        //    });
        //                    var trID = $(this).parent().parent().attr('id');
        //                    //alert(trID);
        //                    var date = $('td:nth-child(1)', $(this).parents('tr')).text();
        //                    //date = date.replace(/\s+/g, '');
        //                    var ProductName = $('td:nth-child(2)', $(this).parents('tr')).attr('id');
        //                    var SubProduct = $('td:nth-child(3)', $(this).parents('tr')).attr('id');
        //                    var ExpectedValue = $('td:nth-child(4)', $(this).parents('tr')).text();
        //                    var CurrencyID = $('td:nth-child(4)', $(this).parents('tr')).attr('id');
        //                    var ExpectedValueCurrency = ExpectedValue.split(" ");
        //                    var Money = ExpectedValueCurrency[16];
        //                    var NextStep = $('td:nth-child(5)', $(this).parents('tr')).attr('id');
        //                    var Note = $('td:nth-child(6)', $(this).parents('tr')).text();

        //                    $('#Leades_0__LeadProduct_0__EstimatedDate').val(date);
        //                    $('#ProductID').val(ProductName).change();
        //                    $('#SubProductID').val(SubProduct).change();
        //                    $('#Leades_0__LeadProduct_0__CurrencyID').val(CurrencyID).change();
        //                    $('#Leades_0__LeadProduct_0__ExpectedValue').val(Money);
        //                    $('#Leades_0__LeadProduct_0__NextStepID').val(NextStep).change();
        //                    $('#Leades_0__LeadProduct_0__Note').val(Note);

        //                    $(this).parent().parent().remove();

        //});
        //    });
        //}, 500);
        //}
        //} else {
        //result.errors

        ////debugger;
        //PrintErrorsInLeadProduct(ErrorMessages);
        //}


    });
});



function PrintErrorsInLeadProduct(ErrorMessages) {
    //console.log(ErrorMessages);
    ////debugger;
    $.each(ErrorMessages, function (key, value) {
        ////debugger;
        var index = ErrorMessages[key]["name"];
        var error = ErrorMessages[key]["error"];
        switch (index) {
            case "EstimatedDate":
                $('#EstimatedDateError').text(error);
                break;
            case "ProductID":
                $('#Product').text(error);
                break;
            case "SubProductID":
                $('#SubProduct').text(error);
                break;
            case "ExpectedValue":
                $('#ExpectedVal').text(error);
                break;
            case "NextStep":
                $('#NextSt').text(error);
                break;
        }

        //console.log(ErrorMessages);
        ////alert(key + ": " + value);
    });


    return ErrorMessages;
}



        //}
//function PrintErrorsInLeadProduct(ErrorMessages) {
//    //console.log(ErrorMessages);
//    ////debugger;
//    $.each(ErrorMessages, function (key, value) {
//        ////debugger;
//        var index = ErrorMessages[key]["name"];
//        var error = ErrorMessages[key]["error"];
//        switch (index) {
//            case "EstimatedDate":
//                $('#EstimatedDateError').text(error);
//                break;
//            case "ProductID":
//                $('#Product').text(error);
//                break;
//            case "SubProductID":
//                $('#SubProduct').text(error);
//                break;
//            case "ExpectedValue":
//                $('#ExpectedVal').text(error);
//                break;
//            case "NextStep":
//                $('#NextSt').text(error);
//                break;
//        }

//        //console.log(ErrorMessages);
//        ////alert(key + ": " + value);
//    });


//    return ErrorMessages;
//}



//function LeadProductValidation(LeadProduct) {
//    //////debugger;
//    var valid = true;
//    var ErrorMessages = [];
//    $.each(LeadProduct, function (key, value) {
//        //////debugger;
//        switch (key) {
//            case "EstimatedDate":
//                if (value == "") {
//                    ////alert("Estimated Date Cannot be Empty");
//                    valid = false;
//                    ErrorMessages.push({ "EstimatedDate": "Estimated Date Cannot be Empty" });
//                }
//                break;
//            case "ProductID":
//                var num = isNaN(value);
//                if (num) {
//                    ////alert("Please Select Product");
//                    valid = false;
//                    ErrorMessages.push({ "ProductID": "Please Select Product" });
//                }
//                break;
//            case "SubProductID":
//                var num = isNaN(value);
//                if (num) {
//                    ////alert("Please Select SubProduct");
//                    valid = false;
//                    ErrorMessages.push({ "SubProductID": "Please Select SubProduct" });
//                }
//                break;
//            case "CurrencyID":
//                var num = isNaN(value);
//                if (num) {
//                    ////alert("Please Select Currency");
//                    valid = false;
//                    ErrorMessages.push({ "CurrencyID": "Please Select Currency" });
//                }
//                break;
//            case "ExpectedValue":
//                if (value == "") {
//                    ////alert("ExpectedValue Cannot be Empty");
//                    valid = false;
//                    ErrorMessages.push({ "ExpectedValue": "ExpectedValue Cannot be Empty" });
//                }
//                break;
//            case "NextStepID":
//                var num = isNaN(value);
//                if (num) {
//                    ////alert("Please Select NextStep");
//                    valid = false;
//                    ErrorMessages.push({ "NextStepID": "Please Select NextStep" });
//                }
//                break;
//        }
//        /*console.log(ErrorMessages);*/
//        ////alert(key + ": " + value);
//    });


//    return { ErrorMessages, valid };
//}

