function copyToClipboard(name) {
    //debugger;
    //const element = document.querySelector('#CopyDate');

    //debugger;
    //element.innerHTML;
    ////element.setSelectionRange(0, 99999);
    //document.execCommand('copy');
    //new Clipboard("#ccc_"+name);
    //debugger;
    var copyGfGText = document.getElementById("CopyDate_" + name);
    copyGfGText.type = 'text';
    //if (copyGfGText == null) {
    //    copyGfGText = document.getElementById(name);
    //}

    /* Select the text field */
    copyGfGText.select();


    /* Copy the text inside the text field */
    document.execCommand("copy");

    copyGfGText.type = 'hidden';

    ///*Use below command to access the value of copied text */
    //console.log(copyGfGText.value);
}

//function copyToClipboard(name) {
//    debugger;
//    //const element = document.querySelector('#CopyDate');

//    //debugger;
//    //element.innerHTML;
//    ////element.setSelectionRange(0, 99999);
//    //document.execCommand('copy');
//    //new Clipboard("#ccc_"+name);
//    //debugger;
//    var copyGfGText = document.getElementById(name);
//    //if (copyGfGText == null) {
//    //    copyGfGText = document.getElementById(name);
//    //}

//    /* Select the text field */
//    copyGfGText.select();


//    /* Copy the text inside the text field */
//    document.execCommand("copy");

//    ///*Use below command to access the value of copied text */
//    //console.log(copyGfGText.value);
//}