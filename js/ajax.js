var obj = {};
function AJAXConnection(type, url)
{
    var xhr = new XMLHttpRequest();

    xhr.open(type, url, true);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState === 4 && xhr.status === 200)
            obj = xhr.responseText;
        else
            console.log("nope");
    };
    xhr.send(null);
    
    return obj;
}