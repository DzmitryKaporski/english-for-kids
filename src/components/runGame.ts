import cards from './cards';
import shuffle from './shuffle';
import renderCategories from './renderCategories';

function runGame(title: any) {
  const container = document.querySelector('.cards-container');
  const gameCards = document.querySelector('.card-items');
  const repeatBtn = document.querySelector('.repeat-btn');
  const currentSet = cards[0].indexOf(title.textContent) + 1;
  const soundArr: any = [];
  let errorsCount = 0;

  const soundRight = new Audio('https://english-for-kids.netlify.app/static/media/correct.8e3d6124.mp3');
  const soundWrong = new Audio('https://english-for-kids.netlify.app/static/media/error.32fc22b2.mp3');

  cards[currentSet].forEach((key: any) => {
    const element = [];
    element.push(key.word);
    element.push(new Audio(`https://wooordhunt.ru/data/sound/sow/uk/${key.word}.mp3`));
    soundArr.push(element);
  });

  const shuffled: [] = shuffle(soundArr);
  const copyTitle = title;

  (<HTMLMediaElement>shuffled[1 - 1][1]).play();

  if (!repeatBtn || !gameCards) throw Error('root element not found');
  repeatBtn.addEventListener('click', () => {
    const repeatBtn = document.querySelector('.repeat-btn');
    (<HTMLMediaElement>shuffled[1 - 1][1]).play();
    repeatBtn?.classList.add('repeat-btn-active');
    setTimeout(() => repeatBtn?.classList.remove('repeat-btn-active'), 500);
  });

  (<HTMLElement>copyTitle).innerHTML = '';
  setTimeout(() => { (<HTMLMediaElement>shuffled[1 - 1][1]).play(); }, 500);

  gameCards.addEventListener('click', (e) => {
    if (!container) throw Error('root element not found');
    if (e.target !== gameCards || shuffled != undefined) {
      if (`url("images/${shuffled[1 - 1][0]}.jpg")` === (<Element>e.target as HTMLElement).style.backgroundImage) {
        let target = e.target as HTMLTextAreaElement;
        (<HTMLElement>copyTitle).innerHTML = `<img src="images/star-win.svg">${copyTitle.innerHTML}`;
        (<Element>e.target).classList.add('front-off');
        (target.parentElement as HTMLElement).style.pointerEvents = 'none';
        soundRight.play();
        shuffled.shift();

        setTimeout(() => {
          if (shuffled.length > 0) {
            (<HTMLMediaElement>shuffled[1 - 1][1]).play();
          }
        }, 600);
      } else {
        copyTitle.innerHTML = `<img src="images/star.svg">${copyTitle.innerHTML}`;
        soundWrong.play();
        errorsCount += 1;
      }
      if (shuffled.length < 1) {
        if (errorsCount < 1) {
          new Audio('https://english-for-kids.netlify.app/static/media/success.beda7e18.mp3').play();
          (<HTMLElement>copyTitle).innerHTML = '';
          container.innerHTML = `
          <div class="winner">
            <img class="winner-img-adaptive" src="images/youwin.jpg">
           </div>
          `;
          setTimeout(() => { document.body.classList.remove("you-win") }, 5000);
        } else {
          const message = errorsCount === 1 ? 'You made 1 mistake!' : `You made ${errorsCount} mistakes!`;
          new Audio('https://english-for-kids.netlify.app/static/media/failure.18423bbf.mp3').play();
          (<HTMLElement>copyTitle).innerHTML = '';
          container.innerHTML = `
          <div class="game-over">
            <img class="game-over-img-adaptive" src="images/gameover.png">
            <h2 class="style-message">${message}</h2>
          </div>
          `;
          errorsCount = 0;
        };
        setTimeout(() => { renderCategories(true); }, 5000);
      };
    };
  });
};

export default runGame;
