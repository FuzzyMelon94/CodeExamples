// cobbled together from -- https://github.com/electron/electron-api-demos/blob/master/assets/nav.js
const settings = require('electron-settings')


document.body.addEventListener('click', function(event) {
    if (event.target.dataset.section) {
        handleSectionTrigger(event)
    }
})


function handleSectionTrigger (event) {
    hideAllSections()
    deselectAllButtons()
    
    // Highlight clicked button and show view
    event.target.classList.add('is-selected')
    
    // Update the colour of the selected button
    var newColor = document.defaultView.getComputedStyle(event.target.firstElementChild, null).getPropertyValue("background-color")
    event.target.style.backgroundColor = newColor
    
    // Display the current section
    const sectionID = event.target.dataset.section
    document.getElementById(sectionID).classList.add('is-shown')
    
    // Save currently active button in localStorage
    const buttonID = event.target.getAttribute('id')
    settings.set('activeSectionButtonId', buttonID)
}


// The default button to click on if nothing is stored
function activeDefaultSection () {
    document.getElementById('nav-settings').click()
}


// Display the main content in the correct area
function showMainContent () {
    document.querySelector('.js-nav').classList.add('is-shown')
    document.querySelector('.js-content').classList.add('is-shown')
}


// Hide the sections that area no longer required
function hideAllSections () {
    const sections = document.querySelectorAll('.js-section.is-shown')
    Array.prototype.forEach.call(sections, (section) => {
        section.classList.remove('is-shown')
    })
}


// Deselect any buttons that may be pressed
function deselectAllButtons () {
    const buttons = document.querySelectorAll('.nav-button.is-selected')
    Array.prototype.forEach.call(buttons, (button) => {
        button.classList.remove('is-selected')
        button.style.backgroundColor = "#f2f2f2"
    })
}


// Default to the view that was active the last time the app was open
const sectionId = settings.get('activeSectionButtonId')
if (sectionId) {
    showMainContent()
    const section = document.getElementById(sectionId)
    if (section)
        section.click()
} else {
    activeDefaultSection()
}


// Expand the menu
function expandNav() {
    document.getElementById("nav-sidebar").classList.add("expanded");
}

// Collapse the menu
function collapseNav() {
    document.getElementById("nav-sidebar").classList.remove("expanded");
}