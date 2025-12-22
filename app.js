// app.js

document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("Starting DJM boot sequence...");

    // 1️⃣ Auth
    await initAuth(); // <-- now guaranteed to exist
    console.log("Auth completed.");

    // 2️⃣ DB Initialization
    if (typeof initDB === "function") {
      await initDB();
      console.log("Database initialized.");
    }

    // 3️⃣ AI Engine Init
    if (typeof initAIEngine === "function") {
      await initAIEngine();
      console.log("AI Engine initialized.");
    }

    // 4️⃣ Voice Engine Init
    if (typeof initVoiceEngine === "function") {
      await initVoiceEngine();
      console.log("Voice Engine initialized.");
    }

    // 5️⃣ Render UI
    if (typeof initUI === "function") {
      initUI();
      console.log("UI rendered.");
    }

    console.log("DJM Boot Complete ✅");

  } catch (err) {
    console.error("DJM Boot failed:", err);
  }
});