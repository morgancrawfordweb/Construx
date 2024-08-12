document.querySelector('.signature-btn').addEventListener('click', function() {
    document.getElementById('scrollPosition').value = window.scrollY;
});

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const scrollPosition = urlParams.get('scrollPosition') || 0;
    window.scrollTo(0, scrollPosition);
  };

