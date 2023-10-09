//$(document).ready(function () {

//    $.ajax({
//        url: "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&access_type=offline&include_granted_scopes=true&response_type=code&login_hint=w.aaisheh@adaaapps.com",
//        method:"POST",
//        success: function (result) {
//            console.log(result);
//        }
//    });
//});

$(document).ready(function () {
    //debugger;
    $.ajax({
        url: '/LeadMeeting/AttendeeCalendar',
        method: 'GET',
        data: {
            email: 'w.aaisheh@adaaapps.com'
        },
        success: function (result) {
            //debugger;
            console.log(result);
        }
    });
});