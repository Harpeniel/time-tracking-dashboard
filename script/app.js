import { cloneTemplate, fetchCard, generateCard, handleClick } from "./dom.js";

const btns = Array.from(document.querySelectorAll('button'))
let cards = []
try {
  cards = await fetchCard('../data.json')
} catch (e) {
  console.log(e.message)
}

for (const card of cards) {
  const cardElement = cloneTemplate('card-template')
  document.querySelector('.container').append(generateCard(card, cardElement))
}

for (const btn of btns) {
  btn.addEventListener('click', (e) => handleClick(e, cards))
}



