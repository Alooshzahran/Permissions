function RFPTemplate(ID,Url) {
    debugger;
       var OpportunityID = $("#OpportunityID").val();

    $.ajax({
        url: Url,

        type: 'get',
        data: {
            ID: ID,
            OpportunityID: OpportunityID
        },

          success: function (result) {
              /*var DefaultCity = result.*/

            //  var Content = $("Content").attr('name');
            console.log(result);
              debugger;

              var content = result.content;// manipulate(result.Content, result.Parameters);
              $(".summernote").summernote("code", "");

              $(".summernote").summernote("code", content);
              debugger;
              manipulate(result.parameters);



        }
    });
    //alert(value);

}


//$("#RFPTemplateID").change(function () {
//    debugger;
//    var ID = $(this).val();
//    var OpportunityID = $("#OpportunityID").val();

//    $.ajax({
//        url: "/OpportunityRFP/GetRFPTemplateByID",

//        type: 'get',
//        data: {
//            ID: ID,
//            OpportunityID: OpportunityID
//        },

//          success: function (result) {
//              /*var DefaultCity = result.*/

//            //  var Content = $("Content").attr('name');
//            console.log(result);
//              debugger;

//              var content = result.content;// manipulate(result.Content, result.Parameters);
//              $(".summernote").summernote("code", "");

//              $(".summernote").summernote("code", content);

//              manipulate(result.parameters);

             

//        }
//    });

//});

function manipulate( parameters) {
    debugger;
    $.each(parameters, function (index) {
        debugger;

        //if (parameters[index].valueType == "single") {
        //    content = content.replace(parameters[index].Name, parameters[i].value[0]);
        //}
        //else {

            var element = $(":contains('" + parameters[index].name + "')").last();
            var elementParent = $(element).parent();
            var elementCopy = $(element).clone();
        $(element).remove();

        $.each(parameters[index].value, function (i) {
                var temp = $(elementCopy).clone();
                $(temp).html($(temp).html().replace(parameters[index].name, parameters[index].value[i]));
                $(elementParent).append(temp);
            });
       // }

    });

   // return content;
}