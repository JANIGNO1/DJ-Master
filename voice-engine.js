let recognition, synth;

function initVoiceEngine() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.onresult = async (e) => {
            const transcript = e.results[0][0].transcript;
            console.log("Voice input:", transcript);
            if (typeof processUserMessage === 'function') {
                await processUserMessage(transcript);
            }
            const voiceIndicator = document.getElementById('voiceIndicator');
            if (voiceIndicator) {
                voiceIndicator.classList.remove('active');
            }
        };
    }

    synth = window.speechSynthesis;
}

function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    synth.speak(utter);
}

function startRecognition() {
    if (recognition) recognition.start();
}