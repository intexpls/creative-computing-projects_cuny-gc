const chatbotTree = {
    start: {
        message: `Hi there! 

        I can help with with different ADHD-related sewing/crafting struggles. What help do you need?`,
        options: [
            { label: "Start a project", next: "start_step" },
            { label: "Get unstuck", next: "unstuck" },
            { label: "Get into the mood/swing", next: "get_into" },
            { label: "Finish a projech", next: "finish" }
        ]
    },
    
    // Steps 1
    start_step: {
        message: "Do you know how to create the thing?",
        options: [
            {label: "Yes", next: "start_create_yes" },
            {label: "No", next: "start_create_no"}
        ]
    },
    // Steps 2
    start_create_yes: {
            message: "Do you know what materials you need?",
            options: [
                {label: "Yes", next: "start_materials_yes" },
                {label: "No", next: "start_materials_no"}
            ]
        },
    start_create_no: {
            message: "Try some tutorials on the Tutorials page.",
            options: [
                {label: "Okay!", next: "end" }
            ]
        },
    // Steps 3
    start_materials_yes: {
            message: "Okay, so what's the problem?",
            options: [
                {label: "I don't feel motivated", next: "start_no_motivation" },
                {label: "I feel overwhelmed", next: "start_overwhelm"}
            ]
        },
    start_materials_no: {
            message: "Take a closer look at the brief and try to list all of them. If some are unidentifiable, try to guess the closest/replacement.",
            options: [
                {label: "Okay", next: "end" }
            ]
        },

        // Steps 4
    start_no_motivation: {
            message: "That sucks! Let's try to see if we can bring to back. Depending on the time of the day, you might be in the low energy stage. Stand up, dance to two songs you love. Drink two glasses of water, set a timer for 5 minutes and do the smallest meaningful step.",
            options: [
                {label: "Okay, let's try.", next: "end" }
            ]
        },
    start_overwhelm: {
            message: "That sucks! Let's try to bring you out of it. Write down everything that is on your mind - all tasks, ideas, worrisome thoughts. Put it aside. Take 10 deep breaths. Select the smallest meaningful task for this project and do it for 5 minutes.",
            options: [
                {label: "Okay, let's try.", next: "end" }
            ]
        },

    // end
    end: {
            message: "Okay, glad to be able to help."
        }
};

let currentState = "start";
const chatBox = document.getElementById("chat-box");

function renderStep(stepKey) {
    const step = chatbotTree[stepKey];
    
    // Add bot message
    appendMessage(step.message, "bot");

    // Clear old buttons if you have a specific container, or just append new ones
    if (step.options && step.options.length > 0) {
        const btnContainer = document.createElement("div");
        btnContainer.className = "button-group"; // Add CSS for layout
        
        step.options.forEach(opt => {
            const btn = document.createElement("button");
            btn.innerText = opt.label;
            btn.onclick = () => {
                appendMessage(opt.label, "user");
                btnContainer.remove(); // Remove options after selection
                setTimeout(() => renderStep(opt.next), 500);
            };
            btnContainer.appendChild(btn);
        });
        chatBox.appendChild(btnContainer);
    }
}

function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${sender}`;
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);

    scrollToBottom();
}

function scrollToBottom() {
    const chatBox = document.getElementById("chat-box");
    
    requestAnimationFrame(() => {
        chatBox.scrollTo({
            top: chatBox.scrollHeight,
            behavior: 'smooth'
        });
    });
}

// Start the bot
renderStep("start");