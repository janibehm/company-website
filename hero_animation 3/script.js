const waveContainer = document.querySelector('.light-wave-container');

// Listen for mouse movement across the document
document.addEventListener('mousemove', (e) => {
  // Calculate mouse position relative to the center of the screen
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  // Apply a subtle opposite shift to the container
  waveContainer.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
});