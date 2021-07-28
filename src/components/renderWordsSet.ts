import cards from './cards';
import createCard from './createCard';
import runGame from './runGame';

const container = document.querySelector('.cards-container');
const title = document.querySelector('.title');
const menuLinks = document.querySelectorAll('li');

function renderWordsSet(setIndex: number, isGameOn: {}) {
  const cardItems = document.createElement('div');
  const btnContainer = document.createElement('div');
  if (!title || !container) throw Error('root element not found');

  menuLinks.forEach((link) => {
    link.style.textDecoration = 'none';
    link.style.color = 'black';
  });
  menuLinks[setIndex].style.textDecoration = 'underline';
  menuLinks[setIndex].style.color = 'red';
  title.textContent = cards[0][setIndex - 1];
  container.innerHTML = '';
  cardItems.classList.add('card-items');
  cards[setIndex].forEach((card: any, i: any) => {
    createCard(cardItems, cards[setIndex][i], isGameOn);
  });
  if (isGameOn) {
    btnContainer.classList.add('btn-container');
    btnContainer.innerHTML = `
      <button class="start-btn">Start Game</button>
      <button class="repeat-btn"></button>
    `;
    container.append(cardItems);
    container.append(btnContainer);
    (document.querySelector('.start-btn') as HTMLElement).addEventListener('click', () => {
      (document.querySelector('.start-btn') as HTMLElement).style.display = 'none';
      (document.querySelector('.repeat-btn') as HTMLElement).style.cssText = 'display: block; background-image: url(images/repeat.svg)';
      runGame(title);
    });
  } else {
    container.append(cardItems);
  };
};
export default renderWordsSet;
