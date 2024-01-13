import Utils from "../../libs/utils.js";

class GrantTypeToggle extends HTMLElement {
  static tname = "grant-type";
  
  constructor() {
    super();
    Utils.Bind(this, "On_Click");
  }

  connectedCallback() {
    this.Render();
  }

  On_Click(e) {
    if (e.target.id) {
      switch (e.target.id) {
        case "probate_btn":
          this.selectGrantType("probate_btn");
          break;
        case "loa_btn":
          this.selectGrantType("loa_btn");
          break;
        case "no_will":
          this.selectSubType("no_will");
          break;
        case "will_annexed":
          this.selectSubType("will_annexed");
          break;
        default:
          break;
      }
    }
  }

  selectGrantType(type) {
    if (this.probate_btn) {
        this.probate_btn.classList.remove("toggle-btns__btn--active");
    }
    if (this.loa_btn) {
        this.loa_btn.classList.remove("toggle-btns__btn--active");
    }
    if (this.loa_content) {
        // this.loa_content.classList.add("hidden");
    }
//  debugger;
    if (type === "probate_btn") {
      this.probate_btn.classList.add("toggle-btns__btn--active");
      this.loa_content.hidden =true;
      this.selectedType = "Probate";
      this.selectedSubType = null;
    } else if (type === "loa_btn") {
        // debugger;
      this.loa_btn.classList.add("toggle-btns__btn--active");
      console.log(this.loa_content)
      this.loa_content.hidden =false;
      this.selectedType = "loa";
    }
  }

  selectSubType(subType) {
    this.no_will.classList.remove("toggle-btns__btn--active");
    this.will_annexed.classList.remove("toggle-btns__btn--active");

    if (subType === "no_will") {
      this.no_will.classList.add("toggle-btns__btn--active");
      this.selectedSubType = "No will";
    } else if (subType === "will_annexed") {
      this.will_annexed.classList.add("toggle-btns__btn--active");
      this.selectedSubType = "Will Annexed";
    }
  }

  getSelectedGrant() {
    const grant = {
      type: this.selectedType,
      subType: this.selectedSubType,
    };
    return grant;
  }

  setSelectedGrant(grant) {
    // Clear current selections
    if (this.probate_btn) {
      this.probate_btn.classList.remove("toggle-btns__btn--active");
    }
    if (this.loa_btn) {
      this.loa_btn.classList.remove("toggle-btns__btn--active");
    }
    if (this.no_will) {
      this.no_will.classList.remove("toggle-btns__btn--active");
    }
    if (this.will_annexed) {
      this.will_annexed.classList.remove("toggle-btns__btn--active");
    }
    this.loa_content.hidden = true;
  
    // Set new selections based on the `grant` object
   
    if (grant.type === 'Probate') {
      this.selectGrantType("probate_btn");
    } else if (grant.type === 'LOA' || grant?.type?.toLowerCase() === 'loa') {
      this.selectGrantType("loa_btn");
    }
  
    if (grant.subType === 'No will' ) {
      this.selectSubType("no_will");
    } else if (grant.subType === 'Will Annexed' ) {
      this.selectSubType("will_annexed");
    }
  }

  
  Render() {
    const html = `
      <h2 class="section__heading mt-4">Type of Grant</h2>
      <div class="toggle-btns">
        <button class="toggle-btns__btn toggle-btns__btn--active"  type="button" id="probate_btn">Probate</button>
        <button class="toggle-btns__btn" id="loa_btn"  type="button" style="margin-left:-10px;" >Letters of Administration (LOA)</button>
      </div>
      <div class="toggle-btns" hidden="true"  id="loa_content">
        <button class="toggle-btns__btn" id="no_will" type="button" >No will</button>
        <button class="toggle-btns__btn" id="will_annexed" type="button"  style="margin-left:-10px;">Will Annexed</button>
      </div>
    `;
  
    const doc = Utils.toDocument(html);
    this.replaceChildren(doc);
    Utils.setIdShortcuts(this, this);
    
    // Debugging lines to check which elements are initialized.
    console.log(this.probate_btn, this.loa_btn, this.loa_content);
  
    this.addEventListener("click", this.On_Click);
  }
  
}

Utils.Register_Element(GrantTypeToggle);

export default GrantTypeToggle;
