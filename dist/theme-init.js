(function () {
  var stored = localStorage.getItem('axiom-theme');
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
})();
console.log('%cThe map is not the territory \u2014 and this is just the map. Welcom developer.', 'color:#2C4A3E;font-family:IBM Plex Mono,monospace;font-size:13px;');
