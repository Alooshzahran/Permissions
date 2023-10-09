
var CountryID = $('#CountryID').val();

$(document).ready(function () {
    if (window.location.href.indexOf("CustomerInfo/AddEdit") > -1 || window.location.href.indexOf("CustomerInfo/Save") > -1) {

        if ($('#LeadProductGrossTotal').val() == "") {
            $('#LeadProductGrossTotal').val(0);
        }
        if ($('#LeadProductTaxTotal').val() == "") {
            $('#LeadProductTaxTotal').val(0);
        }
        if ($('#LeadProductNetTotal').val() == "") {
            $('#LeadProductNetTotal').val(0);
        }
        if ($('#LeadProductDiscountValue').val() == "") {
            $('#LeadProductDiscountValue').val(0);
        }

        //$(document).on('change', '#LeadProductCurrencyID', function (e) {
        $('#CurrencyRateInCustomerInfo').keyup(function () {
            if ($('#CurrencyRateInCustomerInfo').val() > 0) {
                CalculateCurrencyRateValueInCustomerInfo();
            }
        });

        $('#CurrencyIdInCustomerInfo').on('change', function () {
            $(".CurrencyNameCustomerInfo").text($('#CurrencyIdInCustomerInfo option:Selected').text());
            if ($('#CurrencyRateInCustomerInfo').val() > 0) {
                CalculateCurrencyRateValueInCustomerInfo();
            }
        });

        $('#ProductID option:first').val('');
    }

    $('#Quantity').keyup(function () {

        var tempQuantity = $('#Quantity').val();
        if (tempQuantity != "") {

            tempQuantity = parseInt(tempQuantity);
            $('#Quantity').val(tempQuantity);
        }

    });

    $('#NextStepID').on("change", function () {
        //debugger;
        var NextStepID = $('#NextStepID option:Selected').val();
        $.ajax({
            url: "/NextStep/GetNextStepInformation",
            data: {
                ID: NextStepID
            },
            type: 'JSON',
            method: 'GET',
            success: function (result) {
                //debugger;
                if (result.autoOpportunity == true) {
                    $('#NextStepOpportunityAlert').modal("show");
                }
            }
        });

        //setTimeout(function () {
        //    $('#NextStepOpportunityAlert').modal("hide");
        //},2000);
    });


});





$(document).on('click', '.EditLeadProductPrice', function (sender) {
    //debugger;
    //var trID = $(this).parent().parent().attr('id');
    //alert(trID);
    var ID = $(this).attr("data-value");

    //var EstimatedDate = $("#").val();//  $('td:nth-child(1)', $(this).parents('tr')).text();
    var EstimatedDate = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__EstimatedDate").val();// EstimatedDate.replace(/\s+/g, ' ');
    //EstimatedDate = $.trim(EstimatedDate);
    var ProductID = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__ProductID").val();// $('td:nth-child(2)', $(this).parents('tr')).attr('id');
    //var ProductName = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__ProductName").val();//$('td:nth-child(2)', $(this).parents('tr')).text();
    var ProductName = document.getElementById("customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__Product.ProductName").value;
    var SubProductID = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__SubProductID").val();//$('td:nth-child(3)', $(this).parents('tr')).attr('id');
    //var SubProductName = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__SubProductName").val();//$('td:nth-child(3)', $(this).parents('tr')).text();
    var SubProductName = document.getElementById("customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__SubProduct.SubProductName").value;
    var Quantity = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__Quantity").val();//$('td:nth-child(4)', $(this).parents('tr')).attr('id');
    var UnitPrice = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__UnitPrice").val();//$('td:nth-child(5)', $(this).parents('tr')).attr('id');
    var LicenseTypeID = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__LicenseTypeID").val();//$('td:nth-child(6)', $(this).parents('tr')).attr('id');
    var LicenseTypeName = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__LicenseTypeName").val();//$('td:nth-child(6)', $(this).parents('tr')).text();
    var GrossTotal = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__GrossTotal").val();//$('td:nth-child(7)', $(this).parents('tr')).attr('id');
    var TaxPercentage = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__TaxPercentage").val();// $('td:nth-child(8)', $(this).parents('tr')).attr('id');
    var TaxValue = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__TaxValue").val();//$('td:nth-child(9)', $(this).parents('tr')).attr('id');
    var NetTotal = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__NetTotal").val();//$('td:nth-child(10)', $(this).parents('tr')).attr('id');
    var DiscountPercentage = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__DiscountPercentage").val();//$('td:nth-child(9)', $(this).parents('tr')).attr('id');
    var DiscountValue = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__DiscountValue").val();

   //debugger;
    var LeadProductPriceCost = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + '__Cost').val();
    var LeadProductPriceTotalCost = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + '__TotalCost').val();
   //debugger;;
    var LeadProductPriceTotalCountryTaxesPercentage = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + '__TotalCountryTaxesPercentage').val();
    var LeadProductPriceTotalCountryTaxesValue = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + '__TotalCountryTaxesValue').val();

    var LeadProductPriceTotalSubProductTypeTaxesPercentage = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + '__TotalSubProductTypeTaxesPercentage').val();
    var LeadProductPriceTotalSubProductTypeTaxesValue = $("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + '__TotalSubProductTypeTaxesValue').val();

    //var LeadProductPriceTotalTaxesValue = $('#LeadProduct_LeadProductPrice_' + ID + '__TotalSubProductTypeTaxesValue').val();
    var LeadProductPriceYears = parseInt($("#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + '__Years').val());


   ////debugger;
    var leadProductPrice = {
        "ID": ID,
        "EstimatedDate": EstimatedDate,
        "ProductID": ProductID,
        "SubProductID": SubProductID,
        "Quantity": Quantity,
        "UnitPrice": UnitPrice,
        "LicenseTypeID": LicenseTypeID,
        "TaxPercentage": TaxPercentage,
        "GrossTotal": GrossTotal,
        "TaxValue": TaxValue,
        "NetTotal": NetTotal,
        "DiscountPercentage": DiscountPercentage,
        "DiscountValue": DiscountValue,
        /*******/
        "ProductName": ProductName,
        "SubProductName": SubProductName,
        "LicenseTypeName": LicenseTypeName,

        /*******/
        "Cost": LeadProductPriceCost,
        "TotalCost": LeadProductPriceTotalCost,
        "TotalCountryTaxesPercentage": LeadProductPriceTotalCountryTaxesPercentage,
        "TotalCountryTaxesValue": LeadProductPriceTotalCountryTaxesValue,
        "TotalSubProductTypeTaxesPercentage": LeadProductPriceTotalSubProductTypeTaxesPercentage,
        "TotalSubProductTypeTaxesValue": LeadProductPriceTotalSubProductTypeTaxesValue,

        //"TotalTaxesPercentage": LeadProductPriceTotalTaxesPercentage,
        //"TotalTaxesValue": LeadProductPriceTotalTaxesValue,
        "Years": LeadProductPriceYears

    }


    //var Money = ExpectedValueCurrency[16];
    //var NextStep = $('td:nth-child(5)', $(this).parents('tr')).attr('id');
    //var Note = $('td:nth-child(6)', $(this).parents('tr')).text();
    ////debugger;
    $("#LeadProductPriceID").val(ID);
    
    $('#ProductID').val(ProductID);
    //var ProductResult =
        $.when(GetSubProductsByProductID(ProductID)).done(function () {
            $('#SubProductID').val(SubProductID);

            $.when(GetSubProductInfoByID(SubProductID)).done(function () {
               //debugger;;

                /**************************/

                //$('#EstimatedDate').val(EstimatedDate);
                ////$('#TaxPercentage').val(TaxPercentage);
                //$('#Quantity').val(Quantity);
                ////debugger;
                //$('#UnitPrice').val(UnitPrice);
                ////debugger;
                //$('#GrossTotal').val(GrossTotal);
                ////debugger;
                ////$('#TaxValue').val(TaxValue);
                //$('#NetTotal').val(NetTotal);
                ////debugger;
                //$('#DiscountPercentage').val(DiscountPercentage);
                ////debugger;
                //$('#DiscountValue').val(DiscountValue);
                ////debugger;
                //$('#LeadProductPriceCost').val(LeadProductPriceCost);
                ////debugger;
                //$('#LeadProductPriceTotalCost').val(LeadProductPriceTotalCost);
                //debugger;
                //$('#LeadProductPriceTaxPercentage').val(LeadProductPriceTotalSubProductTypeTaxesPercentage);
                ////debugger;
                //$('#LeadProductPriceTaxValue').val(LeadProductPriceTotalSubProductTypeTaxesValue);
                ////debugger here;
                //debugger;
                //$('#LicenseTypeYears').val(LeadProductPriceYears);


                /*************************/



                $('#LicenseTypeID').val(LicenseTypeID);
                $.when(GetLicenseTypeInfo(LicenseTypeID)).done(function () {
                  //debugger;;
                    $('#EstimatedDate').val(EstimatedDate);
                    //$('#TaxPercentage').val(TaxPercentage);
                    $('#Quantity').val(Quantity);
                   //debugger;
                    $('#UnitPrice').val(UnitPrice);
                   //debugger;
                    $('#GrossTotal').val(GrossTotal);
                   //debugger;
                    //$('#TaxValue').val(TaxValue);
                    $('#NetTotal').val(NetTotal);
                   //debugger;
                    $('#DiscountPercentage').val(DiscountPercentage);
                   //debugger;
                    $('#DiscountValue').val(DiscountValue);
                   //debugger;
                    $('#LeadProductPriceCost').val(LeadProductPriceCost);
                   //debugger;
                    $('#LeadProductPriceTotalCost').val(LeadProductPriceTotalCost);
                   //debugger;;
                    $('#LeadProductPriceTaxPercentage').val(LeadProductPriceTotalSubProductTypeTaxesPercentage);
                    //debugger;
                    $('#LeadProductPriceTaxValue').val(LeadProductPriceTotalSubProductTypeTaxesValue);
                    //debugger;
                    $('#LicenseTypeYears').val(LeadProductPriceYears);

                    CalculateCurrencyRateValueInCustomerInfo();
                    CalculateLeadCost();

                });
                
                RemoveValuesFromLeadProduct(leadProductPrice);
                
            });

        });
    //if (ProductResult == true) { 
    //$("#ProductID").trigger("change");
    //$('#SubProductID').val(SubProductID);
    //$('#SubProductID').trigger("change");
   
    

    ////debugger;
   // $('#LicenseTypeID').val(LicenseTypeID).change();




   // $('#TaxPercentage').val(TaxPercentage);
//}
    //$('#GrossTotal').val(GrossTotal);
    //$('#TaxValue').val(TaxTotal);
    //$('#NetTotal').val(NetTotal);
    ////debugger;
    //$(this).parent().parent().remove();
   // RemoveValuesFromLeadProduct(leadProductPrice);

});


$(document).on('click', '.DeleteLeadProductPrice', function (sender) {
   ////debugger;
    var ID = $(this).attr("data-value");

   //debugger;
    var EstimatedDate = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__EstimatedDate').val();
    //date = date.replace(/\s+/g, '');
    var ProductID = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__ProductID').val();
    //var ProductName = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__ProductName').val();
    var ProductName = document.getElementById("customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID + "__Product.ProductName").value;
    var SubProductID = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__SubProductID').val();
    //var SubProductName = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__SubProductName').val();
    var SubProductName = document.getElementById("customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + ID +"__SubProduct.SubProductName").value;
    var Qty = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__Quantity').val();
    var UnitPrice = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__UnitPrice').val();
    var LicenseTypeID = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__LicenseTypeID').val();
    var LicenseTypeName = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__LicenseTypeName').val();
    var GrossTotal = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__GrossTotal').val();
    //var TaxPercentage = $('#LeadProduct_LeadProductPrice_' + ID + '__TaxPercentage').val();
    //var TaxValue = $('#LeadProduct_LeadProductPrice_' + ID + '__TaxValue').val();
    var NetTotal = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__NetTotal').val();
    var DiscountPercentage = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__DiscountPercentage').val();
    var DiscountValue = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__DiscountValue').val();



    //debugger;
    var LeadProductPriceCost = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__Cost').val();
    var LeadProductPriceTotalCost = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__TotalCost').val();

    var LeadProductPriceTotalCountryTaxesPercentage = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__TotalCountryTaxesPercentage').val();
    var LeadProductPriceTotalCountryTaxesValue = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__TotalCountryTaxesValue').val();

    var LeadProductPriceTotalSubProductTypeTaxesPercentage = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__TotalSubProductTypeTaxesPercentage').val();
    var LeadProductPriceTotalSubProductTypeTaxesValue = $('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__TotalSubProductTypeTaxesValue').val();

    //var LeadProductPriceTotalTaxesValue = $('#LeadProduct_LeadProductPrice_' + ID + '__TotalSubProductTypeTaxesValue').val();
    var LeadProductPriceYears = parseInt($('#customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_' + ID + '__Years').val());

    var leadProductPrice = {
        "EstimatedDate": EstimatedDate,
        "ProductID": ProductID,
        "SubProductID": SubProductID,
        "Quantity": Qty,
        "UnitPrice": UnitPrice,
        "LicenseTypeID": LicenseTypeID,
        //"TaxPercentage": TaxPercentage,
        "GrossTotal": GrossTotal,
        //"TaxValue": TaxValue,
        "NetTotal": NetTotal,
        "DiscountPercentage": DiscountPercentage,
        "DiscountValue": DiscountValue,
        /*******/
        "ProductName": ProductName,
        "SubProductName": SubProductName,
        "LicenseTypeName": LicenseTypeName,
        /*******/
        "Cost": LeadProductPriceCost,
        "TotalCost": LeadProductPriceTotalCost,
        "TotalCountryTaxesPercentage": LeadProductPriceTotalCountryTaxesPercentage,
        "TotalCountryTaxesValue": LeadProductPriceTotalCountryTaxesValue,
        "TotalSubProductTypeTaxesPercentage": LeadProductPriceTotalSubProductTypeTaxesPercentage,
        "TotalSubProductTypeTaxesValue": LeadProductPriceTotalSubProductTypeTaxesValue,

        //"TotalTaxesPercentage": LeadProductPriceTotalTaxesPercentage,
        //"TotalTaxesValue": LeadProductPriceTotalTaxesValue,
        "Years": LeadProductPriceYears

    }

    $("#LeadProductPrice_" + ID).remove();

    $("#LeadProductPrices tbody tr").each(function (index) {
        $(this).attr("id", "LeadProductPrice_" + index);
        var inputs = $(this).find("td").first().find("input");

       //debugger;
        $(inputs[0]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__ID");
        $(inputs[0]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].ID");

        $(inputs[1]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__EstimatedDate");
        $(inputs[1]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].EstimatedDate");
        
        $(inputs[2]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__ProductID");
        $(inputs[2]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].ProductID");

        $(inputs[3]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__ProductName");
        $(inputs[3]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].ProductName");

        $(inputs[4]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__SubProductID");
        $(inputs[4]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].SubProductID");

        $(inputs[5]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__SubProductName");
        $(inputs[5]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].SubProductName");

        $(inputs[6]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__Quantity");
        $(inputs[6]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].Quantity");

        $(inputs[7]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__UnitPrice");
        $(inputs[7]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].UnitPrice");

        $(inputs[8]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__LicenseTypeID");
        $(inputs[8]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].LicenseTypeID");

        $(inputs[9]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__GrossTotal");
        $(inputs[9]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].GrossTotal");

        $(inputs[10]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__TaxPercentage");
        $(inputs[10]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].TaxPercentage");

        $(inputs[11]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__TaxValue");
        $(inputs[11]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].TaxValue");

        $(inputs[12]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__NetTotal");
        $(inputs[12]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].NetTotal");

        $(inputs[13]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__DiscountPercentage");
        $(inputs[13]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index +"].DiscountPercentage");

        $(inputs[14]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__DiscountValue");
        $(inputs[14]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].DiscountValue");

        $(inputs[15]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__Cost");
        $(inputs[15]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].Cost");

        $(inputs[16]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__TotalCost");
        $(inputs[16]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].TotalCost");

        $(inputs[17]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__TotalCountryTaxesPercentage");
        $(inputs[17]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].TotalCountryTaxesPercentage");

        $(inputs[18]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__TotalCountryTaxesValue");
        $(inputs[18]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].TotalCountryTaxesValue");

        $(inputs[19]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__TotalSubProductTypeTaxesPercentage");
        $(inputs[19]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].TotalSubProductTypeTaxesPercentage");

        $(inputs[20]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__TotalSubProductTypeTaxesValue");
        $(inputs[20]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].TotalSubProductTypeTaxesValue");

        $(inputs[21]).attr("id", "customerInfo_Leades_0__LeadProduct_0__LeadProductPrice_" + index + "__Years");
        $(inputs[21]).attr("name", "customerInfo.Leades[0].LeadProduct[0].LeadProductPrice[" + index + "].Years");
        
    });
   //debugger;
    RemoveValuesFromLeadProduct(leadProductPrice);
    CalculateCurrencyRateValueInCustomerInfo();
    CalculateLeadCost();

});


$('#OneMoreLeadProductPrice').on('click', function (e) {
    e.preventDefault();
   //debugger;
    

    ValidateLeadProductPrice();
    ////debugger;
   
    //var productSumAfterRemovingCommas = productsName = $('#ProductsName').val();
    //productSumAfterRemovingCommas = productSumAfterRemovingCommas.replace(/,/g, '');
    ////productSumAfterRemovingCommas = productSumAfterRemovingCommas.split(' ');
    //var ProductsSum = productSumAfterRemovingCommas.length;
    //$('#ProductSum').val(ProductsSum);

    //$.post('/LeadProduct/AddLeadProductPrice', { leadProductPrice, rowCount, CountryID }, function (result) {

    //    ValidateLeadProductPrice(result);
    //    

        //console.log(result.isSuccess)
        //if (result.isSuccess == null) {
        //    $('#EstimatedDate').val('');
        //    $('#ProductID').prop('selectedIndex', 0);
        //    $('#SubProductID').prop('selectedIndex', 0);
        //    $('#Quantity').find('option').remove();
        //    $('#UnitPrice').val('');
        //    $('#GrossTotal').val('');
        //    $('#NetTotal').val('');
        //    $('#TaxPercentage').val('');
        //    $('#TaxValue').val('');
        //    $('#LicenseTypeID').prop('selectedIndex', 0);
        //    $('#CountryID').val(CountryID);
        //    $(document).ready();

        //    $("#LeadProductPrices").append(result);
        //    ////debugger;
        //    GetCountryTaxPercentage(CountryID);
            
        //}
        //else {
        //    //result.errors

        //    //PrintErrorsInLeadProduct(ErrorMessages);
        //}
       
    //});
});




function CalculateLeadProduct() {
    ////debugger;
    var leadProduct = GetLeadProductPrice();

    /*    Lead ProductPrice    */
    var LeadProductPriceGrossTotal = parseFloat(leadProduct["GrossTotal"]);
    ////debugger;
    //var LeadProductPriceTax = $('#TaxPercentage').val();
    //var LeadProductPriceTaxPercentage = parseFloat(leadProduct["TaxPercentage"]);


    var LeadProductPriceNetTotal = parseFloat(leadProduct["NetTotal"]);
    //var LeadProductPriceTaxValue = parseFloat(leadProduct["TaxValue"]);
    var LeadProductPriceCost = parseFloat(leadProduct["TotalCost"]);
    var LeadProductPriceTotalCountryTaxesPercentage = parseFloat(leadProduct["TotalCountryTaxesPercentage"]);
    var LeadProductPriceTotalCountryTaxesValue = parseFloat(leadProduct["TotalCountryTaxesValue"]);
    var LeadProductPriceTotalSubProductTypeTaxesPercentage = parseFloat(leadProduct["TotalSubProductTypeTaxesPercentage"]);
   //debugger;
    var LeadProductPriceTotalSubProductTypeTaxesValue = parseFloat(leadProduct["TotalSubProductTypeTaxesValue"]);

    //debugger;
    var LeadProductPriceDiscountValue = parseFloat(leadProduct["DiscountValue"]);

    /*    Lead Product    */
    var LeadProductGrossTotal = parseFloat($('#LeadProductGrossTotal').val());
    if (LeadProductGrossTotal == "") {
        LeadProductGrossTotal = parseFloat(0);
    }
    var LeadProductNetTotal = parseFloat($('#LeadProductNetTotal').val());
    if (LeadProductNetTotal == "") {
        LeadProductNetTotal = parseFloat(0);
    }
    //var leadProductTaxPercentage = parseFloat($('#LeadProductTaxPercentage').val());
    var LeadProductTaxValue = parseFloat($('#LeadProductTaxTotal').val());
    if (LeadProductTaxValue == "") {
        LeadProductTaxValue = parseFloat(0);
    }
   //debugger;
    var LeadProductDiscountValue = parseFloat($('#LeadProductDiscountValue').val());
    if (LeadProductDiscountValue == "") {
        LeadProductDiscountValue = parseFloat(0);
    }

    var LeadProductTotalCost = parseFloat($('#LeadProductTotalCost').val());
    if (LeadProductTotalCost == "" || isNaN(LeadProductTotalCost)) {
        LeadProductTotalCost = parseFloat(0);
    }

    var LeadProductTotalCountryTaxesValue = parseFloat($('#LeadProductCountryTax').val());
    if (LeadProductTotalCountryTaxesValue == "" || isNaN(LeadProductTotalCountryTaxesValue)) {
        LeadProductTotalCountryTaxesValue = parseFloat(0);
    }
   //debugger;
    var LeadProductTotalSubProductTypeTaxesValue = parseFloat($('#LeadProductSubProductTypeTax').val());
    if (LeadProductTotalSubProductTypeTaxesValue == "" || isNaN(LeadProductTotalSubProductTypeTaxesValue)) {
        LeadProductTotalSubProductTypeTaxesValue = parseFloat(0);
    }

    var LeadProductTotalSubProductTypeTaxesPercentage = parseFloat($('#LeadProductSubProductTypeTaxPercentage').val());
    if (LeadProductTotalSubProductTypeTaxesPercentage == "" || isNaN(LeadProductTotalSubProductTypeTaxesPercentage)) {
        LeadProductTotalSubProductTypeTaxesPercentage = parseFloat(0);
    }

    var LeadProductTotalCountryTaxesPercentage = parseFloat($('#LeadProductCountryTaxPercentage').val());
    if (LeadProductTotalCountryTaxesPercentage == "" || isNaN(LeadProductTotalCountryTaxesPercentage)) {
        LeadProductTotalCountryTaxesPercentage = parseFloat(0);
    }

    /*************   Calculations   ************/
    if (!isNaN(LeadProductPriceGrossTotal)) {
        LeadProductGrossTotal += LeadProductPriceGrossTotal;
        $('#LeadProductGrossTotal').val(LeadProductGrossTotal.toFixed(2));
    } 

    if (!isNaN(LeadProductPriceNetTotal)) {
        LeadProductNetTotal += LeadProductPriceNetTotal;
        $('#LeadProductNetTotal').val(LeadProductNetTotal.toFixed(2));
    }

    if (!isNaN(LeadProductPriceTaxPercentage)) {
        ////debugger;
        //leadProductTaxPercentage += LeadProductPriceTaxPercentage;
        //$('#LeadProductTaxPercentage').val(leadProductTaxPercentage.toFixed(2));
    } 

    //if (!isNaN(LeadProductPriceTaxValue)) {
    //    LeadProductTaxValue += LeadProductPriceTaxValue;
    //    $('#LeadProductTaxTotal').val(LeadProductTaxValue.toFixed(2));
    //}
   //debugger;
    if (!isNaN(LeadProductPriceDiscountValue)) {
        LeadProductDiscountValue += LeadProductPriceDiscountValue;
        $('#LeadProductDiscountValue').val(LeadProductDiscountValue.toFixed(2));
    }

    if (!isNaN(LeadProductTotalCost)) {
        LeadProductTotalCost += LeadProductPriceCost;
        $('#LeadProductTotalCost').val(LeadProductTotalCost.toFixed(2));
    }
   //debugger;
    if (!isNaN(LeadProductTotalCountryTaxesValue)) {
        LeadProductTotalCountryTaxesValue += LeadProductPriceTotalCountryTaxesValue;
        $('#LeadProductCountryTax').val(LeadProductTotalCountryTaxesValue.toFixed(2));
    }
   //debugger;
    if (!isNaN(LeadProductTotalSubProductTypeTaxesValue)) {
        LeadProductTotalSubProductTypeTaxesValue += LeadProductPriceTotalSubProductTypeTaxesValue;
        $('#LeadProductSubProductTypeTax').val(LeadProductTotalSubProductTypeTaxesValue.toFixed(2));
    }

    if (!isNaN(LeadProductTotalCountryTaxesPercentage)) {
        LeadProductTotalCountryTaxesPercentage += LeadProductPriceTotalCountryTaxesPercentage;
        $('#LeadProductCountryTaxPercentage').val(LeadProductTotalCountryTaxesPercentage.toFixed(2));
    }
   //debugger;;
    if (!isNaN(LeadProductTotalSubProductTypeTaxesPercentage)) {
        LeadProductTotalSubProductTypeTaxesPercentage += LeadProductPriceTotalSubProductTypeTaxesPercentage;
        $('#LeadProductSubProductTypeTaxPercentage').val(LeadProductTotalSubProductTypeTaxesPercentage.toFixed(2));
    }

    var AlreadySelectedProducts = $('#ProductsName').val();
    var newProduct = AlreadySelectedProducts + $('#ProductID option:Selected').text() + ",";
    $('#ProductsName').val(newProduct);
    var ProductSum = CountProducts();
    $('#ProductSum').val(ProductSum);


    CalculateCurrencyRateValueInCustomerInfo();

};

function CountProducts() {
    ////debugger;
    var productsName = $('#ProductsName').val();
    productsName = productsName.split(",");

    return productsName.length - 1;

}

function ValidateLeadProductPrice() {
    /*//debugger;*/
    var rowCount = $('#LeadProductPrices tr').length;

    //var ID = $('#LeadProductID').val();
    //if (ID != "") {
    //    rowCount = ID;
    //}

    /********************* Clear Validation Messages ************************/

    $('#EstimatedDateError').text('');
    $('#ProductIDError').text('');
    $('#SubProductIDError').text('');
    $('#QuantityError').text('');
    $('#UnitPriceError').text('');
    $('#LicenseTypeIDError').text('');
    $('#TaxPercentageError').text('');
    $('#GrossTotalError').text('');
    $('#TaxValueError').text('');
    $('#NetTotalError').text('');
    $('#DiscountPercentageError').text('');
    $('#DiscountValueError').text('');


    /***********************************************************************/

    /***************    Fill Data In Object To send to the Controller and Validate     *************/

    var leadProductPrice = GetLeadProductPrice();
    ////debugger;

    /***************    Send Object Via AJAX to Controller to Validate     *************/

    $.post('/CustomerInfo/LeadProductPrice', { leadProductPrice, rowCount }, function (result) {
        var ErrorMessages = result.errors;
        ////debugger;
        if (result.isSuccess == null) {

          // ////debugger;

            CalculateLeadProduct();
            CalculateLeadCost();

            EmptyLeadProductPrice();

            $('#AddLeadProductPriceTable').css("visibility", "visible");
            ////debugger;
            if (leadProductPrice.ID == "") {
                $("#LeadProductPrices").append(result);

               //debugger;
            } else {
                var SelectedRow = $("#LeadProductPrice_" + leadProductPrice.ID);
                $(SelectedRow).replaceWith(result);
            }


            $('#RowId').attr('id', 'ROW');
            //RemoveValuesFromLeadProduct(leadProductPrice);
            //asdasd
        } else {
            PrintErrorsInLeadProduct(ErrorMessages);
        }

    });
    //$.ajax({
    //    url: '/CustomerInfo/LeadProductPrice',
    //    data: {
    //        leadProductPrice: leadProductPrice,
    //        rowCount: rowCount
    //    },
    //    method: "POST",
    //    type: 'JSON',
    //    success: function (result) {
    //       ////debugger;
    //        var ErrorMessages = result.errors;
    //        if (result.isSuccess == null) {

    //            CalculateLeadProduct();

    //            EmptyLeadProductPrice();

    //            $('#AddLeadProductPriceTable').css("visibility", "visible");
    //            $("#LeadProductPrices").append(result);


    //            $('#RowId').attr('id', 'ROW');
    //            //////debugger;

    //            setTimeout(function () {
    //                $(document).ready(function () {

    //                    $(".EditLeadProductPrice").unbind().click(function () {
    //                       ////debugger;
    //                        var trID = $(this).parent().parent().attr('id');
    //                        //alert(trID);
    //                        var EstimatedDate = $('td:nth-child(1)', $(this).parents('tr')).text();
    //                        EstimatedDate = EstimatedDate.replace(/\s+/g, ' ');
    //                        EstimatedDate = $.trim(EstimatedDate);
    //                        var ProductID = $('td:nth-child(2)', $(this).parents('tr')).attr('id');
    //                        var ProductName = $('td:nth-child(2)', $(this).parents('tr')).text();
    //                        var SubProductID = $('td:nth-child(3)', $(this).parents('tr')).attr('id');
    //                        var SubProductName = $('td:nth-child(3)', $(this).parents('tr')).text();
    //                        var Qty = $('td:nth-child(4)', $(this).parents('tr')).attr('id');
    //                        var UnitPrice = $('td:nth-child(5)', $(this).parents('tr')).attr('id');
    //                        var LicenseTypeID = $('td:nth-child(6)', $(this).parents('tr')).attr('id');
    //                        var LicenseTypeName = $('td:nth-child(6)', $(this).parents('tr')).text();
    //                        var GrossTotal = $('td:nth-child(7)', $(this).parents('tr')).attr('id');
    //                        var TaxPercentage = $('td:nth-child(8)', $(this).parents('tr')).attr('id');
    //                        var TaxValue = $('td:nth-child(9)', $(this).parents('tr')).attr('id');
    //                        var NetTotal = $('td:nth-child(10)', $(this).parents('tr')).attr('id');

    //                        var leadProductPrice = {
    //                            "EstimatedDate": EstimatedDate,
    //                            "ProductID": ProductID,
    //                            "SubProductID": SubProductID,
    //                            "Quantity": Qty,
    //                            "UnitPrice": UnitPrice,
    //                            "LicenseTypeID": LicenseTypeID,
    //                            "TaxPercentage": TaxPercentage,
    //                            "GrossTotal": GrossTotal,
    //                            "TaxValue": TaxValue,
    //                            "NetTotal": NetTotal,
    //                            /*******/
    //                            "ProductName": ProductName,
    //                            "SubProductName": SubProductName,
    //                            "LicenseTypeName": LicenseTypeName

    //                        }


    //                        //var Money = ExpectedValueCurrency[16];
    //                        //var NextStep = $('td:nth-child(5)', $(this).parents('tr')).attr('id');
    //                        //var Note = $('td:nth-child(6)', $(this).parents('tr')).text();

    //                        $('#EstimatedDate').val(EstimatedDate);
    //                        $('#ProductID').val(ProductID).change();
    //                        $('#SubProductID').val(SubProductID).change();
    //                        $('#Quantity').val(Qty);
    //                        $('#UnitPrice').val(UnitPrice);
    //                        $('#GrossTotal').val(GrossTotal);
    //                        $('#TaxValue').val(TaxValue);
    //                        $('#NetTotal').val(NetTotal);
                            
    //                       ////debugger;
    //                        $('#LicenseTypeID').val(LicenseTypeID).change();
                            
                                


    //                        $('#TaxPercentage').val(TaxPercentage);
                            
    //                        //$('#GrossTotal').val(GrossTotal);
    //                        //$('#TaxValue').val(TaxTotal);
    //                        //$('#NetTotal').val(NetTotal);
    //                       ////debugger;
    //                        $(this).parent().parent().remove();
    //                        RemoveValuesFromLeadProduct(leadProductPrice);


    //                    });


    //                    $('.DeleteLeadProductPrice').unbind().click(function () {

    //                        var trID = $(this).parent().parent().attr('id');
    //                        //alert(trID);
    //                        var EstimatedDate = $('td:nth-child(1)', $(this).parents('tr')).text();
    //                        //date = date.replace(/\s+/g, '');
    //                        var ProductName = $('td:nth-child(2)', $(this).parents('tr')).attr('id');
    //                        var ProductIDName = $('td:nth-child(2)', $(this).parents('tr')).text();
    //                        var SubProduct = $('td:nth-child(3)', $(this).parents('tr')).attr('id');
    //                        var Qty = $('td:nth-child(4)', $(this).parents('tr')).attr('id');
    //                        var UnitPrice = $('td:nth-child(5)', $(this).parents('tr')).attr('id');
    //                        var LicenseType = $('td:nth-child(6)', $(this).parents('tr')).attr('id');
    //                        var GrossTotal = $('td:nth-child(7)', $(this).parents('tr')).attr('id');
    //                        var TaxPercentage = $('td:nth-child(8)', $(this).parents('tr')).attr('id');
    //                        var TaxValue = $('td:nth-child(9)', $(this).parents('tr')).attr('id');
    //                        var NetTotal = $('td:nth-child(10)', $(this).parents('tr')).attr('id');

    //                        var leadProductPrice = {
    //                            "GrossTotal": GrossTotal,
    //                            "NetTotal": NetTotal,
    //                            "TaxPercentage": TaxPercentage,
    //                            "TaxValue": TaxValue,
    //                            "ProductName": ProductIDName
    //                        };

    //                        $(this).parent().parent().remove();
    //                        RemoveValuesFromLeadProduct(leadProductPrice);
    //                    });

    //                });
    //            }, 500);
    //        }
    //        else {
    //            //result.errors

    //            ////debugger;
    //            PrintErrorsInLeadProduct(ErrorMessages);
    //        }
    //    }


    //});

}

function PrintErrorsInLeadProduct(ErrorMessages) {
    //console.log(ErrorMessages);
   //debugger;
    $.each(ErrorMessages, function (key, value) {
        ////debugger;
        var index = ErrorMessages[key]["name"];
        var error = ErrorMessages[key]["error"];
        switch (index) {
            case "EstimatedDate":
                $('#EstimatedDateError').text(error);
                break;
            case "ProductID":
                $('#ProductIDError').text(error);
                break;
            case "SubProductID":
                $('#SubProductIDError').text(error);
                break;
            case "Quantity":
                $('#QuantityError').text(error);
                break;
            case "LicenseTypeID":
                $('#LicenseTypeIDError').text(error);
                break;
            case "UnitPrice":
                $('#UnitPriceError').text(error);
                break;
            case "TaxPercentage":
                $('#TaxPercentageError').text(error);
                break
            case "NetTotal":
                $('#NetTotalError').text(error);
                break;
            case "GrossTotal":
                $('#GrossTotalError').text(error);
                break;
            case "TaxValue":
                $('#TaxValueError').text(error);
                break;
            case "DiscountPercentage":
                $('#DiscountPercentageError').text(error);
                break;
            case "DiscountValue":
                $('#DiscountValueError').text(error);
                break;
        }

        //console.log(ErrorMessages);
        ////alert(key + ": " + value);
    });


    return ErrorMessages;
}


function GetLeadProductPrice() {
   //debugger;
    var ID = $('#LeadProductPriceID').val();
    var EstimatedDate = $('#EstimatedDate').val();
    var ProductID = $('#ProductID option:Selected').val();
    var ProductName = $('#ProductID option:Selected').text();
    var SubProductID = $('#SubProductID option:Selected').val();
    var SubProductName = $('#SubProductID option:Selected').text();
    var Qty = $('#Quantity').val();
    var UnitPrice = $('#UnitPrice').val();
    var LicenseTypeID = $('#LicenseTypeID option:Selected').val();
    var LicenseTypeName = $('#LicenseTypeID option:Selected').text();

    var TaxPercentageToSplit = $('#TaxPercentage').val();
    TaxPercentageToSplit = TaxPercentageToSplit.split(' ');

    var TaxPercentage = TaxPercentageToSplit[0];
    var GrossTotal = $('#GrossTotal').val();
    var TaxValue = $('#TaxValue').val();
    var NetTotal = $('#NetTotal').val();
   ////debugger;
    var DiscountPercentage = $('#DiscountPercentage').val();
    var DiscountValue = $('#DiscountValue').val();

    //debugger here;
   //debugger;;
    var LeadProductPriceLicenseYears = $('#LicenseTypeYears').val();
    var LeadProductPriceCost = $('#LeadProductPriceCost').val();
    //var LeadProductPriceTaxPercentage = $('#LeadProductPriceTaxPercentage').val();
    //var LeadProductPriceTaxValue = $('#LeadProductPriceTaxValue').val();
    var TotalCost = $('#LeadProductPriceTotalCost').val();
    var TotalCountryTaxPercentage = $('#TaxPercentage').val();
    var TotalCountryTaxValue = $('#TaxValue').val();
    var TotalSubProductTypeTaxPercentage = $('#LeadProductPriceTaxPercentage').val();
    var TotalSubProductTypeTaxValue = $('#LeadProductPriceTaxValue').val();
    
   ////debugger;
    var leadProductPrice = {
        "ID":ID,
        "EstimatedDate": EstimatedDate,
        "ProductID": ProductID,
        "SubProductID": SubProductID,
        "Quantity": Qty,
        "UnitPrice": UnitPrice,
        "LicenseTypeID": LicenseTypeID,
        "TaxPercentage": TaxPercentage,
        "GrossTotal": GrossTotal,
        "TaxValue": TaxValue,
        "NetTotal": NetTotal,
        "DiscountPercentage": DiscountPercentage,
        "DiscountValue": DiscountValue,
        /*******/
        "ProductName": ProductName,
        "SubProductName": SubProductName,
        "LicenseTypeName": LicenseTypeName,
        /********/
        "Cost": LeadProductPriceCost,
        "TotalCost": TotalCost,
        "TotalCountryTaxesPercentage": TotalCountryTaxPercentage,
        "TotalCountryTaxesValue": TotalCountryTaxValue,
        "TotalSubProductTypeTaxesPercentage": TotalSubProductTypeTaxPercentage,
        "TotalSubProductTypeTaxesValue": TotalSubProductTypeTaxValue,
        //"TotalTaxesPercentage": LeadProductPriceTaxPercentage,
        //"TotalTaxesValue": LeadProductPriceTaxValue,
        "Years": LeadProductPriceLicenseYears

    }
    
    return leadProductPrice;


}


function EmptyLeadProductPrice() {

   ////debugger;
    $('#LeadProductPriceID').val('');
    $("#EstimatedDate").val('');
    $('#ProductID').prop('selectedIndex', 0).change();
    $('#SubProductID').prop('selectedIndex', 0);
    $('#Quantity').val(0);
    $('#LicenseTypeID').prop('selectedIndex', 0).change();
    //$('#SubProductID').find('option').remove();
    $('#UnitPrice').val(0.00);
    //$('#TaxPercentage').val('');
    $('#NetTotal').val(0.00);
    $('#GrossTotal').val(0.00);
    $('#TaxValue').val(0.00);
    $('#DiscountPercentage').val(0.00);
    $('#DiscountValue').val(0.00);
    $('#LeadProductPriceTotalCost').val(0.00);
    //$('#LeadProductPriceTotalCost').val(0.00);
    $('#TotalCountryTaxesPercentage').val(0);
    $('#Note').val('');

    $('#LeadProductPriceCost').val('');
    $('#LeadProductPriceTaxPercentage').val('');
    $('#LeadProductPriceTaxValue').val('');


}


//function RemoveValuesFromLeadProduct() leadProductPrice) {
//   //debugger;
//    //if (leadProductPrice.length === 0) {
//    //    var leadProductPrice = GetLeadProductPrice();
//    //}
//    /***************  Lead Product   ****************/

//    //var LeadProductGrossTotal = 0;
//    //var LeadProductNetTotal = 0;
//    ///*var leadProductTaxPercentage = 0;*/
//    //var LeadProductTaxValue = 0;
//    //var ProductNames = "";
//    //var LeadProductDiscountValue = 0;

//    //var Rows = $("#AddLeadProductPriceTable tbody tr");

//    //$.each(Rows, function (index) {
//    //   //debugger;
//    //    //var Inputs = $(Rows[index]).find("td input");
//    //    var RowGrossTotal = $(Rows[index]).children().first().find("input[name*='GrossTotal']");// $(Inputs).find("[name*='GrossTotal']");
//    //    var RowNetTotal = $(Rows[index]).children().first().find("input[name*='NetTotal']");// $(Inputs).find("[name*='NetTotal']");
//    //    //var RowTaxPercentage = $(Rows[index]).children().first().find("input[name*='TaxPercentage']");// $(Inputs).find("[name*='TaxPercentage']");
//    //    var RowTaxValue = $(Rows[index]).children().first().find("input[name*='TaxValue']");// $(Inputs).find("[name*='TaxValue']");
//    //    var RowProductName = $(Rows[index]).children().first().find("input[name*='ProductName']");//$(Inputs).find("[name*='ProductName']");
//    //    //debugger;
//    //    var RowDiscountValue = parseFloat(RowGrossTotal.val()) + parseFloat(RowTaxValue.val()) - parseFloat(RowNetTotal.val());


//    //    LeadProductGrossTotal = parseFloat(LeadProductGrossTotal) + parseFloat(RowGrossTotal.val());
//    //    LeadProductNetTotal = parseFloat(LeadProductNetTotal) + parseFloat(RowNetTotal.val());
//    //    LeadProductDiscountValue = parseFloat(LeadProductDiscountValue) + parseFloat(RowDiscountValue);
//    //    /*leadProductTaxPercentage = leadProductTaxPercentage + parseFloat(RowTaxPercentage.val());*/
//    //    LeadProductTaxValue = LeadProductTaxValue + parseFloat(RowTaxValue.val());
//    //    ProductNames = ProductNames + RowProductName.val() + ",";
//    //});





//    // console.log(leadProductPrice["EstimatedDate"]);

//    /***************  Lead Product   ****************/
//    //var LeadProductGrossTotal = parseFloat($('#LeadProductGrossTotal').val());
//    //var LeadProductNetTotal = parseFloat($('#LeadProductNetTotal').val());
//    //var leadProductTaxPercentage = parseFloat($('#LeadProductTaxPercentage').val());
//    //var LeadProductTaxValue = parseFloat($('#LeadProductTaxTotal').val());

//    /*******************   Calculations    ****************************/
//    ////debugger;
//    //LeadProductGrossTotal = LeadProductGrossTotal - leadProductPrice["GrossTotal"];
//    //LeadProductNetTotal = LeadProductNetTotal - leadProductPrice["NetTotal"];
//    //leadProductTaxPercentage = leadProductTaxPercentage - leadProductPrice["TaxPercentage"];
//    //LeadProductTaxValue = LeadProductTaxValue - leadProductPrice["TaxValue"];
//    ////debugger;



//    //$('#LeadProductGrossTotal').val(LeadProductGrossTotal.toFixed(2));
//    //$('#LeadProductNetTotal').val(LeadProductNetTotal.toFixed(2));
//    ////$('#LeadProductTaxPercentage').val(leadProductTaxPercentage.toFixed(2));
//    //$('#LeadProductTaxTotal').val(LeadProductTaxValue.toFixed(2));
//    //$('#ProductsName').val(ProductNames);
//    //$('#ProductSum').val(Rows.length);
//    //$('#LeadProductDiscountValue').val(LeadProductDiscountValue.toFixed(2));

//    //$('#LeadProductCurrencyID').val($('#LeadProductCurrencyID option:Selected').val()).change();


//    /*************    Remove Name From Product Name    *************/

//    //GetProductsNameCount(leadProductPrice);
//    //alert(productsName);

//    //var ProductsNames = GetProductsNameCount(leadProductPrice);
//    ////debugger;
//    //$('#ProductsName').val(ProductsNames);
//    //$('#ProductsName').val(Rows.length);


//    /***********  Get Products Num  ***********/
//    //GetProductSumCount();

//    //$('#CurrencyIdInCustomerInfo').val($('#CurrencyIdInCustomerInfo option:Selected').val()).change();



//    var LeadProductGrossTotal = parseFloat($('#LeadProductGrossTotal').val());
//    var LeadProductNetTotal = parseFloat($('#LeadProductNetTotal').val());
//    //var leadProductTaxPercentage = parseFloat($('#LeadProductTaxPercentage').val());
//    //////debugger;
//    //var LeadProductTaxValue = parseFloat($('#LeadProductTaxTotal').val());

//    var LeadProductTotalCost = $('#LeadProductTotalCost').val();
//    var LeadProductTotalCountryTaxValue = $('#LeadProductCountryTax').val();
//    var LeadProductTotalSubProductTypeTaxValue = $('#LeadProductSubProductTypeTax').val();


//    var LeadProductDiscountValue = parseFloat($('#LeadProductDiscountValue').val());

//    /*******************   Calculations    ****************************/
//    //////debugger;
//    LeadProductGrossTotal = LeadProductGrossTotal - leadProductPrice["GrossTotal"];
//    LeadProductNetTotal = LeadProductNetTotal - leadProductPrice["NetTotal"];
//    //leadProductTaxPercentage = leadProductTaxPercentage - leadProductPrice["TaxPercentage"];
//    //LeadProductTaxValue = LeadProductTaxValue - leadProductPrice["TaxValue"];
//    LeadProductDiscountValue = LeadProductDiscountValue - leadProductPrice["DiscountValue"];
//   //debugger;
//    LeadProductTotalCost = LeadProductTotalCost - leadProductPrice["TotalCost"];
//    LeadProductTotalCountryTaxValue = LeadProductTotalCountryTaxValue - leadProductPrice["TotalCountryTaxesValue"];
//    LeadProductTotalSubProductTypeTaxValue = LeadProductTotalSubProductTypeTaxValue - leadProductPrice["TotalSubProductTypeTaxesValue"];


//    $('#LeadProductGrossTotal').val(LeadProductGrossTotal.toFixed(2));
//    $('#LeadProductNetTotal').val(LeadProductNetTotal.toFixed(2));
//    //$('#LeadProductTaxPercentage').val(leadProductTaxPercentage.toFixed(2));
//    //$('#LeadProductTaxTotal').val(LeadProductTaxValue.toFixed(2));
//    $('#LeadProductDiscountValue').val(LeadProductDiscountValue.toFixed(2));
//   //debugger;
//    $('#LeadProductTotalCost').val(LeadProductTotalCost.toFixed(2));
//    $('#LeadProductCountryTax').val(LeadProductTotalCountryTaxValue.toFixed(2));
//    $('#LeadProductSubProductTypeTax').val(LeadProductTotalSubProductTypeTaxValue.toFixed(2));

//    /*************    Remove Name From Product Name    *************/

//    //GetProductsNameCount(leadProductPrice);
//    //alert(productsName);
//    //////debugger;
//    var ProductsNames = GetProductsNameCountLeadProduct(leadProductPrice);
//    //////debugger;
//    $('#ProductsNameLeadProduct').val(ProductsNames);


//    /***********  Get Products Num  ***********/
//    GetProductSumCountLeadProduct();
//    $('#LeadProductCurrencyID').val($('#LeadProductCurrencyID option:Selected').val()).change();


//}

function RemoveValuesFromLeadProduct(leadProductPrice) { /* (leadProductPrice) */
   //debugger;

    //var LeadProductGrossTotal = 0;
    //var LeadProductNetTotal = 0;
    //var LeadProductTaxValue = 0;
    //var ProductNames = "";

    //var Rows = $("#AddLeadProductPriceTable tbody tr");
    //$.each(Rows, function (index) {

    //    var RowGrossTotal = $(Rows[index]).children().first().find("input[name*='GrossTotal']");
    //    var RowNetTotal = $(Rows[index]).children().first().find("input[name*='NetTotal']");
    //    var RowTaxValue = $(Rows[index]).children().first().find("input[name*='TaxValue']");
    //    var RowProductName = $(Rows[index]).children().first().find("input[name*='ProductName']");

    //    LeadProductGrossTotal = LeadProductGrossTotal + parseFloat(RowGrossTotal.val());
    //    LeadProductNetTotal = LeadProductNetTotal + parseFloat(RowNetTotal.val());
    //    LeadProductTaxValue = LeadProductTaxValue + parseFloat(RowTaxValue.val());
    //    ProductNames = ProductNames + RowProductName.val() + ",";

    //});

    //$('#LeadProductGrossTotal').val(LeadProductGrossTotal.toFixed(2));
    //$('#LeadProductNetTotal').val(LeadProductNetTotal.toFixed(2));
    ////$('#LeadProductTaxPercentage').val(leadProductTaxPercentage.toFixed(2));
    //$('#LeadProductTaxTotal').val(LeadProductTaxValue.toFixed(2));
    //$('#ProductsName').val(ProductNames);
    //$('#ProductSum').val(Rows.length);

    //$('#LeadProductCurrencyID').val($('#LeadProductCurrencyID option:Selected').val()).change();


    //$('#CurrencyIdInCustomerInfo').val($('#CurrencyIdInCustomerInfo option:Selected').val()).change();


    //if (leadProductPrice.length === 0) {
    //    var leadProductPrice = GetLeadProductPrice();
    //}

    // console.log(leadProductPrice["EstimatedDate"]);

    /***************  Lead Product   ****************/
    var LeadProductGrossTotal = parseFloat($('#LeadProductGrossTotal').val());
    var LeadProductNetTotal = parseFloat($('#LeadProductNetTotal').val());
    //var leadProductTaxPercentage = parseFloat($('#LeadProductTaxPercentage').val());
    //////debugger;
    //var LeadProductTaxValue = parseFloat($('#LeadProductTaxTotal').val());

    var LeadProductTotalCost = $('#LeadProductTotalCost').val();

    var LeadProductTotalCountryTaxPercentage = $('#LeadProductCountryTaxPercentage').val();
    var LeadProductTotalSubProductTypeTaxPercentage = $('#LeadProductSubProductTypeTaxPercentage').val();

    var LeadProductTotalCountryTaxValue = $('#LeadProductCountryTax').val();
    var LeadProductTotalSubProductTypeTaxValue = $('#LeadProductSubProductTypeTax').val();


    var LeadProductDiscountValue = parseFloat($('#LeadProductDiscountValue').val());

    /*******************   Calculations    ****************************/
    //////debugger;
    LeadProductGrossTotal = LeadProductGrossTotal - leadProductPrice["GrossTotal"];
    LeadProductNetTotal = LeadProductNetTotal - leadProductPrice["NetTotal"];
    //leadProductTaxPercentage = leadProductTaxPercentage - leadProductPrice["TaxPercentage"];
    //LeadProductTaxValue = LeadProductTaxValue - leadProductPrice["TaxValue"];
    LeadProductDiscountValue = LeadProductDiscountValue - leadProductPrice["DiscountValue"];
   //debugger;
    LeadProductTotalCost = LeadProductTotalCost - leadProductPrice["TotalCost"];

    LeadProductTotalCountryTaxPercentage = LeadProductTotalCountryTaxPercentage - leadProductPrice["TotalCountryTaxesPercentage"];
    LeadProductTotalSubProductTypeTaxPercentage = LeadProductTotalSubProductTypeTaxPercentage - leadProductPrice["TotalSubProductTypeTaxesPercentage"];

    LeadProductTotalCountryTaxValue = LeadProductTotalCountryTaxValue - leadProductPrice["TotalCountryTaxesValue"];
    LeadProductTotalSubProductTypeTaxValue = LeadProductTotalSubProductTypeTaxValue - leadProductPrice["TotalSubProductTypeTaxesValue"];


    $('#LeadProductGrossTotal').val(LeadProductGrossTotal.toFixed(2));
    $('#LeadProductNetTotal').val(LeadProductNetTotal.toFixed(2));
    //$('#LeadProductTaxPercentage').val(leadProductTaxPercentage.toFixed(2));
    //$('#LeadProductTaxTotal').val(LeadProductTaxValue.toFixed(2));
    $('#LeadProductDiscountValue').val(LeadProductDiscountValue.toFixed(2));
   //debugger;
    $('#LeadProductTotalCost').val(LeadProductTotalCost.toFixed(2));

    $('#LeadProductCountryTaxPercentage').val(LeadProductTotalCountryTaxPercentage.toFixed(2));
    $('#LeadProductSubProductTypeTaxPercentage').val(LeadProductTotalSubProductTypeTaxPercentage.toFixed(2));

    $('#LeadProductCountryTax').val(LeadProductTotalCountryTaxValue.toFixed(2));
    $('#LeadProductSubProductTypeTax').val(LeadProductTotalSubProductTypeTaxValue.toFixed(2));

    /*************    Remove Name From Product Name    *************/

    //GetProductsNameCount(leadProductPrice);
    //alert(productsName);
   //debugger;
    var ProductsNames = GetProductsNameCountLeadProduct(leadProductPrice);
   //debugger;
    $('#ProductsName').val(ProductsNames);


    /***********  Get Products Num  ***********/
    GetProductSumCountLeadProduct();
    $('#LeadProductCurrencyID').val($('#LeadProductCurrencyID option:Selected').val()).change();

    CalculateCurrencyRateValueInCustomerInfo();
    //debugger;
    

}


function CalculateCurrencyRateValueInCustomerInfo() {
    //var CurrencyID = $('#LeadProductCurrencyID option:Selected').val();
   //debugger;
    var CurrencyRate = parseFloat($('#CurrencyRateInCustomerInfo').val());
   //debugger;
    $("#LeadProductFGrossTotal").val(($('#LeadProductGrossTotal').val() * CurrencyRate).toFixed(2));
    $("#LeadProductFTaxTotal").val(($('#LeadProductTaxTotal').val() * CurrencyRate).toFixed(2));
    $('#LeadProductFNetTotal').val(($('#LeadProductNetTotal').val() * CurrencyRate).toFixed(2));


}



//function GetCurrencyRateValue() {
//    var CurrencyID = $('#CurrencyIdInCustomerInfo option:Selected').val();
//   ////debugger;
//    if (CurrencyID > 0) {

//        $.ajax({
//            url: '/Currency/GetCurrencyRate',
//            data: {
//                CurrencyID: CurrencyID
//            },
//            type: 'JSON',
//            method: 'GET',
//            success: function (result) {
//                //alert(result);
//               ////debugger;
//                $("#LeadProductFGrossTotal").val(($('#LeadProductGrossTotal').val() * result).toFixed(2));
//                $("#LeadProductFTaxTotal").val(($('#LeadProductTaxTotal').val() * result).toFixed(2));
//                $('#LeadProductFNetTotal').val(($('#LeadProductNetTotal').val() * result).toFixed(2));
//            }
//        });
//    } else {
//        alert("Invalid Currency");
//    }
//}


//function GetProductsNameCount(leadProductPrice) {

//   ////debugger;
//    var productsName = $('#ProductsName').val();
    
//    productsName = productsName.split(',');
//    //productsName = productsName.replace(/,/g, '');
//   ////debugger;
//    var IndexOfName = productsName.indexOf(leadProductPrice["ProductName"]);
//    if (IndexOfName > -1) {
//        productsName.splice(IndexOfName, 1);
//    }
//    return productsName;
//    //GetProductSum();

//    //var ProductsNames = $('#ProductsName').val();
//    //ProductsNames = ProductsNames.split(',');
//    //ProductsNames = ProductsNames.split(' ')
//}

//function GetProductSumCount() {
//   ////debugger;
//    var productSumAfterRemovingCommas = $('#ProductsName').val();
//    //productSumAfterRemovingCommas = productSumAfterRemovingCommas.replace(/,/g, '');
//    productSumAfterRemovingCommas = productSumAfterRemovingCommas.split(',');
//   ////debugger;
//    var ProductsSum = productSumAfterRemovingCommas.length;
//    $('#ProductSum').val(ProductsSum - 1);
//};


