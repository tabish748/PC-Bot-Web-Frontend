import Utils from "../../libs/utils.js";

class DashboardLayout extends HTMLElement {
  static tname = "dashboard-layout";

  static get observedAttributes() {
    return ["heading", "breadCrumb"]; // Added 'breadCrumb' to the observed attributes
  }

  constructor() {
    super();
    Utils.Bind(this, "On_");
  }

  connectedCallback() {
    this.Render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "heading") {
      this.updateDashboardHeading(newValue);
    }
    if (name === "breadCrumb") {
      // Checking for changes in the 'breadCrumb' attribute
      this.updateBreadcrumb(newValue);
    }
  }

  updateDashboardHeading(value) {
    const headingElem = this.querySelector("#dashboard_heading");
    if (headingElem) {
      headingElem.textContent = value;
    }
  }

  updateBreadcrumb(value) {
    const elem = this.querySelector("#breadCrumbBox");
    
    try {
        const breadcrumbs = JSON.parse(value);
        let breadcrumbHTML = "";
        breadcrumbs.forEach((crumb, index) => {
            breadcrumbHTML += `<a href="${crumb.href}" data-link >${crumb.label}</a>`;
            if(index !== breadcrumbs.length - 1) {
                breadcrumbHTML += " / ";
            }
        });
        elem.innerHTML = breadcrumbHTML;
    } catch (e) {
        console.error("Failed to parse breadcrumb attribute:", e);
    }
}

  Render() {
    const html = `
      <div class="dashboard-layout">
        <aside class="dashboard-layout__sidebar">
        <a href="/dashboard" data-link>
          <img class="dashboard-layout__logo" src="../../assets/images/logo.svg" alt="Logo">
          </a>
          <nav class="dashboard-layout__nav">
            <a href="/dashboard" data-link class="d__flex align__items__center"> 
            <img src='assets/images/dashboard.png' class="sidebar-menu-icon"> Dashboard</a>
            <a href="/clients" data-link class="d__flex align__items__center">  <img src='assets/images/clients.png'class="sidebar-menu-icon"> Clients</a>
            <a id="logout" class="pointer__cursor d__flex align__items__center"> <img src='assets/images/icons/logout-icon.svg' class="sidebar-menu-icon">  Logout</a>
          
          </nav>
        </aside>
        <div class="dashboard-layout__main">
          <header class="dashboard-layout__header">
            <h1 class="heading__buddy dark" id="dashboard_heading" style="text-transform:capitalize;">Dashboard</h1>
            <span class="dashboard-layout__breadcrumb" id="breadCrumbBox">
             
            </span>
          </header>
          <div class="dashboard-layout__content " id="dashboard-layout-container">
          </div>
        </div>
      </div>
    `;

    const doc = Utils.toDocument(html); // build template from html
    const main_elem = doc.getElementById("dashboard-layout-container");
    main_elem.replaceChildren(...this.children); // move child elements into template
    this.replaceChildren(doc);

    const logout_btn = document.getElementById("logout");
    logout_btn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    });

    const headingValue = this.getAttribute("heading");
    if (headingValue) {
      this.updateDashboardHeading(headingValue);
    }
    const breadCrumbValue = this.getAttribute("breadCrumb");
    if (breadCrumbValue) {
      this.updateBreadcrumb(breadCrumbValue);
    }
  }
}

Utils.Register_Element(DashboardLayout);

export default DashboardLayout;
