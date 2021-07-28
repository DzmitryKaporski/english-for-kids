import cards from './cards';
import renderCategories from './renderCategories';
import renderWordsSet from './renderWordsSet';

const toggleMenu = document.querySelector('#menu-toggle');
const burger = document.querySelector('#menu');
const checkbox = document.querySelector('.checkbox');
const imgBurgerTop = document.querySelector('.img-burger-top');
const imgMinion = document.getElementById('minion');

function burgerHandler() {
  if (!burger || !checkbox || !toggleMenu) throw Error('root element not found');
  burger.addEventListener('click', (e) => {
    if (e.target !== burger) {
      let target = e.target as any;
      if (!target.textContent) throw Error('root element not found');
      const index = cards[0].indexOf(target.textContent);
      if ((<HTMLInputElement>checkbox).checked) {
        if (index === -1) renderCategories(0);
        else renderWordsSet(index + 1, false);
      }
      else if (index === -1) renderCategories(true);
      else renderWordsSet(index + 1, true);
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target === burger || e.target === toggleMenu) {
      imgBurgerTop?.classList.add('img-burger-top-drive');
      setTimeout(() => imgMinion?.classList.add('img-header_active'), 1500);
      return;
    }
    (<HTMLInputElement>toggleMenu).checked = false;
  });

  const imgForBurger = document.createElement('div');

  imgForBurger.classList.add('img-for-burger');
  burger.append(imgForBurger);

};

export default burgerHandler;
