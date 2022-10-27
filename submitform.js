export function checkFormValid(){
    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const message = document.getElementById("message");
    if(fname.value == '' || lname.value == '' || message.value == ''){
        showDiag();        
        let str = `You must enter your first name, last name and message`;
        document.getElementById("title").innerHTML = str;
        document.getElementById("ok").addEventListener("click", () =>{
            closeDiag();
           
        });
        return false;        
    }
    return true;
}

export function sendData(formData){
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "https://script.google.com/macros/s/AKfycbwM6Hkju3XDc3gdYTIKkweVG_9LmR0umSV1MoQy4hsaHu6d9QSsDtE02FBMfhYee-1c/exec");
    XHR.send(formData);
    showDiag();
    let success = `You message has been successfully sent`;
    document.getElementById("title").innerHTML = success;
    document.getElementById("ok").addEventListener("click", () =>{
        closeDiag();
    });   
}

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



document.getElementById("confirm").addEventListener("click", function (){
    const project = document.getElementById("pro-select").value;
    if(project === "Employment analysis"){
        document.getElementById("analysis").scrollIntoView();
    }
    else if(project === "Zoo Seeker"){
        document.getElementById("Zoo-Seeker").scrollIntoView();
    }
});

