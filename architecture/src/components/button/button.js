import Utils from "../../libs/utils.js";

class ButtonAction extends HTMLElement
{
  static tname = "button-action";
  
  constructor()
  {
    super();

    this.action = null;
    Utils.Bind(this, "On_");
  }

  connectedCallback()
  {
    this.Render();
  }

  click()
  {
    this.submit_btn.click();
  }

  async On_Click()
  {
    // if(this.submit_btn.type == 'submit')
    // this.Set_Loading(true);
    // if (this.action)
    // {
    //   await this.action();
    // }
   
  }

  Set_Loading(type)
  {
   if(type === true)
  {
    this.text.hidden = true;
    this.spinner.hidden= false;
  }
   else
   {
    this.spinner.hidden= true;
    this.text.hidden = false;

   }
  }
  _handleAttributes()
  {
    if(this.hasAttribute('redirect-link'))
    {
      this.submit_btn.setAttribute('redirect-to', this.getAttribute('redirect-link'))
      this.submit_btn.setAttribute('data-link', 'true')
    }
    if(this.hasAttribute('primary'))
    {
      this.submit_btn.classList.add('theme__btn--primary')
    }
    if(this.hasAttribute('secondary'))
    {
      this.submit_btn.classList.add('theme__btn--secondary')
    }
    if(this.hasAttribute('w-100'))
    {
      this.submit_btn.classList.add('w__100');
      this.classList.add('w__100');
    }
    if(this.hasAttribute('className'))
    {
      this.submit_btn.classList.add(this.getAttribute('className'))
    }
    if(this.hasAttribute('type'))
    {
      this.submit_btn.type = this.getAttribute('type');
    }
    if(this.hasAttribute('small'))
    {
      this.submit_btn.classList.add('theme__btn--small')
    }
    if(this.hasAttribute('medium'))
    {
      this.submit_btn.classList.add('theme__btn--medium')
    }
    if(this.hasAttribute('icon'))
    {
      this._addIconInButton();
    }
  }
  _addIconInButton()
  {
    const icon = Utils.createElement(
      "i",
      { class: `icon-${this.getAttribute('icon')}` },
      []
    );
    this.submit_btn.insertBefore(icon, this.submit_btn.firstChild)
  }

  Render()
  {
    const html = `
    <button class="theme__btn" id="submit_btn" >
    <img id="spinner" class="loading" src="../../assets/images/icons/spinner.svg" hidden>

      <span id="text">
      </span>
    </button>
    `;

    const doc = Utils.toDocument(html);
    this.replaceChildren(doc);
    Utils.setIdShortcuts(this, this);

    this.submit_btn.addEventListener("click", this.On_Click);
    this.text.innerText = this.getAttribute("label-txt") || "";
    this._handleAttributes();
    
  }
}

Utils.Register_Element(ButtonAction);

export default ButtonAction;
