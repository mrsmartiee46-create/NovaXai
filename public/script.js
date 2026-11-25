
const content = document.getElementById("content");

function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("show");
}

function escapeHTML(text) {
  return text.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function openTool(tool) {

  document.querySelectorAll(".nav").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.tool === tool
    );
  });

  if (tool === "home") {
    location.reload();
    return;
  }

  const tools = {
    chat: ["AI Chat", "Talk with NovaX AI."],
    image: ["Image Studio", "Create images from your ideas."],
    writer: ["AI Writer", "Create articles and stories."],
    code: ["Code Assistant", "Get help with programming."],
    translate: ["Translator", "Translate your text."],
    study: ["Study Assistant", "Learn difficult topics."]
  };

  const title = tools[tool][0];
  const description = tools[tool][1];

  let panel = "";

  if (tool === "chat") {
    panel = `
      <div class="workspace">
        <div class="messages" id="messages">
          <div class="message bot">
            నమస్కారం! Welcome to NovaX AI.
            Ask me in Telugu or English.
            This is currently a demo chatbot.
          </div>
        </div>

        <div class="search-box">
          <input id="chatInput"
            placeholder="Ask anything..."
            onkeydown="if(event.key==='Enter') sendChat()">

          <button onclick="sendChat()">➤</button>
        </div>
      </div>`;
  }

  else {
    panel = `
      <div class="workspace">
        <label>Enter your request</label>

        <textarea id="toolInput"
          placeholder="Type here..."></textarea>

        <button class="action"
          onclick="runTool('${tool}')">
          Continue
        </button>

        <div id="toolOutput" class="output"></div>

        <p class="hint">
          Connect an AI service to enable real AI functionality.
        </p>
      </div>`;
  }

  content.innerHTML = `
    <button class="back" onclick="openTool('home')">
      ← Dashboard
    </button>

    <div class="welcome">
      <span class="eyebrow">NOVAX AI WORKSPACE</span>
      <h1>${title}</h1>
      <p>${description}</p>
    </div>

    ${panel}
  `;

  document.getElementById("sidebar").classList.remove("show");
}

// Demo chatbot

function getReply(question) {
  const q = question.toLowerCase();

  if (q.includes("hello") || q.includes("hi")) {
    return "Hello! Welcome to NovaX AI. How can I help you?";
  }

  if (q.includes("నీ పేరు") || q.includes("name")) {
    return "My name is NovaX AI. మీకు స్వాగతం!";
  }

  if (q.includes("telugu") || q.includes("తెలుగు")) {
    return "నమస్కారం! నేను NovaX AI. మీకు ఎలా సహాయం చేయగలను?";
  }

  if (q.includes("html")) {
    return "HTML is used to create the structure of websites.";
  }

  if (q.includes("css")) {
    return "CSS is used to design and style websites.";
  }

  if (q.includes("javascript")) {
    return "JavaScript makes websites interactive.";
  }

  if (q.includes("website")) {
    return "A website is a collection of web pages built using HTML, CSS and JavaScript.";
  }

  return "I received your question! This is the NovaX AI demo mode. Connect a real AI API for intelligent answers.";
}

function sendChat() {
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("messages");

  const question = input.value.trim();

  if (!question) return;

  messages.innerHTML += `
    <div class="message user">
      ${escapeHTML(question)}
    </div>

    <div class="message bot">
      ${escapeHTML(getReply(question))}
    </div>
  `;

  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}

// Homepage search

function sendMainPrompt() {
  const input = document.getElementById("mainPrompt");
  const question = input.value.trim();

  if (!question) return;

  openTool("chat");

  setTimeout(() => {
    document.getElementById("chatInput").value = question;
    sendChat();
  }, 100);
}

// Other tool demo

function runTool(tool) {
  const input = document.getElementById("toolInput");
  const output = document.getElementById("toolOutput");

  const value = input.value.trim();

  if (!value) {
    alert("Please enter your request.");
    return;
  }

  if (tool === "writer") {
    output.textContent =
      "Writing outline for: " + value +
      "\n\n1. Introduction\n2. Main points\n3. Examples\n4. Conclusion\n\nThis is a sample outline, not AI-generated content.";
  }

  else if (tool === "image") {
    output.textContent =
      "Your image prompt:\n" + value +
      "\n\nCopy this prompt into an image generation service to create an image.";
  }

  else if (tool === "code") {
    output.textContent =
      "Coding request:\n" + value +
      "\n\nConnect an AI coding service for generated code.";
  }

  else if (tool === "translate") {
    output.textContent =
      "Text ready for translation:\n" + value +
      "\n\nConnect a translation service for actual translations.";
  }

  else if (tool === "study") {
    output.textContent =
      "Study topic:\n" + value +
      "\n\nConnect an AI service for detailed explanations.";
  }
}

// Navigation buttons

document.querySelectorAll(".nav").forEach(button => {
  button.addEventListener("click", () => {
    openTool(button.dataset.tool);
  });
});
