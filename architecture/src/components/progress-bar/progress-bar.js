import Utils from "../../libs/utils.js";

class ProgressBar extends HTMLElement {
  static tname = "progress-bar";

  constructor() {
    super();

    this.currentPercentage = 0;
    this.loadingTime = 10;
  }

  connectedCallback() {
    this.Render();
  }
  disconnectedCallback() {
    clearInterval(this.incrementInterval);
  }

  incrementProgressBar() {
    if (this.currentPercentage < 100) {
      this.currentPercentage += 1;
      this.querySelector(
        ".progress__bar"
      ).style.width = `${this.currentPercentage}%`;
      this.current_percentage.innerText = `${this.currentPercentage}%..`;
    } else {
      clearInterval(this.incrementInterval);
      this.dispatchEvent(
        new CustomEvent("progress-complete", { bubbles: true, composed: true })
      );
    }
  }

  Render() {
    const html = `
        <div class="progress__bar__comp">
        <div class="progress__container">
            <div class="progress__bar" id="progress_bar"></div>
            </div>
        <span id="current_percentage" class="progress__counter"></span>
        </div>
    `;

    const doc = Utils.toDocument(html);
    this.replaceChildren(doc);
    Utils.setIdShortcuts(this, this);

    this.incrementInterval = setInterval(
      () => this.incrementProgressBar(),
      this.loadingTime
    );
  }
  static initialize(callback) {
    if (customElements.get(ProgressBar.tname)) {
      callback();
    } else {
      customElements.whenDefined(ProgressBar.tname).then(() => {
        callback();
      });
    }
  }
}

Utils.Register_Element(ProgressBar);

export default ProgressBar;
