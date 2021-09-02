/**
 * 3 elements: ids [text-anim-pre, text-anim, text-anim-cursor]
 * 
 * I could make the words not hardcoded but this will only ever appear in one spot
 */

const el = document.querySelector("#text-anim");
const words = [
  "got one of these text animation things.",
  "got obsessively high levels of attention to detail put into it.",
  "got one of the last ad-free experiences left on the internet.",
  "another code monkey undergrad’s personal site."
];
let word = 0;
let char = 0;
let intervalHandle;
const time_del = 40;
const time_type = 80;
const time_empty = 200;
const time_full = 2500;

function typeWord() {
  el.innerHTML += words[word][char];
  char++;
  if (el.innerHTML.length >= words[word].length) {
    clearInterval(intervalHandle);

    if (word === words.length - 1) {
      setTimeout(() => { document.querySelector("#text-anim-cursor").innerHTML = "█"; }, 300);
      return; // delete this to loop forever
    }

    setTimeout(() => {
      intervalHandle = setInterval(deleteWord, time_del);
    }, time_full);
  }
}

function deleteWord() {
  el.innerHTML = words[word].substring(0, char - 1);
  char--;

  if (words[next(word)].lastIndexOf(el.innerHTML, 0) === 0) { // if current is a prefix of the next
    clearInterval(intervalHandle);
    word = next(word);
    char = el.innerHTML.length;


    setTimeout(() => {
      intervalHandle = setInterval(typeWord, time_type);
    }, time_empty);
  }
}

function next(i) {
  return (i + 1) % (words.length);
}

// noscript friendly. no joke > half a joke
document.querySelector("#text-anim-pre").innerHTML = "Yup, it's ";
document.querySelector("#text-anim-cursor").innerHTML = "|";
// start animation
intervalHandle = setInterval(typeWord, 100);