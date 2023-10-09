
var CountryID = $('#CountryID').val();

$(document).ready(function () {
    if (window.location.href.indexOf("LeadProduct/AddEdit") > -1 || window.location.href.indexOf("LeadProduct/Save") > -1) {
        if ($('#LeadProductCurrencyID option:Selected').val() != "") {
            $(".CurrencyNameLeadProduct").text($('#LeadProductCurrencyID option:Selected').text());
        }

        ////debugger;
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


       ////debugger;
        $('#Quantity').val(0);
        $('#Quantity').text(0);
        $('#UnitPrice').val(0);
        $('#UnitPrice').text(0);
        $('#LicenseTypePercentage').val(0);
        $('#LicenseTypePercentage').text(0);
        $('#TaxValue').val(0);
        $('#TaxValue').text(0);
        $('#GrossTotal').val(0);
        $('#GrossTotal').text(0);
        $('#NetTotal').val(0);
        $('#NetTotal').text(0);
        $('#DiscountPercentage').val(0);
        $('#DiscountPercentage').text(0);
        $('#DiscountValue').val(0);
        $('#DiscountValue').text(0);

        //$(document).on('change', '#LeadProductCurrencyID', function (e) {
        $('#CurrencyRate').keyup(function () {
            if ($('#CurrencyRate').val() > 0) {
                CalculateCurrencyRateValueInLeadProduct();
            }
        });

        $('#LeadProductCurrencyID').on('change', function () {
            $(".CurrencyNameLeadProduct").text($('#LeadProductCurrencyID option:Selected').text());
            if ($('#CurrencyRate').val() > 0) {
                CalculateCurrencyRateValueInLeadProduct();
            }
        });

        //$('#LeadProductDiscountPercentage').keyup(function () {
        //   //////debugger;
        //    var LeadProductDiscountPercentage = $('#LeadProductDiscountPercentage').val();
        //    var LeadProductDiscountValue = 0;
        //    if (!isNaN(LeadProductDiscountPercentage)) {
        //        var LeadProductGrossTotal = $('#LeadProductGrossTotal').val();
        //        var LeadProductTaxTotal = $('#LeadProductTaxTotal').val();

        //        if (jQuery.type(LeadProductGrossTotal) == 'string') { LeadProductGrossTotal = parseFloat(LeadProductGrossTotal); }
        //        if (jQuery.type(LeadProductTaxTotal) == 'string') { LeadProductTaxTotal = parseFloat(LeadProductTaxTotal); }

        //        LeadProductDiscountValue = LeadProductGrossTotal * (LeadProductDiscountPercentage / 100);
        //        $('#LeadProductFDiscountValue').val(LeadProductDiscountValue);
        //        var LeadProductNetTotal = $('#LeadProductNetTotal').val();
        //        LeadProductNetTotal = LeadProductGrossTotal + LeadProductTaxTotal - LeadProductDiscountValue;
        //        $('#LeadProductNetTotal').val(LeadProductNetTotal);
        //        /* Calculate NetTotal in the the other Currency */
        //        GetCurrencyRateValueInLeadProduct();
        //    }
        //});

    }
});


$('#OneMoreLeadProductPriceLeadProduct').on('click', function (e) {
    e.preventDefault();
    ////debugger;


    ValidateLeadProductPriceLeadProduct();
    //////debugger;

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
    //    //////debugger;
    //    GetCountryTaxPercentage(CountryID);

    //}
    //else {
    //    //result.errors

    //    //PrintErrorsInLeadProduct(ErrorMessages);
    //}

    //});
});




function CalculateLeadProductInLeadProduct() {
   //debugger;
    var leadProduct = GetLeadProductPrice();
   //debugger;
    /*    Lead ProductPrice    */
    var LeadProductPriceGrossTotal = parseFloat(leadProduct["GrossTotal"]);
    //////debugger;
    var LeadProductPriceTax = $('#TaxPercentage').val();
    var LeadProductPriceTaxPercentage = parseFloat(leadProduct["TaxPercentage"]);


    var LeadProductPriceNetTotal = parseFloat(leadProduct["NetTotal"]);
    var LeadProductPriceTaxValue = parseFloat(leadProduct["TaxValue"]);
    var LeadProductPriceDiscountValue = parseFloat(leadProduct["DiscountValue"]);

   //debugger;
    var LeadProductPriceCost = parseFloat(leadProduct["TotalCost"]);
    var LeadProductPriceTotalCountryTaxesPercentage = parseFloat(leadProduct["TotalCountryTaxesPercentage"]);
    var LeadProductPriceTotalCountryTaxesValue = parseFloat(leadProduct["TotalCountryTaxesValue"]);
    var LeadProductPriceTotalSubProductTypeTaxesPercentage = parseFloat(leadProduct["TotalSubProductTypeTaxesPercentage"]);
   //debugger;
    var LeadProductPriceTotalSubProductTypeTaxesValue = parseFloat(leadProduct["TotalSubProductTypeTaxesValue"]);

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
    var LeadProductDiscountValue = parseFloat($('#LeadProductDiscountValue').val());
    if (LeadProductDiscountValue == "") {
        LeadProductDiscountValue = parseFloat(0);
    }
    //debugger;
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
        //////debugger;
        //leadProductTaxPercentage += LeadProductPriceTaxPercentage;
        //$('#LeadProductTaxPercentage').val(leadProductTaxPercentage.toFixed(2));
    }

    //if (!isNaN(LeadProductPriceTaxValue)) {
    //    LeadProductTaxValue += LeadProductPriceTaxValue;
    //    $('#LeadProductTaxTotal').val(LeadProductTaxValue.toFixed(2));
    //}

    if (!isNaN(LeadProductDiscountValue)) {
        LeadProductDiscountValue += LeadProductPriceDiscountValue;
        $('#LeadProductDiscountValue').val(LeadProductDiscountValue.toFixed(2));
    }
    //debugger;
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

   //debugger;
    if (!isNaN(LeadProductTotalCountryTaxesPercentage)) {
        LeadProductTotalCountryTaxesPercentage += LeadProductPriceTotalCountryTaxesPercentage;
        $('#LeadProductCountryTaxPercentage').val(LeadProductTotalCountryTaxesPercentage.toFixed(2));
    }
   //debugger;
    if (!isNaN(LeadProductTotalSubProductTypeTaxesPercentage)) {
        LeadProductTotalSubProductTypeTaxesPercentage += LeadProductPriceTotalSubProductTypeTaxesPercentage;
        $('#LeadProductSubProductTypeTaxPercentage').val(LeadProductTotalSubProductTypeTaxesPercentage.toFixed(2));
    }

    //////debugger;
    var AlreadySelectedProducts = $('#ProductsName').val();
    if (AlreadySelectedProducts == "undefined") {
        AlreadySelectedProducts = "";
    } else {
        var newProduct = AlreadySelectedProducts + $('#ProductID option:Selected').text() + ",";
        $('#ProductsName').val(newProduct);
    }
    
    var ProductSum = CountProductsLeadProduct();
    $('#ProductsSum').val(ProductSum);

    CalculateCurrencyRateValueInLeadProduct();

};

function CountProductsLeadProduct() {
   //debugger;
    var productsName = $('#ProductsName').val();
    if (productsName != null && productsName != "" && productsName != "undefined") {
        productsName = productsName.split(",");

        return productsName.length - 1;
    }
    else {
        return 0;
    }
    

}

function ValidateLeadProductPriceLeadProduct() {
   //debugger;
    var rowCount = $('#AddLeadProductPriceTable tbody tr').length;

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

    /***********************************************************************/

    /***************    Fill Data In Object To send to the Controller and Validate     *************/

    var leadProductPrice = GetLeadProductPrice();
    //////debugger;

    /***************    Send Object Via AJAX to Controller to Validate     *************/

    //$.post('/CustomerInfo/LeadProductPrice', { leadProductPrice, rowCount }, function (result) {
    $.ajax({
        url: '/LeadProduct/LeadProductPrice',
        data: {
            leadProductPrice: leadProductPrice,
            rowCount: rowCount,
            CountryID: CountryID
        },
        method: "POST",
        type: 'JSON',
        success: function (result) {
            //////debugger;
            var ErrorMessages = result.errors;
            if (result.isSuccess == null) {
                //debugger;
                CalculateLeadProductInLeadProduct();
                CalculateLeadCost();

                EmptyLeadProductPrice();
                //////debugger;
                //debugger;
                $('#AddLeadProductPriceTable').css("visibility", "visible");
               //////debugger;
                if (leadProductPrice.ID == "" || typeof leadProductPrice.ID === "undefined") {
                    $("#LeadProductPriceLeadProduct").append(result);
                    
                } else {
                    var SelectRow = $("#LeadProductPrice_" + leadProductPrice.ID);
                    SelectRow.replaceWith(result);
                }
                


                $('#RowId').attr('id', 'ROW');
                ////////debugger;
                $(document).ready(function () {
                    $(".EditLeadProductPriceLeadProduct").unbind().click(function () {
                    //$(".EditLeadProductPriceLeadProduct").unbind("click", function () {
                        //debugger;
                        var ID = $(this).attr("data-value");
                        //alert(trID);
                        var EstimatedDate = $('#LeadProduct_LeadProductPrice_' + ID + '__EstimatedDate').val();
                        //date = date.replace(/\s+/g, '');
                        var ProductID = $('#LeadProduct_LeadProductPrice_' + ID + '__ProductID').val();
                        //var ProductName = $('#LeadProduct_LeadProductPrice_' + ID + '__Product.ProductName').val();
                        var ProductName = document.getElementById("LeadProduct_LeadProductPrice_"+ID+"__Product.ProductName").value;
                        
                        var SubProductID = $('#LeadProduct_LeadProductPrice_' + ID + '__SubProductID').val();
                       //debugger;
                        //var SubProductName = $('#LeadProduct_LeadProductPrice_' + ID + '__SubProuct.SubProductName').val();
                        var SubProductName = document.getElementById("LeadProduct_LeadProductPrice_"+ID+"__SubProduct.SubProductName").value;
                        var Qty = $('#LeadProduct_LeadProductPrice_' + ID + '__Quantity').val();
                        var UnitPrice = $('#LeadProduct_LeadProductPrice_' + ID + '__UnitPrice').val();
                        var LicenseTypeID = $('#LeadProduct_LeadProductPrice_' + ID + '__LicenseTypeID').val();
                        var LicenseTypeName = $('#LeadProduct_LeadProductPrice_' + ID + '__LicenseType.LicenseTypeName').val();
                        var GrossTotal = $('#LeadProduct_LeadProductPrice_' + ID + '__GrossTotal').val();
                        //var TaxPercentage = $('#LeadProduct_LeadProductPrice_' + ID + '__TaxPercentage').val();
                        //var TaxValue = $('#LeadProduct_LeadProductPrice_' + ID + '__TaxValue').val();
                        var NetTotal = $('#LeadProduct_LeadProductPrice_' + ID + '__NetTotal').val();
                        var DiscountPercentage = $('#LeadProduct_LeadProductPrice_' + ID + '__DiscountPercentage').val();
                        var DiscountValue = $('#LeadProduct_LeadProductPrice_' + ID + '__DiscountValue').val();
                        


                        //debugger;
                        var LeadProductPriceCost = $('#LeadProduct_LeadProductPrice_' + ID + '__Cost').val();
                        var LeadProductPriceTotalCost = $('#LeadProduct_LeadProductPrice_' + ID + '__TotalCost').val();

                        var LeadProductPriceTotalCountryTaxesPercentage = $('#LeadProduct_LeadProductPrice_' + ID + '__TotalCountryTaxesPercentage').val();
                        var LeadProductPriceTotalCountryTaxesValue = $('#LeadProduct_LeadProductPrice_' + ID + '__TotalCountryTaxesValue').val();

                        var LeadProductPriceTotalSubProductTypeTaxesPercentage = $('#LeadProduct_LeadProductPrice_' + ID + '__TotalSubProductTypeTaxesPercentage').val();
                        var LeadProductPriceTotalSubProductTypeTaxesValue = $('#LeadProduct_LeadProductPrice_' + ID + '__TotalSubProductTypeTaxesValue').val();

                        //var LeadProductPriceTotalTaxesValue = $('#LeadProduct_LeadProductPrice_' + ID + '__TotalSubProductTypeTaxesValue').val();
                        var LeadProductPriceYears = parseInt($('#LeadProduct_LeadProductPrice_' + ID + '__Years').val());

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


                        //var Money = ExpectedValueCurrency[16];
                        //var NextStep = $('td:nth-child(5)', $(this).parents('tr')).attr('id');
                        //var Note = $('td:nth-child(6)', $(this).parents('tr')).text();
                        $("#LeadProductPriceID").val(ID);
                        $('#EstimatedDate').val(EstimatedDate);
                        $('#ProductID').val(ProductID);
                        $.when(GetSubProductsByProductID(ProductID)).done(function () {
                            //debugger;
                            $.when(GetSubProductInfoByID(SubProductID)).done(function () {
                                //debugger;
                                $('#LicenseTypeID').val(LicenseTypeID);
                                $.when(GetLicenseTypeInfo(LicenseTypeID)).done(function () {
                                    /*$('#LicenseTypeYears').val(LeadProductPriceYears);*/
                                    //debugger;
                                    $('#EstimatedDate').val(EstimatedDate);
                                   //debugger;
                                    $('#TaxPercentage').val(LeadProductPriceTotalCountryTaxesPercentage);
                                   //debugger;
                                    $('#Quantity').val(Qty);
                                   //debugger;
                                    $('#UnitPrice').val(UnitPrice);
                                   //debugger;
                                    $('#GrossTotal').val(GrossTotal);
                                   //debugger;
                                    $('#TaxValue').val(LeadProductPriceTotalCountryTaxesValue);
                                   //debugger;
                                    $('#NetTotal').val(NetTotal);
                                   //debugger;
                                    $('#DiscountPercentage').val(DiscountPercentage);
                                   //debugger;
                                    $('#DiscountValue').val(DiscountValue);
                                   //debugger;
                                    //$('#LicenseTypeYears').val(9);
                                    $('#LeadProductPriceCost').val(LeadProductPriceCost);
                                    $('#LeadProductPriceTotalCost').val(LeadProductPriceTotalCost);
                                   //debugger;
                                    $('#LeadProductPriceTaxPercentage').val(LeadProductPriceTotalSubProductTypeTaxesPercentage);
                                   //debugger;
                                    $('#LeadProductPriceTaxValue').val(LeadProductPriceTotalSubProductTypeTaxesValue);
                                    //debugger Zuhairi;
                                   //debugger;
                                    $('#LicenseTypeYears').val(LeadProductPriceYears);
                                });
                               //debugger;
                                //$('#LicenseTypeYears').val(LeadProductPriceYears);
                                CalculateCurrencyRateValueInLeadProduct();
                                RemoveValuesFromLeadProductInLeadProduct(leadProductPrice);
                                CalculateLeadCost();
                            });
                        });
                    });

                    $('.DeleteLeadProductPriceLeadProduct').unbind().click(function () {
                      //debugger;
                    //$('.DeleteLeadProductPriceLeadProduct').on('click', function () {
                        var ID = $(this).attr('data-value');

                       //debugger;
                        var EstimatedDate = $('#LeadProduct_LeadProductPrice_' + ID + '__EstimatedDate').val();
                        //date = date.replace(/\s+/g, '');
                        var ProductID = $('#LeadProduct_LeadProductPrice_' + ID + '__ProductID').val();
                        //var ProductName = $('#LeadProduct_LeadProductPrice_' + ID + '__Product.ProductName').val();
                        var ProductName = document.getElementById("LeadProduct_LeadProductPrice_"+ID+"__Product.ProductName").value;
                        var SubProductID = $('#LeadProduct_LeadProductPrice_' + ID + '__SubProductID').val();
                        //var SubProductName = $('#LeadProduct_LeadProductPrice_' + ID + '__SubProuct.SubProductName').val();
                        var SubProductName = document.getElementById("LeadProduct_LeadProductPrice_"+ID+"__SubProduct.SubProductName").value;
                        var Qty = $('#LeadProduct_LeadProductPrice_' + ID + '__Quantity').val();
                        var UnitPrice = $('#LeadProduct_LeadProductPrice_' + ID + '__UnitPrice').val();
                        var LicenseTypeID = $('#LeadProduct_LeadProductPrice_' + ID + '__LicenseTypeID').val();
                        var LicenseTypeName = $('#LeadProduct_LeadProductPrice_' + ID + '__LicenseType.LicenseTypeName').val();
                        var GrossTotal = $('#LeadProduct_LeadProductPrice_' + ID + '__GrossTotal').val();
                        //var TaxPercentage = $('#LeadProduct_LeadProductPrice_' + ID + '__TaxPercentage').val();
                        //var TaxValue = $('#LeadProduct_LeadProductPrice_' + ID + '__TaxValue').val();
                        var NetTotal = $('#LeadProduct_LeadProductPrice_' + ID + '__NetTotal').val();
                        var DiscountPercentage = $('#LeadProduct_LeadProductPrice_' + ID + '__DiscountPercentage').val();
                        var DiscountValue = $('#LeadProduct_LeadProductPrice_' + ID + '__DiscountValue').val();



                        //debugger;
                        var LeadProductPriceCost = $('#LeadProduct_LeadProductPrice_' + ID + '__Cost').val();
                        var LeadProductPriceTotalCost = $('#LeadProduct_LeadProductPrice_' + ID + '__TotalCost').val();

                        var LeadProductPriceTotalCountryTaxesPercentage = $('#LeadProduct_LeadProductPrice_' + ID + '__TotalCountryTaxesPercentage').val();
                        var LeadProductPriceTotalCountryTaxesValue = $('#LeadProduct_LeadProductPrice_' + ID + '__TotalCountryTaxesValue').val();

                        var LeadProductPriceTotalSubProductTypeTaxesPercentage = $('#LeadProduct_LeadProductPrice_' + ID + '__TotalSubProductTypeTaxesPercentage').val();
                        var LeadProductPriceTotalSubProductTypeTaxesValue = $('#LeadProduct_LeadProductPrice_' + ID + '__TotalSubProductTypeTaxesValue').val();

                        //var LeadProductPriceTotalTaxesValue = $('#LeadProduct_LeadProductPrice_' + ID + '__TotalSubProductTypeTaxesValue').val();
                        var LeadProductPriceYears = parseInt($('#LeadProduct_LeadProductPrice_' + ID + '__Years').val());

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


                        $('#LeadProductPrice_' + ID).remove();


                        $('#LeadProductPriceLeadProduct tbody tr').each(function (index) {
                            var inputs = $(this).find("td").first().find("inputs");

                            $(inputs[0]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__ID");
                            $(inputs[0]).attr("name", "LeadProdct.LeadProductPrice[" + index +"].ID");

                            $(inputs[1]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__EstimatedDate");
                            $(inputs[1]).attr("name", "LeadProdct.LeadProductPrice[" + index +"].EstimatedDate");

                            $(inputs[2]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__ProductID");
                            $(inputs[2]).attr("name", "LeadProdct.LeadProductPrice[" + index +"].ProductID");

                            $(inputs[3]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__ProductName");
                            $(inputs[3]).attr("name", "LeadProdct.LeadProductPrice[" + index +"].ProductName");

                            $(inputs[4]).attr("name", "LeadProdct.LeadProductPrice[" + index +"].SubProductID");
                            $(inputs[4]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__SubProductID");

                            $(inputs[5]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__SubProductName");
                            $(inputs[5]).attr("name", "LeadProdct.LeadProductPrice[" + index +"].SubProductName");

                            $(inputs[6]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__Quantity");
                            $(inputs[6]).attr("name", "LeadProdct.LeadProductPrice[" + index +"].Quantity");

                            $(inputs[7]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__UnitPrice");
                            $(inputs[7]).attr("name", "LeadProdct.LeadProductPrice[" + index +"].UnitPrice");

                            $(inputs[8]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__LicenseTypeID");
                            $(inputs[8]).attr("name", "LeadProdct.LeadProductPrice[" + index +"].LicenseTypeID");

                            $(inputs[9]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__GrossTotal");
                            $(inputs[9]).attr("name", "LeadProdct.LeadProductPrice[" + index +"].GrossTotal");

                            $(inputs[10]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__TaxPercentage");
                            $(inputs[10]).attr("name", "LeadProdct.LeadProductPrice[" + index +"].TaxPercentage");

                            $(inputs[11]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__TaxValue");
                            $(inputs[11]).attr("name", "LeadProdct.LeadProductPrice[" + index +"].TaxValue");

                            $(inputs[12]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__NetTotal");
                            $(inputs[12]).attr("name", "LeadProdct.LeadProductPrice[" + index +"].NetTotal");

                            $(inputs[13]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__DiscountPercentage");
                            $(inputs[13]).attr("name", "LeadProdct.LeadProductPrice[" + index +"].DiscountPercentage");

                            $(inputs[14]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__DiscountValue");
                            $(inputs[14]).attr("name", "LeadProdct.LeadProductPrice[" + index + "].DiscountValue");

                            $(inputs[15]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__Cost");
                            $(inputs[15]).attr("name", "LeadProdct.LeadProductPrice[" + index + "].Cost");

                            $(inputs[16]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__TotalCost");
                            $(inputs[16]).attr("name", "LeadProdct.LeadProductPrice[" + index + "].TotalCost");

                            $(inputs[17]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__TotalCountryTaxesPercentage");
                            $(inputs[17]).attr("name", "LeadProdct.LeadProductPrice[" + index + "].TotalCountryTaxesPercentage");

                            $(inputs[18]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__TotalCountryTaxesValue");
                            $(inputs[18]).attr("name", "LeadProdct.LeadProductPrice[" + index + "].TotalCountryTaxesValue");

                            $(inputs[19]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__TotalSubProductTypeTaxesPercentage");
                            $(inputs[19]).attr("name", "LeadProdct.LeadProductPrice[" + index + "].TotalSubProductTypeTaxesPercentage");

                            $(inputs[20]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__TotalSubProductTypeTaxesValue");
                            $(inputs[20]).attr("name", "LeadProdct.LeadProductPrice[" + index + "].TotalSubProductTypeTaxesValue");

                            $(inputs[21]).attr("id", "LeadProduct_LeadProductPrice_" + index + "__Years");
                            $(inputs[21]).attr("name", "LeadProdct.LeadProductPrice[" + index + "].Years");

                        });

                        ////alert(trID);
                        //var EstimatedDate = $('#').val();
                        ////date = date.replace(/\s+/g, '');
                        //var ProductName = $('#LeadProduct_LeadProductPrice_0__ID').val();
                        //var ProductIDName = $('td:nth-child(2)', $(this).parents('tr')).text();
                        //var SubProduct = $('td:nth-child(3)', $(this).parents('tr')).attr('id');
                        //var Qty = $('td:nth-child(4)', $(this).parents('tr')).attr('id');
                        //var UnitPrice = $('td:nth-child(5)', $(this).parents('tr')).attr('id');
                        //var LicenseType = $('td:nth-child(6)', $(this).parents('tr')).attr('id');
                        //var GrossTotal = $('td:nth-child(7)', $(this).parents('tr')).attr('id');
                        //var TaxPercentage = $('td:nth-child(8)', $(this).parents('tr')).attr('id');
                        //var TaxValue = $('td:nth-child(9)', $(this).parents('tr')).attr('id');
                        //var NetTotal = $('td:nth-child(10)', $(this).parents('tr')).attr('id');

                        //var leadProductPrice = {
                        //    "GrossTotal": GrossTotal,
                        //    "NetTotal": NetTotal,
                        //    "TaxPercentage": TaxPercentage,
                        //    "TaxValue": TaxValue,
                        //    "ProductName": ProductIDName
                        //};

                        //$(this).parent().parent().remove();
                        
                        CalculateLeadCost();
                        RemoveValuesFromLeadProductInLeadProduct(leadProductPrice);
                    });


                }, 500);

            }
            else {
                //result.errors

                //////debugger;
                PrintErrorsInLeadProduct(ErrorMessages);
            }
        }


    });

}

function PrintErrorsInLeadProduct(ErrorMessages) {
    //console.log(ErrorMessages);
   //////debugger;
    $.each(ErrorMessages, function (key, value) {
        //////debugger;
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
            case "LicenseType":
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
                $("#DiscountValueError").text(error);
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

    //var TaxPercentageToSplit = $('#TaxPercentage').val();
    //TaxPercentageToSplit = TaxPercentageToSplit.split(' ');

    var TaxPercentage = TaxPercentageToSplit[0];
    var GrossTotal = $('#GrossTotal').val();
    //var TaxValue = $('#TaxValue').val();
    var NetTotal = $('#NetTotal').val();
    var DiscountPercentage = $('#DiscountPercentage').val();
    var DiscountValue = $('#DiscountValue').val()

    //debugger Zuhairi;
   //debugger;
    var LeadProductPriceLicenseYears = $('#LicenseTypeYears').val();
    var LeadProductPriceCost = $('#LeadProductPriceCost').val();
    //var LeadProductPriceTaxPercentage = $('#LeadProductPriceTaxPercentage').val();
    //var LeadProductPriceTaxValue = $('#LeadProductPriceTaxValue').val();
    var TotalCost = $('#LeadProductPriceTotalCost').val();
    var TotalCountryTaxPercentage = $('#TaxPercentage').val();
    var TotalCountryTaxValue = $('#TaxValue').val();
    var TotalSubProductTypeTaxPercentage = $('#LeadProductPriceTaxPercentage').val();
    var TotalSubProductTypeTaxValue = $('#LeadProductPriceTaxValue').val();

    /*
     *
     *  public decimal? TotalCost { get; set; }
        public decimal? TotalCountryTaxesPercentage { get; set; }
        public decimal? TotalCountryTaxesValue { get; set; }
        public decimal? TotalSubProductTypeTaxesPercentage { get; set; }
        public decimal? TotalSubProductTypeTaxesValue { get; set; }
     * 
     * 
     * */

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
        /**********/
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

    //debugger;

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
    //$('#TaxValue').val(0.00);
    $('#DiscountPercentage').va(0.00);
    $('#DiscountValue').va(0.00);
    //debugger;
    $('#LeadProductPriceTotalCost').val(0.00);
    //$('#LeadProductPriceTotalCost').val(0.00);
    $('#TotalCountryTaxesPercentage').val(0);
    //$('#LeadProductPriceTotalCost').val(0.00);
    $('#Note').val('');

}


function RemoveValuesFromLeadProductInLeadProduct(leadProductPrice) { /* (leadProductPrice) */
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

    var LeadProductTotalCountryTaxValue = $('#LeadProductCountryTax').val();
    var LeadProductTotalSubProductTypeTaxValue = $('#LeadProductSubProductTypeTax').val();


    var LeadProductTotalCountryTaxPercentage = $('#LeadProductCountryTaxPercentage').val();
    var LeadProductTotalSubProductTypeTaxPercentage = $('#LeadProductSubProductTypeTaxPercentage').val();


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

}


function GetProductsNameCountLeadProduct(leadProductPrice) {

   //debugger;
    var productsName = $('#ProductsName').val();

    productsName22 = productsName.split(',');
    //productsName = productsName.replace(/,/g, '');
   //////debugger;
    var IndexOfName = productsName.indexOf(leadProductPrice["ProductName"]);
    if (IndexOfName > -1) {
       //debugger;
        //delete productsName(IndexOfName);
        productsName22.splice(IndexOfName, 1);
    }
    return productsName22;
    //GetProductSum();

    //var ProductsNames = $('#ProductsName').val();
    //ProductsNames = ProductsNames.split(',');
    //ProductsNames = ProductsNames.split(' ')
}

function GetProductSumCountLeadProduct() {
   //debugger;
    var productSumAfterRemovingCommas = $('#ProductsName').val();
    //productSumAfterRemovingCommas = productSumAfterRemovingCommas.replace(/,/g, '');
    if (productSumAfterRemovingCommas != null && productSumAfterRemovingCommas != "" && productSumAfterRemovingCommas != "undefined") {
        productSumAfterRemovingCommas = productSumAfterRemovingCommas.split(',');
        //////debugger;
        var ProductsSum = productSumAfterRemovingCommas.length;
        $('#ProductsSum').val(ProductsSum - 1);
    } else {
        $('#ProductsSum').val(0);
    }
   //debugger;
};

function CalculateCurrencyRateValueInLeadProduct() {
    //var CurrencyID = $('#LeadProductCurrencyID option:Selected').val();
    var CurrencyRate = parseFloat($('#CurrencyRate').val());
    //////debugger;
    $("#LeadProductFGrossTotal").val(($('#LeadProductGrossTotal').val() * CurrencyRate).toFixed(2));
    $("#LeadProductFTaxTotal").val(($('#LeadProductTaxTotal').val() * CurrencyRate).toFixed(2));
    $('#LeadProductFNetTotal').val(($('#LeadProductNetTotal').val() * CurrencyRate).toFixed(2));


}


