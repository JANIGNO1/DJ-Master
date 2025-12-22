let recognition, synth;

function initVoice() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.onresult = async (e) => {
            const transcript = e.results[0][0].transcript;
            console.log("Voice input:", transcript);
            processUserMessage(transcript);
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