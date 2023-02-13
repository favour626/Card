import { CardTy } from "./CardType";

const cardTypes = [];
for (const cardType in CardTy) {
  // https://stackoverflow.com/a/58509049/4034572
  const aCardType = CardTy[cardType];
  cardTypes.push(aCardType);
  cardTypes.push(aCardType);
}

// https://stackoverflow.com/a/12646864/4034572
function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const Tile = (cardType, index) => {
  return { cardType: cardType, cardState: "Visible", index: index };
};

export function generate() {
  console.log(cardTypes);
  const cards = cardTypes.map((cardType, index) => Tile(cardType, index));
  return shuffleArray(cards);
}
