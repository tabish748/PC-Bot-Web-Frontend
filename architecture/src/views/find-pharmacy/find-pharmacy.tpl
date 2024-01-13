<rx-layout>
  <div class="pharmacy__section">
    <div class="heading__buddy">
      <span class="icon__bg">
        <i class="icon-location"></i>
    </span>
    <h1 class="mt-1" id="searchforPharmaciesHeading"></h1>
    <p id="searchforPharmaciesText"></p>
    </div>
    <div class="container">
      <div class="pharmacy__prescription__section">
        <div class="pharmacy__prescription__container" id="prescription_tab">
          <h2>BENZONATATE</h2>
          <p>Nasonex 50 mcg/act nasal</p>
        </div>
        <div class="pharmacy__prescription__detail" id="prescription_detail">
          <div class="prescription__detail__wrapper">
            <div>
              <b id="howToUse"></b>
              <p>Take one teaspoonful by mouth three times daily until gone.</p>
            </div>
            <div>
              <div class="prescription__date__wrapper">12/02/20222</div>
            </div>
            <div>
              <b id="labelInformation"></b>
              <table cellpadding="5">
                <tr>
                  <td id="quality"></td>
                  <td>1</td>
                </tr>
                <tr>
                  <td id="route"></td>
                  <td>Nasaf</td>
                </tr>
                <tr>
                  <td id="disposeAfter"></td>
                  <td>Sep 30, 2020</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>

     <div class="searching__listing__wrapper" id="searching_listing_wrapper">
      <div class="pharmacy__find__section">
        <div class="heading__and__icons__wrapper">
          <h2 id="findPharmacy"></h2>
          <div class="icons__list__wrapper">
            <ul>
              <li  id="map_view_btn">
                <i class="icon-mapview"></i>
                <p class="hide__mob" id="MapView"></p>
              </li>
              <li id="nearby_pharmacies_btn" class="active">
                <i class="icon-mappointer"></i>
                <p class="hide__mob" id="currentLocation"></p>
              </li>
              <li id="filter_btn" class="active">
                <i class="icon-filter"></i>
                <p class="hide__mob" id="SortFilters"></p>
              </li>
              
            </ul>

            <div
              class="filter__dropdown__container"
              id="filter_container"
              hidden="true"
            >
              <h2>Sort by</h2>

              <div class="filter__sorting__wrapper">
        
                <radio-button id="radio_comp"></radio-button>
              </div>

              <h2 id="pharmacyType"></h2>
              <div class="filter__type__wrapper">
                <div>
                  <input
                    type="checkbox"
                    name="retail"
                    id="retail_type"
                    value="retailType"
                    class="pharmacy__types"
                  />
                  <span>
                    <label for="retail_type" id="retail"></label>
                    <p>Primarily Pickup. CVS, walgreens etc</p>
                  </span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="mailOrder"
                    id="mail_order"
                    value="mailOrder"
                    class="pharmacy__types"
                  />
                  <span>
                    <label for="mail_order" id="mailOrder"></label>
                    <p>Delivery only pharmacy - Pillpack, Caremark</p>
                  </span>
                </div>
              </div>

           <div class="filter__cta__wrapper">
            <button-action
            label-txt="Apply"
            primary
            medium
            classname="mt-3"
            id="filter_apply_btn"
          ></button-action>
           </div>
            </div>
          </div>
        </div>

        <div class="pharmacy__search__section">
          <input
            type="text"
            placeholder="Search pharmacy by zip code, address or name"
            id="search_input"
          />
          <div class="spinner" id="search_spinner"></div>
          <div
            class="pharmacy__suggestions__wrapper"
            id="suggestions_container"
            hidden="true"
          >
            <ul id="suggestions"></ul>
          </div>
        </div>
      </div>
      <listing-buddy id="pharmacies_listing"></listing-buddy>
     </div>
    </div>
  </div>
</rx-layout>
