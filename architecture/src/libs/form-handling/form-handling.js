import { Validators } from "./validators.js";
import Utils from "../utils.js";
import ButtonAction from "../../components/button/button.js";

class FormHandler {
  constructor() {
    this.init();
  }

  init() {
    const forms = document.querySelectorAll("form[data-validate]");
    forms.forEach((form) => {
      let butnAction = form.querySelector(ButtonAction.tname);
      let butn = butnAction.querySelector('button');
      butn.disabled = true;
      butn.classList.add("disabled__button");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (this.validate(form)) {
          butnAction.Set_Loading(true);
          await this.submit(form);
          butnAction.Set_Loading(false);
        }
      });
      this.initRealTimeValidation(form);
    });
  }

  initRealTimeValidation(form) {
    const inputs = form.querySelectorAll(
      "input[data-error], select[data-error], textarea[data-error]"
    );
    const button = form.querySelector(`${ButtonAction.tname} button`);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const isValid = this.validateInput(input);

        // Check if all inputs are valid
        const allValid = Array.from(inputs).every((input) =>
          this.validateInput(input, true)
        );

        if (allValid) {
          button.disabled = false;
          button.classList.remove("disabled__button");
        } else {
          button.disabled = true;
          button.classList.add("disabled__button");
        }
      });
    });
  }

  validate(form) {
    let isValid = true;
    const inputs = form.querySelectorAll(
      "input[data-error], select[data-error], textarea[data-error]"
    );
    inputs.forEach((input) => {
      isValid = this.validateInput(input) && isValid;
    });
    return isValid;
  }

  validateInput(input, silent = false) {
    const rules = input.getAttribute("data-error").split(",");
    let isValid = true;

    if (!silent) {
      this.clearError(input);
    }

    for (const rule of rules) {
      const [validatorName, params] = rule.split(":");
      const validator = Validators[validatorName];

      if (validator) {
        const errorMessage = validator(input, params);
        if (errorMessage) {
          if (!silent) {
            this.showError(input, errorMessage);
          }
          isValid = false;
          break;
        }
      }
    }

    return isValid;
  }

  showError(input, errorMessage) {
    const errorElement = Utils.createElement(
      "div",
      { class: "error-message" },
      []
    );
    input.parentNode.insertBefore(errorElement, input.nextSibling);
    input.parentNode.classList.add("error");
    if (errorElement) {
      errorElement.textContent = errorMessage;
    } else {
      const errorDiv = document.createElement("div");
      errorDiv.classList.add("error-message");
      errorDiv.textContent = errorMessage;
      input.parentElement.appendChild(errorDiv);
    }
  }

  clearError(input) {
    input.parentNode.classList.remove("error");
    const errorElement = input.parentElement.querySelector(".error-message");
    if (errorElement) {
      errorElement.remove();
    }
  }

  submit(form) {
    const formData = new FormData(form);
    const submitPromise = new Promise((resolve) => {
      form.addEventListener("formSubmitComplete", () => {
        resolve();
      });
    });
    const submitEvent = new CustomEvent("formSubmit", {
      detail: {
        formData: formData,
        submitPromise: submitPromise,
      },
    });
    form.dispatchEvent(submitEvent);
    return submitPromise;
  }
}

export default FormHandler;
