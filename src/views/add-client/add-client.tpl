<dashboard-layout heading="Add Client" breadCrumb='[{"label": "Home", "href": "/dashboard"}, {"label": "Add Client", "href": "/add-client"}]'>
  <form id="add_client_form" method="post" data-validate>
    <div class="add__client--section mt-4 p-4">
      <h2 class="section__heading">Personal Information</h2>

      <div class="grid">
        <div class="grid__row">
          <div class="input-container">
            <label class="form-label">First Name</label>
            <input
              type="text"
              class="grid__input form-input"
              id="first_name"
              data-error="required,minLength:3"
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
            <label for="last_name" class="form-label">Last Name</label>
            <input
              type="text"
              class="grid__input form-input"
              placeholder=""
              id="last_name"
              data-error="required,minLength:3"
            />
          </div>
        </div>
        <div class="grid__row">
          <div class="grid__input grid__input--full-width input-container">
            <label class="form-label">Address</label>
            <input
              type="text"
              data-error="required"
              class="form-input"
              id="address"
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
          <div  class="input-container">
            <label class="form-label">Relationship to Deceased</label>
            <input
              type="text"
              class="grid__input form-input"
              data-error="required"
              id="relation_to_deceased"
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
              id="email"
              data-error="isEmail"
            />
          </div>
          <div class="input-container">
            <label class="form-label">Password</label>
            <input
              type="password"
              class="grid__input form-input"
              id="password"
              data-error="required"
            />
          </div>
          <div class="input-container">
            <label class="form-label">Telephone</label>
            <input
              type="text"
              class="grid__input form-input"
              id="phone"
              data-error="isNumber"
            />
          </div>
        </div>
      </div>

      <grant-type id="add_client_grant_type"></grant-type>

      <h2 class="section__heading mt-4">Supreme Court</h2>
      <div class="grid">
        <div class="grid__row">
          <div class="input-container">
            <label class="form-label">Supreme Court</label>
            <select
              name=""
              id="Supreme_court"
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
    </div>

    <h1 class="heading__buddy mt-4 mb-4 dark">Deceased</h1>

    <div class="add__client--section mt-4 p-4">
      <h2 class="section__heading">Personal Information</h2>

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
            <input
              type="text"
              id="deceased_address"
              data-error="required"
              class="form-input"
            />
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
          <div id="details_of_divorce_box" class="input-container" hidden>
            <label class="form-label">Details of the Divorce</label>
            <input
              type="text"
              id="details_of_divorce"
              class="form-input"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="d__flex justify__content__end">
      <button-action
        label-txt="Save"
        id="btn"
        type="submit"
        className="mt-3"
        primary
      ></button-action>
    </div>
  </form>
</dashboard-layout>
