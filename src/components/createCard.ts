function createCard(parent: HTMLElement, word: { image: string, word: string, translation: string }, isGameOn: {}) {
  if (isGameOn) {
    const card = document.createElement('div');
    card.classList.add('card-game');

    const front = document.createElement('div');
    front.classList.add('front');
    front.style.backgroundImage = `url(${word.image})`;

    card.append(front);
    parent.append(card);
  } else {
    const card = document.createElement('div');
    card.classList.add('card');

    const front = document.createElement('div');
    front.classList.add('front');
    front.style.backgroundImage = `url(${word.image})`;

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.cssText = `background-image: url(${word.image});`;

    const enTitle = document.createElement('div');
    enTitle.classList.add('card-title');
    enTitle.textContent = word.word;

    const ruTitle = document.createElement('div');
    ruTitle.classList.add('card-title');
    ruTitle.textContent = word.translation;

    const rotate = document.createElement('div');
    rotate.classList.add('rotate');
    rotate.setAttribute('id', 'rotate');
    rotate.style.backgroundImage = 'url("images/rotate.svg")';

    const audio = document.createElement('audio');
    audio.setAttribute('preload', 'auto');
    audio.setAttribute('src', `https://wooordhunt.ru/data/sound/sow/uk/${word.word}.mp3`);

    card.append(front);
    card.append(audio);
    card.append(back);
    front.append(enTitle);
    front.append(rotate);
    back.append(ruTitle);
    parent.append(card);

    card.addEventListener('click', (e) => {
      let target = e.target as HTMLTextAreaElement;

      if (!e.target) throw Error('root element not found');
      if (!(<Element>e.target).innerHTML) {
        ((target.offsetParent as HTMLElement).style.cssText = `background-image: url(${word.image}); transform: rotateY(180deg)`);
        if (!target.offsetParent || !target.offsetParent.nextElementSibling) throw Error('root element not found');
        (<HTMLElement>target.offsetParent.nextElementSibling.nextElementSibling as HTMLElement).style.cssText = `background-image: url(${word.image}); transform: rotateY(360deg); filter: saturate(0%); box-shadow: 0px 0px 20px 2px rgba(191,191,191,1);`;
      } else if ((<HTMLElement>e.target).innerHTML === word.word) {

        if (!target.offsetParent) throw Error('root element not found');
        (target.offsetParent.nextElementSibling as HTMLMediaElement).play();
      }
      else if (e.target === front) {
        (target.nextElementSibling as HTMLMediaElement).play();
      }
    });

    card.addEventListener('mouseleave', (e) => {
      if (e.target != null) {
        let target = e.target as HTMLTextAreaElement;
        (target.firstElementChild as HTMLElement).style.cssText = `background-image: url(${word.image}); transform: rotateY(0deg) transform: scale(1.01);`;
        (target.lastElementChild as HTMLElement).style.cssText = `background-image: url(${word.image}); transform: rotateY(180deg) transform: scale(1.01);`;
      }
    });
  };
};

export default createCard;
