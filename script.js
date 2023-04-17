/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

// Assegna event listener ai box
function setListeners(){
    for(const box of boxes){
        box.addEventListener('click',changeToCheck);
    }
}
// Funzione di reset di scelte e stile 
function restart(){
    const risultato = document.getElementById("restart");
    
    for(let x in scelte){
        delete scelte[x];
    }
    ResetStile();// Questa funzione ha dato problemi e neache tramite un try and catch si è riuscito a trovare la causa,
    // per ovviare al problema a fine funzione si ricarica la pagina 
    setListeners();
    risultato.classList.add("hidden");
    window.scrollTo({top:0,behavior:"smooth"});
    location.reload();
}

// Tramite le risposte date viene assegnato titolo e descrizione 
function TrovaRisposta(risposta){
    const risultato = document.getElementById("restart");
    risultato.querySelector("h1").innerHTML =  RESULTS_MAP[risposta].title;
    risultato.querySelector("p").innerHTML = RESULTS_MAP[risposta].contents;
    risultato.classList.remove("hidden");
    console.log(risultato);
}

// Verifica che siano state date tre risposte tramite i diversi questionID e se la verifica dà 
//esito positivo rimuove gli event listener poi fornendo la risposta reset dello stile della pagina rimuovendo opacità e colore di background
function checkBoxes(){
    if(Object.keys(scelte).length===3){
        for(const box of boxes){
            box.removeEventListener('click',changeToCheck);
        }
        let risposta;
        risposta = scelte.two === scelte.three ? scelte.two : scelte.one;
        TrovaRisposta(risposta);
        window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});
    }
}

// Funzione di reset dello stile della pagina che rimuove l'opacità e colore di background
function ResetStile(){
    for(const box of boxes){
        try{
        box.classList.remove("chosen-box");
        box.classList.remove("nchosen-box");
        }catch(err){mess.innerHTML="L'errore è: "+ err;}
        box.querySelector(".checkbox").src="images/unchecked.png";
    }
}


function CambiaStile(scelta,numscelta){
    for(const box of boxes){
        if(box.dataset.questionId===numscelta){
            for(const box of boxes){
                if(box.dataset.questionId===numscelta){
                box.querySelector(".checkbox").src="images/unchecked.png";
                box.classList.add("nchosenBox");
                }
            }
            scelta.querySelector(".checkbox").src="images/checked.png";
            scelta.classList.add("chosenBox");
            scelta.classList.remove("nchosenBox");
        }
    }
}


function changeToCheck(event){

    const scelta = event.currentTarget; // Tramite current target prendo la box selezionata 
    const numscelta = scelta.dataset.questionId; // Assegna a numscelta la questionID che corrisponde alla box selezionata
    CambiaStile(scelta,numscelta);
    scelte[scelta.dataset.questionId]=scelta.dataset.choiceId;
    checkBoxes();
    console.log(scelte);
}

const scelte={};// Array contenente le scelte effettuate 
const boxes = document.querySelectorAll(".choice-grid div");
setListeners();
const reset = document.getElementById("restart");
reset.addEventListener('click',restart);
