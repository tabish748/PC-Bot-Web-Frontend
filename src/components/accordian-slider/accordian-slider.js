import Utils from "../../libs/utils.js";
import ButtonAction from "../button/button.js";
import { uploadDocByText } from "../../services/document/document-service.js";
import { getDocumentIdByName } from "../../services/document/document-service.js";
import { getDocumentListsByDocumentNameAndUserId } from "../../services/document/document-service.js";
import { getDocumentListsByDocumentNameAndUserIdAndParentId } from "../../services/document/document-service.js";
import { getDataByDocumentListId } from "../../services/document/document-service.js";
import { makePrimaryDocumentListTrue } from "../../services/document/document-service.js";
import LoadingComponent from "../loading-component/loading-component.js";
import { BASE_URL } from "../../libs/constants.js";
import Toast from "../toast/toast.js";
import { updateDocumentDataByListId } from "../../services/document/document-service.js";
import { deleteDocumentData } from "../../services/document/document-service.js";
import { DocumentDataByListId } from "../../services/document/document-service.js";
import { DeleteDocumentList } from "../../services/document/document-service.js";
import FormHandler from "../../libs/form-handling/form-handling.js";
import { Validators } from "../../libs/form-handling/validators.js";

class AccordionSlider extends HTMLElement {
  static tname = "accordion-slider";

  constructor() {
    super();
    Utils.Bind(this, "On_TitleClick");
    this.handleSave = this.handleSave.bind(this);
  }

  connectedCallback() {
    this.Render();
  }

  getSearchParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
  }

  On_TitleClick() {
    const content = this.querySelector(".accordion-content");
    const title = this.querySelector(".accordion-title");
    const displayStyle =
      content.style.display === "none" || content.style.display === ""
        ? "block"
        : "none";
    content.style.display = displayStyle;
    title.classList.toggle("is-open");
    if (this.hasAttribute("childUserId")) {
      const childUserId = this.getAttribute("childUserId");
      this.renderChildUserUploadedDocs(this.title, childUserId);
    } else {
      this.renderUploadedDocs(this.title);
    }
  }

  async fetchDataAndRender(name, method, ...params) {
    const response = await method(...params);
    if (response.documentLists) {
      this.uploaded_docs_list.innerHTML = "";
      for (let entry of response.documentLists) {
        const res = await getDataByDocumentListId(entry.id);
        await this.createUIForUploadedDocsByText(
          entry.name,
          res.data,
          entry.make_primary,
          entry.id,
          entry.unique_filename,
          entry.type
        );
      }
    } else {
      this.uploaded_docs_list.innerHTML = "";
      this.docs_key_value_wrapper.innerHTML = "";
      this.add_new_field_wrapper.innerHTML = "";
    }
  }

  renderChildUserUploadedDocs(name, childUserId) {
    if (childUserId) {
      const parentId = this.getSearchParam("id");
      this.fetchDataAndRender(
        name,
        getDocumentListsByDocumentNameAndUserIdAndParentId,
        name,
        childUserId,
        parentId
      );
    }
  }

  renderUploadedDocs(name) {
    const id = this.getSearchParam("id");
    this.fetchDataAndRender(
      name,
      getDocumentListsByDocumentNameAndUserId,
      name,
      id
    );
  }

  Render() {
    const title = this.getAttribute("title") || "Default Title";

    const html = `
            <div class="accordion-title" id="titleElem">${title}</div>
            <div class="accordion-content" style="display: none;">
            <div class="accordian__content__container " id="accordian__content__container">
            <div class="accordian__content--wrapper">

            <div class="d__flex justify__content__end gap__1 mt-3">
                <button-action label-txt="Add Document" secondary class="client_btn" id="add_doc_btn" icon="plus"></button-action>
                <button-action label-txt="Add Text" primary class="client_btn"  id="add_text_btn" icon="plus"></button-action>
            </div>

           <div id="upload_doc_wrapper">
           <div id="upload_doc_inner_container" hidden="true">
            <h3 class="upload__document__text" >Upload Document</h3>
            <div class="file-upload mt-4">
                
                <input type="file" id="fileInput"  accept=".pdf" >
            </div>
            <button-action label-txt="Upload" className="mt-3" id="doc_upload_btn" caution small></button-action>
           </div>

           <form class="login-form" id="add_text_form_${Utils.convertToUnderscore(this.title)}" method="post" data-validate>
            <div class="mt-3" id="add_text_wrapper" hidden ="true">
            <h3 class="upload__document__text mb-2">Mannual Text</h3>
            <div class="input-container">
            <label class="form-label" >Name of the Group Document</label>
            <input type="text"   data-error="required"  id="name_of_group_doc" name="Name of the Group Document" class="form-input">
            </div>
            <div class="d__flex gap__1 mt-2 mb-2">
                <div class="input-container">
                <label class="form-label">Name</label>
                <input type="text"class="form-input"  data-error="required"  name="Name">
                </div>

                <div class="input-container">
                <label class="form-label">Value</label>
                <input type="text" Value" data-error="required"  class="form-input" name="Value">
                </div>
            </div>
            <div class="d__flex justify__content__end gap__1 mt-3">
                <button-action label-txt="Add" secondary type="button"  id="add_key_val_btn" icon="plus"></button-action>
                <button-action label-txt="Save" primary   id="save_text_btn"></button-action>
            </div>

            </div>
            </form>


            <div class="mt-3" id="uploaded_files_list">
                <h3 class="upload__document__text" id="uploaded_doc_heading" hidden>Uploaded Document</h3>
                <div class="mt-2" id="uploaded_docs_list" class="uploaded_docs_list"></div>
                <div id="docs_key_value_container">
                  <div id="docs_key_value_wrapper"></div>
                  <div id="add_new_field_wrapper"></div>
                </div>
            </div>

           </div>

        </div>
            </div>
            </div>
        `;

    const doc = Utils.toDocument(html);
    this.replaceChildren(doc);
    Utils.setIdShortcuts(this, this);

    this.titleElem.addEventListener("click", this.On_TitleClick.bind(this));
    this.handleLogics();
    Utils.floatingLabel();
  }

  handleLogics() {
    this.handleFileUpload();
    if (this.hasAttribute("childUserId")) {
      const childUserId = this.getAttribute("childUserId");
      this.handleDocTextBtn(childUserId);
      // this.handleUploadDocBtn(childUserId);
    } else {
      this.handleDocTextBtn();
      // this.handleUploadDocBtn()
    }

    this.uploadClickBtn();
  }

  handleFileUpload() {
    const fileInputElement = this.querySelector("#fileInput");
    // const fileNameElement = this.querySelector('.upload__file__name__text');

    fileInputElement.addEventListener("change", (event) => {
      const files = event.target.files;
    });
  }

  handleDocTextBtn = (childUserId) => {
    this.add_doc_btn.addEventListener("click", () => {
      this.upload_doc_inner_container.hidden = false;
      this.add_text_wrapper.hidden = true;
    });

    this.add_text_btn.addEventListener("click", () => {
      this.upload_doc_inner_container.hidden = true;
      this.add_text_wrapper.hidden = false;
    });

    this.add_key_val_btn.addEventListener("click", () => {
      const inputPair = this.createInputPair();
      this.add_text_wrapper.insertBefore(
        inputPair,
        this.add_key_val_btn.parentNode
      );
      Utils.floatingLabel();
    });


    new FormHandler({ formId: `add_text_form_${Utils.convertToUnderscore(this.title)}` });
    let adder = Utils.convertToUnderscore(this.title);
    const addTextForm = document.querySelector(`#add_text_form_${adder}`)
    
    addTextForm.addEventListener("formSubmit", async () => {
      // Hide the text input wrapper
      const label_val = this.name_of_group_doc.value;
      this.add_text_wrapper.hidden = true;

      // Extract values from input pairs to create the object
      const nameInputs =
        this.add_text_wrapper.querySelectorAll('input[name="Name"]');
      const valueInputs = this.add_text_wrapper.querySelectorAll(
        'input[name="Value"]'
      );

      const keyValueObject = {};

      nameInputs.forEach((input, index) => {
        keyValueObject[input.value] = valueInputs[index].value;
      });

      // *****************
      const docIdResponse = await getDocumentIdByName(this.title);
      this.docoumentId = await docIdResponse.documentId;
      let payloadForUploadDocByText;
      if (childUserId) {
        payloadForUploadDocByText = {
          documentList: {
            name: label_val,
            type: window.location.hash,
            document_id: await docIdResponse.documentId,
            raw: "raw text",
            user_id: childUserId,
            parent_user_id: this.getSearchParam("id"),
          },
          documentData: keyValueObject,
        };
      } else {
        payloadForUploadDocByText = {
          documentList: {
            name: label_val,
            type: window.location.hash,
            document_id: await docIdResponse.documentId,
            raw: "raw text",
            user_id: this.getSearchParam("id"),
          },
          documentData: keyValueObject,
        };
      }

      const responseDocText = await uploadDocByText(payloadForUploadDocByText);
      const nameOfGroupDoc = this.add_text_wrapper.querySelector(
        'input[name="Name of the Group Document"]'
      ).value;
      this.createUIForUploadedDocsByText(
        nameOfGroupDoc,
        responseDocText?.data,
        null,
        responseDocText?.documentListId
      );

      // Clear the input fields for reuse
      nameOfGroupDoc.value = "";
      nameInputs.forEach((input) => (input.value = ""));
      valueInputs.forEach((input) => (input.value = ""));


      // const formSubmitCompleteEvent = new CustomEvent("formSubmitComplete");
      // addTextForm.dispatchEvent(formSubmitCompleteEvent);
    });
  };

  createUIForUploadedDocsByText(
    name,
    keyValueObject,
    make_primary,
    docListId,
    unique_filename,
    type
  ) {
    const fileRow = Utils.createElement("div", { class: "file-row d__flex" });
    const groupName = Utils.createElement(
      "a",
      {
        style: "min-width: 200px; max-width: 200px;",
      },
      [name]
    );
    groupName.classList.add("single-line");
    if (unique_filename) {
      groupName.setAttribute(
        "href",
        `${BASE_URL}/documents/download/${unique_filename}`
      );
      groupName.setAttribute("download", "true");
      groupName.classList.add("text__primary");
    }

    const viewTextButton = Utils.createElement("button-action", {
      "label-txt": type == "ocr" ? "View OCR" : "View Text",
      class: "client_btn view_txt_btn ml-3",
      primary: "",
      small: "",
    });
    viewTextButton.addEventListener("click", async () => {
      this.add_new_field_wrapper.innerHTML = ``;
      this.docs_key_value_wrapper.innerHTML = ``;
      this.add_new_field_wrapper.innerHTML += `
      <form id="add_text_after_form" method="post" data-validate>
      <div id="more_ocr_add_text_fields_wrapper" class="key-value-container">
      <div class="d__flex gap__1 mt-2 mb-2">
      <div class="input-container">
      <label class="form-label">Name</label>
      <input type="text"class="form-input" name="Name" data-error="required">
      </div>
      <div class="input-container">
      <label class="form-label">Value</label>
       <input type="text" Value" class="form-input" name="Value" data-error="required">
       </div>
   </div>
     <div class="d__flex justify__content__end gap__1 mt-3">
         <button-action label-txt="Add" secondary type="button" id="add_key_val_btn_after" icon="plus"></button-action>
         <button-action label-txt="Save" primary   id="save_text_btn_after"></button-action>
     </div>
     </div>
     </form>
        `;
      this.documentListId = docListId;
      this.documentName = name;
      this.documentType = type;
      try {
        const dataDocumentResponse = await getDataByDocumentListId(docListId);
        this.RenderViewTextFunctionality(
          docListId,
          dataDocumentResponse?.data,
          name,
          type
        );
      } catch (error) {
        console.log("error", error);
      }

      setTimeout(() => {
        const targetElement = this.querySelector("#docs_key_value_container");
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    });

    let primary;
    if (make_primary) {
      primary = document.createElement("span");
      primary.innerText = "Primary";
    } else {
      primary = document.createElement("button");
      primary.innerText = "Make Primary";
      primary.classList.add("gray__btn");

      primary.addEventListener("click", async () => {
        const userId = this.getSearchParam("id");
        const docIdResponse = await getDocumentIdByName(this.title);
        const res = await makePrimaryDocumentListTrue(
          docListId,
          userId,
          docIdResponse?.documentId
        );

        if (this.hasAttribute("childUserId")) {
          this.renderChildUserUploadedDocs(
            this.title,
            this.getAttribute("childUserId")
          );
        } else {
          this.renderUploadedDocs(this.title);
        }
      });
    }
    primary.classList.add("ml-4");
    primary.style.cursor = "pointer";
    primary.style.minWidth = "150px";

    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.classList.add("red__btn");
    delBtn.classList.add("ml-4");
    delBtn.addEventListener("click", () =>
      this.HandleDeleteDocumentList(docListId)
    );
    fileRow.appendChild(groupName);
    fileRow.appendChild(viewTextButton);
    fileRow.appendChild(primary);
    fileRow.appendChild(delBtn);

    this.uploaded_docs_list.appendChild(fileRow);
  }

  async HandleDeleteDocumentList(id) {
    if (window.confirm("Are you sure you want to delete it?")) {
      const response = await DeleteDocumentList(id);
      if (response.success === true) {
        this.showToast("Deleted Successfully", "false");
        if (this.hasAttribute("childUserId")) {
          this.renderChildUserUploadedDocs(
            this.title,
            this.getAttribute("childUserId")
          );
        } else this.renderUploadedDocs(this.title);
      } else {
        this.showToast("Something went wrong", "false");
      }
    }
  }

  RenderViewTextFunctionality(docListId, keyValueObject, name, type) {
    this.documentListId = docListId;
    this.docs_key_value_wrapper.innerHTML = "";
    const ocrContentDiv = this.displayOCRContent(
      keyValueObject,
      name,
      type,
      docListId
    );
    this.docs_key_value_wrapper.append(ocrContentDiv);
    Utils.floatingLabel();
    const addButton = this.querySelector("#add_key_val_btn_after");
    if (addButton) {
      addButton.addEventListener("click", this.handleAddition);
    }
    const saveButton = this.querySelector("#save_text_btn_after");
    if (saveButton) {
      const addTextAfterForm = this.querySelector("#add_text_after_form");
      new FormHandler({ formId: "add_text_after_form" });
      addTextAfterForm.removeEventListener("formSubmit", this.handleSave);
      addTextAfterForm.addEventListener("formSubmit", this.handleSave );
    }
  }

  async handleSave() {
    const docListId = this.documentListId;
    const name = this.documentName;
    const type = this.documentType;
    const nameInputs = this.querySelector(
      "#more_ocr_add_text_fields_wrapper"
    ).querySelectorAll('input[name="Name"]');
    const valueInputs = this.querySelector(
      "#more_ocr_add_text_fields_wrapper"
    ).querySelectorAll('input[name="Value"]');
    const keyValueObjectNew = {};
    nameInputs.forEach((input, index) => {
      keyValueObjectNew[input.value] = valueInputs[index].value;
    });

    const loader = document.createElement("loading-component");
    document.body.appendChild(loader);
    try {
      loader.show();
      const response = await updateDocumentDataByListId(
        keyValueObjectNew,
        docListId
      );
      if (response.success === true) {
        loader.hide();
        this.showToast("Added Successfully", "true");
        this.RenderViewTextFunctionality(docListId, response?.data, name, type);
      } else {
        loader.hide();
        this.showToast("Something went wrong", "false");
      }
    } catch (error) {
      console.log("error", error);
    }

    const formSubmitCompleteEvent = new CustomEvent("formSubmitComplete");
    const addTextAfterForm = this.querySelector("#add_text_after_form");
    addTextAfterForm.dispatchEvent(formSubmitCompleteEvent);   
  }

  handleAddition = () => {
    const inputPair = this.createInputPair();
    const wrapper = this.querySelector("#more_ocr_add_text_fields_wrapper");
    if (wrapper) {
      const btnContainer = this.querySelector(
        "#add_key_val_btn_after"
      ).parentElement;
      wrapper.insertBefore(inputPair, btnContainer);
      Utils.floatingLabel();
    }
  };

  createInputPair() {
    const inputDiv = Utils.createElement("div", {
      class: "d__flex gap__1 mt-2 mb-2",
    });

    const inputName = this.createFloatingLabelInput("Name");
    const inputValue = this.createFloatingLabelInput("Value");
    const deleteButton = Utils.createElement(
      "button",
      { class: "delete-button" },
      ["✖"]
    );
    deleteButton.addEventListener("click", () => {
      inputDiv.remove();
    });
    inputDiv.appendChild(inputName);
    inputDiv.appendChild(inputValue);
    inputDiv.appendChild(deleteButton);
    return inputDiv;
  }

  createFloatingLabelInput(labelText) {
    const inputContainer = Utils.createElement("div", {
      class: "input-container",
    });
    const label = Utils.createElement("label", { class: "form-label" }, [
      labelText,
    ]);
    const input = Utils.createElement("input", {
      type: "text",
      name: labelText,
      class: "form-input",
    });
    inputContainer.appendChild(label);
    inputContainer.appendChild(input);
    return inputContainer;
  }

  displayOCRContent(fields, fileName, type, docListId) {
    const ocrContentDiv = Utils.createElement("div", { class: "ocr-content" });
    const fileHeading = document.createElement("h4");
    const titleHeading = document.createElement("span");
    const dFlex = document.createElement("div");
    dFlex.classList.add("d__flex");
    titleHeading.textContent = `(${fileName})`;
    titleHeading.setAttribute("class", "text__primary ml-5");
    fileHeading.textContent = type == "ocr" ? "OCR Text" : "Text Document";
    fileHeading.setAttribute("class", "text__secondary mb-3");
    dFlex.appendChild(fileHeading);
    dFlex.appendChild(titleHeading);
    ocrContentDiv.appendChild(dFlex);
    fields.forEach((obj) => {
      const rowDiv = Utils.createElement("div", { class: "ocr-row" });
      const keySpan = Utils.createElement("span", { class: "ocr-key" }, [
        obj.name,
      ]);
      rowDiv.appendChild(keySpan);
      const valueSpan = Utils.createElement("span", { class: "ocr-value" }, [
        obj.value,
      ]);
      rowDiv.appendChild(valueSpan);
      rowDiv.setAttribute("data-doclistid", docListId);
      rowDiv.setAttribute("data-filename", fileName);
      rowDiv.setAttribute("data-type", type);
      rowDiv.setAttribute("data-id", obj.id);
      const changeButton = this.createChangeButton(fields);
      const delButton = Utils.createElement("button-action", {
        "label-txt": "Delete",
        danger: "",
        small: "",
      });
      const copyBtn = Utils.createElement(
        "button",
        { title: "Copy Value", class: "copyBtn" },
        ["Copy"]
      );
      rowDiv.appendChild(copyBtn);
      rowDiv.appendChild(changeButton);
      rowDiv.appendChild(delButton);
      copyBtn.addEventListener("click", () => this.HandleCopyValue(valueSpan));
      delButton.addEventListener("click", () =>
        this.renderDeleteDocData(obj.id, docListId, fields, fileName, type)
      );
      ocrContentDiv.appendChild(rowDiv);
    });
    return ocrContentDiv;
  }

  HandleCopyValue(valueSpan) {
    const textarea = Utils.createElement("textarea", {}, [valueSpan.innerText]);
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    this.showToast("Value copied to clipboard", "true");
  }

  createChangeButton(fields) {
    const changeButton = Utils.createElement("button-action", {
      "label-txt": "Change",
      primary: "",
      small: "",
    });
    changeButton.addEventListener("click", () => {
      const row = changeButton.parentElement;
      const key = row.querySelector(".ocr-key").textContent;
      const value = row.querySelector(".ocr-value").textContent;
      this.toggleEdit(row, key, value, true, fields);
    });
    return changeButton;
  }

  async renderDeleteDocData(id, docListId, fields, fileName, type) {
    const loader = document.createElement("loading-component");
    document.body.appendChild(loader);
    try {
      loader.show();
      const response = await deleteDocumentData(id, docListId);
      if (response.success === true) {
        loader.hide();
        const response = await getDataByDocumentListId(docListId);
        this.showToast("Deleted Successfully", "false");
        if (response?.data)
          this.RenderViewTextFunctionality(
            docListId,
            response?.data,
            fileName,
            type
          );
      }
      if (response.success === false) {
        loader.hide();
        this.showToast("No Record found to delete", "false");
      }
    } catch (error) {
      loader.hide();
      console.log(error);
    }
  }

  toggleEdit(rowDiv, key, value, isEdit = true, fields) {
    if (isEdit) {
      const keyInput = document.createElement("input");
      keyInput.value = key;
      const valueInput = document.createElement("input");
      valueInput.value = value;

      const saveButton = Utils.createElement("button-action", {
        "label-txt": "Save",
        primary: "",
        small: "",
      });
      saveButton.addEventListener("click", () => {
        this.toggleEdit(rowDiv, keyInput.value, valueInput.value, false);
      });

      rowDiv.innerHTML = "";
      rowDiv.appendChild(keyInput);
      rowDiv.appendChild(valueInput);
      rowDiv.appendChild(saveButton);
    } else {
      const keySpan = Utils.createElement("span", { class: "ocr-key" }, [key]);
      const valueSpan = Utils.createElement("span", { class: "ocr-value" }, [
        value,
      ]);
      const changeButton = this.createChangeButton();
      const docListId = rowDiv.getAttribute("data-doclistid");
      const fileName = rowDiv.getAttribute("data-filename");
      const type = rowDiv.getAttribute("data-type");
      const delButton = Utils.createElement("button-action", {
        "label-txt": "Delete",
        danger: "",
        small: "",
      });
      delButton.addEventListener("click", () =>
        this.renderDeleteDocData(key, docListId, fields, fileName, type)
      );
      const copyBtn = Utils.createElement(
        "button",
        { title: "Copy Value", class: "copyBtn" },
        ["Copy"]
      );
      copyBtn.addEventListener("click", () => this.HandleCopyValue(valueSpan));
      rowDiv.innerHTML = "";
      rowDiv.appendChild(keySpan);
      rowDiv.appendChild(valueSpan);
      rowDiv.appendChild(copyBtn);
      rowDiv.appendChild(changeButton);
      rowDiv.appendChild(delButton);
    }
  }

  uploadClickBtn() {
    this.doc_upload_btn.addEventListener("click", async () => {
      const fileInput = this.querySelector("#fileInput");
      const uploadedFilesList = this.uploaded_docs_list;

      const docIdResponse = await getDocumentIdByName(this.title);
      this.docoumentId = await docIdResponse.documentId;

      const userId = this.getSearchParam("id");
      if (fileInput && fileInput.files && fileInput.files.length) {
        const file = fileInput.files[0];
        const fileName = file.name;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("document_id", this.docoumentId);
        if (this.hasAttribute("childUserId")) {
          const childUserId = this.getAttribute("childUserId");
          formData.append("user_id", childUserId);
          formData.append("parent_user_id", userId);
        } else {
          formData.append("user_id", userId);
        }
        try {
          const response = await this.uploadDocument(formData);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
        fileInput.value = "";
        if (this.hasAttribute("childUserId")) {
          this.renderChildUserUploadedDocs(
            this.title,
            this.getAttribute("childUserId")
          );
        } else this.renderUploadedDocs(this.title);

        this.upload_doc_inner_container.hidden = true;
      } else {
        this.showToast("Please select file first", "false");
      }
      
    });
  }

  async uploadDocument(formData) {
    const loader = document.createElement("loading-component");
    document.body.appendChild(loader);
    loader.show();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/documents/upload`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Network response was not ok");
      }
      if (data.success) {
        this.showToast("Uploaded Successfully", "true");
      } else {
        this.showToast("Something went wrong", "false");
      }
      return data;
    } catch (error) {
      console.error("Error during document upload:", error);
      this.showToast(error.message || "Something went wrong", "false");
      loader.hide();
    } finally {
      loader.hide();
    }
  }

  showToast(message, type) {
    const toastEl = document.createElement("ui-toast");
    toastEl.setAttribute("toast.message", message);
    toastEl.setAttribute("toast.type", type); // 'true' for success, 'false' for error
    document.body.appendChild(toastEl);
  }
}

Utils.Register_Element(AccordionSlider);

export default AccordionSlider;
