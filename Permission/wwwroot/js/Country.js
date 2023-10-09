//$(document).ready(function (){
//   ////debugger;

//    $.ajax({
//        url: "/Country/Getallls",
//        type: "Get",
//        success: function (result)
//        {
//           ////debugger;

//            $("#here").html(result);

           
//            //$.each(result, function (index) {
//            //    alert(result[index].name);
//            //});

//            //alert(result);
//            ////debugger;
//            //for (var i = 0; i < result.length; i++) {
//            //    tr = $('<tr/>');
//            //    tr.append("<td>" + result[i] + "</td>");
//            //    tr.append("<td>" + result[i] + "</td>");
//            //    $('table').append(tr);

//            //};
            
//        },
     
//    });
//});


function GetPartial() {
    ////debugger;

    $.ajax({
        url: "/Country/Getallls",
        type: "Get",
        success: function (result) {
           ////debugger;

            $("#here").html(result);


            //$.each(result, function (index) {
            //    alert(result[index].name);
            //});

            //alert(result);
            ////debugger;
            //for (var i = 0; i < result.length; i++) {
            //    tr = $('<tr/>');
            //    tr.append("<td>" + result[i] + "</td>");
            //    tr.append("<td>" + result[i] + "</td>");
            //    $('table').append(tr);

            //};

        },

    });
}

//$.get
//$.post