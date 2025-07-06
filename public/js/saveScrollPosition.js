function saveScrollPosition(taskId) {
  localStorage.setItem('currentTaskId', taskId);
}

function scrollToTask() {
  const taskId = localStorage.getItem('currentTaskId');

  if (taskId) {
      const taskElement = document.getElementById(`task-${taskId}`);
      if (taskElement) {
          const detailsElement = taskElement.closest('details');
          if (detailsElement) {
              detailsElement.open = true;
          }
          setTimeout(() => { // Delay scroll to ensure rendering
              taskElement.scrollIntoView({ behavior: 'instant', block: 'center' });
              localStorage.removeItem('currentTaskId'); // Clear after use
          }, 100);
      } else {
          console.error(`Task element with ID task-${taskId} not found.`);
          localStorage.removeItem('currentTaskId'); // Clear if task not found
      }
  }
}

document.addEventListener('DOMContentLoaded', scrollToTask);