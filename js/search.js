/* 
        curl -i https://api.github.com/orgs/mozilla/repos
        curl -i https://api.github.com/orgs/carfinance247/repos
        https://developer.github.com/v3/guides/getting-started/
*/




var JSONCache = updateCache();
var searchCache = JSONCache;
var outputArea = null;
var userSettings = AJAXConnection("GET", "../settings.json");;

function updateCache()
{
    JSONCache = AJAXConnection("GET", "https://api.github.com/orgs/mozilla/repos");
    searchCache = JSONCache;
    return JSONCache;
}

function search()
{
    outputArea = document.getElementById("results");
    outputArea.innerHTML = "";
    var queryString = document.getElementById("searchBar").value;
    var output = "";
    if(JSONCache !== null)
    {
        console.log(JSONCache);
        for(var i in JSONCache)
        {
            var name = JSONCache[i].name;
            var description = JSONCache[i].description;
            var link = JSONCache[i].html_url;
            var cloneLink = JSONCache[i].clone_url; //replace with .ssh_url if cloning via SSH not HTTP

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

function displayUserSettings()
{
    alert(userSettings.authKey + "\n"
    + userSettings.cloneDir + "\n"
    + userSettings.cloneType + "\n");
}