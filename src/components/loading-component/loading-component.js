import Utils from "../../libs/utils.js";

class LoadingComponent extends HTMLElement {
  static tname = "loading-component";
  
  constructor() {
    super();
    Utils.Bind(this, "On_");
  }

  connectedCallback() {
    this.Render();
  }

  show() {
    this.loader.hidden = false;
  }

  hide() {
    console.log('hid eit')
    this.loader.remove();
  }

  Render() {
    const styles = `
      <style>
        :host {
          display: block;
          position: relative;
        }

        .loading-overlay {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: rgba(255, 255, 255, 0.8);
        }

        #parentSpinner {
          border: 5px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 5px solid #000;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          hidden: true;
          position:absolute;
          top:50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;

    const html = `
      ${styles}
      <div class="loading-overlay" id="loader" hidden>
        <div id="parentSpinner" class="loading" ></div>
      </div>
    `;

    const doc = Utils.toDocument(html);
    this.replaceChildren(doc);
    Utils.setIdShortcuts(this, this);
  }
}

Utils.Register_Element(LoadingComponent);

export default LoadingComponent;
