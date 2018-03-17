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

  var span_l8ji8 = elm.querySelector("span._l8ji8");
  if (span_l8ji8 == null) {
    span_l8ji8 = document.createElement("span");
    span_l8ji8.setAttribute("class", "_l8ji8");
    elm.appendChild(span_l8ji8);
  }

  var id = jsonData["graphql"]["user"]["id"];

  var link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");
  link.setAttribute("class", "_q3gn4 _idofuser");
  link.appendChild(document.createTextNode(id));

  span_l8ji8.appendChild(document.createElement("br"));
  span_l8ji8.appendChild(document.createTextNode("ID: "))
  span_l8ji8.appendChild(link)
}

function getFullSizeProfilePicUrl(picurl) {
  var fullsizeurl = picurl.replace("/vp/", "/");
  fullsizeurl = fullsizeurl.replace("t51.2885-19", "t51.2885-15");
  fullsizeurl = fullsizeurl.replace(/\/s\d+x\d+\//, "/sh0.08/e35/");
  return fullsizeurl;
}

function addProfilePicDownloadLink(jsonData, url) {
  var div_b0acm = document.querySelector("div._b0acm");
  if (div_b0acm == null) {
    console.log("no profile pic?");
    return;
  }

  var div = document.createElement("div");
  div.setAttribute("style", "z-index: 55; height: 40px; width: 46px; position: absolute; right: 10px; top: 8px; display: inline-block;");

  var picurl = getFullSizeProfilePicUrl(jsonData["graphql"]["user"]["profile_pic_url_hd"]);
  var username = jsonData["graphql"]["user"]["username"];
  var link = document.createElement("a");
  link.setAttribute("href", picurl);
  link.setAttribute("target", "_blank");
  link.setAttribute("style", "height: 40px; width: 40px; display: inline-block;");

  // filename will not change to username
  // because href is on the different domain
  // https://stackoverflow.com/a/10049353
  link.setAttribute("download", username);

  div.appendChild(link);
  div_b0acm.appendChild(div);
}

function addLocalLinks(jsonData, url) {
  var div_b0acm = document.querySelector("div._b0acm");
  if (div_b0acm == null) {
    console.log("no profile pic?");
    return;
  }

  var div1 = document.createElement("div");
  div1.setAttribute("style", "z-index: 55; height: 40px; width: 46px; position: absolute; right: 10px; bottom: 8px; display: inline-block;");
  var link1 = document.createElement("a");
  link1.setAttribute("href", "http://localhost:8999/download/profile_pic/");
  link1.setAttribute("target", "_blank");
  link1.setAttribute("style", "height: 40px; width: 40px; display: inline-block;");
  div1.appendChild(link1);

  var div2 = document.createElement("div");
  div2.setAttribute("style", "z-index: 55; height: 40px; width: 46px; position: absolute; left: 10px; bottom: 8px; display: inline-block;");
  var link2 = document.createElement("a");
  link2.setAttribute("href", "http://localhost:8999/download/all_posts/");
  link2.setAttribute("target", "_blank");
  link2.setAttribute("style", "height: 40px; width: 40px; display: inline-block;");
  div2.appendChild(link2);

  div_b0acm.appendChild(div1);
  div_b0acm.appendChild(div2);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // wait page to be loaded
    var timerId = setInterval(function() {
      var n = document.querySelector("div._tb97a");
      if (n != null) {
        showId(n, request.jsonData, request.url);

        // already supported on official Instagram website
        //showMutualFollowers(n, request.jsonData);

        addProfilePicDownloadLink(request.jsonData, request.url);
        addLocalLinks(request.jsonData, request.url);

        clearInterval(timerId);
      }
    }, 500);
  });
