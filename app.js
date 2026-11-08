import VapiModule from "https://esm.sh/@vapi-ai/web";
import { VAPI_PUBLIC_KEY, VAPI_ASSISTANT_ID } from "./config.js";

// esm.sh may wrap the CommonJS default export, so handle both shapes
const Vapi = VapiModule.default ?? VapiModule;

// ---------- Products shown in the sidebar ----------
const PRODUCTS = [
  { icon: "🍊", name: "Vitamin C Glow Serum", meta: "Dull skin · dark spots", price: 2499 },
  { icon: "💧", name: "Hyaluronic Acid Serum", meta: "Dry · dehydrated skin", price: 1999 },
  { icon: "🌿", name: "Niacinamide 10% + Zinc", meta: "Acne · oily skin", price: 1899 },
  { icon: "🌙", name: "Retinol Night Repair", meta: "Fine lines · texture", price: 2799 },
  { icon: "☀️", name: "Invisible Sunscreen SPF 50", meta: "All skin types", price: 1799 },
  { icon: "🫧", name: "Gentle Foaming Cleanser", meta: "Oily · combination", price: 1299 },
  { icon: "🎁", name: "Glow Essentials Kit", meta: "5 products · save Rs. 1,096", price: 5999 },
];

const productList = document.getElementById("products");
productList.innerHTML = PRODUCTS.map(p => `
  <li class="product">
    <span class="icon">${p.icon}</span>
    <div><div class="name">${p.name}</div><div class="meta">${p.meta}</div></div>
    <span class="price">Rs. ${p.price.toLocaleString("en-PK")}</span>
  </li>`).join("");

// ---------- Elements ----------
const callBtn = document.getElementById("callBtn");
const muteBtn = document.getElementById("muteBtn");
const statusEl = document.getElementById("status");
const orbRing = document.getElementById("orbRing");
const micIcon = document.getElementById("micIcon");
const endIcon = document.getElementById("endIcon");
const transcriptEl = document.getElementById("transcript");

// ---------- State ----------
const vapi = new Vapi(VAPI_PUBLIC_KEY);
let state = "idle"; // idle | connecting | active
let muted = false;
let partialBubble = null;

function setStatus(text, live = false) {
  statusEl.textContent = text;
  statusEl.classList.toggle("live", live);
}

function setState(next) {
  state = next;
  callBtn.classList.toggle("connecting", next === "connecting");
  callBtn.classList.toggle("active", next === "active");
  callBtn.disabled = next === "connecting";
  micIcon.classList.toggle("hidden", next === "active");
  endIcon.classList.toggle("hidden", next !== "active");
  muteBtn.classList.toggle("hidden", next !== "active");
  callBtn.setAttribute("aria-label", next === "active" ? "End call" : "Start call");
  if (next === "idle") orbRing.style.transform = "scale(1)";
}

function addMessage(role, text, { partial = false } = {}) {
  transcriptEl.querySelector(".empty")?.remove();

  // Update the live (partial) bubble instead of adding a new one each time
  if (partialBubble && partialBubble.dataset.role === role) {
    partialBubble.querySelector(".text").textContent = text;
    partialBubble.classList.toggle("partial", partial);
    if (!partial) partialBubble = null;
  } else {
    if (partialBubble) { partialBubble.remove(); partialBubble = null; }
    const div = document.createElement("div");
    div.className = `msg ${role}${partial ? " partial" : ""}`;
    div.dataset.role = role;
    const label = role === "assistant" ? "Marriyam" : role === "user" ? "You" : "";
    div.innerHTML = `${label ? `<span class="who">${label}</span>` : ""}<span class="text"></span>`;
    div.querySelector(".text").textContent = text;
    transcriptEl.appendChild(div);
    if (partial) partialBubble = div;
  }
  transcriptEl.scrollTop = transcriptEl.scrollHeight;
}

// ---------- Button handlers ----------
callBtn.addEventListener("click", async () => {
  if (state === "active") {
    vapi.stop();
    return;
  }
  if (VAPI_PUBLIC_KEY.startsWith("YOUR_") || VAPI_ASSISTANT_ID.startsWith("YOUR_")) {
    addMessage("error", "Add your Vapi Public Key and Assistant ID in config.js first.");
    return;
  }
  setState("connecting");
  setStatus("Connecting to Marriyam…");
  try {
    await vapi.start(VAPI_ASSISTANT_ID);
  } catch (err) {
    console.error(err);
    setState("idle");
    setStatus("Couldn't connect. Please try again.");
    addMessage("error", "Connection failed. Check your keys and microphone permission.");
  }
});

muteBtn.addEventListener("click", () => {
  muted = !muted;
  vapi.setMuted(muted);
  muteBtn.textContent = muted ? "🔇 Unmute" : "🎙️ Mute";
  setStatus(muted ? "You're muted" : "Listening…", !muted);
});

// ---------- Vapi events ----------
vapi.on("call-start", () => {
  setState("active");
  setStatus("Listening…", true);
});

vapi.on("call-end", () => {
  setState("idle");
  setStatus("Call ended. Tap to talk again");
  muted = false;
  muteBtn.textContent = "🎙️ Mute";
  partialBubble = null;
});

vapi.on("speech-start", () => setStatus("Marriyam is speaking…", true));
vapi.on("speech-end", () => { if (state === "active") setStatus(muted ? "You're muted" : "Listening…", !muted); });

// Animate the glow ring with the assistant's voice volume (0 to 1)
vapi.on("volume-level", level => {
  orbRing.style.transform = `scale(${1 + Math.min(level, 1) * 0.45})`;
});

// Live transcript
vapi.on("message", msg => {
  if (msg.type === "transcript") {
    addMessage(msg.role, msg.transcript, { partial: msg.transcriptType === "partial" });
  }
});

vapi.on("error", err => {
  console.error("Vapi error:", err);
  setState("idle");
  setStatus("Something went wrong");
  addMessage("error", "Something went wrong with the call. Please try again.");
});
