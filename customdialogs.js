//show alert function
export function showAlert() {
    document.getElementById("tbl").style.display="none";
    setTimeout(alert(), 10);
}

//alert content
function alert() {
    showDiag();
    document.getElementById("title").innerHTML="Alert Pressed!";
    document.getElementById("cancel").style.display="none";
    document.getElementById("ok").addEventListener("click", function() {
    let node = document.getElementById("custom-dialog");
        closeDiag();
    });    
}

//show confirm dialog
export function showConfirm() {
    document.getElementById("tbl").style.display="none";
    setTimeout(confirm(), 10);
}

//confirm dialog content
function confirm() {
    //open dialog
    showDiag();
    //set the a paragraph
    document.getElementById("title").innerHTML="Do you want to confirm?";
    //handle cancel button
    document.getElementById("cancel").addEventListener("click", function(){
        //remove dialog
        closeDiag();
        //display result
        document.getElementById("tbl").style.display="block";
        document.getElementById("th").innerHTML="Confirm result: false";
    });

    //handle ok button
    document.getElementById("ok").addEventListener("click", function(){
        //close dialog
        closeDiag()
        //diaplay result
        document.getElementById("tbl").style.display="block";
        document.getElementById("th").innerHTML="Confirm result: true ";
    });
}

//show promtp dialog
export function showPrompt() {
    document.getElementById("tbl").style.display="none";
    setTimeout(cusPrompt(), 10);
}

function cusPrompt() {
    //show dialog
    showDiag();
    //set paragraph
    document.getElementById("title").innerHTML="What is your name?"; 
    //display textarea
    document.getElementById("input-info").style.display="inline-block";
    //handl ok button
    document.getElementById("ok").addEventListener("click", function(){     
        //get the content of textarea  
        let val = document.getElementById("input-info").value;
        //clear content
        let clean = DOMPurify.sanitize(val);
        val = clean;
        //close dialog
        closeDiag();
        //display result
        document.getElementById("tbl").style.display="block";
        //user enter nothing
        if(val == "" || val == null){
            document.getElementById("th").innerHTML=`User didn't enter anything`;
        }
        //display the cleaned content              
       else{
            document.getElementById("th").innerHTML=`Prompt result: ${val}`;
       }
    });

    //handle cancel button
    document.getElementById("cancel").addEventListener("click", function(){
        closeDiag();
    });
}

//show dialong function
function showDiag() {
    let t = document.getElementsByTagName("template")[0];
    let clone = t.content.cloneNode(true);
    document.body.appendChild(clone);
    document.getElementById("custom-dialog").showModal();
}

//close dialog function
function closeDiag() {
    let node = document.getElementById("custom-dialog");
    if(node.parentNode){
        node.parentNode.removeChild(node);
    }
}
