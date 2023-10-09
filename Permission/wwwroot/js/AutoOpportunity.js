$(document).ready(function () {
    //debugger;
    $('#NextStepID').on('change', function () {

        var NextStepID = $('#NextStepID option:Selected').val();
        $.ajax({
            url: '/NextStep/GetNextStepInformation',
            data: {
                ID: NextStepID
            },
            method: 'Get',
            type: 'Json',
            success: function (result) {
                //debugger;
                if (result.autoOpportunity == true) {
                    $("#NextStepOpportunityAlert").modal("show");
                }
            }
        });

    });


});