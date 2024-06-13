// function addField() {
//     // Create a new div element
//     var newDiv = document.createElement("div");

//     // Create a new input element
//     var newInput = document.createElement("input");
//     newInput.type = "text";
//     newInput.name = "taskDetail"; // Use [] to create an array of input values

//     // Create a new button to remove the field
//     var removeButton = document.createElement("button");
//     removeButton.innerHTML = "Remove";
//     removeButton.type = "button";
//     removeButton.onclick = function() {
//         newDiv.remove();
//     };

//     // Append the new input and button to the new div
//     newDiv.appendChild(newInput);
//     newDiv.appendChild(removeButton);

//     // Append the new div to the container
//     document.getElementById("dynamicFieldsContainer").appendChild(newDiv);
// }