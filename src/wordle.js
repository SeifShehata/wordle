const ANSWER_LENGTH = 5;
const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
const ROUNDS=6;

// I like to do an init function so I can use "await"
async function init() {
  // the state for the app
  let currentGuess = "";
  let currentRow =0;

  // nab the word of the day
    const res = await fetch ("https://words.dev-apis.com/word-of-the-day?random=1");
    const resObj= await res.json();
    const word=resObj.word.toUpperCase();
    let done=false;
   

    const wordParts=word.split("");
    isLoading=false;
    console.log(word);


  // user adds a letter to the current guess
  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
    } else {
      current = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    letters[currentRow * ANSWER_LENGTH + currentGuess.length - 1].innerText =
    letter;   
  }

  async function commit(){
    if (currentGuess.length!=ANSWER_LENGTH){
        //do nothing
        return;
    }
    if(currentGuess===word){
        alert("bravo 3aleek");
        done=true;
        document.querySelector(".brand").innerHTML="YOU WIN!";
        document.querySelector(".brand").classList.add("winner");
    }
    //TODO validate word
    const res=await fetch("https://words.dev-apis.com/validate-word",{
    method: "POST",
    body: JSON.stringify({word:currentGuess})
  });
  const resObj=await res.json();
  const validWord=resObj.validWord;

  if(!validWord){
    alert("not a valid word!")

    return;
  }
    //TODO correct/wrong/close
    const guessParts=currentGuess.split("");
    const map=makeMap(wordParts);
    console.log(map);

    for(let i=0;i<ANSWER_LENGTH;i++){
        if (guessParts[i]===wordParts[i]){
            letters[currentRow*ANSWER_LENGTH+i].classList.add("correct");
            map[guessParts[i]]--;
        }
    }
    for (let i=0;i<ANSWER_LENGTH;i++){
        if (guessParts[i]===wordParts[i]){
           
        }else if(wordParts.includes(guessParts[i])&& map[guessParts[i]>0]){
            letters[currentRow*ANSWER_LENGTH+i].classList.add("close");
            map[guessParts[i]]--;


        }else{
            letters[currentRow*ANSWER_LENGTH+i].classList.add("wrong");

        }
    }

    currentRow++;
    currentGuess="";

    if (currentRow===ROUNDS){
        alert(`5555 the word was ${word}`);
        done=true;
    }
    //TODO win or lose
 

  }

  // use tries to enter a guess
 
    // check the API to see if it's a valid word
    // skip this step if you're not checking for valid words
   


    // first pass just finds correct letters so we can mark those as
    // correct first
  

    // second pass finds close and wrong letters
    // we use the map to make sure we mark the correct amount of
    // close letters
  

  // user hits backspace, if the the length of the string is 0 then do
  // nothing
  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[currentRow * ANSWER_LENGTH + currentGuess.length].innerText = "";
  }

  // let the user know that their guess wasn't a real word
  // skip this if you're not doing guess validation
  
  // listening for event keys and routing to the right function
  // we listen on keydown so we can catch Enter and Backspace
  document.addEventListener("keydown", function handleKeyPress(event) {
    if(done){
        //do nothing
        return;
    }

    const action = event.key;

    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });
}

// a little function to check to see if a character is alphabet letter
// this uses regex (the /[a-zA-Z]/ part) but don't worry about it
// you can learn that later and don't need it too frequently
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading){
    loadingDiv.classList.toggle("hidden",!isLoading);
}

function makeMap (array){
    const obj={};
    for(i=0;i<array.length;i++){
        const letter =array[i];
        if(obj[letter]){
            obj[letter]++;
        }else{
            obj[letter]=1;
        }
    }
    return obj;
}
// show the loading spinner when needed

// takes an array of letters (like ['E', 'L', 'I', 'T', 'E']) and creates
// an object out of it (like {E: 2, L: 1, T: 1}) so we can use that to
// make sure we get the correct amount of letters marked close instead
// of just wrong or correct

init();