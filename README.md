# WordPress Plugin
### Unsplashify
A simple plugin that loads a random image from Unsplash into the top of the content of a WordPress page.

There's a basic settings page to configure the size (width and height) of the random image, as well as a field for some tags.

The plugin can be seen working at [plugin.tombrowndev.com.au](https://plugin.tombrowndev.com.au), or can be downloaded from this repository.

# CodeExamples

## Photobooth - PHP
A small Raspberry Pi project I was making for my sister's birthday.

She was having a big party, and wanted to have a photo booth type thing. A cardboard frame to stand behind with props that can be used for the photo.

I had started messing around with the Raspberry Pi, so picked up a camera and big 10cm red button that I could build into a camera that takes the photos. The Pi would place the images in the correct folder, as well as generating thumbnail versions of the fullsize images.

The photos would then be displayed on the Pi running a web server. I set up a router that could be connected to, you could then go to the Pi's IP address, and the page would load. I decided to use PHP for the website to learn how to write a basic webpage in PHP.

I've zipped the entire project, excluding the code that ran on the Pi as I'm not sure where that's gone. I've tested this project using XAMPP on Windows 10, everything appears to be working as intended.


## Wallpaper Manager - JavaScript
An application I started to write using Electron, with Chromium as the front end, and Node.js as the backend. I decided to use Electron because it can be used to create cross-platform applications. On top of this, it uses Node for the backend, which was helpful as I'd recently started learning Node and React.

The application was intended to request images from various sources on the internet, such as Reddit and Unsplash, and set them as the desktop wallpaper. Unfortunately it isn't in a state to be built, so I've included some of the files containing the JavaScript code I've written.

### monitor.js
Runs a python script that finds all the connected monitors that returns an array of information about each monitor. The JS then takes pieces of this and displays the information one of the pages of the application.

### nav.js
Handles the interactions with the buttons of the navigation bar, and what content should be shown on the page.

### tab_controller.js
Some of the pages of this application have tabbed areas. This file is used to control what should be displayed in the content area, depending on the currently selected tab.

### test.js
This file is a bit of a work in progress, but it has a lot of my code so I thought it would be good to include. I originally started the application in Python, later deciding to switch to JavaScript inside Electron. Most of the functions in this file are to do with the fetching of images, and using them inside the application.


## Spotify Exercise - Python
This is a technical test I had to do a couple of years ago, it's an application that provides a UI to interact with the Spotify API, as well as saving and loading files on the disk.

This project has its own repo on BitBucket - https://bitbucket.org/TomBrown94/spotifyexercise/src/master/
