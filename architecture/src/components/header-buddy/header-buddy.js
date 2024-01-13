import Utils from '../../libs/utils.js';
class HeaderBuddy extends HTMLElement {
  static tname = "header-buddy";
  constructor() {
    super();
    Utils.Bind(this, "on");
  }

  async connectedCallback() {
    await this.Render();
    this.attachEventListeners(); // Attach the event listeners here
  }

  onMenuClick() {
    nav_menu_section.classList.add('collapse');
  }

  onHideNav() {
    nav_menu_section.classList.remove('collapse');
  }

  handleOutsideClick(event) {
    if (
      !nav_menu_section.contains(event.target) &&
      !hamburger_icon.contains(event.target)
    ) {
      this.onHideNav();
    }
  }

  async Render() {
    const html = `
    <header class="header">
    <div class="container">
        <div class="header__wrapper">
            <i class="icon-scalamed-logo icon-2x"></i>
            <img src="../../assets/images/icons/hamburger.svg" class="header__wrapper__hamburger__icon" id="hamburger_icon"/>
           <div class="header__menu__section" id="nav_menu_section">
           <div class="header__menu__container" id="nav_menu_container">
           <i class="icon-close"  id="header_menu_close_btn"></i>
               <ul>
                   <li><a href="/" data-link> Home </a></li>
                   <li><a href="/" data-link> Contact </a></li>
                   <li><a href="/" data-link> Privacy & Terms </a></li>
               </ul>
           </div>
           
           </div>
        </div>
    </div>
    </header>
  `;

    const doc = Utils.toDocument(html);
    this.replaceChildren(doc);
    Utils.setIdShortcuts(this, this);
    this.header_menu_close_btn.addEventListener('click', () => this.onHideNav());
  }

  attachEventListeners() 
  {
    if (this.hamburger_icon) {
      this.hamburger_icon.addEventListener('click', () => this.onMenuClick());
    }
    document.addEventListener('click', (event) => this.handleOutsideClick(event));
  }
}

// Register the custom element
Utils.Register_Element(HeaderBuddy);
export default HeaderBuddy;
