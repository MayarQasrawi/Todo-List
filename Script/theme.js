const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  // Example: switch between two themes
  const root = document.documentElement;

  // Check current primary color
  const currentColor = getComputedStyle(root).getPropertyValue('--second-color').trim();

  if (currentColor === '#ff347f') {
    // Darker theme
    root.style.setProperty('--first-color', '#222');
    root.style.setProperty('--second-color', '#4caf50'); // green
    root.style.setProperty('--third-color', '#388e3c'); 
    root.style.setProperty('--fourth-color', '#81c784');
    root.style.setProperty('--text-light', '#fff');
    root.style.setProperty('--text-muted', '#ccc');

    
  } else {
    // Original theme
    root.style.setProperty('--first-color', '#fafafa');
    root.style.setProperty('--second-color', '#ff347f');
    root.style.setProperty('--third-color', '#c9356c');
    root.style.setProperty('--fourth-color', '#f48db4');
    root.style.setProperty('--text-light', '#fff');
    root.style.setProperty('--text-muted', '#888');
  }
});
