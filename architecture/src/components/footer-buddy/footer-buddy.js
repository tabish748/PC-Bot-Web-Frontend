import Utils from "../../libs/utils.js";
class FooterBuddy extends HTMLElement {
  static tname = "footer-buddy";
  constructor() {
    super();
    Utils.Bind(this, "On_");
  }

  connectedCallback() {
    this.Render();
  }

  async Render() {
    const html = `    
    <footer class="footer">
    <div class="footer__wrapper">
      <p>Copyright &copy; 2023 ScalaMed Inc.</p>
      <div class="footer__social__icons__wrapper">
        <ul>
          <li><i class="icon-youtube"></i></li>
          <li><i class="icon-twitter"></i></li>
          <li><i class="icon-fb"></i></li>
        </ul>
      </div>
    </div>
  </footer>
`;
    const doc = Utils.toDocument(html);
    this.replaceChildren(doc);
    Utils.setIdShortcuts(this, this);

    this._updateFooterPosition();
    this.initializeResizeObserver();
    window.addEventListener("resize", () => this._updateFooterPosition());
  }

  _updateFooterPosition() {
    const windowHeight = window.innerHeight;
    const content = document.querySelector("#layout__wrapper");
    const contentHeight = content ? content.offsetHeight : 0;
    const footer = document.querySelector("footer");
    if (contentHeight > windowHeight) {
      footer.style.position = "static";
    } else {
      footer.style.position = "fixed";
    }
  }

  initializeResizeObserver() {
    const content = document.querySelector("#layout__wrapper");
    if (!content) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      this._updateFooterPosition();
    });
    resizeObserver.observe(content);
  }
}

// Register the custom element
Utils.Register_Element(FooterBuddy);
export default FooterBuddy;
