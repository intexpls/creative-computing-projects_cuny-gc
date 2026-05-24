async function getRandomFilteredRow() {
    try {

        // 1. Get the selected values from the 4 dropdowns
        const val1 = document.getElementById('itemType-filter').value;
        const val2 = document.getElementById('taskItem-filter').value;
        const val3 = document.getElementById('taskType-filter').value;
        const val4 = document.getElementById('taskScope-filter').value;
        const results = document.getElementById('result');
        const task_name = document.getElementById('task-name');
        const task_description_gen = document.getElementById('task-description_gen');
        const task_description_author = document.getElementById('task-description_author');
        const task_description_ideas = document.getElementById('task-description_ideas');
        const task_description_step = document.getElementById('task-description_step');
        const task_image = document.getElementById('task-image');
        const task_link = document.getElementById('task-link');
        const tag_item = document.getElementById('tag-item');
        const tag_time = document.getElementById('tag-time');
        const tag_area = document.getElementById('tag-area');

        // 2. Fetch the locally stored CSV file
        const response = await fetch('./data/main_task.csv');
        const csvText = await response.text();
        const cleanText = csvText.replace(/^"|"$/g, '')

        console.log(cleanText);

        // 3. Split the CSV into rows and remove empty lines
        const lines = csvText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        
        // Separate headers
        const dataRows = lines.slice(0);

        // 4. Filter rows based on dropdown selections
        const filteredRows = dataRows.filter(row => {
            const columns = row.split(',');
            return columns[0] === val1 && 
                   columns[1] === val2 && 
                   columns[2] === val3 && 
                   columns[3] === val4;
        });

        // 5. Check if any rows matched the filters
        if (filteredRows.length === 0) {            
             alert("No matching tasks for this selection. Try other parameters.");
            
            // Clear out old text fields so the user sees that nothing matched
            task_name.textContent = '';
            task_description.textContent = '';
            
            return null;
        }

        // 6. Pick and return a random row from the filtered results
        const randomIndex = Math.floor(Math.random() * filteredRows.length);
        const randomRow = filteredRows[randomIndex];
        const columns = randomRow.split(',');

        const steps = columns[11].split('; ');
        console.log(steps);

        // 7. Show the results section and populate it w/ data
        results.style.display = "flex";

        tag_time.textContent = columns[12];
        tag_item.textContent = columns[1];
        tag_area.textContent = columns[13];
        task_name.textContent = columns[7];
        task_description_gen.textContent = columns[8];
        task_description_author.innerHTML = "Original designer/creator - " + columns[9];
        task_description_ideas.innerHTML = "<h4>💡 Ideas</h4>" + columns[10];
        task_description_step.innerHTML = "<h4>🪜 Smallest meaningful step(s) to overcome the friction</h4>" + "<ol><li>" + steps.join("</li><li>") + "</li></ol>";
        task_image.innerHTML = columns[6];
        task_link.innerHTML = "If the embed above doesn't work, please find the ref by <a href='" + columns[5] + "'>" + "this link" + "</a>.</p>";


    } catch (error) {
        console.error("Error processing CSV:", error);
    }
}


