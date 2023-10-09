var Remarks = document.getElementsByClassName("Remark");
for (let index = 0; index < Remarks.length; index++) {
    //alert("zxczxczxc");
    Remarks[index].addEventListener("change", function () {
        //alert("asdasdasd");
        this.nextElementSibling.value = this.nextElementSibling.value+ "-" + this.value;
    });
}

var Payments = document.getElementsByClassName("Payments");
for (var index = 0; index < Payments.length; index++) {
    Payments[index].addEventListener('click', function () {
        if (!this.nextElementSibling.value.includes('-')) {
            //debugger;
            this.nextElementSibling.value = this.nextElementSibling.value + "-" + this.value;
        }
    });
}


var Conditions = document.getElementsByClassName("Conditions");
for (var index = 0; index < Conditions.length; index++) {
    Conditions[index].addEventListener('click', function () {
        if (!this.nextElementSibling.value.includes('-')) {
            this.nextElementSibling.value = this.nextElementSibling.value + "-" + this.value;
        }
        
    });
}

var ReportParams = document.getElementsByClassName("ReportParam");
//debugger;
for (var index = 0; index < ReportParams.length; index++) {
    //alert("asdasdasd");
    ReportParams[index].addEventListener('change', function () {
        //debugger;
        var Name = this.nextElementSibling.value.split('-');
        if (Name.length > 1) {
            this.nextElementSibling.value = Name[0] + "-" + this.value;
        } else {
            this.nextElementSibling.value = Name[0] + "-" + this.value;
        }
    });
}


//$('#FormSubmit').on('click', function (e) {
//    e.preventDefault();
//    //debugger;
//    //var Remark = document.getElementsByName('param1_remarks[]');
//    //var Payments = document.getElementsByName('input[name="param2_Payment"');
//    //var Conditions = $('input[name="param3_ids"]');
//    //var ReportParam = $('input[name="param5_ReportParams"]');
//    //var Function = $('input[name="function"]');

//    //console.log(Remark);
//    //console.log(Payments);
//    //console.log(Conditions);
//    //console.log(ReportParam);
//    //console.log(Function);

//    //var RemarkArray = new Array();
//    //Remark.each(function (index, value) {
//    //    //Remark[index].value.split('-');
//    //    debugger;
//    //    RemarkArray.push(Remark[index].value);
//    //});
//    //console.log(RemarkArray);

//    $.ajax({
//        url: "/OpportunityQuotation/Print",
//        type: 'JSON',
//        method: 'POST',
//        //async:false,
//        success: function (result) {
//            debugger;
//            alert("sucess");
//        },
//        error: function (xhr, ajaxOptions, thrownError) {
//            debugger;
//            alert("arror");
//            alert(ajaxOptions);
//            alert(thrownError);
//            var tizi = eval("(" + thrownError.responseText + ")");
//            alert(tizi.Message);
//        },
//        complete: function () {
//            alert("complete");
//            window.location.href = "http://localhost/Reports/Viewer.aspx/";
//        }
//    });

//});



//var Payments = document.getElementsByClassName("Payments");
//for (let index = 0; index < Payments.length; index++) {
//    //   debugger;
//    var temp = Payments[index].nextSibling;
//    if (temp != null) {
//        temp.classList.add('Payments');

//        temp.addEventListener("click", function () {
//            alert("icon.Val:" + this.checked);
//        });
//    }
//    alert("zxczxczxc");
//    Payments[index].addEventListener("click", function () {
//        temp.addEventListener("click", function () {
//            alert("not icon.Val:" + this.checked);
//        });
//    });

//}

//var Conditions = document.getElementsByClassName("Conditions");
//for (let index = 0; index < Conditions.length; index++) {
//    //alert("zxczxczxc");
//    Conditions[index].addEventListener("change", function () {
//        alert("Conditions Changed");
//        //this.nextElementSibling.value = this.nextElementSibling.value + "-" + this.value;
//    });
//}


//$('#Remark').on('change', function () {
//    alert("asdasd");
////});
//$(document).ready(function () {

//    alert("selector");

//    $("div[class^='icheckbox_square']").on("click", function (e) {
//        debugger;
//        var sender = e.currentTarget;
//        var input = $(sender).children('input')[0];
//        alert($(input).val());
//    });
//});