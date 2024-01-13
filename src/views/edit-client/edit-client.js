import Utils from "../../libs/utils.js";
import ButtonAction from "../../components/button/button.js";
import DashboardLayout from "../../components/dashboard-layout/dashboard-layout.js";
import TableBuddy from "../../components/table-buddy/table-buddy.js";
import FormHandler from "../../libs/form-handling/form-handling.js";
import AccordionBar from "../../components/accordian-slider/accordian-bar.js";
import AccordionSlider from "../../components/accordian-slider/accordian-slider.js";
import { getUserById } from "../../services/user/user-service.js";
import { updateUser } from "../../services/user/user-service.js";
import { getCategoryByType } from "../../services/category/category-service.js";
import { getDocumentsByCategoryId } from "../../services/document/document-service.js";
import Router from "../../routes/router.js";
import { createDocument } from "../../services/document/document-service.js";
import GrantTypeToggle from "../../components/grant-type/grant-type.js";
import { createUser } from "../../services/user/user-service.js";
import { getChildUsers } from "../../services/user/user-service.js";
import { getDeceasedById } from "../../services/deceased/deceased-service.js";
import { updateDeceasedById } from "../../services/deceased/deceased-service.js";
import MasterAccordion from "../../components/master-accordian/master-accordian.js";
import { getGeneratedDocument } from "../../services/document/document-service.js";
export async function editClientDashboardView() {
  const template = await Utils.fetchTemplate("edit-client/edit-client.tpl");
  const css = await Utils.loadCSS("../../compiled-css/pages/edit-client.css");
  const css2 = await Utils.loadCSS("../../compiled-css/pages/add-client.css");

  //SEO
  Utils.setPageTitle("Edit-Client");

  const afterRender = async () => {
    Utils.setIdShortcuts(document, window);
    getUser();
    getDeceased();
    handleTabs();
    handleTabsApiData();
    setActiveTabFromHash();
    // toggleBtn();
    handleForm();
    // handleAddDocument(); // Add it here
    addExecutorNewForm();
    onLoadRenderChildUsers();
    handleFields();
    Utils.floatingLabel();
    showMasterDocument();
  };

  const showMasterDocument = async () => {
    master_doc_wrapper.innerHTML = ``;
    try {
      const id = getIdParameters();
      const response = await getGeneratedDocument(id); 
      for (const key in response) {
        const output = generateHTML(response[key], key);
        master_doc_wrapper.innerHTML += output;
      }
      
      attachCopyClickEvent();
    } catch (error) {
      console.log("error", error);
    }
};

 

  const attachCopyClickEvent = () => {
    const copyButtons = master_doc_wrapper.querySelectorAll(".copyBtn");
    copyButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const valueToCopy = e.target.getAttribute("data-val");
        console.log('valueToCopy', valueToCopy)
        Utils.copyToClipboard(valueToCopy);
        showToast('Copied to Clipboard', "true");
      });
    });
  };
  const formatTitle = (title) => {
    return title
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

 
  function generateHTML(data, mainKey) {
    
    if (Array.isArray(data) && data.length === 0) return ''; 
    if (Object.keys(data).length === 0 && data.constructor === Object) return ''; 

    const mainHeading = formatTitle(mainKey);
    let html = `<p>${mainHeading}</p>`;

    for (let key in data) {
        const subData = data[key];
        
        if (Array.isArray(subData) && subData.length === 0) continue;

        const formattedKey = formatTitle(key);
        html += `<h4>${formattedKey}</h4>`;
        html += "<ul>";

        for (let item of subData) {
            const formattedName = formatTitle(item.data_name);
            html += `<li class="master_doc_list_item"><span class='master_doc_li_key'>${formattedName}:</span> <span class="master_doc_li_value">${item.data_value}</span><span class="master_doc_li_key copy_btn_wrapper_master"><button class="copyBtn" data-val="${item.data_value}" >Copy</button></span></li>`;
        }

        html += "</ul>";
    }

    return html;
}

  const handleFields = () => {
    divorce_after_the_will_was_made.addEventListener("input", (e) => {
      e.target.value == "yes"
        ? (details_of_divorce_box.hidden = false)
        : (details_of_divorce_box.hidden = true);
    });
  };

  const onLoadRenderChildUsers = async () => {
    try {
      child_user_listing_container.innerHTML = ``;
      const heading = document.createElement("h5");
      heading.innerText = "Other Executors";
      heading.classList.add('section__heading');
      child_user_listing_container.appendChild(heading);
      const id = getIdParameters();
      const response = await getChildUsers(id);
      const data = await response.childUsers;
      await createChildUsersListUI(data);
    } catch (error) {}
  };

  const createChildUsersListUI = (data) => {
    data?.forEach((item) => {
      const fileRow = document.createElement("div");
      fileRow.className = "file-row";

      const userName = document.createElement("span");
      userName.innerText = item?.first_name;

      const editButton = document.createElement("button-action");
      editButton.setAttribute("label-txt", "Edit");
      editButton.setAttribute("class", "ml-3");
      editButton.setAttribute("primary", "");
      editButton.setAttribute("small", "");

      editButton.addEventListener("click", () => {
        displayChildUserEditForm(item, fileRow, "child", item?.id);

        handleTabsApiData(fileRow, item?.id);
        Utils.floatingLabel();
      });

      fileRow.appendChild(userName);
      fileRow.appendChild(editButton);

      child_user_listing_container.appendChild(fileRow);
    });
  };

  const displayChildUserEditForm = (data, fileRow, typeuser, childId) => {
    let executorCounter = data.id;
    const newSectionHTML = `
    <form id="add_client_form${executorCounter}" class="childForm" method="post" data-validate>
       <div class="add__client--section mt-4">
       <a class="cross" id="cross${executorCounter}">&times;</a>
           <h2 class="section__heading">Personal Information</h2>
           <div class="grid">
               <div class="grid__row">
                   <div class="input-container">
                   <label class="form-label">First Name</label>
                       <input type="text" value=${data.first_name} class="grid__input form-input"  id="first_name${executorCounter}" data-error="required,minLength:3" />
                   </div>
                   <div class="input-container">
                   <label class="form-label">Middle Name</label>
                       <input type="text" class="grid__input form-input" id="middle_name${executorCounter}" />
                   </div>
                   <div class="input-container">
                   <label class="form-label">Last Name</label>
                       <input type="text" class="grid__input form-input"  value=${data.last_name}  id="last_name${executorCounter}" data-error="required,minLength:3" />
                   </div>
               </div>
               
        <div class="grid__row">
              <div class="grid__input grid__input--full-width input-container">
              <label class="form-label">Address</label>
                <input
                  type="text"
                  data-error="required"
                  id="address${executorCounter}"
                  value=${data.address} 
                  class="form-input"
                />
              </div>
        </div>

        <div class="grid__row">
              <div  class="input-container">
              <label class="form-label">Occupation</label>
                <input
                  type="text"
                  class="grid__input form-input"
                  data-error="required"
                  id="occupation${executorCounter}"
                  value=${data.occupation}
                />
              </div>
              <div  class="input-container">
              <label class="form-label">Relationship to Deceased</label>
                <input
                  type="text"
                  class="grid__input form-input"
                  data-error="required"
                  id="relation_to_deceased${executorCounter}"
                  value=${data.relationship_to_deceased} 
                />
              </div>

              <div  class="input-container">
              <label class="form-label">Applying For Probate</label>
                <select
                  name=""
                  id="applying_for_probate${executorCounter}"
                  class="grid__input form-input"
                  data-error="required"
                >
                  <option value=""></option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
      </div>
      </div>

      <h2 class="section__heading mt-4">Contact Details</h2>
      <div class="grid">
        <div class="grid__row">
          <div class="input-container">
          <label class="form-label">Email</label>
            <input
              type="text"
              class="grid__input form-input"
              id="email${executorCounter}"
              data-error="isEmail"
              value=${data?.email}
            />
          </div>
         
          <div  class="input-container">
          <label class="form-label">Telephone</label>
            <input
              type="text"
              class="grid__input form-input"
              id="phone${executorCounter}"
              data-error="isNumber"
              value=${data?.phone}
            />
          </div>
        </div>
      </div>
      <div class="d__flex justify__content__end">
      <button-action
        label-txt="Update"
        id="submit_btn${executorCounter}"
        type="submit"
        className="mt-3"
        primary
      ></button-action>
    </div>
      </form>
       `;

    // Append to new_form_container
    fileRow.insertAdjacentHTML("beforeend", newSectionHTML);
    const cross = document.getElementById(`cross${executorCounter}`);
    cross.addEventListener("click", () => {
      const toRemove = fileRow.querySelector("form");
      const accordians = fileRow.querySelectorAll("accordion-slider");
      toRemove.remove();
      accordians.forEach((acc) => {
        acc.remove();
      });
    });
    const form = document.getElementById(`add_client_form${executorCounter}`);
    new FormHandler({ formId: `add_client_form${executorCounter}` });

    form.addEventListener("formSubmit", async () => {
      const firstNameLocal = document.getElementById(
        `first_name${executorCounter}`
      );

      const middleNameLocal = document.getElementById(
        `middle_name${executorCounter}`
      );
      const lastNameLocal = document.getElementById(
        `last_name${executorCounter}`
      );
      const addressLocal = document.getElementById(`address${executorCounter}`);
      const occupationLocal = document.getElementById(
        `occupation${executorCounter}`
      );
      const relationToDeceasedLocal = document.getElementById(
        `relation_to_deceased${executorCounter}`
      );
      const applyingForProbate = document.getElementById(
        `applying_for_probate${executorCounter}`
      );
      const emailLocal = document.getElementById(`email${executorCounter}`);

      const phoneLocal = document.getElementById(`phone${executorCounter}`);

      try {
        const id = getIdParameters();
        const payload = {
          first_name: firstNameLocal.value,
          middle_name: middleNameLocal.value,
          last_name: lastNameLocal.value,
          address: addressLocal.value,
          email: emailLocal.value,
          phone: phoneLocal.value,
          occupation: occupationLocal.value,
          relationship_to_deceased: relationToDeceasedLocal.value,
          applying_for_probate: applyingForProbate.value,
          parent_user_id: id,
        };

        const response = await updateUser(data?.id, payload);
        onLoadRenderChildUsers();
        if (response.message) {
          showToast(response.message, "true");
        }
        if (response.error) showToast(response.error, "false");

        const formSubmitCompleteEvent = new CustomEvent("formSubmitComplete");
        form.dispatchEvent(formSubmitCompleteEvent);
      } catch (error) {
        console.error("Error:", error);
      }
    });
  };

  const addExecutorNewForm = () => {
    let executorCounter = 0; // Unique identifier for each executor

    add_executor_btn.addEventListener("click", () => {
      executorCounter++;
      const newSectionHTML = `
      <form id="add_client_form${executorCounter}" method="post" data-validate>
         <div class="add__client--section mt-4">
             <h2 class="section__heading">Personal Information</h2>
             <div class="grid">
                 <div class="grid__row">
                     <div class="input-container">
                     <label class="form-label">First Name</label>
                         <input type="text" class="grid__input form-input" id="first_name${executorCounter}" data-error="required,minLength:3" />
                     </div>
                     <div class="input-container">
                     <label class="form-label">Middle Name</label>
                         <input type="text" class="grid__input form-input"  id="middle_name${executorCounter}" />
                     </div>
                     <div class="input-container">
                     <label class="form-label">Last Name</label>
                         <input type="text" class="grid__input form-input" id="last_name${executorCounter}" data-error="required,minLength:3" />
                     </div>
                 </div>
                 
          <div class="grid__row">
                <div class="grid__input grid__input--full-width input-container">
                <label class="form-label">Address</label>
                  <input
                    type="text"
                    class="form-input"
                    data-error="required"
                    id="address${executorCounter}"
                  />
                </div>
          </div>

          <div class="grid__row">
                <div class="input-container">
                <label class="form-label">Occupation</label>
                  <input
                    type="text"
                    class="grid__input form-input"
                    data-error="required"
                    id="occupation${executorCounter}"
                  />
                </div>
                <div class="input-container">
                <label class="form-label">Relationship to Deceased</label>
                  <input
                    type="text"
                    class="grid__input form-input"
                    data-error="required"
                    id="relation_to_deceased${executorCounter}"
                  />
                </div>

                <div class="input-container">
                <label class="form-label">Applying for Probate</label>
                  <select
                    name=""
                    id="applying_for_probate${executorCounter}"
                    class="grid__input form-input"
                    data-error="required"
                  >
                    <option value=""></option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
        </div>
        </div>

        <h2 class="section__heading mt-4">Contact Details</h2>
        <div class="grid">
          <div class="grid__row">
            <div class="input-container">
            <label class="form-label">Email</label>
              <input
                type="text"
                class="grid__input form-input"
                id="email${executorCounter}"
                data-error="isEmail"
              />
            </div>
            
            <div class="input-container">
            <label class="form-label">Telephone</label>
              <input
                type="text"
                class="grid__input form-input"
                id="phone${executorCounter}"
                data-error="isNumber"
              />
            </div>
          </div>
        </div>
        <div class="d__flex justify__content__end">
        <button-action
          label-txt="Save"
          id="submit_btn${executorCounter}"
          type="submit"
          className="mt-3"
          primary
        ></button-action>
      </div>
        </form>
         `;

      // Append to new_form_container
      new_form_container.insertAdjacentHTML("beforeend", newSectionHTML);

      const firstNameLocal = document.getElementById(
        `first_name${executorCounter}`
      );
      const middleNameLocal = document.getElementById(
        `middle_name${executorCounter}`
      );
      const lastNameLocal = document.getElementById(
        `last_name${executorCounter}`
      );
      const addressLocal = document.getElementById(`address${executorCounter}`);
      const occupationLocal = document.getElementById(
        `occupation${executorCounter}`
      );
      const relationToDeceasedLocal = document.getElementById(
        `relation_to_deceased${executorCounter}`
      );
      const applyingForProbate = document.getElementById(
        `applying_for_probate${executorCounter}`
      );
      const emailLocal = document.getElementById(`email${executorCounter}`);
      const passwordLocal = document.getElementById(
        `password${executorCounter}`
      );
      const phoneLocal = document.getElementById(`phone${executorCounter}`);

      const form = document.getElementById(`add_client_form${executorCounter}`);
      new FormHandler({ formId: `add_client_form${executorCounter}` });

      form.addEventListener("formSubmit", async () => {
        try {
          const id = getIdParameters();
          const payload = {
            first_name: firstNameLocal.value,
            middle_name: middleNameLocal.value,
            last_name: lastNameLocal.value,
            address: addressLocal.value,
            email: emailLocal.value,
            password: "123456",
            phone: phoneLocal.value,
            occupation: occupationLocal.value,
            relationship_to_deceased: relationToDeceasedLocal.value,
            applying_for_probate: applyingForProbate.value,
            parent_user_id: id,
          };

          const response = await createUser(payload);
          if (response.message) {
            showToast(response.message, "true");
            window.location.reload();
          }
          if (response.error) showToast(response.error, "false");

          const formSubmitCompleteEvent = new CustomEvent("formSubmitComplete");
          form.dispatchEvent(formSubmitCompleteEvent);
        } catch (error) {
          console.log("Error:", error);
        }
      });
      Utils.floatingLabel();
    });
  };

  // const handleAddDocument = () => {
  //   add_document_btn.addEventListener("click", () => {
  //     add_document_modal.hidden = false;
  //   });
  //   new FormHandler({ formId: "add_document_form" });

  //   add_document_form.addEventListener("formSubmit", async () => {
  //     try {
  //       const payload = {
  //         name: document_name_input.value,
  //         category_id: select_category_input.value,
  //         page: select_page_input.value,
  //       };
  //       const response = await createDocument(payload);
  //       if (response.message) {
  //         const divs = document.querySelectorAll(".render_accordian");
  //         divs.forEach((div) => {
  //           div.innerHTML = ``;
  //         });
  //         handleTabsApiData();
  //         alert(response.message);
  //         add_document_modal.hidden = true;
  //       }
  //       if (response.error) alert(response.error);

  //       const formSubmitCompleteEvent = new CustomEvent("formSubmitComplete");
  //       add_document_form.dispatchEvent(formSubmitCompleteEvent);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   });

  //   close_modal_btn.onclick = () => {
  //     add_document_modal.hidden = true;
  //   };
  // };

  const handleTabsApiData = (fileRow, childUserId) => {
    const hashFragment = window.location.hash.substring(1);
    handleClientProfileData(hashFragment, fileRow, childUserId);
  };

  const handleClientProfileData = async (type, fileRow, childUserId) => {
    const response = await getCategoryByType(type);

    if (response?.categories) {
      const allPromises = response.categories.map(async (item) => {
        return await getDocumentsByCategoryId(item.id);
      });

      const allResults = await Promise.all(allPromises);
      createAccordianUI(allResults, fileRow, childUserId);
    }
  };

  const createAccordianUI = (data, fileRow, childUserId) => {
    data.forEach((category) => {
      const h2 = document.createElement("h2");
      h2.classList.add("section__heading", "mt-4", "mb-4", "text__capitalize");
      h2.innerText = category?.name;

      const activeTab = document.querySelector(".tabs-content__item--active");
      if (!fileRow) {
        const activeTabDiv = activeTab
          ? activeTab.querySelector(".render_accordian")
          : null;
        if (activeTabDiv) {
          activeTabDiv.appendChild(h2);
        }
        category?.data.forEach((item) => {
          const accordionSlider = document.createElement("accordion-slider");
          accordionSlider.setAttribute("title", item?.name);
          if (activeTabDiv) {
            activeTabDiv.appendChild(accordionSlider);
          }
        });
      } else {
        category?.data.forEach((item) => {
          const accordionSlider = document.createElement("accordion-slider");
          accordionSlider.setAttribute("title", item?.name);
          accordionSlider.setAttribute("childUserId", childUserId);
          fileRow.appendChild(accordionSlider);
        });
      }
    });
  };

  const handleForm = () => {
    new FormHandler({ formId: "edit_client_form" });
    edit_client_form.addEventListener("formSubmit", async () => {
      try {
        const grant = grant_type_btn.getSelectedGrant();
        const payload = {
          first_name: first_name.value,
          middle_name: middle_name.value,
          last_name: last_name.value,
          address: address.value,
          email: email.value,
          phone: phone.value,
          supreme_court: supreme_court.value,
          occupation: occupation.value,
          relationship_to_deceased: relationship_to_deceased.value,
          affidavit: affidavit.value,
          type_grant: grant?.type,
          type_grant_sub: grant.subType,
        };
        const id = getIdParameters();
        const response = await updateUser(id, payload);
        if (response.message) {
          showToast(response.message, "true");
        }
        if (response.error) showToast(response.error, "false");

        const formSubmitCompleteEvent = new CustomEvent("formSubmitComplete");
        edit_client_form.dispatchEvent(formSubmitCompleteEvent);
      } catch (error) {
        console.error("Error:", error);
      }
    });
  };

  const getDeceased = async () => {
    const id = getIdParameters();
    const response = await getDeceasedById(id);
    const data = await response?.data[0];
    DeceasedObjToField(data);
    updateDeceasedForm(data?.id);
  };
  const updateDeceasedForm = (id) => {
    new FormHandler({ formId: "update_deceased_form" });
    update_deceased_form.addEventListener("formSubmit", async () => {
      try {
        const payload = {
          first_name: deceased_first_name.value,
          middle_name: deceased_middle_name.value,
          last_name: deceased_last_name.value,
          last_address: deceased_address_input.value,
          marital_status_will_made: martial_status_when_will_was_made.value,
          divorce_after_will: divorce_after_the_will_was_made.value,
          details_of_divorce:
            divorce_after_the_will_was_made.value == "yes"
              ? details_of_divorce.value
              : "",
        };
        const response = await updateDeceasedById(id, payload);
        if (response.message) {
          showToast(response.message, "true");
        }
        if (response.error) showToast(response.error, "false");

        const formSubmitCompleteEvent = new CustomEvent("formSubmitComplete");
        update_deceased_form.dispatchEvent(formSubmitCompleteEvent);
      } catch (error) {
        console.error("Error:", error);
      }
    });
  };

  const DeceasedObjToField = (deceased) => {
    deceased_first_name.value = deceased?.first_name;
    deceased_middle_name.value = deceased?.middle_name;
    deceased_last_name.value = deceased?.last_name;
    deceased_address_input.value = deceased?.last_address;
    martial_status_when_will_was_made.value =
      deceased?.marital_status_will_made;
    divorce_after_the_will_was_made.value = deceased?.divorce_after_will;
    details_of_divorce.value = deceased?.details_of_divorce;
    if (deceased?.divorce_after_will == "yes") {
      details_of_divorce_box.hidden = false;
    }
    Utils.floatingLabel();
  };

  const getUser = async () => {
    const id = getIdParameters();
    const response = await getUserById(id);
    const data = await response?.user;
    objToFields(data);
  };

  const objToFields = (user) => {
    first_name.value = user?.first_name;
    middle_name.value = user?.middle_name;
    last_name.value = user?.last_name;
    address.value = user?.address;
    occupation.value = user?.occupation;
    relationship_to_deceased.value = user?.relationship_to_deceased;
    affidavit.value = user?.affidavit;
    email.value = user?.email;
    phone.value = user?.phone;
    supreme_court.value = user?.supreme_court;
    grant_type_btn.setSelectedGrant({
      type: user?.type_grant,
      subType: user?.type_grant_sub,
    });
    dashboardLayout.setAttribute(
      "heading",
      `${user?.first_name} ${user?.last_name}`
    );
    document.querySelectorAll(".form-input").forEach((input) => {
      if (input.value) {
        input.parentElement.classList.add("active");
      }
    });
  };

  const getIdParameters = () => {
    const params = Utils.getQueryParams(window.location.search);
    return params.id;
  };

  const toggleBtn = () => {
    probate_btn.addEventListener("click", function () {
      this.classList.add("toggle-btns__btn--active");
      loa_tn.classList.remove("toggle-btns__btn--active");
      loa_content.classList.remove("active");
    });

    loa_tn.addEventListener("click", function () {
      this.classList.add("toggle-btns__btn--active");
      probate_btn.classList.remove("toggle-btns__btn--active");
      loa_content.classList.add("active");
    });
  };

  const handleTabs = () => {
    const tabs = document.querySelectorAll(".tabs__tab");
    const contents = document.querySelectorAll(".tabs-content__item");

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs and contents
        tabs.forEach((innerTab) =>
          innerTab.classList.remove("tabs__tab--active")
        );
        contents.forEach((content) => {
          content.classList.remove("tabs-content__item--active");
        });

        // Add active class to clicked tab and its respective content
        this.classList.add("tabs__tab--active");
        contents[index].classList.add("tabs-content__item--active");
        window.location.hash = this.id;
        setTimeout(() => {
          Utils.floatingLabel();
        }, 1000);
      });
    });
  };

  const setActiveTabFromHash = () => {
    const hash = window.location.hash;
    if (hash) {
      const tab = document.querySelector(hash);
      if (tab) {
        tab.click(); // Use the existing click event logic
      }
    }
  };

  const showToast = (message, type) => {
    const toastEl = document.createElement("ui-toast");
    toastEl.setAttribute("toast.message", message);
    toastEl.setAttribute("toast.type", type); // 'true' for success, 'false' for error
    document.body.appendChild(toastEl);
  };

  // teardown will exectue when view will leave the DOM
  const teardown = () => {};

  return {
    html: template,
    css: [css, css2],
    afterRender,
    teardown,
  };
}
