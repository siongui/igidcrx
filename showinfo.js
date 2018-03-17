// This function is no longer needed.
// already supported on official Instagram website
function showMutualFollowers(elm, jsonData) {
  if (jsonData["graphql"]["user"]["mutual_followers"] == null) {
    return;
  }
  var followers = jsonData["graphql"]["user"]["mutual_followers"]["usernames"];
  var count = jsonData["graphql"]["user"]["mutual_followers"]["additional_count"];
  if (followers.length == 0) {
    return;
  }

  var div = document.createElement("div");
  div.setAttribute("style", "display: inline;");
  div.appendChild(document.createTextNode("Followed by: "));
  while (followers.length > 0) {
    var follower = followers.pop();
    var flink = document.createElement("a");
    flink.setAttribute("href", "https://www.instagram.com/"+follower+"/");
    //flink.setAttribute("target", "_blank");
    flink.setAttribute("class", "_fd86t");
    flink.appendChild(document.createTextNode(follower));
    div.appendChild(flink);
    if (followers.length != 0) {
      //div.appendChild(document.createTextNode(",　"));
      div.appendChild(document.createTextNode(", "));
    } else {
      if (count > 0) {
        div.appendChild(document.createTextNode(" + "+count+" more"));
      }
    }
  }
  elm.appendChild(div);
}

function showId(elm, jsonData, url) {
  // chech if id already exist
  if (elm.querySelector("a._idofuser") != null) {
    return;
  }

  var id = jsonData["graphql"]["user"]["id"];

  var link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");
  link.setAttribute("class", "_q3gn4 _idofuser");
  link.appendChild(document.createTextNode(id));

  elm.appendChild(document.createElement("br"));
  elm.appendChild(document.createTextNode("ID: "))
  elm.appendChild(link)
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // wait page to be loaded
    var timerId = setInterval(function() {
      var n = document.querySelector("span._l8ji8");
      if (n != null) {
        showId(n, request.jsonData, request.url);

        // already supported on official Instagram website
        //showMutualFollowers(n, request.jsonData);

        clearInterval(timerId);
      }
    }, 500);
  });
