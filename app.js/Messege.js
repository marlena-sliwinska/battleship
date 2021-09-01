import { win_quoutes } from './data/quotes.js';

const messege_Id = 'result_messege';
const inactive_className = 'inactive';
const win_messege_content = 'Congratulations! Victory is yours';
const messegeText_className = 'game__textMessage';
const messegeQuote_className = 'game__textMessage--quote';
const messegeQuoteAuthor_className = 'game__textMessage--author';
const button_className = 'game__button';
export const playAgainButtonId = 'playAgainButton';

class Messege {
  constructor() {
    this.messegeBoard = document.getElementById(messege_Id);
  }

  renderMessege(finalBoard) {
    this.messegeBoard.classList.remove(inactive_className);
    this.messegeBoard.appendChild(finalBoard);
  }

  singleShipDestroyedMessege(shipName) {
    const resultMessage = document.createElement('h2');
    resultMessage.textContent = `You have just destroyed The ${shipName}`;
    resultMessage.classList.add(messegeText_className);
    const finalBoard = document.createElement('section');
    finalBoard.appendChild(resultMessage);
    this.renderMessege(finalBoard);
    const hidingModalTimeoutIndex = setTimeout(
      () => this.clearMessegeBoard(),
      1500,
    );
    return hidingModalTimeoutIndex;
  }

  winMessege() {
    const winQuote = this.createQuoteMessege(win_quoutes);
    const resultMessage = document.createElement('h2');
    resultMessage.textContent = win_messege_content;
    resultMessage.classList.add(messegeText_className);
    const finalBoard = document.createElement('section');
    finalBoard.appendChild(resultMessage);
    finalBoard.appendChild(winQuote);
    const playAgain = document.createElement('button');
    playAgain.setAttribute('id', playAgainButtonId);
    playAgain.textContent = "Let's play again !";
    playAgain.classList.add(button_className);
    finalBoard.appendChild(playAgain);
    return finalBoard;
  }

  destroyedShipMessege() {}

  createQuoteMessege(array) {
    const quote = array[Math.floor(Math.random() * array.length)];
    const quoteContentElement = document.createElement('p');
    quoteContentElement.textContent = quote.quote;
    quoteContentElement.classList.add(messegeQuote_className);
    quoteContentElement.classList.add(messegeText_className);
    const quoteAuthorElement = document.createElement('p');
    quoteAuthorElement.textContent = quote.author;
    quoteAuthorElement.classList.add(messegeText_className);
    quoteAuthorElement.classList.add(messegeQuoteAuthor_className);
    const quoteElement = document.createElement('article');
    quoteElement.appendChild(quoteContentElement);
    quoteElement.appendChild(quoteAuthorElement);
    return quoteElement;
  }

  clearMessegeBoard() {
    this.messegeBoard.classList.add(inactive_className);
    this.messegeBoard.innerHTML = '';
  }
}
export const messege = new Messege();
