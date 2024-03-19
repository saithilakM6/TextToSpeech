const textarea = document.querySelector("#text");
const voiceList = document.querySelector("#voiceList");
const speechBtn = document.querySelector("#speechBtn");

let synth = speechSynthesis;
let currentUtterance;

// Function to populate the voice list
function populateVoiceList() {
    voiceList.innerHTML = ''; // Clear the voice list
    const voices = synth.getVoices();

    if (voices.length > 0) {
        for (let voice of voices) {
            let selected = voice.name === "Google US English" ? "selected" : "";
            let option = `<option value="${voices.indexOf(voice)}" ${selected}>${voice.name} (${voice.lang})</option>`;
            voiceList.insertAdjacentHTML("beforeend", option);
        }
    } else {
        console.error("No voices available.");
    }
}

// Event listener for the voices changed event
synth.onvoiceschanged = () => {
    // Populate the voice list when voices are available
    populateVoiceList();
};

// Initialize voices on page load
populateVoiceList();

// Event listener for the button click
speechBtn.addEventListener("click", () => {
    if (textarea.value.trim() !== "") {
        if (synth.speaking) {
            synth.pause();
            speechBtn.innerText = "Resume Speech";
        } else {
            textToSpeech(textarea.value);
            speechBtn.innerText = "Pause Speech";
        }
    }
});

// Event listener for the voice list change
voiceList.addEventListener("change", () => {
    // Fetch voices when the user changes the selection
    synth.getVoices();
});

function textToSpeech(text) {
    // Use the selected voice
    const selectedVoiceIndex = voiceList.value;
    const voices = synth.getVoices();
    const selectedVoice = voices[selectedVoiceIndex];

    // Create and configure the utterance
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.voice = selectedVoice;

    // Speak the text
    synth.speak(currentUtterance);
}
