$("#CityID").on("change", function (CityID) {

    ////debugger;
    $.ajax({
        url: "/Area/GetAreasByCityID",
        data: { CityID: CityID.target.value },
        type: "GET",
        success: function (result) {

            ////debugger;
            $("#AreaID").empty();

            $.each(result, function (index, value) {


                $("#AreaID").append($('<option/>', {

                    value: value.id,
                    text: value.name
                }));
            });

        }
    });
});
