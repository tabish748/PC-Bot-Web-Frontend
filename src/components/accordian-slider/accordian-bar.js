import Utils from "../../libs/utils.js";

class AccordionBar extends HTMLElement {
    static tname = "accordion-bar";

    constructor() {
        super();
        this.collapsed = true;
        Utils.Bind(this, "On_");
    }

    connectedCallback() {
        this.Render();
        this.addEventListener("click", this.toggleCollapse.bind(this));
    }

    toggleCollapse() {
        this.collapsed = !this.collapsed;
        if (this.collapsed) {
            this.contentElem.style.display = 'none';
        } else {
            this.contentElem.style.display = 'block';
        }
    }

    Render() {
        const title = this.getAttribute('title') || 'Default Title';

        const html = `
            <div class="accordion-bar">
                <div class="accordion-title">${title}</div>
                <div class="accordion-content" style="display: none;">
                    <slot></slot>
                </div>
            </div>
        `;

        const doc = Utils.toDocument(html);
        this.replaceChildren(doc);
        this.contentElem = this.querySelector('.accordion-content');
    }
}

Utils.Register_Element(AccordionBar);

export default AccordionBar;
