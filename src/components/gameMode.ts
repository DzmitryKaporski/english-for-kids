import cards from './cards';
import renderWordsSet from './renderWordsSet';
import renderCategories from './renderCategories';

let isGameOn = false;
const mode = document.querySelector('.mode-train');
const hideMode = document.querySelector('.hide');
const checkbox = document.querySelector('.checkbox') as HTMLInputElement;
const title: HTMLElement | null = document.querySelector('.title');

function changeGameMode() {
  if (!checkbox || !title || !mode) throw Error('root element not found');
  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      if (cards[0].indexOf(title.textContent) + 1 === 0) {
        isGameOn = false;
        renderCategories(isGameOn);
      } else {
        isGameOn = false;
        renderWordsSet(cards[0].indexOf(title.textContent) + 1, isGameOn);
      }
      hideMode?.classList.toggle('hide');
      setTimeout(() => mode?.classList.toggle('hide'), 100);
    } else {
      if (cards[0].indexOf(title.textContent) + 1 === 0) {
        isGameOn = true;
        renderCategories(isGameOn);
      } else {
        isGameOn = true;
        renderWordsSet(cards[0].indexOf(title.textContent) + 1, isGameOn);
      }
      hideMode?.classList.toggle('hide');
      mode?.classList.toggle('hide');
    };
  });
};

export default changeGameMode;
