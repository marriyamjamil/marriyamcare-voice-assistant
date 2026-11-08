# 🎙️ MarriyamCare: AI Skincare Voice Assistant

An AI voice assistant that **talks like a real human**. Meet **Marriyam**, a friendly skincare sales and support assistant who listens to your skin concerns, recommends the right products with prices, and builds a skincare routine for you, all through a natural voice conversation in your browser.

🔗 **Live Demo:** [Try it here](https://your-app-name.azurestaticapps.net)

![MarriyamCare Screenshot](screenshot.png)

---

## ✨ Features

- 🎙️ **Real-time voice conversation**: talk naturally, just like a phone call
- 🧠 **Human-like AI**: fast replies, lets you interrupt, natural speech
- 💬 **Live transcript**: see the conversation as it happens
- 🌸 **Animated voice orb**: glows and moves with Marriyam's voice
- 🔇 **Mute / unmute** during calls
- 🛍️ **Product sidebar**: bestselling skincare products with prices
- 📱 **Responsive design**: works on desktop and mobile

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML, CSS, JavaScript** | Frontend UI |
| **[Vapi](https://vapi.ai)** (`@vapi-ai/web`) | Real-time voice AI (speech-to-text, AI model, text-to-speech) |
| **Azure Static Web Apps** | Hosting and deployment |
| **GitHub Actions** | Automatic deployment |

---

## ⚙️ How It Works

```
🎤 You speak → @vapi-ai/web → Vapi (Speech-to-Text → AI → Text-to-Speech) → 🔊 Marriyam replies
```

1. You click the mic button and the browser connects to Vapi.
2. Your voice is streamed live and turned into text.
3. The AI model (with Marriyam's personality and product knowledge) writes a reply.
4. The reply is turned into a natural voice and played back, in under a second.

---

## 📁 Project Structure

```
marriyamcare-voice-assistant/
├── index.html    # Page layout
├── style.css     # Design and animations
├── app.js        # Vapi voice logic and transcript
├── config.js     # Vapi public key and assistant ID
└── README.md
```

---

## 🚀 Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/marriyamjamil/marriyamcare-voice-assistant.git
   cd marriyamcare-voice-assistant
   ```

2. **Create a Vapi assistant**
   - Sign up at [dashboard.vapi.ai](https://dashboard.vapi.ai)
   - Create an assistant and add the Marriyam system prompt
   - Copy your **Public Key** and **Assistant ID**

3. **Add your keys** in `config.js`
   ```js
   export const VAPI_PUBLIC_KEY = "your-public-key";
   export const VAPI_ASSISTANT_ID = "your-assistant-id";
   ```

4. **Start a local server**
   ```bash
   python -m http.server 5500
   ```

5. Open **http://localhost:5500** and click the mic 🎙️

> ⚠️ Only use your **Public Key**. Never share or upload your **Private Key**.

---

## ☁️ Deployment

Deployed on **Azure Static Web Apps** with automatic deployment through GitHub Actions. Every push to `main` updates the live site.

---

## 🗣️ Try Saying

- *"Hi, I have oily skin and get acne a lot. What should I use?"*
- *"Which serum is best for dark spots?"*
- *"I'm new to skincare. Can you give me a simple routine?"*
- *"What's in the Glow Essentials Kit and how much is it?"*

---

## 🔮 Future Improvements

- [ ] Place orders by voice
- [ ] Connect to a real product database
- [ ] Urdu language support
- [ ] Save conversation history

---

## ⚠️ Disclaimer

Marriyam gives general skincare guidance, not medical advice. Please see a dermatologist for skin conditions.

---

## 👩‍💻 Author

**Marriyam Jamil**
- GitHub: [@marriyamjamil](https://github.com/marriyamjamil)

⭐ If you like this project, give it a star!
