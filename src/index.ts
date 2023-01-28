import './styles.scss';
import renderCategories from './components/renderCategories';
import burgerHandler from './components/burgerHandler';
import gameMode from './components/gameMode';

window.onload = () => {
  gameMode();
  burgerHandler();
  renderCategories(0);
};
