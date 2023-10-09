/*
 API = AIzaSyDV3t9ytUJ_zQDV63CK8-Gj4DSyDujV1-4
 GeoAPI = AIzaSyDFmCi-A0d5nRdOqOy6WAnAs7w2n2ii_8M
 #GetCurrentLocation
 */


var markers = [];
var LeadMarkers = [];

function initMap() {
    ////debugger;
    if (window.location.href.indexOf("/Lead/AddEdit") > -1 || window.location.href.indexOf("/Lead/Save") > -1) {

        var latlng = new google.maps.LatLng(-31, 20);
        var mapOptions = {
            zoom: 15,
            center: latlng
        }

        var LeadObviousPlace = $('#LeadObviousPlace').val();
        AutoComplete(null, LeadObviousPlace);

        LeadAddress = $("#LeadObviousPlace").val();
        if (LeadAddress != "") {
            //marker.push(address);
            //AutoComplete();
            codeAddress(null, LeadAddress);
        } else {
            LeadAddress = "Riyadh";
            //marker.push(address);
        }

        LeadMap = new google.maps.Map(document.getElementById("LeadMyMap"), mapOptions);
        var LeadMarker = new google.maps.Marker({
            draggable: false,
            position: latlng,
            map: LeadMap,
            title: "Your Location"
        });
        LeadMarkers.push(LeadMarker);

        document.querySelector("#LeadObviousPlace").addEventListener("keypress", function () {
            ////debugger;
            LeadAddress = document.getElementById("LeadObviousPlace").value;
            LeadObviousPlace = LeadAddress;
            AutoComplete(null, LeadObviousPlace);
            if (event.keyCode == 13) { // *NOTE: "Enter" KeyCode is 13;
                ////debugger;
                var LeadAddress = document.getElementById("LeadObviousPlace").value;
                if (LeadAddress != "") {
                    AutoComplete(null, LeadObviousPlace);
                    codeAddress(null, LeadAddress);
                }
            }
        });

        document.querySelector("#LeadObviousPlace").addEventListener("focusout", function () {
            ////debugger;
            LeadAddress = document.getElementById("LeadObviousPlace").value;
            if (LeadAddress != "") {
                LeadObviousPlace = LeadAddress;
                AutoComplete(null, LeadAddress);
                codeAddress(null, LeadAddress);
            }
        });

        LeadMap.addListener("click", function (e) {
            ////debugger;
            placemarker(e.latLng, null, LeadMap);
        });
        codeAddress(null, LeadAddress);


    }
    /*******************************    Lead Meeting Map     ************************************/
    if (window.location.href.indexOf("/LeadMeeting/AddEdit") > -1 || window.location.href.indexOf("/LeadMeeting/Save") > -1 || window.location.href.indexOf("LeadMeeting/ViewAddMniutesOfMeeting") > -1) {

        var latlng = new google.maps.LatLng(-31, 20);
        var mapOptions = {
            zoom: 15,
            center: latlng
        }

        var LeadObviousPlace = $('#LeadObviousPlace').val();
        AutoComplete(null, LeadObviousPlace);

        LeadAddress = $("#LeadObviousPlace").val();
        if (LeadAddress != "") {
            //marker.push(address);
            //AutoComplete();
            codeAddress(null, LeadAddress);
        } else {
            LeadAddress = "Riyadh";
            //marker.push(address);
        }

        LeadMap = new google.maps.Map(document.getElementById("LeadMyMap"), mapOptions);
        var LeadMarker = new google.maps.Marker({
            draggable: false,
            position: latlng,
            map: LeadMap,
            title: "Your Location"
        });
        LeadMarkers.push(LeadMarker);

        document.querySelector("#LeadObviousPlace").addEventListener("keypress", function () {
            ////debugger;
            LeadAddress = document.getElementById("LeadObviousPlace").value;
            LeadObviousPlace = LeadAddress;
            AutoComplete(null, LeadObviousPlace);
            if (event.keyCode == 13) { // *NOTE: "Enter" KeyCode is 13;
                //debugger;
                var LeadAddress = document.getElementById("LeadObviousPlace").value;
                if (LeadAddress != "") {
                    AutoComplete(null, LeadObviousPlace);
                    codeAddress(null, LeadAddress);
                    document.querySelector("#LeadMeetingDescription").value = document.querySelector("#LeadObviousPlace").value;
/*                    $('#LeadMeetingDescription').text($('#LeadObviousPlace').text());*/
                }
            }
        });

        document.querySelector("#LeadObviousPlace").addEventListener("focusout", function () {
            //debugger;
            LeadAddress = document.getElementById("LeadObviousPlace").value;
            if (LeadAddress != "") {
                LeadObviousPlace = LeadAddress;
                AutoComplete(null, LeadAddress);
                codeAddress(null, LeadAddress);
                document.querySelector("#LeadMeetingDescription").value = document.querySelector("#LeadObviousPlace").value;
                //$('#LeadMeetingDescription').text($('#LeadObviousPlace').text());
            }
        });

        LeadMap.addListener("click", function (e) {
            //debugger;
            //placemarker(e.latLng, null, LeadMap);
            $.when(placemarker(e.latLng, null, LeadMap)).done(LeadObviousPlaceToLeadMeetingLocation()); /*function () {*/
            //    var test = $('#LeadObviousPlace').val();
            //        document.querySelector("#LeadObviousPlace").value;
            //    debugger;
            //    document.querySelector("#LeadMeetingDescription").value = /*document.querySelector("#LeadObviousPlace").value*/ test;
            //});
            //var test = document.querySelector("#LeadObviousPlace").value;
            //debugger;
            //document.querySelector("#LeadMeetingDescription").value = /*document.querySelector("#LeadObviousPlace").value*/ test;
        });
        codeAddress(null, LeadAddress);


    }

    function LeadObviousPlaceToLeadMeetingLocation() {
        var test = $('#LeadObviousPlace').val();
            //document.querySelector("#LeadObviousPlace").value;
        //debugger;
        $('#LeadMeetingDescription').val(test);
        //document.querySelector("#LeadMeetingDescription").value = text/*document.querySelector("#LeadObviousPlace").value
    }


    /****************************   CustomerInfo Screen   **********************************/
    var address = "Riyadh";
    if (window.location.href.indexOf("/CustomerInfo/AddEdit") > -1 || window.location.href.indexOf("/CustomerInfo/Save") > -1) {
        var ObviousPlace = $('#ObviousPlace').val();
        AutoComplete(ObviousPlace, null);
        ////debugger;

        address = $("#ObviousPlace").val();
        if (address != "") {
            //marker.push(address);
            //AutoComplete();
            codeAddress(address, null);
        } else {
            address = "Riyadh";
            
            //markers.push(address);
        }
        //$(document).ready(function () {

        //});
        document.querySelector("#ObviousPlace").addEventListener("keypress", function () {
            ////debugger;
            address = document.getElementById("ObviousPlace").value;
            ObviousPlace = address;
            AutoComplete(ObviousPlace, null);
            if (event.keyCode == 13) { // *NOTE: "Enter" KeyCode is 13;
                address = document.getElementById("ObviousPlace").value;
                if (address != "") {
                    ObviousPlace = address;
                    AutoComplete(ObviousPlace, null);
                    codeAddress(address, null);
                }
            }
        });

        document.querySelector("#ObviousPlace").addEventListener("focusout", function () {
            ////debugger;
            address = document.getElementById("ObviousPlace").value;
            if (address != "") {
                ObviousPlace = address;
                AutoComplete(ObviousPlace, null);
                codeAddress(address, null);
            }
        });

        ///****************************     Regular Map     *******************************///
        //var MyLatLng = new google.maps.LatLng(31.9826576, 35.8388919);
        //var MarkerOptions = {
        //    zoom: 10,
        //    center: MyLatLng,
        //    mapTypeId: google.maps.MapTypeId.ROADMAP
        //}
        //map = new google.maps.Map(document.getElementById("MyMap"), MarkerOptions);

        //map.addListener("click", function (e) {
        //    placemarker(e.latLng, map);
        //});

        ///****************************     GeoCoding Map     *******************************///
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-31, 20);
        var mapOptions = {
            zoom: 15
           // center: latlng
        }
        map = new google.maps.Map(document.getElementById("MyMap"), mapOptions);
        var marker = new google.maps.Marker({
            draggable: false,
            position: latlng,
            map: map,
            title: "Your location"
        });
        markers.push(marker);

        map.addListener("click", function (e) {
            placemarker(e.latLng, map, null);
        });
        codeAddress(address, null);


        /*********************************************************************************** */
        /********************************************************************************** */
        /********************************  LeadMap  ************************************** */
        /******************************************************************************** */
        /******************************************************************************* */

        var LeadObviousPlace = $('#LeadObviousPlace').val();
        AutoComplete(null, LeadObviousPlace);

        LeadAddress = $("#LeadObviousPlace").val();
        if (LeadAddress != "") {
            //marker.push(address);
            //AutoComplete();
            codeAddress(null, LeadAddress);
        } else {
            LeadAddress = "Riyadh";
            //marker.push(address);
        }

        LeadMap = new google.maps.Map(document.getElementById("LeadMyMap"), mapOptions);
        var LeadMarker = new google.maps.Marker({
            draggable: false,
            position: latlng,
            map: LeadMap,
            title: "Your Location"
        });
        LeadMarkers.push(LeadMarker);

        document.querySelector("#LeadObviousPlace").addEventListener("keypress", function () {
            ////debugger;
            LeadAddress = document.getElementById("LeadObviousPlace").value;
            LeadObviousPlace = LeadAddress;
            AutoComplete(null, LeadObviousPlace);
            if (event.keyCode == 13) { // *NOTE: "Enter" KeyCode is 13;
                ////debugger;
                var LeadAddress = document.getElementById("LeadObviousPlace").value;
                if (LeadAddress != "") {
                    AutoComplete(null, LeadObviousPlace);
                    codeAddress(null, LeadAddress);
                }
            }
        });

        document.querySelector("#LeadObviousPlace").addEventListener("focusout", function () {
           ////debugger;
            LeadAddress = document.getElementById("LeadObviousPlace").value;
            if (LeadAddress != "") {
                LeadObviousPlace = LeadAddress;
                AutoComplete(null, LeadAddress);
                codeAddress(null, LeadAddress);
            }
        });

        LeadMap.addListener("click", function (e) {
           ////debugger;
            placemarker(e.latLng, null, LeadMap);
        });
        codeAddress(null, LeadAddress);



    }
}


function codeAddress(address, LeadAddress) {
   ////debugger;
    if (address) {
        DeleteMarkers();
        ////debugger;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                ////debugger;
                $('#ObviousPlace').attr('style', '');

                map.setCenter(results[0].geometry.location);//center the map over the result
                //place a marker at the location
                var marker = new google.maps.Marker(
                    {
                        zoom: 15,
                        map: map,
                        position: results[0].geometry.location
                    });
                console.log(results);
                markers.push(marker);
                //alert(results[0].formatted_address);
            } else {
                $('#ObviousPlace').attr('style', 'border-color:red;');
                //alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    } else if (LeadAddress) {
        DeleteLeadMarkers();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: LeadAddress }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                ////debugger;
                $('#LeadObviousPlace').attr('style', '');
                LeadMap.setCenter(results[0].geometry.location);//center the map over the result
                //place a marker at the location
                var LeadMarker = new google.maps.Marker(
                    {
                        zoom: 15,
                        map: LeadMap,
                        position: results[0].geometry.location
                    });
                console.log(results);
                LeadMarkers.push(LeadMarker);
                //alert(results[0].formatted_address);
            } else {
                $('#LeadObviousPlace').attr('style', 'border-color:red;');
                //alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
    
}


function placemarker(latLng, map, LeadMap) {
    ////debugger;
    //setMapOnAll(null);
    //location: LatLng,
    if (LeadMap) {
        DeleteLeadMarkers();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: latLng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $('#LeadObviousPlace').attr('style', '');
               ////debugger;
                LeadMap.setCenter(results[0].geometry.location);//center the map over the result
                //place a marker at the location
                var Leadmarker = new google.maps.Marker(
                    {
                        zoom: 15,
                        map: LeadMap,
                        position: results[0].geometry.location
                    });
                console.log(results[0].formatted_address);
                document.querySelector("#LeadObviousPlace").value = results[0].formatted_address;
                LeadMarkers.push(Leadmarker);
                //alert(results[0].formatted_address);
            } else {
                $('#LeadObviousPlace').attr('style', 'border-color:red;');
                //alert('Geocoding was not successful for the following reason: ' + status);
            }
        });

    } else if (map) {
        DeleteMarkers();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: latLng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
               ////debugger;
                $('#ObviousPlace').attr('style', '');
                map.setCenter(results[0].geometry.location);//center the map over the result
                //place a marker at the location
                var marker = new google.maps.Marker(
                    {
                        zoom: 15,
                        map: map,
                        position: results[0].geometry.location
                    });
                console.log(results[0].formatted_address);
                document.querySelector("#ObviousPlace").value = results[0].formatted_address;
                markers.push(marker);
                //alert(results[0].formatted_address);
            } else {
                $('#ObviousPlace').attr('style', 'border-color:red;');
                //alert('Geocoding was not successful for the following reason: ' + status);
            }
        });
    }
}

function DeleteMarkers() {
    ////debugger;
    //Loop through all the markers and remove
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
};

function DeleteLeadMarkers() {
    ////debugger;
    //Loop through all the markers and remove
    for (var i = 0; i < LeadMarkers.length; i++) {
        LeadMarkers[i].setMap(null);
    }
    LeadMarkers = [];
};

function AutoComplete(ObviousPlace, LeadObviousPlace) {
    ////debugger;
    //var input = document.getElementById("ObviousPlace");
    if (ObviousPlace) {
        var input = document.getElementById("ObviousPlace");
    } else if (LeadObviousPlace) {
        var input = document.getElementById("LeadObviousPlace");
    }
    
    var autoComplete = new google.maps.places.Autocomplete(input); //Autocomplete(input);
    return autoComplete;
}



