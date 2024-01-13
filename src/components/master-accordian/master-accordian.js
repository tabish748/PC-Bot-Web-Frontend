import Utils from "../../libs/utils.js";

class MasterAccordion extends HTMLElement {
  static tname = "master-accordion";
  
  constructor() {
    super();
    Utils.Bind(this, "On_");
    this.isOpen = false;
  }

  connectedCallback() {
    this.Render();
  }

  On_Click() {
    alert('test')
    this.isOpen = !this.isOpen;
    const content = this.querySelector('.accordion-content');
    content.style.maxHeight = this.isOpen ? `${content.scrollHeight}px` : '0';
    const arrow = this.querySelector('.arrow');
    arrow.style.transform = this.isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
  }

  Render() {
    const title = this.getAttribute('title') || 'Accordion Title';
    const html = `
      <div class="accordion-header" id="header">
        <span>${title}</span>
        <span class="arrow">➔</span>
      </div>
      <div class="accordion-content" id="accordian_content">
      </div>
    `;

    const style = `
      <style>
        .accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border: 1px solid #ccc;
          background-color: #f9f9f9;
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          padding: 0.5rem 1rem;
          border-top: none;
          border: 1px solid #ccc;
        }

        .arrow {
          transition: transform 0.3s ease;
        }
      </style>
    `;

    const combinedHTML = style + html;
    const doc = Utils.toDocument(combinedHTML);
    const main_elem = doc.getElementById("accordian_content");
    main_elem.replaceChildren(...this.children); // move child elements into template
    this.replaceChildren(doc);
        const headerElem = this.querySelector('header');
        console.log(headerElem)
        if(headerElem)
        headerElem.addEventListener('click', () => this.On_Click);
  }
}

Utils.Register_Element(MasterAccordion);

export default MasterAccordion;
