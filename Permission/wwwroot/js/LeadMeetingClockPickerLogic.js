$(document).ready(function () {
    $('#FromTime').on("change", function () {
        var hour = 0;
        var min = 0;
        //var increase = 180;
        var date = $('#FromTime').val();
        var time = date.split(':');

        //debugger ;
        $.ajax({
            url: '/Miscellaneous/GetMiscellaneous',
            type: 'GET',
            success: function(data) {
                //console.log(data);
                //var increase = 125;
                var increase = data * 1;
                //console.log(time[1]);
                var hours = time[0] * 1;
                var mins = time[1] * 1;
                //console.log(mins);
                if (increase >= 60) {
                    while (increase >= 60) {
                        increase -= 60;
                        hour++;
                        if (increase < 60) {
                            min = increase;
                        }
                    }
                    hours += hour;
                    mins += min;
                } else {
                    mins += increase;
                }
                if (mins >= 60) {
                    mins -= 60;
                    hours++;
                }
                if (hours > 24 || (hours == 24 && mins > 0)) {
                    hour = hours - 24;
                    hours = 0;
                    hours += hour;
                }
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (mins < 10) {
                    mins = '0' + mins;
                }
                $('#ToTime').val(hours + ':' + mins);
                //console.log(hours);
                $('#ToTime').val(hours + ':' + mins);
            }
        });


        //var hours = date.hours();
        
    })
})