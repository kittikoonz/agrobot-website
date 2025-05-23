// AI Assistant Standalone Chat Logic
const chatMessages = document.getElementById('glass-chat-messages');
const userInput = document.getElementById('glass-user-input');
const sendButton = document.getElementById('glass-send-button');

const adminResponses = {
    basic: {
        greeting: [
            "Welcome to our <b>Basic Plan</b> consultation!",
            "I'm here to help you with:",
            "- Understanding the Basic Plan features",
            "- Setting up your first bot",
            "- Payment processing",
            "- Getting started with automation"
        ],
    },
    professional: {
        greeting: [
            "Welcome to our <b>Professional Plan</b> consultation!",
            "I'm here to help you with:",
            "- Multiple bot licenses",
            "- Advanced features",
            "- Priority support",
            "- Customization options"
        ],
    },
    enterprise: {
        greeting: [
            "Welcome to our <b>Enterprise Plan</b> consultation!",
            "I'm here to help you with:",
            "- Unlimited licenses",
            "- 24/7 Support",
            "- Custom solutions",
            "- API access"
        ],
    },
    default: {
        greeting: [
            "Welcome to the <b>AI Assistant</b>!",
            "How can I help you today?",
            "You can ask about our bots, pricing, or automation solutions."
        ],
    }
};

function getPlanFromURL() {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get('plan');
    if (["basic","professional","enterprise"].includes(plan)) return plan;
    return 'default';
}

function addMessage(text, isBot = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `glass-message ${isBot ? 'bot' : 'user'}`;
    const contentDiv = document.createElement('div');
    contentDiv.className = 'glass-message-content';
    contentDiv.innerHTML = text;
    // Add visual distinction for bot greeting
    if (isBot && chatMessages.childElementCount === 0) {
        contentDiv.style.background = 'linear-gradient(120deg, #00cfff 60%, #00ff99 100%)';
        contentDiv.style.color = '#181c24';
        contentDiv.style.fontWeight = '600';
        contentDiv.style.boxShadow = '0 2px 16px #00cfff33';
    }
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function startChat(planType) {
    chatMessages.innerHTML = '';
    const greeting = adminResponses[planType].greeting.join('<br>');
    addMessage(greeting, true);
}

function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    addMessage(message, false);
    userInput.value = '';
    setTimeout(() => {
        addMessage("I'm here to help! (This is a demo response.)", true);
    }, 900);
}

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// On load
const planType = getPlanFromURL();
startChat(planType);
userInput.focus(); 