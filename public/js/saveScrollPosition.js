window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const scrollPosition = urlParams.get('scrollPosition');
  const openTask = urlParams.get('openTask');

  // Scroll to the saved position
  window.scrollTo(0, scrollPosition);

  if (openTask) {
    // Open the corresponding details element and scroll to the task
    const taskElement = document.getElementById(`task-${openTask}`);
    if (taskElement) {
      const detailsElement = taskElement.closest('details');
      if (detailsElement) {
        detailsElement.open = true; // Open the details element
      }
      taskElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll to the task
    }
  }
};