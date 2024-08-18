document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('companyId');
    if (companyId) {
      document.getElementById('companyId').value = companyId;
    }
  });