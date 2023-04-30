const textInput = document.querySelector('#text-input')
const readBtn = document.querySelector('#read-btn')
const pickVoiceBtn = document.querySelector('#pick-voice')

readBtn.addEventListener('click', readText)

pickVoiceBtn.addEventListener('click', getVoices)


function getVoices() {
    fetch(`https://api.elevenlabs.io/v1/voices`)
        .then(res => res.json())
        .then(data => console.log(data.voices))
}

function readText() {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM/`
    const apiKey = "61ad2a2a77b8ecd463b86c358d824a2a"

    const bodyData = {
        text: textInput.value,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
            stability: 0,
            similarity_boost: 0
        }
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'xi-api-key': apiKey,
            'accept': 'audio/mpeg'
          },
          body: JSON.stringify(bodyData)
    })
    .then(res => res.blob())
    .then(blob => {
        const audioURL = URL.createObjectURL(blob);
        const audio = new Audio(audioURL);
        audio.play();
    })


    textInput.value = ""
}
