$(document).on("change", "#CountryID",function (CountryID) {

    
    $.ajax({
        url: "/City/GetCitiesByCountryID",
        data: { CountryID: CountryID.target.value },
        type: "GET",
        success: function (result) {

            ////debugger;
            $("#CityID").empty();

            $.each(result, function (index, value) {


                $('#CityID').append($('<option/>', {

                    value: value.id,
                    text: value.name
                }));
            });

        }
    });
});

$(document).ready(function () {
    
    if ($("#CountryID").val() != null) {
        ////debugger;
        //console.log($("#CountryID").val());
        var CountryID = $("#CountryID").val();
        console.log(CountryID);
        $.ajax({
            url: "/City/GetCitiesByCountryID",
            data: { CountryID: CountryID },
            type: "GET",
            success: function (result) {
                /*var DefaultCity = result.*/
                console.log(result);
                ////debugger;
                $("#CityID").empty();

                $.each(result, function (index, value) {


                    $('#CityID').append($('<option/>', {

                        value: value.id,
                        text: value.name
                    }));
                });

            }
        });
    }
});


//$("#CountryID").on("change",this, function (CountryID) {

//   ////debugger;
//    $.ajax({
//        //url: "../City/GetCitiesByCountryID",
//        url: "~/City/GetCitiesByCountryID",
//        data: { CountryID: CountryID.target.value },
//        type: "GET",
//        success: function (result) {

//           ////debugger;
//            $("#CityID").empty();

//            $.each(result, function (index, value) {
                
                
//                $('#CityID').append($('<option/>', {
                    
//                    value: value.id,
//                    text: value.name
//                }));
//            }); 

//        }
//    });
//});
