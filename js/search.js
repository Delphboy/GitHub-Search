var ajaxLoad = new AJAXConnection();
var outputArea = null;

function search(queryString)
{
    /* 
        curl -i https://api.github.com/orgs/mozilla/repos
        curl -i https://api.github.com/orgs/carfinance247/repos
        https://developer.github.com/v3/guides/getting-started/
    */
    ajaxLoad.process("GET", "https://api.github.com/orgs/" + queryString, buildOutput);
    outputArea = document.getElementById("results");
}

function buildOutput()
{
    var output = "";
    if(ajaxLoad.xmlHTTP.readyState === 4 && ajaxLoad.xmlHTTP.status === 200)
    {
        if(ajaxLoad.xmlHTTP.responseText !== "")
        {
            // console.log(ajaxLoad.xmlHTTP.responseText);
            var JSONResult = JSON.parse(ajaxLoad.xmlHTTP.responseText);
            console.log(JSONResult);

            for(var i in JSONResult)
            {
                var name = JSONResult[i].name;
                var description = JSONResult[i].description;
                output = "<p>" + name + ": " + description + "</p>";
                if(output == "")
                outputArea.innerHTML = output;
            else
                outputArea.innerHTML += output;
            }
            
            
        }
        else
        {
            outputArea.innerHTML = "<h4>No More Adverts</h4>";
        }
    }
}