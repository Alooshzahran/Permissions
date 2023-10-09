$(document).on("change", "#SectorID",function (SectorID) {

    ////debugger;
    $.ajax({
        url: "/Industry/GetIndustriesBySectorID",
        data: { SectorID: SectorID.target.value },
        type: "GET",
        success: function (result) {

            ////debugger;
            $("#IndustryID").empty();

            $.each(result, function (index, value) {


                $("#IndustryID").append($('<option/>', {

                    value: value.id,
                    text: value.name
                }));
            });

        }
    });
});

$(document).ready(function () {
    ////debugger;
    var SectorID = $("#SectorID").val();
    $.ajax({
        url: "/Industry/GetIndustriesBySectorID",
        data: { SectorID: SectorID },
        type: "GET",
        success: function (result) {

            ////debugger;
            $("#IndustryID").empty();

            $.each(result, function (index, value) {


                $("#IndustryID").append($('<option/>', {

                    value: value.id,
                    text: value.name
                }));
            });

        }
    });
});
