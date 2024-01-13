
import Utils from '../../libs/utils.js';
import HeaderBuddy from '../header-buddy/header-buddy.js';
import FooterBuddy from '../footer-buddy/footer-buddy.js';
class RxLayout extends HTMLElement {
  static tname = "rx-layout";
    constructor() {
      super();
      Utils.Bind(this, "On_");
    }
  
    connectedCallback()
    {
      this.Render();
    }

    async Render()
    {
      const html = `    
      <div class="layout__container">
        <header-buddy></header-buddy>
        <div id="layout__wrapper">
        </div>
        </div>
        <footer-buddy></footer-buddy>
      `;
    const doc = Utils.toDocument(html); // build template from html
    const main_elem = doc.getElementById("layout__wrapper");
    main_elem.replaceChildren(...this.children); // move child elements into template
    this.replaceChildren(doc);
    }
  }
  // Register the custom element
  Utils.Register_Element(RxLayout);
  export default RxLayout;
  