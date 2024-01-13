import Utils from "../../libs/utils.js";

class TableBuddy extends HTMLElement {
  static tname = "table-buddy";

  constructor() {
    super();

    this._headings = [];
    this._data = [];
    this._elementsConfig = {};

    Utils.Bind(this, "Render");
  }

  connectedCallback() {
    this.Render();
  }

  get headings() {
    return this._headings;
  }

  set headings(value) {
    this._headings = value;
    this.Render();
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
    this.Render();
  }

  get elementsConfig() {
    return this._elementsConfig;
  }

  set elementsConfig(value) {
    this._elementsConfig = value;
    this.Render();
  }

  Render() {
    const html = `
      <table>
        <thead>
          ${this.headings.map((heading) => `<th>${heading}</th>`).join("")}
        </thead>
        <tbody>
          ${this.data
            .map(
              (row) => `
            <tr>
              ${row
                .map((cell, index) => {
                  let additionalContent = this.elementsConfig[index] || "";
                  return `<td>${cell}${additionalContent}</td>`;
                })
                .join("")}

              ${Object.keys(this.elementsConfig)
                .map((index) => {
                  if (index >= row.length) {
                    return `<td>${this.elementsConfig[index]}</td>`;
                  } else {
                    return "";
                  }
                })
                .join("")}

            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    const doc = Utils.toDocument(html);
    this.replaceChildren(doc);

    // Attach event listeners for buttons after rendering the table content
    this.querySelectorAll(".view-action-btn").forEach((btn, rowIndex) => {
      btn.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("rowActionClick", {
            detail: {
              rowData: this.data[rowIndex],
            },
          })
        );
      });
    });
  }
}

Utils.Register_Element(TableBuddy);

export default TableBuddy;
