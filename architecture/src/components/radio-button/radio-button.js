import Utils from "../../libs/utils.js";

class RadioButton extends HTMLElement {
  static tname = "radio-button";

  constructor() {
    super();
    this._value = null; // private variable to hold the value
  }

  connectedCallback() {
    this.addEventListener("change", this.onChange.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("change", this.onChange.bind(this));
  }

  onChange(e) {
    if(e.target.name === 'radiogroup') {
        this._value = e.target.value;
        // dispatch a custom event whenever the value changes
        this.dispatchEvent(new CustomEvent('valueChange', { detail: this._value }));
    }
}

  // getter for value
  get value() {
    return this._value;
  }

  // setter for value
  set items(options) 
  {
    this.innerHTML = "";
    options?.forEach((option) => 
    {
      const div = document.createElement("div");
      const radioInput = document.createElement("input");
      const label = document.createElement("p");
      radioInput.setAttribute("type", "radio");
      radioInput.setAttribute("name", "radiogroup");
      radioInput.value = option.value;
      label.textContent = option.label;
      div.appendChild(radioInput)
      div.appendChild(label)
      this.appendChild(div);
    });
  }
  set value(newValue) {
    const radioInputs = this.querySelectorAll('input[name="radiogroup"]');
    radioInputs.forEach(input => {
      if (input.value === newValue) {
        input.checked = true;
        this._value = newValue;
      } else {
        input.checked = false;
      }
    });
  }
}

Utils.Register_Element(RadioButton);

export default RadioButton;
