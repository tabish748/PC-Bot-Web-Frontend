import Utils from "../../libs/utils.js";
import RxLayout from "../../components/rx-layout/rx-layout.js";
import ButtonAction from "../../components/button/button.js";
import RadioButton from "../../components/radio-button/radio-button.js";
import { pharmacySortOption, pharmacyType } from "../../libs/enums.js";
import {
  findSearchTermSuggestions,
  findDrugPricesByZip,
  findDrugPricesByGeo,
} from "../../services/pharmacy/pharmacy-service.js";
import ListingBuddy from "../../components/listing-buddy/listing-buddy.js";
import { findDrugPricesByZipPayload } from "../../services/payloads.js";

export async function findPharmacyView() {
  //Here you can import files
  const template = await Utils.fetchTemplate("find-pharmacy/find-pharmacy.tpl");
  const css = await Utils.loadCSS("../../compiled-css/pages/find-pharmacy.css");

  //SEO
  Utils.setPageTitle("Find Pharmacy - Scalamed");

  // After Render will automatically call when HTML will insert into DOM
  const filters = {};

  const afterRender = async  () => {
    Utils.setIdShortcuts(document, window);
    init();
    handleSearch();
    attachEventListeners();
    await handleFilterOnLoad();
  };

  const attachEventListeners = () => {
    prescription_tab.addEventListener("click", togglePrescriptionDetail);
    nearby_pharmacies_btn.addEventListener("click", handleUserLocationPharmacy);
    filter_btn.addEventListener("click", handleFilter);
    filter_apply_btn.addEventListener("click", applyFilter);
    window.addEventListener('customFullScreenControlClicked', () => handleCustomFullScreenControlClicked() );
  };

  const handleCustomFullScreenControlClicked = () => {
   if(searching_listing_wrapper.requestFullscreen)
   {
    searching_listing_wrapper.requestFullscreen();
   }
    document.addEventListener('fullscreenchange',() => handleFullscreenChange());
  }

  const handleFullscreenChange = () => {
    if (document.fullscreenElement === searching_listing_wrapper) {
      searching_listing_wrapper.classList.add('fullscreen__active');
    } else {
        // The div is not in fullscreen mode, remove the class
        searching_listing_wrapper.classList.remove('fullscreen__active');
    }
  }

  const togglePrescriptionDetail = () => {
    prescription_detail.parentElement.classList.toggle("open");
  };

  const init = () => {
    retail_type.value = pharmacyType.Retail;
    mail_order.value = pharmacyType.MailOrder;
    radio_comp.items = [
      { label: "Price (low - high)", value: pharmacySortOption.PriceLowHigh },
      { label: "Price (high - low)", value: pharmacySortOption.PriceHighLow },
      { label: "Distance", value: pharmacySortOption.Distance },
    ];
  };

  const handleMapView = () => 
  {
      pharmacies_listing.view ='map';
  }

  
  const handleFilterOnLoad = async () => {
    let payload = await findDrugPricesByZipPayload();
    const params = Utils.getQueryParam("*");
    const hasAtLeastOnePropertyFilled = Object.values(params).some((value) =>
      Boolean(value)
    );
    if (hasAtLeastOnePropertyFilled) {
      if (params.type) {
        payload.type = filters.type = params.type;
        let types = params.type.split(",");
        if (types.includes(pharmacyType.Retail)) {
          retail_type.checked = true;
        }
        if (types.includes(pharmacyType.MailOrder)) {
          mail_order.checked = true;
        }
      }
      if (params.sortBy) {
        payload.sortBy = filters.sortBy = params.sortBy;
        radio_comp.value = params.sortBy;
      }
      if (params.zipCode) {
        payload.zipCode = filters.zipCode = params.zipCode;
        search_input.value = params.zipCode;
      }
      callSearchAPI(payload);
    }
  };

  const handleFilter = () => {
    filter_container.hidden
      ? (filter_container.hidden = false)
      : (filter_container.hidden = true);
    Utils.clickOutside(filter_container, (event) => {
      if (
        !filter_container.contains(event.target) &&
        !filter_btn.contains(event.target)
      ) {
        filter_container.hidden = true;
      }
    });
    handleSortFilters();
    handlePharmacyTypeFilters();
  };

  const applyFilter = async () => {
    filter_container.hidden = true;
    let payload = await findDrugPricesByZipPayload();
    let params = Utils.getQueryParam("*");
    payload.type = params.type;
    payload.sortBy = params.sortBy;
    callSearchAPI(payload);
  };

  const handleMapViewButton = () => {
    if(map_view_btn.classList.contains("active"))
      map_view_btn.addEventListener("click", handleMapView);
  }

  const callSearchAPI = async (payload) => {
    try {
      const response = await findDrugPricesByZip(payload);
      pharmacies_listing.value = await response.result;
      handleMapViewButton();
    } catch (error) {
      console.log("Error fetching search results:", error);
    }
  };

  const handlePharmacyTypeFilters = () => {
    filters.type = [];
    const inputs = document.querySelectorAll(".pharmacy__types");
    inputs.forEach((input, index) => {
      if (input.checked) {
        filters.type.push(input.value);
      }
      input.addEventListener("click", (event) => {
        let value = event.target.value;
        let index = filters.type.indexOf(value);
        if (event.target.checked && index === -1) filters.type.push(value);
        else if (!event.target.checked && index !== -1)
          filters.type.splice(index, 1);
        Utils.buildQueryParams(filters);
      });
    });
  };

  const handleSortFilters = () => {
    radio_comp.addEventListener("valueChange", (e) => {
      filters.sortBy = e.detail;
      Utils.buildQueryParams(filters);
    });
  };

  const searchAPI = async (query) => {
    if (!query) {
      suggestions.innerHTML = "";
      return;
    }
    try {
      const response = await findSearchTermSuggestions(query);
      const data = await response.result.locations;
      displaySuggestions(data);
    } catch (error) {
      console.log("Error fetching search results:", error);
    }
  };

  const displaySuggestions = (data) => {
    suggestions_container.hidden = false;
    data?.map((item) => {
      const zipCode = Utils.extractNumericWord(item);
      const li = Utils.createElement("li", {}, [item]);
      suggestions.append(li);

      li.addEventListener("click", async (event) => {
        suggestions_container.hidden = true;
        try {
          const response = await findDrugPricesByZip(event.target.zipCode);
          pharmacies_listing.value = await response.result;
          filters.zipCode = zipCode;
          search_input.value = zipCode;
          Utils.buildQueryParams(filters);
          handleMapViewButton();
        } catch (error) {
          console.log("Error fetching search results:", error);
        }
      });
    });
  };

  const handleSearch = () => {
    search_input.addEventListener(
      "input",
      Utils.debounce(
        async (e) => {
          try {
            await searchAPI(e.target.value);
            search_spinner.style.display = "none";
          } catch (error) {
            console.log("Error fetching search results:", error);
          }
        },
        500,
        () => {
          search_spinner.style.display = "inline-block";
        }
      )
    );
    document.addEventListener("click", (e) => {
      if (!search_input.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions_container.hidden = true;
      }
    });
  };

  const handleUserLocationPharmacy = async () => {
    try {
      let { latitude, longitude } = await Utils.getCurrentLocation();
      let coordinates = `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
      search_input.value = coordinates;
      const response = await findDrugPricesByGeo();
      Utils.buildQueryParams(Utils.clearObject(filters));
      pharmacies_listing.value = await response.result;
      handleMapViewButton();
    } catch (error) {
      console.log("error", error);
      alert(error.message);
    }
  };
  // teardown will exectue when view will leave the DOM
  const teardown = () => {};

  return {
    html: template,
    css: [css],
    afterRender,
    teardown,
  };
}
