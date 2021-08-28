const messegee_Id = "result_messege";
const win_messege_content = "Congratulations! Victory is yours";
import { win_quoutes } from "./data/quotes.js";

class Messege {
  constructor() {
    this.messegeBoard = document.getElementById(messegee_Id);
    this.renderMessege();
  }
  renderMessege() {
    const messege = this.createQuoteMessege(win_quoutes);
    console.log(messege);
    /* this.messegeBoard.appendChild(messege); */
    this.messegeBoard.innerHTML = `template string ${messege} <div>zabawmy sie</div>`;
    /*  this.messegeBoard.insertAdjacentHTML("beforeend", `${messege}`); */
    /*  this.messegeBoard.textContent = messege; */
  }
  winMessege() {
    const quote = this.drawMessege(win_quoutes);
    const quoteElement = document.createComment;
  }

  destroyedShipMessege() {}
  drawMessege(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  createQuoteMessege(array) {
    const quote = array[Math.floor(Math.random() * array.length)];
    const quoteContentElement = document.createElement("p");
    quoteContentElement.textContent = quote.quote;
    const quoteAuthorElement = document.createElement("p");
    quoteAuthorElement.textContent = quote.author;
    const quoteElement = document.createElement("div");
    //zmien na blockquoute pozniej
    quoteElement.appendChild(quoteContentElement);
    quoteElement.appendChild(quoteAuthorElement);
    return quoteElement;
  }
}
export const messege = new Messege();
