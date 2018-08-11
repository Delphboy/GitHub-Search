var ajaxLoad = new AJAXConnection();
var JSONCache = null;
var outputArea = null;

function setJSON()
{
    if(ajaxLoad.xmlHTTP.readyState === 4 && ajaxLoad.xmlHTTP.status === 200)
    {
        if(ajaxLoad.xmlHTTP.responseText !== "")
        {
            JSONCache = JSON.parse(ajaxLoad.xmlHTTP.responseText);            
        }
        else
        {
            JSONCache = null;
        }
    }
}

function search()
{
    outputArea = document.getElementById("results");
    outputArea.innerHTML = "";
    var queryString = document.getElementById("searchBar").value;
    var output = "";
    if(JSONCache !== null)
    {
        for(var i in JSONCache)
        {
            var name = JSONCache[i].name;
            var description = JSONCache[i].description;
            var link = JSONCache[i].html_url;

            if(name.includes(queryString))
                output += buildDisplayDiv(name, description, link);
        }
        if(output == "")
            outputArea.innerHTML = output;
        else
            outputArea.innerHTML += output;
    }
    else 
    {
        outputArea.innerHTML = "<p>Please update the cache</p>";
    }
}

function buildDisplayDiv(name, desc, url)
{
    var displayDiv = "<div style='border: solid'>"
        + "<h3><a href='" + url + "'>" + name + "<a></h3>"
        + "<p>" + desc + "</p>"
        + "</div>"
        + "<div style='padding: 1%'></div>";
    return displayDiv;
}

function updateCache()
{
    /* 
        curl -i https://api.github.com/orgs/mozilla/repos
        curl -i https://api.github.com/orgs/carfinance247/repos
        https://developer.github.com/v3/guides/getting-started/
    */
   ajaxLoad.process("GET", "https://api.github.com/orgs/mozilla/repos", setJSON);
}