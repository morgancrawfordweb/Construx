
function addField() {
            const container = document.getElementById('dynamicTaskDetailField');
            const newField = document.createElement('div');
            newField.classList.add('task-detail')
            newField.innerHTML = `
                <label for="taskDetail" class="form-label">Task</label>
                <input type="text" class=" form-control" placeholder="Enter your task here" id="taskDetail" name="taskDetail[]">
                <button type="button" class="btn btn-secondary" onclick="removeField(this)">Remove</button>
            `;
            container.appendChild(newField);
        }

        function removeField(button) {
            // const container = document.getElementById('dynamicTaskDetailField');
            // container.removeChild(button.parentElement);
            const fieldToRemove = button.parentElement;
            fieldToRemove.parentElement.removeChild(fieldToRemove);
        }