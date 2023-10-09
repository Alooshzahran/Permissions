
//$(document).ready(function () {
//    if (window.location.href.indexOf("/RFPTemplate/MyAction") > -1) {
//        //alert("asdasdad");

//        var HasData = false;
//        HasData = $('#testtest').val();
//        if (HasData != null || HasData != "") {
//            console.log(HasData);
//            //alert("asdasdad");
//        }



//    }
//});



function Check(Property, flag) {
    var baseUl = 'myUL';

    //console.log(Property);
    //debugger;
    var prop = Property;
    prop = prop.split(".");
    if (prop.length > 1) {
        for (var i = 0; i < prop.length; i++) {
            //debugger;
            prop[i] = prop[i].replaceAll('[', '');
            prop[i] = prop[i].replaceAll('{', '');
            prop[i] = prop[i].replaceAll(']', '');
            prop[i] = prop[i].replaceAll('}', '');

            var Branch = document.getElementById("{{" + prop[i] + "}}");
            if (i == (prop.length - 1)) {
                //var new_Span = document.createElement("span");
                //new_Span.innerHTML = Property;
                //new_Span.className = "caret";

                

                //new_Li.id = Property;

                var new_Li = document.createElement("li");
                /*new_Li.innerHTML = prop[i];*/

                var span = document.createElement('span');

                var icon = document.createElement('i');
                icon.setAttribute("class", "fa fa-copy");
                icon.setAttribute("onclick", "copyToClipboard('" + Property + "')");

                span.innerHTML = prop[i] + ' ' /*+ icon*/;
                span.append(icon);

                //var button = document.createElement('button');
                //button.innerHTML = `Copy ` + prop;

                //button.onclick = function () {
                //    copyToClipboard(prop[i])
                //};

                //button.setAttribute("onclick", "copyToClipboard('" + prop[i] + "')");

                //$('.fa-copy').attr("onclick", "copyToClipboard('" + prop[i] + "')")
                new_Li.appendChild(span);

                //new_Li.innerHTML.onclick = function () {
                //    copyToClipboard(prop)
                //};
                //new_Li.innerHTML = Property;
                //new_Li.className = "caret";
                //new_Li.id = Property;

                var new_UL = document.createElement("ul");
                //new_UL.innerHTML = Property;
                new_UL.className = "nested";
                new_UL.id = Property;
                new_UL.appendChild(new_Li);

                //console.log(document.getElementById(baseUl));
                //document.getElementById(baseUl + ' li');
                var Current = document.getElementById("{{" + baseUl + "}}");
                //var Current = document.getElementById(prop[i]); //Inside <ul>
                Current = Current.getElementsByTagName("li")[0]; //Inside <li>
                /*Current.appendChild(new_Span);*//* ('#' + baseUl + ' li').append(new_Li);*/
                Current.appendChild(new_UL);

            } else if (Branch == null) {


                //var new_Span = document.createElement("span");
                //new_Span.innerHTML = Property;
                //new_Span.className = "caret";

                //new_Li.id = Property;

                var new_Li = document.createElement("li");
                new_Li.innerHTML = prop[i];

                //var button = document.createElement('button');
                //button.innerHTML = `Copy ` + prop;
                //button.onclick = function () {
                //    copyToClipboard(prop[i])
                //};
                //new_Li.appendChild(button);

                //new_Li.innerHTML.onclick = function () {
                //    copyToClipboard(prop)
                //};
                //new_Li.innerHTML = Property;
                //new_Li.className = "caret";
                //new_Li.id = Property;

                var new_UL = document.createElement("ul");
                //new_UL.innerHTML = Property;
                new_UL.className = "nested";
                new_UL.id = "{{" + prop[i] + "}}";
                new_UL.appendChild(new_Li);



                //console.log(document.getElementById("{{" + baseUl + "}}"));
                //document.getElementById(baseUl + ' li');
                var Current = document.getElementById("{{" + baseUl + "}}"); //Inside <ul>
                Current = Current.getElementsByTagName("li")[0]; //Inside <li>
                /*Current.appendChild(new_Span);*//* ('#' + baseUl + ' li').append(new_Li);*/
                Current.appendChild(new_UL);

                i--;
            }
            
            //console.log("Branch: " + Branch);
            

            //var xx = Branch.getElementById(prop[i]);
            //console.log(Branch);
            /*var mytree = document.getElementById(baseUl).getElementById(prop[i]);*//*  $('#' + baseUl + ' #' + prop[i] + ':last'*//*+prop[i]*//*)*//*.last()*/
            baseUl = prop[i];
        }
    } else {
        //var new_Span = document.createElement("span");
        //new_Span.innerHTML = Property;
        //new_Span.className = "caret";

        //new_Li.id = Property;

        var new_Li = document.createElement("li");
        //new_Li.innerHTML = prop;

        var span = document.createElement('span');
        /*        var icon = ` <i class="fa fa-copy" id="` + Property + `"></i>`;*/
        var icon = document.createElement('i');
        icon.setAttribute("class", "fa fa-copy");
        //debugger;
        icon.setAttribute("onclick", "copyToClipboard('" + Property + "')");


        var PropertyWithoutBraces = Property;
        PropertyWithoutBraces = PropertyWithoutBraces.replaceAll('[', '');
        PropertyWithoutBraces = PropertyWithoutBraces.replaceAll('{', '');
        PropertyWithoutBraces = PropertyWithoutBraces.replaceAll(']', '');
        PropertyWithoutBraces = PropertyWithoutBraces.replaceAll('}', '');


        span.innerHTML = PropertyWithoutBraces + ' ';
        span.append(icon);

        //debugger;
        //$(this > span > icon).attr("onclick", "copyToClipboard('" + Property + "')");
        new_Li.appendChild(span);
        //console.log("span: " + span.getElementsByClassName('fa'));
        //span.getElementByTagName('li').setAttribute("onclick", "copyToClipboard('" + Property + "')");

        //var button = document.createElement('button');
        //button.innerHTML = `Copy ` + prop;
        ////debugger;
        //button.setAttribute("onclick", "copyToClipboard('" + Property +"')");


        //button.onclick = function () {
        //    copyToClipboard(prop)
        //};
        //button.addEventListener('click', function (e) {
        //    copyToClipboard(prop);
        //});
        //button.addEventListener('click', function handleClick(event) {
        //    console.log('element clicked 🎉🎉🎉', event);
        //});

        //new_Li.appendChild(button);

        //new_Li.innerHTML.onclick = function () {
        //    copyToClipboard(prop)
        //};
        //button.onclick = function () {
        //    copyToClipboard(prop)
        //};
        //new_Li.innerHTML = Property;
        //new_Li.className = "caret";
        //new_Li.id = Property;

        var new_UL = document.createElement("ul");
        //new_UL.innerHTML = Property;
        new_UL.className = "nested";
        new_UL.id = Property;
        new_UL.appendChild(new_Li);
        

        //console.log(document.getElementById(baseUl));
        //document.getElementById(baseUl + ' li');
        var Current = document.getElementById("{{" + baseUl + "}}"); //Inside <ul>
        Current = Current.getElementsByTagName("li")[0]; //Inside <li>
        /*Current.appendChild(new_Span);*//* ('#' + baseUl + ' li').append(new_Li);*/
        Current.appendChild(new_UL);
        //Current[0].appendChild(new_Li);
    }

    //alert("asdasdasd22");
}


function tizi() {

    alert("tizooo");
}

//var expands = document.getElementsByClassName("nested");
////debugger;
//for (var i = 0; i < expands.length; i++) {
//    expands[i].addEventListener('click',function () {
//        //debugger;

//        var ul = this.parentElement.querySelector('ul')[0];

//        if (ul != null) {
//            //console.log("this: " + this.innerHTML);
//            //console.log("ul: " + ul);
//            if (ul.offsetHeight > 0) {
//                ul.style.display = 'none';
//            } else {
//                ul.style.display = 'block';
//            }
//        }

//    });
//}



//var toggler = document.getElementsByClassName("caret");
//for (var i = 0; i < toggler.length; i++) {
//    toggler[i].addEventListener("click", function () {
//        debugger;
//        this.classList.toggle("active");
//        this.classList.toggle("caret-down");

//    });
//}

//toggler.forEach((toggler) => {
//    toggler.addEventListener("click", function () {
//        debugger;
//        this.classList.toggle("active");
//        this.classList.toggle("caret-down");

//    });
//});

//$('.nested').on('click', function (e) {
//    //e.preventDefault();
//    //this.toggleClass("caret");
//    $(this).attr('class', 'active caret-down');
//    //$(this).attr('class', 'caret-down');

//});

//$('.caret').on('click', function (e) {
//    //e.preventDefault();
//    $(this).attr('class', 'nested');
//    $(this).attr('class', 'caret-down');

//});

//var toggler = document.getElementsByClassName("caret");
//for (i = 0; i < toggler.length; i++) {
//    toggler[i].addEventListener("click", function () {
//        this.parentElement.querySelector(".nested").classList.toggle("active");
//        debugger;
//        //this.classList.toggle("active");
//        this.classList.toggle("caret-down");
//    });
//}

$(function () { $('#TreeJs').jstree(); });



//var myTreeviewEl = document.querySelector('.treeview');
//var lol = Treeview.getInstance(myTreeviewEl);
//console.log("lol: " + lol);

//$(document).ready(function () {
//    $('#TreeJs').mdbTreeview();
//});


//$('.nested').on('click', function (e) {
//    debugger;
//    e.stopPropagation();
//    e.stopImmediatePropagation();
//    alert('nested clicked');
//    $(this).attr('class', 'caret-down');

//});

//$('.caret').on('click', function (e) {
//    debugger;
//    e.stopPropagation();
//    e.stopImmediatePropagation();
//    alert('caret clicked');
//    $(this).attr('class', 'caret-down');
//    //break;
//});