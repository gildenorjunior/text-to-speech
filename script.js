const synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance()

const select = document.querySelector("#voices");
const text = document.querySelector('#text-area');
const buttonSpeech = document.querySelector('#play-speech');

let vozes;
let estaFalando = false;

function carregaVozes() {
    vozes = synth?.getVoices();
}

function criaElementoOption(conteudo) {
    let option = document.createElement('option');
    option.textContent = conteudo;
    option.value = conteudo;

    return option;
}

function insereVozesSelect() {
    for (let i = 0; i < vozes.length; i++) {
        select.appendChild(criaElementoOption(vozes[i]?.voiceURI));
    }
}

function configuraUtterance() {
    utterance.text = text?.value;
    utterance.volume = 1;
    utterance.voice = vozes[select.selectedIndex];
}

function play() {
    buttonSpeech.addEventListener('click', () => {
        if (text.value !== '') {
            if (!synth.speaking) {
                configuraUtterance();
                synth.speak(utterance);
                estaFalando = true;
                buttonSpeech.textContent = 'Pause';
            } else if (estaFalando && synth.speaking) {
                synth.pause();
                estaFalando = false;
                buttonSpeech.textContent = 'Resume';
            } else {
                synth.resume();
                estaFalando = true;
                buttonSpeech.textContent = 'Pause';
            }

            setInterval(() => {
                if (estaFalando && !synth.speaking) {
                    estaFalando = true;
                    buttonSpeech.textContent = 'Speech';
                }
            });
        }
    })
}

window.addEventListener("load", () => {
    carregaVozes();
    insereVozesSelect();
    play();
});
