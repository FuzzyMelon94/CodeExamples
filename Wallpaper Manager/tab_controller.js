function updatePageContent(content, element, colour) {
    var i, tab_content, tab_link;
    
    // Hide all 'tab-content' elements
    tab_content = document.getElementsByClassName("tab-content");
    for (i = 0; i < tab_content.length; i++) {
        tab_content[i].style.display = "none";
    }
    
    // Remove the background colour from all 'tab-link' elements
    tab_link = document.getElementsByClassName("tab-link");
    for (i = 0; i < tab_link.length; i++) {
        tab_link[i].style.backgroundColor = "";
    }
    
    // Show the correct content
    var page_path = "./html/" + content + ".html"
    console.log("Trying to load " + page_path);
    document.getElementById(content).innerHTML='<object type="text/html" data="' + page_path + '" ></object>';
    document.getElementById(content).style.display = "block";
    
    console.log()
    
    // Add the specific colour to the button used to open the content
    element.style.backgroundColor = colour;
    document.getElementById("content-area").style.backgroundColor = colour;
}


function updateSettingsExtras(section, element) {
    var i, tab_content, tab_link;
    
    // Hide all 'tab-content' elements
    tab_content = document.getElementsByClassName("settings-tab-content")
    for (i = 0; i < tab_content.length; i++) {
        tab_content[i].style.display = "none";
    }
    
    // Remove the active colour from all 'tab-link' elements
    tab_link = document.getElementsByClassName("settings-tab-link");
    for (i = 0; i < tab_link.length; i++) {
        tab_link[i].style.backgroundColor = "";
    }
    
    // Show the correct content
    document.getElementById(section).style.display = "flex";
    
    // Add the active colour to the button used to open the content
    element.style.backgroundColor = "#ccc";
}