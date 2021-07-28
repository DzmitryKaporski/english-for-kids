import cards from './cards';
import createCategory from './createCategory';
import renderWordsSet from './renderWordsSet';

const container = document.querySelector('.cards-container');
const title = document.querySelector('.title');
const menuLinks = document.querySelectorAll('li');

function renderCategories(isGameOn: any) {
  if (!title || !container) throw Error('root element not found');

  menuLinks.forEach((link) => {
    link.style.textDecoration = 'none';
    link.style.color = 'black';
    link.style.fontSize = '25px';
  });

  menuLinks[0].style.textDecoration = 'underline';
  menuLinks[0].style.color = 'red';
  menuLinks[0].style.fontSize = '25px';
  title.textContent = 'Categories';

  container.innerHTML = '';
  const categoriesEl = document.createElement('div');
  cards[0].forEach((card: any, i: any) => {
    createCategory(categoriesEl, cards[0][i], cards[i + 1][0].image, isGameOn, i);
  });
  categoriesEl.classList.add('categories');
  container.append(categoriesEl);

  (document.querySelector('.categories') as HTMLElement).addEventListener('click', (e) => {
    if (e.target !== document.querySelector('.categories')) {
      const index: any = (<HTMLElement>e.target).getAttribute('data-index');
      renderWordsSet(index, isGameOn);
    }
  });
};

export default renderCategories;
