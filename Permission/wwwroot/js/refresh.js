function refresh(sender, parameter) {
    //UrlRefresh
    debugger;
    var ElementType = $(sender).parent().siblings().prop('nodeName');
    var UrlRefresh = $(sender).attr("data-refresh");
    var ServiceID = $(sender).parent().siblings().attr('id');
    console.log(typeof ($(sender).attr("data-dictionary")));
    var parameters = $(sender).attr("data-dictionary");
    var data = {};
    

    if (parameters != null) { 
        var dictionary = JSON.parse(parameters);
        for (key in dictionary) {
            console.log(key, dictionary[key]);
            ////debugger;
            //data.push(key, $(dictionary[key]).val())
            data[key] = $(dictionary[key]).val();
        }

    //    $.each(parameters, function (index) {
    //       ////debugger;
    //        data.push(parameters[index], $(parameters[index]).val())
    //});
    }

    ////debugger;
    //var ID = GetParamForService(ServiceID);

    //alert(UrlRefresh);
    var Select = $(sender).parent().prev();
    //debugger;
    if (ElementType == "SELECT") {
        //debugger;
        //.siblings('p').first()
        Select = $(sender).parent().siblings('SELECT').first();
    }
    ////debugger;
  
    $.ajax({
        url: UrlRefresh,
        type: "GET",
        //data: { ClientServiceID: ID },
        data: data,
        success: function (result) {
            debugger;
            console.log(result);
            var options = $(Select)
                .find('option');
                //.remove();

            $.each(options, function (index) {
                //debugger;
                if ($(options[index]).attr("value") != null) {
                    $(options[index]).remove();
                    //alert("zzzzzz");
                }
            });
            debugger;
            if (UrlRefresh.includes("CompanyInformation")) {
                $.each(result, function (index) {
                    debugger;
                    $(Select).append($('<option>', {
                        value: result[index].id,
                        text: result[index].arabicName
                    }));

                    //$("select#ListOfAttendees.chosen-select").append($('<option>', {
                    //    value: result[index].id,
                    //    text: result[index].name
                    //}));

                    //alert("zzzzzz333");


                });
            } else {
                $.each(result, function (index) {
                    debugger;
                    $(Select).append($('<option>', {
                        value: result[index].id,
                        text: result[index].name
                    }));

                    //$("select#ListOfAttendees.chosen-select").append($('<option>', {
                    //    value: result[index].id,
                    //    text: result[index].name
                    //}));

                    //alert("zzzzzz333");


                });
            }
            
            //debugger;
            $("select#ListOfAttendees.chosen-select").chosen();
            $(".chosen-select").val('').trigger("chosen:updated");
           
        },
        error: function (result) {
           // alert("assad");
            
            
        }
    });
}


//function GetParamForService(ServiceID) {
//   ////debugger;
//    var Parameter = 0;
//    switch (ServiceID) {
//        case "CityID":
//            var value = $("#CountryID option:selected").attr('value');
//            Parameter = parseInt(value);
//            break;
//        case "SpecialtyID":
//            var value = $("#IndustryID option:selected").attr('value');
//            Parameter = parseInt(value);
//            break;
//        case "LeadSourceValueTypeID":
//            var value = $('#LeadSourceTypeID option:selected').attr('value');
//            Parameter = parseInt(value);
//            break;
//    }
//    return Parameter;
//}