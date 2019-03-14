// Move these to the settings JSON/DB later
var updating = false;        // Whether to update the wallpaper automatically
var updateIntervals = 100;  // How many intervals in a progress bar (more = smooth)
var updateWait = 15;        // Time to wait for next wallpaper

// Private variables, global or JSON/DB ??
var remainingTime;          // Time remaining (sec) until wallpaper change
var updateTimerID;          // The id belonging to the update timer
var topBottomImage = 0;     // 0 means bottom, 1 means top - should be opposite to the one in use
var lastID = "";

// Other options that should be provided
// new wallpaper when application launches?
// timer resets when application launches?


function autoUpdateWallpaper () {
    if (updating == false) {
        return;
    }
    
    if (remainingTime == null) {
        remainingTime = updateWait;
    }    
    
    var bar = document.getElementById("progress-bar");
    var num = document.getElementById("progress-num");
    var wait = 1000;
    var prepared = false;

    console.log("Starting the auto-updater");    
    updateTimerID = setInterval(progress, wait);
    
    function progress() {
        if (remainingTime <= 0) {
            bar.style.width = "0%";
            remainingTime = updateWait
            console.log("New Wallpaper!");
            setWallpaper();
            prepared = false;
        }
        // ----- This needs to be done on another thread -----
        else if (remainingTime <= 5 && !prepared) {
            //setRandomUnsplash();
            forceRedditWallpaper();
            prepared = true;
        }
        else {
            remainingTime --;
            var iUpdateWait = updateWait / updateIntervals;
            var iRemainingTime = remainingTime / updateIntervals;
            var width = (((updateWait - remainingTime) / updateWait))  * 100;
            bar.style.width = width + "%";
            num.innerHTML = remainingTime + " seconds until next wallpaper";
        }
    }
}


function toggleUpdating () {
    if (updating) {
        updating = false;
        clearInterval(updateTimerID);
        console.log("Wallpaper updating paused")
    }
    else {
        updating = true;
        autoUpdateWallpaper();
    }
}


function prepareNextImage (_url) {
    // Download the image to temp storage
    // Mark as next image, store URL
    // Set as correct image (top/bottom)
    
    var imageTop = document.getElementById("current-wallpaper-top");
    var imageBottom = document.getElementById("current-wallpaper-bottom");
    
    if (topBottomImage == 0) {
        imageTop.src = _url;
    }
    else {
        imageBottom.src = _url;
    }
}


function setRandomUnsplash () {
    var rand = Math.random() + "" + (Math.random() * Math.random());
    var url = "https://source.unsplash.com/random/1920x1080?sig=" + rand;
    
    prepareNextImage(url);
}


function setWallpaper () {
    // Fade from bottom to top, or vice versa
    var imageTop = document.getElementById("current-wallpaper-top");
    var imageBottom = document.getElementById("current-wallpaper-bottom");
    
    if (topBottomImage == 0) {
        imageTop.style.opacity = "1";
        imageBottom.style.opacity = "0";
        topBottomImage = 1;
    }
    else {
        imageTop.style.opacity = "0";
        imageBottom.style.opacity = "1";
        topBottomImage = 0;
    }
    
    // Set the desktop wallpaper using the python script?
    // Or find a way to have a smooth fade to new wallpaper with NODE.JS
}


// ----------- REMOVE THESE FUNCTIONS LATER --- ONLY FOR TESTING -----------

function forceUnsplashWallpaper () {
    setRandomUnsplash();
    setWallpaper();
}


async function forceRedditWallpaper () {
    var url = "https://www.reddit.com/r/MinimalWallpaper/.json?limit=5&after="+lastID;
    // add "&after=<kind + _ + id>" to use pagination 
    let response = await fetch(url);
    var jsonObj = await response.json();
        
    // Access the returned children
    var children = jsonObj.data.children;
    console.log(children.length) + " children returned.";
    
    // If there's no children, bail out early
    if (children.length <= 0) {
        return;
    }
    
    // Output information on each child
    for (var i = 0; i < children.length; i++) {
        console.log("Child " + i);
        
        console.log("  Title:     " + children[i].data.title);
        console.log("  Author:    " + children[i].data.author);
        console.log("  URL:       " + children[i].data.url);
        console.log("  Domain:    " + children[i].data.domain);
        console.log("  Kind:      " + children[i].kind);
        console.log("  ID:        " + children[i].data.id);
        console.log("  Permalink: " + children[i].data.permalink);
        console.log("  Subreddit: " + children[i].data.subreddit);
        console.log("  Sub ID:    " + children[i].data.subreddit_id);
        console.log("  Thumbnail: " + children[i].data.thumbnail);
        console.log("  Image:     " + children[i].data.preview.images[0].source.url);
        
        console.log("---------------------------------------------");
    }
    
    // Select a random child
    var rand = Math.floor(Math.random() * children.length);
    console.log("Child '" + rand + "' has been selected");
    
    // Get variables for said child
    var title = children[rand].data.title;
    var author = children[rand].data.author;
    var imageURL = children[rand].data.url;
    var domain = children[rand].data.domain;
    var kind = children[rand].kind;
    var postID = children[rand].data.id;
    var permalink = children[rand].data.permalink;
    var subreddit = children[rand].data.subreddit;
    var subredditID = children[rand].data.subreddit_id;
    var thumbnail = children[rand].data.thumbnail;
    var image = children[rand].data.preview.images[0].source.url;
    
    console.log("Setting image to " + imageURL);
    prepareNextImage(imageURL);
    
    var last = children.length - 1;
    lastID = children[last].kind + "_" + children[last].data.id;
    console.log(lastID);
}