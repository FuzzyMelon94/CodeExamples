function get_monitor_sizes() {
    const { spawn } = require("child_process");
    
    var pyMonitors = spawn("python", ["./py/monitors.py"]);    
    pyMonitors.stdout.setEncoding("utf8");
    
    pyMonitors.stdout.on("data", data => {
        // Prepare the variables
        var monitors = [];
        var monitorList = document.getElementById("monitor-list");
        
        // Add a new element to the array for each monitor
        monitors = data.split(".");
        
        // Break each monitor string into an array of details
        for (i=0; i<monitors.length; i++) {
            var details = monitors[i].split(",");
            monitors[i] = details;
        }
        
        // For each monitor create HTML with the correct information
        for (i=0; i<monitors.length; i++) {    
            var div = document.createElement('div');
            div.innerHTML = '<img src="./images/desktop_windows_lrg.png">' +
                            '<p>DISPLAY ' + (i + 1) + '</p>' +
                            '<p>' + monitors[i][0] + 'x' + monitors[i][1] + '</p>';
            monitorList.appendChild(div);
        }
    });
    
    // Once the python script has finished update the HTML
    pyMonitors.stdout.on("end", data => {
        console.log("monitors.py complete");
    });
}