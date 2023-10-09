
//function GetFileWord(Url, sasa) {
//    debugger;
//    var input = document.getElementById("Url");
//    var sasa = input.files[0].name;
//    var fr = new FileReader();
//    $.ajax({
//        url: Url,

//        type: 'Post',
//        data: {
//            sasa
//        }


//    });
//}


function GetFileWord(Url, sasa) {
    debugger;
    
    sasa = document.getElementById("Url").value;
    sasa = sasa.replace("C:\\fakepath\\", "");
    //size = sasa.size;
    

    //const reader = new FileReader()
    //debugger
    //reader.onload = handleFileLoad;
    //reader.readAsText(event.target.files[0])
    //debugger
    //document.getElementById('fileContent').textContent = event.target.result;
    //let objectURL = URL.createObjectURL(blob);
    //let myImage = new Image();
    //myImage.src = objectURL;
    //debugger;
    //document.getElementById('Url').appendChild(myImage)
    $.ajax({
        url: Url,

        type: 'Post',
        data: {
            sasa
        }


        });
}

//function init() {
//    document.getElementById('URL').addEventListener('change', handleFileSelect, false);
//}

//function handleFileSelect(event) {
//    const reader = new FileReader()
//    reader.onload = handleFileLoad;
//    reader.readAsText(event.target.files[0])
//}

//function handleFileLoad(event) {
//    console.log(event);
//    document.getElementById('URLFile').textContent = event.target.result;
//}