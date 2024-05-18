const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const speechButton = document.querySelector("button");


//* tarayıcı tarafından kullandığımız speechSynthesis API  
let synth = speechSynthesis;

let isSpeaking = true;//*Konuşma durumu

voices();

function voices(){
    //*tarayıcıdan API Sayesinde sesleri alıp select' ekledik bu fonksiyon ile

    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";//* default olarak başlangıcta ingilizce secili olsun

        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend",option)
    }
}


//* ses seçenekleri değiştiğinde sesleri tekrar listeler
synth.addEventListener("voiceschanged",voices);

function textToSpeech(text){
    //*metni sesli okuyan fonksiyon

    let utterance = new SpeechSynthesisUtterance(text);

    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice  =voice;//* açılır listeden seçilen ses ile okur
        }
    };

    utterance.addEventListener("end",() =>{
        isSpeaking =false;
        document.querySelector(".placeholder").style.display ="none";
    });

    synth.speak(utterance);
    isSpeaking=true;
}

speechButton.addEventListener("click",(e) =>{
    e.preventDefault();

    if(textarea.value !== ""){
        if(!synth.speaking){//* eğer konusmuyorsa
            textToSpeech(textarea.value);
            document.querySelector(".placeholder").style.display="block";
        }
    }
});