<dashboard-layout id="dashboardLayout"  breadCrumb='[{"label": "Home", "href": "/dashboard"}, {"label": "Clients", "href": "/clients"}, {"label": "Edit Client", "href": "#client_profile"}]'>
  <div class="edit__client--section mt-4">
    <div class="d__flex justify__content__end mb-3 mt-3" style="margin: 0; margin-top: 20px;">
      <!-- <button-action
        label-txt="Add Document"
        id="add_document_btn"
        secondary
      ></button-action> -->
    </div>

    <div class="tabs">
      <button class="tabs__tab tabs__tab--active" id="client_profile">
        Client Profile
      </button>
      <button class="tabs__tab" id="deceased_profile">Deceased Profile</button>
      <button class="tabs__tab" id="generate_document">
        Generated Documents
      </button>
    </div>

    <div class="tabs-content">
      <div class="tabs-content__item tabs-content__item--active">
        <h2 class="section__heading">Personal Information</h2>

        <form id="edit_client_form" method="post" data-validate>
          <div class="grid">
            <div class="grid__row">
              <div class="input-container">
                <label class="form-label">First Name</label>
                <input
                  type="text"
                  class="grid__input form-input"
                  data-error="required,minLength:3"
                  id="first_name"
                />
              </div>
              <div class="input-container">
                <label class="form-label">Middle Name</label>
                <input
                  type="text"
                  class="grid__input form-input"
                  id="middle_name"
                />
              </div>
              <div class="input-container">
                <label class="form-label">Last Name</label>
                <input
                  type="text"
                  class="grid__input form-input"
                  data-error="required,minLength:3"
                  id="last_name"
                />
              </div>
            </div>
            <div class="grid__row">
              <div class="grid__input grid__input--full-width input-container">
                <label class="form-label">Address</label>
                <input
                  type="text"
                  data-error="required"
                  id="address"
                  class="form-input"
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
                  id="occupation"
                />
              </div>
              <div class="input-container">
                <label class="form-label">Relationship to deceased</label>
                <input
                  type="text"
                  class="grid__input form-input"
                  data-error="required"
                  id="relationship_to_deceased"
                />
              </div>

              <div class="input-container">
                <label class="form-label">Affidavit</label>
                <select
                  name=""
                  id="affidavit"
                  class="grid__input form-input"
                  data-error="required"
                >
                  <option value=""></option>
                  <option value="swearing">Swearing</option>
                  <option value="affirming">Affirming</option>
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
                  data-error="isEmail"
                  id="email"
                />
              </div>

              <div class="input-container">
                <label class="form-label">Telephone</label>
                <input
                  type="text"
                  class="grid__input form-input"
                  data-error="isNumber"
                  id="phone"
                />
              </div>
            </div>
          </div>

          <grant-type id="grant_type_btn"></grant-type>

          <h2 class="section__heading mt-4">Supreme Court</h2>
          <div class="grid">
            <div class="grid__row">
              <div class="input-container">
                <label class="form-label">Supreme Court</label>
                <select
                  name=""
                  id="supreme_court"
                  class="grid__input form-input"
                  data-error="required"
                >
                  <option value=""></option>
                  <option value="VIC">VIC</option>
                  <option value="NSW">NSW</option>
                  <option value="TAS">TAS</option>
                  <option value="WA">WA</option>
                  <option value="SA">SA</option>
                  <option value="QLD">QLD</option>
                  <option value="ACT">ACT</option>
                </select>
              </div>
            </div>
          </div>

          <div class="d__flex justify__content__end">
            <button-action
              label-txt="Save"
              id="btn1"
              type="submit"
              className="mt-3"
              primary
            ></button-action>
          </div>
        </form>

     

        <div class="render_accordian"></div>
        <div id="child_user_listing_container"></div>

        <div class="new__form__container" id="new_form_container"></div>

       
        <button class="gray__btn mt-3" id="add_executor_btn" type="button">
          Add Another Executors
        </button>
        
      </div>
      <div class="tabs-content__item">
        <h2 class="section__heading">General Information</h2>
        <form id="update_deceased_form" method="post" data-validate>
          <div class="grid">
            <div class="grid__row">
              <div class="input-container">
                <label class="form-label">First Name</label>
                <input
                  type="text"
                  class="grid__input form-input"
                  id="deceased_first_name"
                />
              </div>
              <div class="input-container">
                <label class="form-label">Middle Name</label>
                <input
                  type="text"
                  class="grid__input form-input"
                  id="deceased_middle_name"
                />
              </div>
              <div class="input-container">
                <label class="form-label">Last Name</label>
                <input
                  type="text"
                  class="grid__input form-input"
                  id="deceased_last_name"
                />
              </div>
            </div>
            <div class="grid__row">
              <div class="grid__input grid__input--full-width input-container">
                <label class="form-label">Last Address</label>
                <input type="text" id="deceased_address_input" data-error="required" class="form-input" />
              </div>
            </div>
            <div class="grid__row">
              <div class="input-container">
                <label class="form-label">Marital status when will was made</label>
                <select
                  name=""
                  id="martial_status_when_will_was_made"
                  class="grid__input form-input"
                  data-error="required"
                >
                  <option value=""></option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="domestic_partner">Domestic Partner</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
              <div class="input-container">
                <label class="form-label">Divorce after the Will was made</label>
                <select
                  name=""
                  id="divorce_after_the_will_was_made"
                  class="grid__input form-input"
                  data-error="required"
                >
                  <option value=""></option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
    
    
              </div>
              <div id="details_of_divorce_box" hidden class="input-container">
                <label class="form-label">Details of the Divorce</label>
                <input
                type="text"
                id="details_of_divorce"
                 class="form-input"
              />
              </div>
            </div>
            <div class="d__flex justify__content__end">
              <button-action
                label-txt="Save"
                id="saveBtn"
                type="submit"
                className="mt-3"
                primary
              ></button-action>
            </div>
          </div>
        </form>


        <div class="render_accordian"></div>
      </div>
      <div class="tabs-content__item" id="content3">
        <h2 class="section__heading">Master Document</h2>
        <!-- <div
          class="d__flex justify__content__between align__items__center p-2"
          style="border-bottom: thin solid #dedede; cursor: pointer;"
          id="maste_doc_btn"
        >
          <span>Snapshot</span>
          <span id="master_doc_arrow">↓</span>
        </div> -->

        <!-- showMaster doc -->

        <div class="master_doc_wrapper">
          <div class="d__flex justify__content__end">
            <button-action
              label-txt="Download"
              id="btn"
              type="button"
              class="view_txt_btn master_doc_download_btn"
              primary
              rounded
            ></button-action>
        </div>
        <div id="master_doc_wrapper"></div>
      </div>
    </div>
  </div>
</dashboard-layout>

<div class="modal" id="add_document_modal" hidden="true">
  <div class="modal__content">
    <span class="modal__close-btn" id="close_modal_btn">&times;</span>
    <h2>Add Document</h2>

    <form id="add_document_form" method="post" data-validate>
      <div class="grid">
        <div class="grid__row">
          <div>
            <input
              type="text"
              class="grid__input"
              placeholder="Enter Document Name"
              data-error="required,minLength:2"
              id="document_name_input"
            />
          </div>
          <div>
            <select
              name=""
              id="select_category_input"
              class="grid__input"
              data-error="required"
            >
              <option value="">Select Category</option>
              <option value="1">Identification</option>
              <option value="2">Required Documents</option>
              <option value="3">Asset Information</option>
              <option value="4">Liabilities / debts</option>
            </select>
          </div>
          <div>
            <select
              name=""
              id="select_page_input"
              class="grid__input"
              data-error="required"
            >
              <option value="">Select Page</option>
              <option value="client profile">Client Profile</option>
              <option value="deceased">deceased</option>
            </select>
          </div>
        </div>
      </div>

      <div class="d__flex justify__content__end">
        <button-action
          label-txt="Add"
          id="btn1"
          type="submit"
          className="mt-3"
          primary
        ></button-action>
      </div>
    </form>
  </div>
</div>
