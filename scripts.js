var safe = false;

//Alert window
document.getElementById("alert").addEventListener("click", () =>{
    //Do not display the table
    document.getElementById("tbl").style.display="none";
    //table disapper if the table appears right now
    //It disapper immediately when button is clicked. 
    setTimeout(() => {
        alert("Alert pressed!");
    }, 10);

});

//Hide the result table
function hideTable() {
    document.getElementById("tbl").style.display="none";
}

//confirm window
document.getElementById("confirm").addEventListener("click", () =>{
    //Hide the result when this button is clicked.
    hideTable();
    //Need to display new table with new content;
    setTimeout(() => {
        //click ok or cancel
        let value = confirm("Do you want to continue?");
        document.getElementById("tbl").style.display="block";
        //user clicks confirm
        if(value == true){
            document.getElementById("th").innerHTML="Confirm result: true ";
        }
        //use clicks cancel
        else{
            document.getElementById("th").innerHTML="Confirm result: false";
        }
        document.getElementById("echo").textContent = `The value returned by the confirm method is : ${value}`;
    }, 10);
});

//prompt window
document.getElementById("prompt").addEventListener("click", () => {
    //Hide the result when this button is clicked.
    hideTable();
    //Need to display new table with new content;
    setTimeout(() => {
        //Get what user enters
        let value = prompt("What is your name?");
        document.getElementById("tbl").style.display="block";
        //in safe-prompt
        if(safe){
            //clean string
            let clean = DOMPurify.sanitize(value);
            value = clean;
        }
        //enter nothing or click cancel;
        if(value == "" || value == null){
            document.getElementById("th").innerHTML=`User didn't enter anything`;
            return;
        }
        //write content in the result table 
        document.getElementById("th").innerHTML=`Prompt result: ${value}`;
    }, 10);
});


//safer promtp window
document.getElementById("safe-prompt").addEventListener("click", () =>{
    //Hide the result when this button is clicked.
    hideTable();
    //Need to display new table with new content;
    setTimeout(() => {
        let value = prompt("What is your name?");
        document.getElementById("tbl").style.display="block";
        //user click cancel, do not go into safe promtp
        if(value == null){
            safe = false;
        }
        //user click cancel or enter nothing, display message;
        if(value == "" || value == null){
            document.getElementById("th").innerHTML=`User didn't enter anything`;
            return;
        }
        //go into safe prompt
        safe = true;
        //clean string
        let clean = DOMPurify.sanitize(value);
        value = clean;
        //write the new content to the result table
        document.getElementById("th").innerHTML=`Prompt result: ${value}`;
    })


});

//<b onmouseover="alert('pwned')">Roll me</b>