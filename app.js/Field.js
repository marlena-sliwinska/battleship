
// classes in CSS: 

const game__single__field__className = "game__single-field";
const game__border__className = "border";
const game__border__pressed__className = "border-pressed";
const game__border__raised__className = "border-raised";

class Field {
    constructor()
createSingleField(row, column) {
    const field = document.createElement("div");
    field.setAttribute("data-row", `${row}`);
    field.setAttribute("data-column", `${column}`);
    field.classList.add(game__single__field__className);
    field.classList.add(game__border__className);
    field.classList.add(game__border__raised__className);
    field.addEventListener("click", (e) => this.fieldPressed(e));
    return field;
}

}

export const field = new Field()