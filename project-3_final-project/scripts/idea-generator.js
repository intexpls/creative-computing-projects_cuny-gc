async function getRandomWords() {

    // 1. Get the selected word
    const dropdown = document.getElementById('clothingSelect');
    const selectedWord = dropdown.value;

    try {

        // 2. Get the data
        const response = await fetch('./data/lateral.csv'); 
        const text = await response.text();

        // 2. Prep the data 
        const allWords = text.split('\n')
            .map(row => row.trim())
            .filter(row => row !== "")
            .slice(1); 

        // 3. Shuffle the data and pick 4 random items
        const selected = allWords.sort(() => 0.5 - Math.random()).slice(0, 4);

        // 4. Gather the fields to populate with data
        const cards = document.querySelectorAll('.cards-box');
        const boxes = document.querySelectorAll('.lat-word');
        const img_box = document.querySelectorAll('.item');

        // 5. Populate the results
        selected.forEach((word, index) => {
                    if (cards[index]) {
                        cards[index].style.display = 'flex'; 
                    }
                });

        selected.forEach((word, index) => {
            if (boxes[index]) {
                boxes[index].innerHTML = `<p>${word}</p>`;
                boxes[index].style.display = 'flex'; 
            }
        });

        selected.forEach((item, index) => {
            const img = img_box[index].querySelector('img');
            img.src = `./assets/${selectedWord}.png`; 

            if (img_box[index]) {
                img_box[index].style.display = 'flex';
            }
        });

        

    } catch (error) {
        console.error("Error loading CSV:", error);
    }
}

document.getElementById('generateBtn').addEventListener('click', getRandomWords);