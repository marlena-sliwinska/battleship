// classes in CSS:

export const game__single__field__className = "game__single-field";
const game__border__className = "border";

export const game__border__raised__className = "border-raised";

class Field {
  constructor() {}

  createSingleField(row, column) {
    const field = document.createElement("div");
    field.setAttribute("data-row", `${row}`);
    field.setAttribute("data-column", `${column}`);
    field.setAttribute(`data-${row}_${column}`, "");
    field.classList.add(game__single__field__className);
    field.classList.add(game__border__className);
    field.classList.add(game__border__raised__className);
    return field;
  }
}

export const field = new Field();
