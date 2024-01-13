import Utils from "../../libs/utils.js";

class Toast extends HTMLElement {
  static tname = "ui-toast";
  
  constructor() {
    super();
    Utils.Bind(this, "On_");
  }

  connectedCallback() {
    this.Render();

    setTimeout(() => {
      this.remove();
    }, 3000);
  }

  Render() {
    const html = `
      <div id="toastMessage" class="toast">
        ${this.getAttribute("toast.message") || ""}
      </div>
    `;

    const doc = Utils.toDocument(html);
    this.replaceChildren(doc);
    Utils.setIdShortcuts(this, this);

    const toastType = this.getAttribute("toast.type");
    const toastEl = this.querySelector('#toastMessage');
    if(toastType === "true") {
      toastEl.classList.add("success");
    } else {
      toastEl.classList.add("error");
    }
  }
}

Utils.Register_Element(Toast);

export default Toast;
