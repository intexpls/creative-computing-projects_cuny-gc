async function getRandomPracticeTask() {
    try {

        // 1. Get the fields to fill w/ content
        const results = document.getElementById('result');
        const task_name = document.getElementById('task-name');
        const task_description = document.getElementById('task-description');
        const task_image = document.getElementById('task-image');
        const task_link = document.getElementById('task-link');
        const tag_type = document.getElementById('tag-type');
        const tag_area = document.getElementById('tag-area');
        const tag_scope = document.getElementById('tag-scope');
        const tag_time = document.getElementById('tag-time');

        // 2. Fetch the locally stored CSV file
        const response = await fetch('./data/practice_tasks.csv');
        const csvText = await response.text();

        // 3. Split CSV into rows, remove empty lines and separate headers
        const lines = csvText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        const dataRows = lines.slice(0);

        // 4. Get a random row of data and split it into separate elements
        const randomIndex = Math.floor(Math.random() * dataRows.length);
        const randomRow = dataRows[randomIndex];
        const columns = randomRow.split(',');

        // 5. Show the results section and populate it with data
        results.style.display = "flex";

        // Tags
        tag_type.textContent = columns[4];
        tag_area.textContent = columns[5];
        tag_scope.textContent = columns[6];
        tag_time.textContent = columns[7];

        // Task content
        task_name.textContent = columns[0];
        task_description.textContent = columns[1];

        // Visual ref
        task_image.innerHTML = columns[8];
        task_link.innerHTML = "If the embed above doesn't work, please find the ref by <a href='" + columns[3] + "'>" + "this link" + "</a>.</p>";


    } catch (error) {
        console.error("Error processing CSV:", error);
    }
}


