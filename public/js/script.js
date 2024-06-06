// // Function to toggle header menu in mobile view.
// function toggleMenu(flag) {
//     let value = document.getElementById("menu");
//     if (flag) {
//         value.classList.remove("hidden");
//     } else {
//         value.classList.add("hidden");
//     }
// }


// //javascript for the calendar

// // Get the current date
// const today = new Date();

// // Set the date to the first day of the month
// const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

// // Get the number of days in the month
// const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
// const numDaysInMonth = lastDayOfMonth.getDate();

// // Calculate the day of the week of the first day of the month (0 = Sunday, 1 = Monday, etc.)
// const firstDayOfWeek = firstDayOfMonth.getDay();

// // Get a reference to the calendar body element
// const calendarBody = document.getElementById("calendar-body");

// // Clear the existing calendar
// calendarBody.innerHTML = "";

// // Generate the calendar rows and cells
// let date = 1;
// for (let row = 0; row < 6; row++) {
//   const calendarRow = document.createElement("tr");
//   for (let col = 0; col < 7; col++) {
//     const calendarCell = document.createElement("td");
//     const cellContent = document.createElement("div");
//     cellContent.classList.add("px-2", "py-2", "cursor-pointer", "flex", "w-full", "justify-center");

//     if (row === 0 && col < firstDayOfWeek) {
//       // This cell is in the "padding" before the first day of the month
//       cellContent.textContent = "";
//       calendarCell.appendChild(cellContent);
//     } else if (date > numDaysInMonth) {
//       // This cell is in the "padding" after the last day of the month
//       cellContent.textContent = "";
//       calendarCell.appendChild(cellContent);
//     } else {
//       // This cell is a valid date in the current month
//       cellContent.textContent = date;
//       calendarCell.appendChild(cellContent);
//       date++;
//     }

//     calendarRow.appendChild(calendarCell);
//   }

//   calendarBody.appendChild(calendarRow);
// }