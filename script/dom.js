/**
 *
 * @param {string} templateId
 * @return {HTMLElement}
 */
export function cloneTemplate(templateId) {
  const template = document.getElementById(templateId)
  return template.content.cloneNode(true)
}

/**
 * @typedef {Object} Card
 * @property {string} title
 * @property {Object} timeframes
 */
/**
 *
 * @param {string} url
 * @returns {Card[]}
 */
export async function fetchCard(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Error for fetching data")
  }
  return res.json()
}
/**
 *
 * @param {Card} card
 * @param {HTMLElement} cardElement
 * @return {HTMLElement}
 */
export function generateCard(card, cardElement) {
  const cardHeaderElt = cardElement.querySelector('.card__header')
  const cardMainElt = cardElement.querySelector(".card__main")
  const cardMainHeaderTitle = cardElement.querySelector(".card__main__header__title")
  const cardMainContentCurrentTime = cardElement.querySelector(".card__main__content__current-time")
  const cardMainContentPreviousTime = cardElement.querySelector(".card__main__content__previous-time")
  switch (card.title) {
    case "Work":
      cardHeaderElt.style.setProperty("--bg-color", "var(--orange300)")
      cardHeaderElt.style.setProperty(
        "--bg-image",
        'url("../images/icon-work.svg")',
      )
      break
    case "Play":
      cardHeaderElt.style.setProperty("--bg-color", "var(--blue300)")
      cardHeaderElt.style.setProperty(
        "--bg-image",
        'url("../images/icon-play.svg")',
      )
      break
    case "Study":
      cardHeaderElt.style.setProperty("--bg-color", "var(--pink400)")
      cardHeaderElt.style.setProperty(
        "--bg-image",
        'url("../images/icon-study.svg")',
      )
      break
    case "Exercise":
      cardHeaderElt.style.setProperty("--bg-color", "var(--green400)")
      cardHeaderElt.style.setProperty(
        "--bg-image",
        'url("../images/icon-exercise.svg")',
      )
      break
    case "Social":
      cardHeaderElt.style.setProperty("--bg-color", "var(--purple700)")
      cardHeaderElt.style.setProperty(
        "--bg-image",
        'url("../images/icon-social.svg")',
      )
      break
    case "Self Care":
      cardHeaderElt.style.setProperty("--bg-color", "var(--yellow300)")
      cardHeaderElt.style.setProperty(
        "--bg-image",
        'url("../images/icon-self-care.svg")',
      )
      break
  }
  const currentTimeUnit = card.timeframes.weekly.current <= 1 ? 'hr' : 'hrs'
  const previousTimeUnit = card.timeframes.weekly.previous <= 1 ? 'hr' : 'hrs'
  cardMainHeaderTitle.textContent = card.title
  cardMainContentCurrentTime.textContent = `${card.timeframes.weekly.current}${currentTimeUnit}`
  cardMainContentPreviousTime.textContent = `Last Week - ${card.timeframes.weekly.previous}${previousTimeUnit}`

  return cardElement
}
/**
 *
 * @param {PointerEvent} e
 * @param {Array<Object>} cards
 */
export function handleClick(e, cards) {
  const allCardsElts = Array.from(document.querySelectorAll(".card"))
  const clickedBtn = e.currentTarget
  clickedBtn.parentElement
    .querySelector("button.active")
    .classList.remove("active")
  clickedBtn.classList.add("active")
  for (const cardElt of allCardsElts) {
    const cardMainContentCurrentTime = cardElt.querySelector(".card__main__content__current-time")
    const cardMainContentPreviousTime = cardElt.querySelector(".card__main__content__previous-time")
    const i = allCardsElts.indexOf(cardElt)
    if (clickedBtn.textContent === "Daily") {
      const currentTimeUnit = cards[i].timeframes.daily.current <= 1 ? 'hr' : 'hrs'
      const previousTimeUnit = cards[i].timeframes.daily.previous <= 1 ? 'hr' : 'hrs'
      cardMainContentCurrentTime.textContent = `${cards[i].timeframes.daily.current}${currentTimeUnit}`
      cardMainContentPreviousTime.textContent = `Last Day - ${cards[i].timeframes.daily.previous}${previousTimeUnit}`
    } else if (clickedBtn.textContent === "Weekly") {
      const currentTimeUnit = cards[i].timeframes.weekly.current <= 1 ? 'hr' : 'hrs'
      const previousTimeUnit = cards[i].timeframes.weekly.previous <= 1 ? 'hr' : 'hrs'
      cardMainContentCurrentTime.textContent = `${cards[i].timeframes.weekly.current}${currentTimeUnit}`
      cardMainContentPreviousTime.textContent = `Last Week - ${cards[i].timeframes.weekly.previous}${previousTimeUnit}`
    } else if (clickedBtn.textContent === "Monthly") {
      const currentTimeUnit = cards[i].timeframes.monthly.current <= 1 ? 'hr' : 'hrs'
      const previousTimeUnit = cards[i].timeframes.monthly.previous <= 1 ? 'hr' : 'hrs'
      cardMainContentCurrentTime.textContent = `${cards[i].timeframes.monthly.current}${currentTimeUnit}`
      cardMainContentPreviousTime.textContent = `Last Month - ${cards[i].timeframes.monthly.previous}${previousTimeUnit}`
    }
  }
}
