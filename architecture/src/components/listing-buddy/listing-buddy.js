import Utils from "../../libs/utils.js";

class ListingBuddy extends HTMLElement {
  static tname = "listing-buddy";

  constructor() {
    super();
    this.markers = [];
    this.action = null;
    this.selectedCard = null;
    this.infoWindow = null;
    Utils.Bind(this, "On_");
    this.mode = "list";
  }

  connectedCallback() {
    this.Render();
    Utils.loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAooY8V107rnpI6sj_bVr9jPoPW09x5Ncg"
    );
  }

  disconnectedCallback() {
    Utils.removeScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAooY8V107rnpI6sj_bVr9jPoPW09x5Ncg"
    );
    this.clearOldMarkers();
  }

  set value(data) {
    if (data.length > 0) {
      if (this.mode == "map") {
        this._handleMapView("updatedList");
        this._displayPharmacies(data);
      } else {
        this._displayPharmacies(data);
      }
    } else {
      this._showEmptyList();
    }
  }

  set view(mode) {
    this.mode = mode;
    // if (this.mode == "map") {
    this._handleMapView();
    // }
  }

  _showEmptyList() {
    const emp = Utils.createElement(
      "div",
      { class: "empty__list", id: "empty_list" },
      ["this is empty list"]
    );
    this.list__view__mode.appendChild(emp);
  }

  _handleMapView(flag) {
    const mapWrapper = this.list__view__mode;
    const mapViewButton = map_view_btn;
    const mapViewButtonIcon = mapViewButton.querySelector("i");
    const mapViewButtonText = mapViewButton.querySelector("p");

    if (!mapWrapper.classList.contains("map__view")) {
      mapWrapper.classList.add("map__view");
      mapViewButtonIcon.classList.replace("icon-mapview", "icon-listview");
      mapViewButtonText.innerText = "List view";
      this.mode = "map";
      this.list__view__mode.appendChild(this.createMapWrapper());
      setTimeout(() => this.initMap(this.locations), 500);
    } else {
      if (flag === "updatedList") {
        setTimeout(() => this.initMap(this.locations), 500);
      } else {
        map_wrapper.remove();
        mapWrapper.classList.remove("map__view");
        mapViewButtonIcon.classList.replace("icon-listview", "icon-mapview");
        mapViewButtonText.innerText = "Map view";
        this.mode = "list";
      }
    }
  }

  initMap(locations) {
    const { latSum, lngSum } = locations.reduce(
      (sum, location) => {
        return {
          latSum: sum.latSum + location.lat,
          lngSum: sum.lngSum + location.lng,
        };
      },
      { latSum: 0, lngSum: 0 }
    );
    const averageLat = latSum / locations.length;
    const averageLng = lngSum / locations.length;

    const map = this.initializeGoogleMap(averageLat, averageLng);
    this.clearOldMarkers();
    this.addNewMarkers(map, locations);
  }

  createMapWrapper() {
    return Utils.createElement(
      "div",
      { class: "map__wrapper", id: "map_wrapper" },
      []
    );
  }

  initializeGoogleMap(averageLat, averageLng) {
    const map = new google.maps.Map(document.getElementById("map_wrapper"), {
      center: { lat: averageLat, lng: averageLng },
      zoom: 13,
      fullscreenControl: false,
    });
    const customFullScreenControl = Utils.createElement(
      "div",
      { class: "custom__largescreen__icon", id: "largescreen_icon" },
      []
    );
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
      customFullScreenControl
    );
    const customFullScreenControlText = Utils.createElement(
      "div",
      { class: "custom__largescreen__text", id: "largescreen_text" },
      ["Full Screen"]
    );
    customFullScreenControl.appendChild(customFullScreenControlText);
    customFullScreenControl.addEventListener("click", function () {
      const event = new CustomEvent("customFullScreenControlClicked", {
        detail: { message: "Full screen clicked" },
      });
      window.dispatchEvent(event);
    });
    return map;
  }

  clearOldMarkers() {
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];
  }

  addNewMarkers(map, locations) {
    const icon = this.getIconObject();
    locations.forEach((location, index) => {
      this.createMarker(map, location, icon, index);
    });
  }

  getIconObject() {
    return {
      url: "../../assets/images/icons/mapPointer.svg",
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0),
    };
  }

  createMarker(map, location, icon, index) {
    const marker = new google.maps.Marker({
      position: location,
      icon: icon,
    });
    marker.setMap(map);
    this.attachMarkerListener(marker, map, index);
    this.markers.push(marker);
  }

  attachMarkerListener(marker, map, index) {
    google.maps.event.addListener(marker, "click", () => {
      this.handleMarkerClick(marker, map, index);
    });
  }

  handleMarkerClick(marker, map, index) {
    const position = marker.getPosition();
    const cards = this.querySelectorAll(".list__card");
    const card = cards[index];
    if (this.selectedCard) {
      this.selectedCard.classList.remove("active");
    }
    if (card) {
      card.scrollIntoView({ behavior: "smooth" });
      card.classList.add("active");
      this.selectedCard = card;
    }

    // info window on google map
    if (this.infoWindow) {
      this.infoWindow.close();
    }

    const infoWindow = new google.maps.InfoWindow({
      content: this._createInfoWindowContent(card),
    });

    infoWindow.open(map, marker);
    this.infoWindow = infoWindow;
  }

  _createInfoWindowContent(card) {
    const name = card.querySelector(".list__card__name h3").innerText;
    const address = card.querySelector(".pharmacy__address").innerText;
    const scheduleStatus = card.querySelector(
      ".list__card__schedule span"
    ).innerText;
    const scheduleInfo = card.querySelector(
      ".list__card__schedule p"
    ).innerText;
    const distanceValue = card.querySelector(
      ".list__card__schedule .pharmacy__distance"
    ).innerText;
    const price = card.querySelector(".list__card__price p b").innerText;

    return `<div class="map__tooltip">
      <div class="tooltip__title__container"> 
        <h3>${name}</h3>
        <b>$${price}</b> 
      </div>
        <p> <span class='${
          scheduleStatus == "open" ? "open__label" : "close__label"
        }'> ${scheduleStatus}</span> <span>${scheduleInfo} </span> | ${distanceValue}</p>
      </div>`;
  }

  _displayPharmacies(data) {
    map_view_btn.classList.add("active");
    this.list_wrapper.innerHTML = "";
    data.forEach((item) => this.list_wrapper.append(this._createCard(item)));

    this.locations = data.map((item) => ({
      lat: item.latitude,
      lng: item.longitude,
    }));
  }

  _createCard(data) {
    const open = data?.isOpenNow ? "open" : "closed";
    const listCard = Utils.createElement("div", { class: "list__card" }, [
      Utils.createElement("div", { class: "list__card__name" }, [
        Utils.createElement("h3", {}, [data?.name]),
        Utils.createElement("p", { class: "pharmacy__address" }, [
          data.addressLine1,
        ]),
      ]),
      Utils.createElement("div", { class: "list__card__price" }, [
        Utils.createElement("p", {}, [
          Utils.createElement("b", {}, ["34"]),
          "Coupon",
        ]),
      ]),
      Utils.createElement("div", { class: "list__card__schedule" }, [
        Utils.createElement(
          "span",
          { class: open == "open" ? "open" : "closed" },
          [open]
        ),
        Utils.createElement("p", {}, ["opens 9:00am"]),
        Utils.createElement("p", { class: "pharmacy__distance" }, [
          data.distanceDisplayValue,
        ]),
      ]),
      Utils.createElement("div", { class: "list__card__cta" }, [
        Utils.createElement("button-action", {
          "label-txt": "Select",
          primary: "",
          "w-100": "",
          small: "",
        }),
      ]),
    ]);
    listCard.lat = data.latitude;
    listCard.lng = data.longitude;
    return listCard;
  }

  Render() {
    const html = `
      <div id="list__view__mode">
        <div class="list__wrapper" id="list_wrapper"></div>
      </div>
      `;
    const doc = Utils.toDocument(html);
    this.replaceChildren(doc);
    Utils.setIdShortcuts(this, this);
  }
}

Utils.Register_Element(ListingBuddy);

export default ListingBuddy;
