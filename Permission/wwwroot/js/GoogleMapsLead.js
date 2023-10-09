///*
// API = AIzaSyDV3t9ytUJ_zQDV63CK8-Gj4DSyDujV1-4
// GeoAPI = AIzaSyDFmCi-A0d5nRdOqOy6WAnAs7w2n2ii_8M
// #GetCurrentLocation
// */

////var markers = [];
//var Leadmarkers = [];
//function initMap() {
//    ////debugger;

//     GetMapLead();
//    //GetMapCustomerInf();
//}

//////////////////// Start  CustomerInfo///////

///////////End Customer info//////////////////////

//////////////////////////////


////////////////////Start Lead//////////////
//function GetMapLead() {
//    var addressLead = "Riyadh";
//    if (window.location.href.indexOf("CustomerInfo/AddEdit") > -1
//        || window.location.href.indexOf("Lead/AddEdit") > -1) {
//        AutoCompleteLead();
//       ////debugger;

//        addressLead = $("#ObviousPlaceLead").val();
//        if (addressLead != "") {
//            //AutoComplete();
//            codeAddressLead(addressLead);
//        } else {
//            addressLead = "Riyadh";
//        }
//        //$(document).ready(function () {

//        //});
//        document.querySelector("#ObviousPlaceLead").addEventListener("keypress", function () {
//           ////debugger;
//            if (event.keyCode == 13) { // *NOTE: "Enter" KeyCode is 13;
//                addressLead = document.getElementById("ObviousPlaceLead").value;
//                if (addressLead != "") {
//                    AutoCompleteLead();
//                    codeAddressLead(addressLead);
//                }
//            }
//        });

//        document.querySelector("#ObviousPlaceLead").addEventListener("focusout", function () {
//           ////debugger;
//            addressLead = document.getElementById("ObviousPlaceLead").value;
//            if (addressLead != "") {
//                AutoCompleteLead();
//                codeAddressLead(addressLead);
//            }
//        });

//        ///****************************     Regular Map     *******************************///
//        //var MyLatLng = new google.maps.LatLng(31.9826576, 35.8388919);
//        //var MarkerOptions = {
//        //    zoom: 10,
//        //    center: MyLatLng,
//        //    mapTypeId: google.maps.MapTypeId.ROADMAP
//        //}
//        //map = new google.maps.Map(document.getElementById("MyMap"), MarkerOptions);

//        //map.addListener("click", function (e) {
//        //    placemarker(e.latLng, map);
//        //});

//        ///****************************     GeoCoding Map     *******************************///

//       ////debugger;
//        // var latlng = new google.maps.LatLng(31, -20);
//        var mapOptions = {
//            zoom: 15
//            //center: e.latlng
//        }
//        map = new google.maps.Map(document.getElementById("MyMapLead"), mapOptions);
//        //var marker = new google.maps.Marker({
//        //    draggable: false,
//        //    position: latlng,
//        //    map: map,
//        //    title: "Your location"
//        //});

//        map.addListener("click", function (e) {
//            placemarkerLead(e.latLng, map);
//        });
//        codeAddressLead(addressLead);
//    }
//}

//function codeAddressLead(addressLead) {
//    DeleteMarkersLead();
//   ////debugger;
//    var geocoder = new google.maps.Geocoder();
//    geocoder.geocode({ address: addressLead }, function (results, status) {
//        if (status == google.maps.GeocoderStatus.OK) {
//           ////debugger;
//            map.setCenter(results[0].geometry.location);//center the map over the result
//            //place a marker at the location
//            var marker = new google.maps.Marker(
//                {
//                    zoom: 15,
//                    map: map,
//                    position: results[0].geometry.location
//                });
//            console.log(results);
//            Leadmarkers.push(marker);
//            //alert(results[0].formatted_address);
//        } else {
//            alert('Geocode was not successful for the following reason: ' + status);
//        }
//    });
//}

//function placemarkerLead(latLng, map) {
//    //setMapOnAll(null);
//    //location: LatLng,
//    DeleteMarkersLead();
//    var geocoder = new google.maps.Geocoder();
//    geocoder.geocode({ location: latLng }, function (results, status) {
//        if (status == google.maps.GeocoderStatus.OK) {
//            map.setCenter(results[0].geometry.location);//center the map over the result
//            //place a marker at the location
//            var marker = new google.maps.Marker(
//                {
//                    zoom: 15,
//                    map: map,
//                    position: results[0].geometry.location
//                });
//            console.log(results[0].formatted_address);
//            document.querySelector("#ObviousPlaceLead").value = results[0].formatted_address;
//            Leadmarkers.push(marker);
//            //alert(results[0].formatted_address);
//        } else {
//            alert('Geocoding was not successful for the following reason: ' + status);
//        }
//    });
//}

//function DeleteMarkersLead() {
//    //Loop through all the markers and remove
//    for (var i = 0; i < Leadmarkers.length; i++) {
//        Leadmarkers[i].setMap(null);
//    }
//    Leadmarkers = [];
//};

//function AutoCompleteLead() {
//   ////debugger;
//    var input = document.getElementById("ObviousPlaceLead");
//    var autoComplete = new google.maps.places.Autocomplete(input); //Autocomplete(input);
//    return autoComplete;
//}


/////////////////End Lead////////////