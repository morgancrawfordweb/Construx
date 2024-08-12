function captureScrollPosition(taskId) {
    const scrollPositionInput = document.getElementById(`scrollPosition-${taskId}`);
    scrollPositionInput.value = window.scrollY;
  }