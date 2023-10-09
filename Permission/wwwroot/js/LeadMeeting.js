//$('#testtesttttttt').attr('style', '');
$(document).ready(function () {
    if (window.location.href.indexOf("/LeadMeeting/AddEdit") > -1 || window.location.href.indexOf("/LeadMeeting/Save") > -1 || window.location.href.indexOf("LeadMeeting/ViewAddMniutesOfMeeting") > -1) {

        var LocationVal = $('#LocationID option:Selected').val();
        var LocationName = $('#LocationID option:Selected').text();
        //if (LocationName.indexOf("Location") > -1) {
        //debugger;
        if (LocationVal > 0 && LocationName.indexOf('Location') > -1) {

            $('#LeadMeetingMapArea').attr('style', '');

            $('.LeadMeetingContainer').attr('style', 'visibility: hidden;');
            $('#LeadMeetingDescription').attr('name', '');
            $('#LeadObviousPlace').attr('name', 'LeadMeeting.LocationDescription');
            $('#LeadObviousPlace').attr('type', 'text');
            $('#LeadObviousPlace').val($('#LeadMeetingDescription').val());

        } else {
            $('#LeadMeetingMapArea').attr('style', 'visibility: hidden; position: absolute;');
            $('#LeadMeetingDescription').attr('name', 'LeadMeeting.LocationDescription');
            $('#LeadMeetingDescription').val('');
            $('#LeadMeetingDescription').text('');
            $('#LeadMeetingDescription').attr('name', 'LeadMeeting.LocationDescription');
            $('.LeadMeetingContainer').attr('style', 'visibility: show;');
            $('#LeadObviousPlace').attr('Name', '');
        }

        $('#LocationID').on('change', function () {

            var LocationVal = $('#LocationID option:Selected').val();
            var LocationName = $('#LocationID option:Selected').text();
            //if (LocationName.indexOf("Location") > -1) {
            if (LocationVal > 0 && LocationName.indexOf('Location') > -1) {

                $('#LeadMeetingMapArea').attr('style', '');
                
                $('.LeadMeetingContainer').attr('style', 'visibility: hidden;');
                $('#LeadMeetingDescription').attr('name', '');
                $('#LeadObviousPlace').attr('name', 'LeadMeeting.LocationDescription');
                $('#LeadObviousPlace').attr('type', 'text');

            } else {
                $('#LeadMeetingMapArea').attr('style', 'visibility: hidden; position: absolute;');
                $('#LeadMeetingDescription').attr('name', 'LeadMeeting.LocationDescription');
                $('#LeadMeetingDescription').val('');
                $('#LeadMeetingDescription').text('');
                $('#LeadMeetingDescription').attr('name', 'LeadMeeting.LocationDescription');
                $('.LeadMeetingContainer').attr('style', 'visibility: show;');
                $('#LeadObviousPlace').attr('Name', '');
                
            }

        });

        $('#LeadObviousPlace').change(function () {
            var test = document.querySelector("#LeadObviousPlace").value;
            
            //debugger;
            document.querySelector("#LeadMeetingDescription").value = /*document.querySelector("#LeadObviousPlace").value*/ test;
        });



    }

});