

$(document).on('click', '.EditContactInfo', function (sender) {
  // ////debugger;
    var ID = $(this).attr("data-value");
    var PrefixID = $("#customerInfo_ContactInfos_" + ID + "__PrefixID").val();
    var FirstName = $("#customerInfo_ContactInfos_" + ID + "__FirstName").val();
    var LastName = $("#customerInfo_ContactInfos_" + ID + "__LastName").val();
    var CountryKey = $("#customerInfo_ContactInfos_" + ID + "__CountryKey").val();
    var Mobile = $("#customerInfo_ContactInfos_" + ID + "__Mobile").val();
    var Phone = $("#customerInfo_ContactInfos_" + ID + "__Phone").val();
    var ExtensionNo = $("#customerInfo_ContactInfos_" + ID + "__ExtensionNo").val();
    var DirectPhone = $("#customerInfo_ContactInfos_" + ID + "__DirectPhone").val();
    var DepartmentID = $("#customerInfo_ContactInfos_" + ID + "__DepartmentID").val();
    var Section = $("#customerInfo_ContactInfos_" + ID + "__Section").val();
    var Position = $("#customerInfo_ContactInfos_" + ID + "__Position").val();
    var SeniorityID = $("#customerInfo_ContactInfos_" + ID + "__SeniorityID").val();
    var Title = $("#customerInfo_ContactInfos_" + ID + "__Title").val();
    var RoleID = $("#customerInfo_ContactInfos_" + ID + "__RoleID").val();


    $('#ContactInfoID').val(ID);
    $('#PrefixID').val(PrefixID).change();
    $('#FirstName').val(FirstName);
    $('#LastName').val(LastName);
    $('#CountryKey').val(CountryKey).change();
    $('#Mobile').val(Mobile);
    $('#Phone').val(Phone);
    $('#ExtensionNo').val(ExtensionNo);
    $('#DirectPhone').val(DirectPhone);
    $('#DepartmentID').val(DepartmentID).change();
    $('#Section').val(Section);
    $('#Position').val(Position);
    $('#SeniorityID').val(SeniorityID).change();
    $('#Title').val(Title);
    $('#RoleID').val(RoleID).change();





});



$(document).on('click', '.DeleteContactInfo', function (sender) {
  //////debugger;
    var ID = $(this).attr("data-value");
    $("#ContactInfo_" + ID).remove();

    $("#AddContactInfoTable tbody tr").each(function (index) {
        $(this).attr("id", "ContactInfo_" + index);
        var inputs = $(this).find("td").first().find("input");

        ////debugger;
        $(inputs[0]).attr("id", "customerInfo_ContactInfo_" + index + "__ID");
        $(inputs[0]).attr("name", "customerInfo.ContactInfo[" + index + "].ID");

        $(inputs[1]).attr("id", "customerInfo_ContactInfo_" + index + "__PrefixID");
        $(inputs[1]).attr("name", "customerInfo.ContactInfo[" + index + "].PrefixID");

        $(inputs[2]).attr("id", "customerInfo_ContactInfo_" + index + "__FirstName");
        $(inputs[2]).attr("name", "customerInfo.ContactInfo[" + index + "].FirstName");

        $(inputs[3]).attr("id", "customerInfo_ContactInfo_" + index + "__LastName");
        $(inputs[3]).attr("name", "customerInfo.ContactInfo[" + index + "].LastName");

        $(inputs[4]).attr("id", "customerInfo_ContactInfo_" + index + "__CountryKey");
        $(inputs[4]).attr("name", "customerInfo.ContactInfo[" + index + "].CountryKey");

        $(inputs[5]).attr("id", "customerInfo_ContactInfo_" + index + "__Mobile");
        $(inputs[5]).attr("name", "customerInfo.ContactInfo[" + index + "].Mobile");

        $(inputs[6]).attr("id", "customerInfo_ContactInfo_" + index + "__Phone");
        $(inputs[6]).attr("name", "customerInfo.ContactInfo[" + index + "].Phone");

        $(inputs[7]).attr("id", "customerInfo_ContactInfo_" + index + "__ExtensionNo");
        $(inputs[7]).attr("name", "customerInfo.ContactInfo[" + index + "].ExtensionNo");

        $(inputs[8]).attr("id", "customerInfo_ContactInfo_" + index + "__DirectPhone");
        $(inputs[8]).attr("name", "customerInfo.ContactInfo[" + index + "].DirectPhone");

        $(inputs[9]).attr("id", "customerInfo_ContactInfo_" + index + "__DepartmentID");
        $(inputs[9]).attr("name", "customerInfo.ContactInfo[" + index + "].DepartmentID");

        $(inputs[10]).attr("id", "customerInfo_ContactInfo_" + index + "__Section");
        $(inputs[10]).attr("name", "customerInfo.ContactInfo[" + index + "].Section");

        $(inputs[11]).attr("id", "customerInfo_ContactInfo_" + index + "__Position");
        $(inputs[11]).attr("name", "customerInfo.ContactInfo[" + index + "].Position");

        $(inputs[12]).attr("id", "customerInfo_ContactInfo_" + index + "__SeniorityID");
        $(inputs[12]).attr("name", "customerInfo.ContactInfo[" + index + "].SeniorityID");

        $(inputs[13]).attr("id", "customerInfo_ContactInfo_" + index + "__Title");
        $(inputs[13]).attr("name", "customerInfo.ContactInfo[" + index + "].Title");

        $(inputs[14]).attr("id", "customerInfo_ContactInfo_" + index + "__RoleID");
        $(inputs[14]).attr("name", "customerInfo.ContactInfo[" + index + "].RoleID");




    });


});

///////////////////////////////////////// YourWork
$(document).ready(function () {

    //$(".EditContactInfo").forEach(box => {
    //    box.addEventListener('click', function handleClick(event) {
    //        console.log('box clicked', event);

    //        box.setAttribute('style', 'background-color: yellow;');
    //    });
    //});

    //$(document).on('click', '.EditContactInfo', function (sender) {
    //   ////debugger;
    //    var ID = $(this).attr("data-value");
    //    var PrefixID = $("#customerInfo_ContactInfos_" + ID + "__PrefixID").val();
    //    var FirstName = $("#customerInfo_ContactInfos_" + ID + "__FirstName").val();
    //    var LastName = $("#customerInfo_ContactInfos_" + ID + "__LastName").val();
    //    var CountryKey = $("#customerInfo_ContactInfos_" + ID + "__CountryKey").val();
    //    var Mobile = $("#customerInfo_ContactInfos_" + ID + "__Mobile").val();
    //    var Phone = $("#customerInfo_ContactInfos_" + ID + "__Phone").val();
    //    var ExtensionNo = $("#customerInfo_ContactInfos_" + ID + "__ExtensionNo").val();
    //    var DirectPhone = $("#customerInfo_ContactInfos_" + ID + "__DirectPhone").val();
    //    var DepartmentID = $("#customerInfo_ContactInfos_" + ID + "__DepartmentID").val();
    //    var Section = $("#customerInfo_ContactInfos_" + ID + "__Section").val();
    //    var Position = $("#customerInfo_ContactInfos_" + ID + "__Position").val();
    //    var SeniorityID = $("#customerInfo_ContactInfos_" + ID + "__SeniorityID").val();
    //    var Title = $("#customerInfo_ContactInfos_" + ID + "__Title").val();
    //    var RoleID = $("#customerInfo_ContactInfos_" + ID + "__RoleID").val();


    //    $('#ContactInfoID').val(ID);
    //    $('#PrefixID').val(PrefixID).change();
    //    $('#FirstName').val(FirstName);
    //    $('#LastName').val(LastName);
    //    $('#CountryKey').val(CountryKey).change();
    //    $('#Mobile').val(Mobile);
    //    $('#Phone').val(Phone);
    //    $('#ExtensionNo').val(ExtensionNo);
    //    $('#DirectPhone').val(DirectPhone);
    //    $('#DepartmentID').val(DepartmentID).change();
    //    $('#Section').val(Section);
    //    $('#Position').val(Position);
    //    $('#SeniorityID').val(SeniorityID).change();
    //    $('#Title').val(Title);
    //    $('#RoleID').val(RoleID).change();





    //});

    $('#OneMoreContactInfo').on("click", function (e) {
         e.preventDefault();


        /*********************************************
                EMPTY THE ERROR MESSAGES
        *********************************************/
        $('#Prefix').text('');
        $('#FirstName').text('');
        $('#LastName').text('');
        $('#Email').text('');
        //$('#CountryKey').text('');
        
        $('#Mobile').text('');
        $('#Phone').text('');
        $('#ExtensionNo').text('');
        $('#DirectPhone').text('');
        $('#Department').text('');
        $('#Position').text('');
        $('#Seniority').text('');
        $('#Role').text('');

        /*********************************************
            End Of => EMPTY THE ERROR MESSAGES
        *********************************************/
        
        var rowCount = $('#AddContactInfoTable tbody tr').length;
       
        var ContactInfo = {};

        var ID = $('#ContactInfoID').val();
        if (ID != "") {
            rowCount = ID;
        }

        var PrefixID = $('#PrefixID').val();
        var PrefixName = $('#PrefixID option:Selected').text();
        var FirstName = $('#FirstName').val();
        var LastName = $('#LastName').val();
        ////debugger;
        var Email = $('#Email').val();
        var CountryKey = $('#CountryKey').val();
        var CountryKeyName = $('#CountryKey option:Selected').text();
        var Mobile = $('#Mobile').val();

        ////debugger;
        var Phone = $('#Phone').val();

        ////debugger;
        var Phone = $('#ContactInfoPhone').val();
        var ExtensionNo = $('#ExtensionNo').val();
        var DirectPhone = $('#DirectPhone').val();
        var DepartmentID = $('#DepartmentID').val();
        var DepartmentName = $('#DepartmentID option:Selected').text();
        var Section = $('#Section').val();
        var Position = $('#Position').val();
        var SeniorityID = $('#SeniorityID').val();
        var SeniorityName = $('#SeniorityID option:Selected').text();
        var Title = $('#Title').val();
        var RoleID = $('#RoleID').val();
        var RoleName = $('#RoleID option:Selected').text();
        


        //var EstimatedDate = $('#Leades_0__LeadProduct_0__EstimatedDate').val();
        //var ProductID = $('#ProductID').val();
        //var ProductName = $('#ProductID option:Selected').text();
        //var SubProductID = $('#SubProductID').val();
        //var CurrencyID = $('#Leades_0__LeadProduct_0__CurrencyID').val();
        //var Currency = $('#Leades_0__LeadProduct_0__CurrencyID option:Selected').text();
        //var ExpectedValue = $('#Leades_0__LeadProduct_0__ExpectedValue').val();
        //var NextStepID = $('#Leades_0__LeadProduct_0__NextStepID').val();
        //var NextStep = $('#Leades_0__LeadProduct_0__NextStepID option:selected').text();
        //var Note = $('#Leades_0__LeadProduct_0__Note').val();

        ContactInfo = {
            "ID": ID,
            "PrefixID": parseInt(PrefixID),
            "Prefix.Name": PrefixName,
            "FirstName": FirstName,
            "LastName": LastName,
            "Email": Email,
            "CountryKey": CountryKey,
            "CountryKey.Name": CountryKeyName,
            "Mobile": Mobile,
            "Phone": Phone,
            "ExtensionNo": ExtensionNo,
            "DirectPhone": DirectPhone,
            "DepartmentID": parseInt(DepartmentID),
            "Department.Name": DepartmentName,
            "Section": Section,
            "Position": Position,
            "SeniorityID": parseInt(SeniorityID),
            "Seniority.Name": SeniorityName,
            "Title": Title,
            "RoleID": parseInt(RoleID),
            "Role.Name": RoleName


           
        }
        ////debugger;
        //var valid = LeadProductValidation(LeadProduct);
       // let { ErrorMessages, valid } = LeadProductValidation(LeadProduct);
       // if (valid) {
        $('#AddContactInfoTable').css("visibility", "visible");

        $.post('/CustomerInfo/ContactInfo', { ContactInfo, rowCount }, function (result) {
               
           var ErrorMessages = result.errors;
            if (result.isSuccess == null) {
                $("#ContactInfoID").val('');
                $('#PrefixID').prop('selectedIndex', 0);
                $('#FirstName').val('');
                $('#LastName').val('');
                $('#Email').val('');
                //$('#CountryKey').prop('selectedIndex', 0);
                $('#Mobile').val('');
                $('#Phone').val('');
                $('#ExtensionNo').val('');
                $('#DirectPhone').val('');
                $('#DepartmentID').prop('selectedIndex', 0);
                $('#Section').val('');
                $('#Position').val('');
                $('#SeniorityID').prop('selectedIndex', 0);
                $('#Title').val('');
                $('#RoleID').prop('selectedIndex', 0);
           


                if (ContactInfo.ID == "") {

                    $("#ContactInfos").append(result);
                } else {
                    var SelectedRow = $("#ContactInfo_" + ContactInfo.ID);
                    $(SelectedRow).replaceWith(result);
                    
                }

                    $('#RowId').attr('id', 'ROW');
                }
                else {
                    //result.errors
                    
                    ////debugger;
                PrintErrorsInContactInfo(ErrorMessages);
                }
            


            });
       // } else {
       //     ////debugger;
       //     
      //  }
        
    });
});

function PrintErrorsInContactInfo(ErrorMessages) {
    console.log(ErrorMessages);
    ////debugger;
    $.each(ErrorMessages, function (key, value) {
        ////debugger;
        var index = ErrorMessages[key]["name"];
        var error = ErrorMessages[key]["error"];
        switch (index) {
            case "PrefixID":
                $('#ErrPrefixID').text(error);
                break;
            case "FirstName":
                $('#ErrFirstName').text(error);
                break;
            case "LastName":
                $('#ErrLastName').text(error);
                break;
            case "Email":
                $('#ErrEmail').text(error);
                break;
            case "CountryKey":
                $('#ErrCountryKey').text(error);
                break;
            case "Mobile":
                $('#ErrMobile').text(error);
                break;
            case "Phone":
                $('#ErrPhone').text(error);
                break;
            case "ExtensionNo":
                $('#ErrExtensionNo').text(error);
                break;
            case "DirectPhone":
                $('#ErrDirectPhone').text(error);
                break;
            case "DepartmentID":
                $('#ErrDepartmentID').text(error);
                break;
            case "Position":
                $('#ErrPosition').text(error);
                break;
            case "SeniorityID":
                $('#ErrSeniorityID').text(error);
                break;
            case "RoleID":
                $('#ErrRoleID').text(error);
                break;
        }

    
    });


    return ErrorMessages;
}





