//your JS code here. If required.
//your JS code here. If required.
// script.js

// Function to set a cookie with a given name, value, and expiration time
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Function to retrieve the value of a cookie with a given name
function getCookie(name) {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return '';
}

// Function to apply the saved preferences from cookies
function applyPreferences() {
  const fontsizeInput = document.getElementById('fontsize');
  const fontcolorInput = document.getElementById('fontcolor');
  
  const savedFontsize = getCookie('fontsize');
  const savedFontcolor = getCookie('fontcolor');
  
  if (savedFontsize) {
    fontsizeInput.value = savedFontsize;
    document.documentElement.style.setProperty('--fontsize', `${savedFontsize}px`);
  }
  
  if (savedFontcolor) {
    fontcolorInput.value = savedFontcolor;
    document.documentElement.style.setProperty('--fontcolor', savedFontcolor);
  }
}

// Function to handle the form submission and save the preferences as cookies
function handleFormSubmit(event) {
  event.preventDefault();
  
  const fontsizeInput = document.getElementById('fontsize');
  const fontcolorInput = document.getElementById('fontcolor');
  
  const fontsize = fontsizeInput.value;
  const fontcolor = fontcolorInput.value;
  
  document.documentElement.style.setProperty('--fontsize', `${fontsize}px`);
  document.documentElement.style.setProperty('--fontcolor', fontcolor);
  
  setCookie('fontsize', fontsize, 365);
  setCookie('fontcolor', fontcolor, 365);
}

// Apply saved preferences when the page loads
document.addEventListener('DOMContentLoaded', applyPreferences);

// Add form submit event listener
const preferencesForm = document.getElementById('preferencesForm');
preferencesForm.addEventListener('submit', handleFormSubmit);