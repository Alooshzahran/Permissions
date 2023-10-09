//$(document).on("change", "#ProductID", function (LeadProductID) {
 /*  //////////debugger;;*/

var Tax = 0;
var CountryID;
var GlobalLicenseTypeYears = $('GlobalLicenseTypeYears').val();
if (window.location.href.indexOf("CustomerInfo/AddEdit") > -1 || window.location.href.indexOf("LeadProduct/AddEdit") > -1 || window.location.href.indexOf("LeadProductPrice/AddEdit") > -1
    || window.location.href.indexOf("CustomerInfo/Save") > -1 || window.location.href.indexOf("LeadProduct/Save") > -1 || window.location.href.indexOf("LeadProductPrice/Save") > -1
) {
    
    if (window.location.href.indexOf("LeadProductPrice/AddEdit") > -1 || window.location.href.indexOf("LeadProductPrice/save") > -1) {
        //$(document).ready(function () {
        //    //debugger;;
        //    var LicenseTypeee = $('#LicenseTypeID option:Selected').val();
        //    if (LicenseTypeee != "" && LicenseTypeee != 0) {

        //        $.ajax({
        //            //url: "../City/GetCitiesByCountryID",
        //            url: "/LicenseType/GetByID",
        //            data: { ID: LicenseTypeee },
        //            type: "GET",
        //            success: function (result) {
        //                ////debugger;;
        //                $('#LicenseTypePercentage').val(result.percentage);
        //            }


        //        });
        //    } else {
        //        $('#LicenseTypePercentage').val(100);
        //        //Sus
        //       //debugger;
        //        $('#LicenseTypeYears').val(999);
        //    }
        //});
    }
    $(document).ready(function () {
        ////debugger;;
        $('#LeadProductTaxTotal').val(0);
        if (!$('#ProductID option:Selected').val() > 0) {
            $('#DiscountPercentage').attr('readonly', true);
        }
    });

    $('#DiscountPercentage').keyup(function () {
       //////debugger;;
        var DiscountPercentage = $('#DiscountPercentage').val();
        if (!isNaN(DiscountPercentage) && DiscountPercentage != "") {
            if (DiscountPercentage >= 0) {
                CalculateDiscountValue();
                //var GrossTotal = $('#GrossTotal').val();
                //var TaxValue = $('#TaxValue').val();
                //CalculateDiscountValue();

                //var TaxValue = CalculateTaxValue(Tax/100)
                //$('#TaxValue').val(TaxValue);
                ////////debugger;;
                //var NetTotal = CalculateNetTotal(GrossTotal, TaxValue);
                //$('#NetTotal').val(NetTotal.toFixed(2));
            }
            else {
                DiscountPercentage = 0;
                $('#DiscountPercentage').val(DiscountPercentage);
                $('#DiscountPercentage').keyup();
            }
        }
        if (DiscountPercentage == "") {
            DiscountPercentage = 0;
            $('#DiscountPercentage').val(DiscountPercentage);
            $('#DiscountPercentage').keyup();
        }
    });

    $('#DiscountValue').keyup(function () {
       ////debugger;;
        var DiscountValue = $('#DiscountValue').val();
        if (!isNaN(DiscountValue) && DiscountPercentage != "") {
            if (DiscountValue >= 0) {
                ////////debugger;;
                CalculateDiscountPercentage();
                //var GrossTotal = $('#GrossTotal').val();
                ////var TaxValue = $('#TaxValue').val();
                //var TaxValue = CalculateTaxValue(Tax/100)
                //$('#TaxValue').val(TaxValue);
                //var NetTotal = CalculateNetTotal(GrossTotal, TaxValue);
                //$('#NetTotal').val(NetTotal.toFixed(2));
            }
        } else {
            DiscountValue = 0;
        }
        if (DiscountValue == "") {
            DiscountValue = 0;
            $('#DiscountValue').val(DiscountValue);
            $('#DiscountValue').keyup();
        }

    });

    $('#TaxPercentage').keyup(function () {
        ////////debugger;;
        Tax = parseFloat($('#TaxPercentage').val());
        if (!isNaN(Tax)) {
            if (Tax >= 0) {
                var GrossTotal = $('#GrossTotal').val();
                var DiscountValue = $('#DiscountValue').val();

                var TaxValue = CalculateTaxValue(Tax / 100);
                $('#TaxValue').val(TaxValue.toFixed(2));
                var NetTotal = CalculateNetTotal(GrossTotal, TaxValue, DiscountValue);
                $('#NetTotal').val(NetTotal.toFixed(2));
            } else {
                Tax = 0;
                $('#TaxPercentage').val("0");
            }
        } 
    });

}

function GetSubProductsByProductID(ProductID) {
   ////////debugger;;
    return $.ajax({
        //url: "../City/GetCitiesByCountryID",
        url: "/LeadProduct/GetSubProductsByLeadProductID",
        data: { LeadProductID: ProductID },
        type: "GET",
        success: function (result) {
          ////////debugger;;
            console.log("Result: " + result);
            //var subproduct = $(this + '#SubProductID');
            $('#SubProductID').empty();
            var firstOption = 0;
            $.each(result, function (index, value) {
               ////////debugger;;
                if (index == 0) {
                    firstOption = value.id;
                    ////////debugger;;
                    if (result[0].allowManualEntry == true) {
                        $('#UnitPrice').attr('readonly', false);
                    }
                }
                $('#SubProductID').append($('<option/>',
                    {
                        value: value.id,
                        text: value.name
                    }
                ));
            });
            $('#SubProductID').val(firstOption).change();
            $('#CountryID').val();
            

            //return true;
            //$("#SubProductID").change($("#SubProductID option:first"));
        }
    });

    //return false;
}
$('#ProductID').change(function () {

   
    var LeadProductID = $(this).val();
    if (LeadProductID == "") {
        LeadProductID = 0;
    }
    //console.log("ID: " + LeadProductID);
    CountryID = $('#CountryID').val();

    GetSubProductsByProductID(LeadProductID);
    $('#DiscountPercentage').attr('readonly', false);
    $('#DiscountValue').attr('readonly', false);
    $('#TaxPercentage').attr('readonly', false);
});    


function GetSubProductInfoByID(SubProductID) {
   //////debugger;;
    return $.ajax({
        url: "/SubProduct/GetSubProductInformation",
        data: {
            SubProductID: SubProductID
        },
        type: "GET",
        success: function (result) {
            ////debugger;;
            //console.log("Result: " + result);
            //var subproduct = $(this + '#SubProductID');
            //$('#Quantity').empty();
            $('#SubProductID').val(SubProductID);
            $('#Quantity').val(result.quantity);
            $('#Quantity').attr('step', result.minimumIncreaseQuantity);
            $('#Quantity').attr('min', result.quantity);
            ////////debugger;;
            $('#UnitPrice').val(result.unitPrice);
            $('#UnitType').text(result.unitType);
           ////////debugger;;
            var LicenseTypePercentage = $('#LicenseTypePercentage').val();
            if (LicenseTypePercentage == "") {
                LicenseTypePercentage = "100";
            };
           //debugger;
            Calculations();
            ////debugger;;
            if (result.subProductType != null) {
                var SubProductType = result.subProductType.id;
            } else {
                var SubProductType = 0;
            }

            ////debugger;;
            GetCountrySubProductTypeTaxPercentage(SubProductType);
            //Calculations($('#Quantity').val(), $('#UnitPrice').val(), LicenseTypePercentage);


        }
    });
}

$('#SubProductID').change(function () {
  ////////debugger;;
    var SubProductID = $('#SubProductID option:Selected').val();
    //alert(SubProductID);
    //console.log("ID: " + LeadProductID);
    //var CountryID = $('#CountryID').val();
    if (typeof SubProductID != "undefined") {
        //GetSubProductInfoByID(SubProductID);
        $.when(GetSubProductInfoByID(SubProductID)).done(function () {
            $.when(CalculateDefaultClosingDate()).done(function () {
                GetLicenseTypeBySubProductID();
            });
        });
    }
});

$("#Quantity").on("change", function (event) {
   //////debugger;;
    var minAcceptedQuantity = parseInt($("#Quantity").attr('min'));
    var Quantity = parseInt($("#Quantity").val());
    ////////debugger;;
    if (Quantity >= minAcceptedQuantity) {
        var qnt = $(this).val();
        var unitPrice = $('#UnitPrice').val();
        var LicenseType = $('#LicenseTypePercentage').val();
        LicenseType = LicenseType.split(" ");
        ////////debugger;;
        var LicenseTypePercentage = LicenseType[0];
        ////////debugger;;
        if (LicenseTypePercentage == "") {
            LicenseTypePercentage = 100;
        };
        $('#Quantity').css('border', '1px solid #e5e6e7');
       //debugger;
        Calculations();
        CalculateTotalCost();

        //var GrossTotal = CalculateGrossTotal(qnt, unitPrice);
        //$('#GrossTotal').val(GrossTotal);
        //var TaxValue = CalculateTaxValue(Tax/100);
        //$('#TaxValue').val(TaxValue.toFixed(2));
        //var NetTotal = CalculateNetTotal(GrossTotal, TaxValue);
        //$('#NetTotal').val(NetTotal);
    } else {
        //$('#Quantity').css('border', '1px solid red');
        //$('#WarningMessage').text("Quantity cannot not be less than " + minAcceptedQuantity + " for this product");
        ////$('#WarningMessage').text("Quantity cannot not be less than " + GlobalDefaultClosingDate + " for this product");
        //$('#WarningModal').modal('show').delay(1000).fadeIn(500);


        //setTimeout(function () {
        //    $('#WarningModal').modal('hide').delay(1000).fadeOut(500);
        //}, 1500);

        $('#EstimatedDate').val(GlobalEstimatedDate);
    }
});

$("#Quantity").on("keyup keydown", function (event) {
   //////debugger;;
    var minAcceptedQuantity = parseInt($("#Quantity").attr('min'));
    var Quantity = parseInt($("#Quantity").val());
    ////////debugger;;
    if (Quantity >= minAcceptedQuantity) {
        var qnt = $(this).val();
        var unitPrice = $('#UnitPrice').val();
        var LicenseType = $('#LicenseTypePercentage').val();
        LicenseType = LicenseType.split(" ");
        ////////debugger;;
        var LicenseTypePercentage = LicenseType[0];
        ////////debugger;;
        if (LicenseTypePercentage == "") {
            LicenseTypePercentage = 100;
        };
        $("#Quantity").css('border', '');
       //debugger;
        Calculations();
//        Calculations(qnt, unitPrice, LicenseTypePercentage, GlobalLicenseTypeYears);

        //var GrossTotal = CalculateGrossTotal(qnt, unitPrice);
        //$('#GrossTotal').val(GrossTotal);
        //var TaxValue = CalculateTaxValue(Tax/100);
        //$('#TaxValue').val(TaxValue.toFixed(2));
        //var NetTotal = CalculateNetTotal(GrossTotal, TaxValue);
        //$('#NetTotal').val(NetTotal);
    } else {
        $("#Quantity").css('border', '1px solid red');
    }


});


$('#UnitPrice').keyup(function () {
   //////debugger;;
    var UnitPrice = $('#UnitPrice').val();
    if (!isNaN(UnitPrice)/* && UnitPrice != ""*/) {
        if (UnitPrice >= 0) {
            ////////debugger;;
            var qnt = $('#Quantity').val();
            var LicenseTypePercentage = $('#LicenseTypePercentage').val();
           //debugger;
            Calculations();
            //var GrossTotal = $('#GrossTotal').val();
            ////var TaxValue = $('#TaxValue').val();
            //var TaxValue = CalculateTaxValue(Tax/100)
            //$('#TaxValue').val(TaxValue);
            //var NetTotal = CalculateNetTotal(GrossTotal, TaxValue);
            //$('#NetTotal').val(NetTotal.toFixed(2));
        }
    } else {
        alert("Invalid Unit Price Value");
    }
    if (UnitPrice == "") {
        UnitPrice = 0;
        $('#UnitPrice').val(UnitPrice);
        $('#UnitPrice').keyup();
    }

});

//$('#Quantity').keyup(function () {
    
//});


//$('#CountryID').on('change', function () {

//    CountryID = $('#CountryID').val();
//    GetCountryTaxPercentage(CountryID);

//});

//$(document).ready(function () {

//    CountryID = $('#CountryID').val();
//    GetCountryTaxPercentage(CountryID);
    
//});


function GetLicenseTypeInfo(LicenseTypeID) {
   //debugger;
    return $.ajax({
        url: '/LicenseType/GetByID',
        data: {
            ID: LicenseTypeID
        },
        method: 'GET',
        type: 'JSON',
        success: function (result) {
           ////////debugger;;
            var LicenseTypePercentage = result.percentage;
            GlobalLicenseTypeYears = result.years;
            $('#LicenseTypePercentage').val(LicenseTypePercentage /* " %"*/);
           //debugger;
            $('#LicenseTypeYears').val(GlobalLicenseTypeYears);
            $('#LicenseTypeYears').attr('readonly', false);
            var qnt = $('#Quantity').val();
            var unitPrice = $('#UnitPrice').val();
            //var LicenseTypePercentage = result.percentage;
            ////debugger;;
            //alert("Seuccess");
            ////////debugger;;
           //debugger;
            Calculations();
            CalculateTotalCost();

            //GrossTotal = ParseInt(LicenseTypePercentage) * GrossTotal;
            //$('#GrossTotal').val(GrossTotal);
        }
    });
}

$('#LicenseTypeID').on('change', function () {
    //debugger sus;
   //debugger;
    if ($("#LeadProductPriceID").val() == "undefined" || $("#LeadProductPriceID").val() == null || $("#LeadProductPriceID").val() == '') {
        var LicenseTypeID = $('#LicenseTypeID option:Selected').val();
        ////////debugger;;
        if ($('#LicenseTypeID option:Selected').val() == "") {
            $('#LicenseTypePercentage').val(" ");
            $('#LicenseTypeYears').val("0");
        }
        else {
            GetLicenseTypeInfo(LicenseTypeID);
        }
    }
});

$('#LicenseTypeYears').on('keyup', function () {
   //debugger;;
    //var LicenseTypeID = $('#LicenseTypeID option:Selected').val();
    var LicenseTypeYears = parseInt($('#LicenseTypeYears').val());
    GlobalLicenseTypeYears = LicenseTypeYears;

    var qnt = parseFloat($('#Quantity').val());
    var unitPrice = parseFloat($('#UnitPrice').val());
    var LicenseType = $('#LicenseTypePercentage').val();
    LicenseType = LicenseType.split(" ");
    var LicenseTypePercentage = LicenseType[0];

   //debugger;
    Calculations();
    //debugger;
    CalculateTotalCost();
    //var Tax = parseFloat($('#UnitPrice').val());

    //Calculations()
    
});

$('#UnitPrice').on('change', function () {
   //////debugger;;
    //alert("Changed");
    var LicenseType = $('#LicenseTypePercentage').val();
    LicenseType = LicenseType.split(" ");
    var LicenseTypePercentage = LicenseType[0];

    if (!isNaN(LicenseTypePercentage)) {
        if (LicenseTypePercentage > -1 && UnitPrice > -1) {

           //debugger;
            Calculations();

        }
    }

});

$('#LeadProductPriceCost').keyup(function () {
    ////debugger;;
    var LeadProductPriceCost = $('#LeadProductPriceCost').val();
    if (LeadProductPriceCost == 'undefined' || LeadProductPriceCost == "" || LeadProductPriceCost == null) {
        $('#LeadProductPriceCost').val(0);
        $('#LeadProductPriceCost').keyup();
    } else {
        CalculateCountryTaxValue();
    }
});


/**********************************/


function Calculations() {
   //debugger;
    ///******************/

    //var LicenseTypeID = 

    ///******************/
    var qnt = parseInt($('#Quantity').val());
    var unitPrice = parseFloat($('#UnitPrice').val());
    var LicenseTypePercentage = parseFloat($('#LicenseTypePercentage').val());
    var LicenseTypeYears = parseInt($('#LicenseTypeYears').val());
    if (isNaN(qnt)) {
        qnt = 0;
    }
    if (isNaN(unitPrice)) {
        unitPrice = 0.0;
    }
    if (isNaN(LicenseTypePercentage) || LicenseTypePercentage == "") {
        LicenseTypePercentage = 100;
    }
    //debugger;
    if (isNaN(LicenseTypeYears) || LicenseTypeYears == null || LicenseTypeYears == '') {
        LicenseTypeYears = 1;
    }

    var GrossTotal = CalculateGrossTotal(qnt, unitPrice, LicenseTypePercentage, LicenseTypeYears);
    $('#GrossTotal').val(GrossTotal.toFixed(2));
    var Tax = $('#TaxPercentage').val();
    var TaxValue = CalculateTaxValue(Tax / 100);
    $('#TaxValue').val(TaxValue.toFixed(2));
    var NetTotal = CalculateNetTotal(GrossTotal, TaxValue);
    $('#NetTotal').val(NetTotal.toFixed(2));

}


/**********************************/


//function Calculations(qnt, unitPrice, LicenseTypePercentage, GlobalLicenseTypeYears) {
//  ////debugger;;
//    if (jQuery.type(LicenseTypePercentage) == "string") {
//        LicenseTypePercentageAfterSplit = LicenseTypePercentage.split(" ");
//        LicenseTypePercentage = LicenseTypePercentageAfterSplit[0];
//    }
//    if (LicenseTypePercentage == 'undefined' || LicenseTypePercentage == "") {
//        LicenseTypePercentage = 100;
//    }
//    //alert(Tax);
//    //LicenseTypePercentage = LicenseTypePercentage.split(" ");
//    var GrossTotal = CalculateGrossTotal(qnt, unitPrice, LicenseTypePercentage, GlobalLicenseTypeYears);
//    $('#GrossTotal').val(GrossTotal.toFixed(2));
//    var Tax = $('#TaxPercentage').val();
//    var TaxValue = CalculateTaxValue(Tax/100);
//    $('#TaxValue').val(TaxValue.toFixed(2));
//    var NetTotal = CalculateNetTotal(GrossTotal, TaxValue);
//    $('#NetTotal').val(NetTotal.toFixed(2));


//}

function CalculateGrossTotal(qnt, unitPrice, LicenseTypePercentage, LicenseTypeYears) {
   ////debugger;;
    var GrossTotal = qnt * unitPrice * (LicenseTypePercentage / 100) * LicenseTypeYears;
    return GrossTotal;
}

function CalculateTaxValue(Tax) {
   //debugger;
    var DiscountPercentage = $('#DiscountPercentage').val();
    var DiscountValue = 0;
    var GrossTotal = $('#GrossTotal').val();
    if (!isNaN(DiscountPercentage) && DiscountPercentage != "") {
        if (DiscountPercentage > 100) {
            DiscountPercentage = 100;
            $('#DiscountPercentage').val('100');
        } else if (DiscountPercentage < 0) {
            DiscountPercentage = 0;
            $('#DiscountPercentage').val('0');
        }
        ////debugger;;
        DiscountValue = GrossTotal * (DiscountPercentage / 100);
        DiscountValue = parseFloat(DiscountValue)/*.toFixed(2)*/;
    }
    
    GrossTotal = GrossTotal - DiscountValue;

    var TaxValue = (Tax) * GrossTotal;

    return TaxValue;
}

function CalculateNetTotal(GrossTotal, TaxValue, DiscountValue) {
  ////debugger;;
/*  Getting Discount Percentage & Value in LeadProductPrice, then Calculating NetTotal based on it.  */
    //var DiscountPercentage = $('#DiscountPercentage').val();
    //var DiscountValue = $('#DiscountValue').va();

    //if (!isNaN(DiscountPercentage) && DiscountPercentage != "") {
    //    if (DiscountPercentage > 100) {
    //        DiscountPercentage = 100;
    //        $('#DiscountPercentage').val('100');
    //    } else if (DiscountPercentage < 0) {
    //        DiscountPercentage = 0;
    //        $('#DiscountPercentage').val('0');
    //    }
    //    DiscountValue = GrossTotal * (DiscountPercentage / 100);
    //    DiscountValue = parseFloat(DiscountValue)/*.toFixed(2)*/;
    //}
    //$('#DiscountValue').val(DiscountValue.toFixed(3));

    ////////debugger;;
    if (GrossTotal && TaxValue >= 0 && DiscountValue) {
        
        if (jQuery.type(TaxValue) == 'string') {
            TaxValue = parseFloat(TaxValue);
        }
    } else {
        DiscountValue = 0;
    }

    if (jQuery.type(DiscountValue) == 'string') {
        DiscountValue = parseFloat(DiscountValue);
    }
    if (jQuery.type(GrossTotal) == 'string') {
        GrossTotal = parseFloat(GrossTotal);
    }

    var NetTotal = GrossTotal + TaxValue - DiscountValue;

    return NetTotal;
}

function GetCountryTaxPercentage(CountryID) {
    ////////debugger;;
    if (CountryID > 0) {
        $.ajax({

            url: "/Country/GetTaxPercentage",
            data: {
                CountryID: CountryID
            },
            type: "GET",
            success: function (result) {
                $('#TaxPercentage').val(result /*+ " %"*/);
                Tax = result / 100;
            }
        });
    } else {
        $('#TaxPercentage').val(0 /*+ " %"*/);
        Tax = 0;
    }

};


function CalculateDiscountValue() {
    ////debugger;;
    var DiscountPercentage = parseFloat($('#DiscountPercentage').val());
    var GrossTotal = $('#GrossTotal').val();
    //var MaxDiscountAllowed = parseFloat($('#UserRoleMaxDiscount').val());
    //if (DiscountPercentage > MaxDiscountAllowed) {
    //    DiscountPercentage = MaxDiscountAllowed;
    //    //CalculateDiscountPercentage();
    //    alert("You can't make a discount more than " + MaxDiscountAllowed + "%");
    //}
    //var DiscountValue = $('#DiscountValue').va();
    

    if (!isNaN(DiscountPercentage)/* && DiscountPercentage != ""*/) {
        if (DiscountPercentage > 100) {
            DiscountPercentage = 100;
            $('#DiscountPercentage').val('100');
        } else if (DiscountPercentage <= 0) {
            DiscountPercentage = 0;
            $('#DiscountPercentage').val('0');
        }
        ////debugger;;
        DiscountValue = GrossTotal * (DiscountPercentage / 100);
        DiscountValue = parseFloat(DiscountValue)/*.toFixed(2)*/;
    }
    $('#DiscountValue').val(DiscountValue.toFixed(2));
    var Tax = $('#TaxPercentage').val();
    var TaxValue = CalculateTaxValue(Tax/100)
    $('#TaxValue').val(TaxValue);
    ////////debugger;;
    var NetTotal = CalculateNetTotal(GrossTotal, TaxValue, DiscountValue);
    $('#NetTotal').val(NetTotal.toFixed(2));
}

function CalculateDiscountPercentage() {
   ////debugger;;
    //var DiscountPercentage = $('#DiscountPercentage').val();
    var DiscountValue = parseFloat($('#DiscountValue').val());
    var GrossTotal = $('#GrossTotal').val();
    var DiscountPercentage = 0;
    if (!isNaN(DiscountValue) && DiscountValue != "") {

        DiscountPercentage = (DiscountValue/GrossTotal) * 100;
        DiscountPercentage = parseFloat(DiscountPercentage)/*.toFixed(2)*/;
        //var MaxDiscountAllowed = parseFloat($('#UserRoleMaxDiscount').val());
        //if (DiscountPercentage > MaxDiscountAllowed) {
        //    DiscountPercentage = MaxDiscountAllowed;
        //    //CalculateDiscountValue();
        //    alert("You can't make a discount more than " + MaxDiscountAllowed + "%");
        //}

    }
    
    $('#DiscountPercentage').val(DiscountPercentage.toFixed(2));
    var Tax = $('#TaxPercentage').val();
    var TaxValue = CalculateTaxValue(Tax/100)
    $('#TaxValue').val(TaxValue);
    ////debugger;;
    var NetTotal = CalculateNetTotal(GrossTotal, TaxValue, DiscountValue);
    $('#NetTotal').val(NetTotal.toFixed(2));
    //CalculateNetTotal();
}

/********************************************************************************/
function GetCountrySubProductTypeTaxPercentage(SubProductType) {
    ////debugger;;
    var SubProductID = $('#SubProductID option:Selected').val();
    var CountryID = $('#CountryID').val();
    $.ajax({
        url: "/Tax/GetTaxPercentage",
        data: {
            SubProductTypeID: SubProductType,
            CountryID: CountryID
        },
        method: 'Get',
        success: function (result) {
            //debugger;
            $('#LeadProductPriceTaxPercentage').val(result[1]);
            $('#TaxPercentage').val(result[0]);
            CalculateCountryTaxValue();
        }

    });
}

function CalculateCountryTaxValue() {
    ////debugger;;
    var Cost = $('#LeadProductPriceCost').val();
    if (Cost != "" && Cost != "undefined" && !isNaN(Cost)) {
        var CountryTaxPercentage = $('#LeadProductPriceTaxPercentage').val();
        var CountryTaxValue = parseInt(Cost) * (parseInt(CountryTaxPercentage) / 100);
        $('#LeadProductPriceTaxValue').val(CountryTaxValue);

        CalculateTotalCost();

    } else {
        $('#LeadProductPriceTaxValue').val(0);
    }
}

function CalculateTotalCost() {
   //debugger;
    var Cost = $('#LeadProductPriceCost').val();
    if (!isNaN(Cost) || Cost != '' || Cost != "undefined") {
        var TaxValue = $('#LeadProductPriceTaxValue').val();
        if (!isNaN(TaxValue) || TaxValue != " " || TaxValue != "undefined") {
            var qnt = $('#Quantity').val();
            if (qnt != " " && qnt != "undefined" && qnt != null) {

                var years = $('#LicenseTypeYears').val();
                //debugger;
                if (years != " " && years != "undefined" && years != null && !isNaN(years) && years > 0) {
                    var TotalCost = (parseFloat(Cost) + parseFloat(TaxValue)) * parseFloat(qnt) * parseInt(years);
                    if (!isNaN(TotalCost)) {
                        $('#LeadProductPriceTotalCost').val(TotalCost);
                    } else {
                        $('#LeadProductPriceTotalCost').val(0.00);
                    }
                } else if (years == 0) {
                    var TotalCost = (parseFloat(Cost) + parseFloat(TaxValue)) * parseFloat(qnt);
                    if (!isNaN(TotalCost)) {
                        $('#LeadProductPriceTotalCost').val(TotalCost);
                    } else {
                        $('#LeadProductPriceTotalCost').val(0.00);
                    }
                } else {
                    $('#LicenseTypeYears').val(0);
                    CalculateTotalCost();
                }
                
            } else {
                qnt = 0;
                $('#Quantity').val(qnt);
                CalculateTotalCost
            }
            
            //.toFixed(2)
        } else {
            $('#LeadProductPriceTaxValue').val(0);
            CalculateTotalCost();
        }
        
    } else {
        $('#LeadProductPriceCost').val(0);
        CalculateTotalCost();
    }
}

function CalculateLeadCost() {
   //debugger;
    if (window.location.href.indexOf("CustomerInfo/AddEdit") > -1 || window.location.href.indexOf("CustomerInfo/Save") > -1) {
        if (isNaN($('#LeadCost').val()) || $('#LeadCost').val() == '' || $('#LeadCost').val() == "undefined") {
            var LeadCost = $('#LeadCost').val();
            if (isNaN(LeadCost) || LeadCost == '' || LeadCost == "undefined") {
                LeadCost = 0;
                $('#LeadCost').val(0);
                CalculateLeadCost();
            }
        } else {
            var LeadProductCost = $('#LeadProductTotalCost').val();
            var LeadCost = parseFloat($('#LeadCost').val());
            if (LeadProductCost != '' && !isNaN(LeadProductCost) && LeadCost != "undefined") {
                //LeadCost += parseFloat(LeadProductCost);
                LeadCost = parseFloat(LeadProductCost);
                $('#LeadCost').val(LeadCost.toFixed(2));
            } else {
                $('#LeadCost').val(LeadCost);
            }
        }
    }
    
}
