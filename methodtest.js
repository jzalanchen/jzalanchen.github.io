export function sendDataWithXMLPut(data){
    const XHR = new XMLHttpRequest();
    if(XHR){
        XHR.open('PUT', 'https://httpbin.org/put');
        XHR.onload = function (){ 
            //data.append("date", new Date());           
            document.getElementById("respond").innerHTML = XHR.responseText;
            //console.log( XHR.responseText);            
        }        
        const formData = new FormData(data);
        formData.append("date", new Date());
        XHR.send(formData);
    }
}

export function sendDataWithXMLPost(data){
    const XHR = new XMLHttpRequest();
    if(XHR){
        XHR.open('POST', 'https://httpbin.org/post');
        XHR.onload = function (){            
            document.getElementById("respond").innerHTML = XHR.responseText;        
        }
        const formData = new FormData(data);
        formData.append("date", new Date());
        XHR.send(formData);
    }
}

export function sendDataWithXMLGet(data){
    const XHR = new XMLHttpRequest();
    if(XHR){
        XHR.open('GET', 'https://httpbin.org/get');
        XHR.onload = function (){            
            document.getElementById("respond").innerHTML = XHR.responseText;
            //console.log( XHR.responseText);
            
        }
        const formData = new FormData(data);
        formData.append("date", new Date());
        XHR.send(formData);
    }
}

export function sendDataWithXMLDelete(data){
    const XHR = new XMLHttpRequest();
    if(XHR){
        XHR.open('DELETE', 'https://httpbin.org/delete');
        XHR.onload = function (){            
            document.getElementById("respond").innerHTML = XHR.responseText;
            //console.log( XHR.responseText);
            
        }
        const formData = new FormData(data);
        formData.append("date", new Date());
        XHR.send(formData);
    }
}