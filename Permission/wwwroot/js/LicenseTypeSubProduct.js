$(document).ready(function () {
    if (window.location.href.indexOf("/LicenseType/AddEdit") > -1) {
        $('#OneMoreSubProductInLicenseType').on('click', function (e) {
            e.preventDefault();
            ////debugger;
            var SubProduct = GetSubProductIdAndName();
            $.when(GetSubProductIdAndName()).done(function (result) {
                ////debugger;
                SubProduct = result["SubProduct"];
                console.log(SubProduct.Name);
                AddSubProductToTable(SubProduct);
            });
            
            ////debugger;
            //alert(SubPrduct);
        });

        $(document).on('click', '.DeleteSubProductFromLicenseType', function (e) {
            e.preventDefault();
            //debugger;
            var ID = $(this).attr('data-value');
            $('#SubProductLicenseType_' + ID).remove();

            $("#SubProductInLicenseType tbody tr").each(function (index) {
                //debugger;
                $(this).attr("id", "SubProductLicenseType_" + index);
                ////debugger;
                var inputs = $(this).find("td").first().find("input");
                var button = $(this).find("td:nth-child(2)").find("a");
                button.attr('data-value', index);
                button.css('background-color', 'yellow !important');

                ////debugger;
                $(inputs[0]).attr("id", "LicenseType_LicenseTypeSubProducts__" + index + "__ID");
                $(inputs[0]).attr("name", "LicenseType.LicenseTypeSubProducts[" + index + "].ID");

                $(inputs[1]).attr("id", "LicenseType_LicenseTypeSubProducts_" + index + "__LicenseTypeID");
                $(inputs[1]).attr("name", "LicenseType.LicenseTypeSubProducts[" + index + "].LicenseTypeID");
                //$(inputs[1]).attr("id", "LicenseType_LicenseTypeSubProducts__" + index + "__Name");
                //$(inputs[1]).attr("name", "LicenseType.LicenseTypeSubProducts[" + index + "].Name");
                $(inputs[2]).attr("id", "LicenseType_LicenseTypeSubProducts_" + index + "__CreationDate");
                $(inputs[2]).attr("name", "LicenseType.LicenseTypeSubProducts[" + index + "].CreationDate");

                $(inputs[3]).attr("id", "LicenseType_LicenseTypeSubProducts_" + index + "__CreationUserID");
                $(inputs[3]).attr("name", "LicenseType.LicenseTypeSubProducts[" + index + "].CreationUserID");                

                $(inputs[4]).attr("id", "LicenseType_LicenseTypeSubProducts_" + index + "__SubProductID");
                $(inputs[4]).attr("name", "LicenseType.LicenseTypeSubProducts[" + index + "].SubProductID");


            });


            //alert('deleted');
        });
    }
});

function GetSubProductIdAndName() {
    var SubProductID = $('#SubProductID option:Selected').val();
    //alert(SubProductID);
    var SubProductName = $('#SubProductID option:Selected').text();
    //alert(SubProductName);
    var SubProduct = {
        "ID": SubProductID,
        "Name": SubProductName
    };
    //alert(SubProduct.Name);
    return { SubProduct };
}

function AddSubProductToTable(SubProduct) {
    var RowNum = $('#SubPrductListInLicenseType tr').length;
   ////debugger;
    //alert (RowNum);
    $.ajax({
        url: '/LicenseType/GetSubProductInfo',
        data: {
            rowCount: RowNum,
            subProductID: SubProduct.ID
        },
        type: 'GET',
        success: function (result) {
           ////debugger;
            $('#SubPrductListInLicenseType').append(result);
            //alert(result);
        },

    });
}

function GetLicenseTypeBySubProductID() {
    var SubProductID = $('#SubProductID option:Selected').val();
    //debugger;
    $.ajax({
        url: '/LicenseTypeSubProduct/GetBySubProductID',
        data: {
            subProductID: SubProductID
        },
        type: 'GET',
        success: function (result) {
            ////debugger;
            $('#LicenseTypeID').find('option').remove();
            $.each(result, function (index, value) {
               ////debugger;
                if (index == 0) {
                    //debugger;
                    firstOption = value.id;
                }
                $('#LicenseTypeID').append($('<option/>',
                    {
                        value: value.licenseType.id,
                        text: value.licenseType.name
                    }
                ));
            });
            //debugger;
            $('#LicenseTypeID').change();
            //.val($("#LicenseTypeID option:Selected"))
            //cosnole.log("success");
        }
    });
}
