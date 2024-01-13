class Utils {
  static setIdShortcuts(srcElem, destElem, attrName = "id") {
    const elems = srcElem.querySelectorAll("[" + attrName + "]");
    for (const elem of elems) {
      const idValue = elem.getAttribute(attrName);
      destElem[idValue] = elem;
    }
  }

  static createElement(tag, attrs = {}, children = []) {
    const element = document.createElement(tag);
    for (const attr in attrs) {
      element.setAttribute(attr, attrs[attr]);
    }
    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });

    return element;
  }

  static setPageTitle(title) {
    document.title = title;
  }

  static setMetaTag(name, content) {
    let metaTag = document.head.querySelector(`meta[name="${name}"]`);
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.name = name;
      document.head.appendChild(metaTag);
    }
    metaTag.content = content;
  }

  static isEmpty(items) {
    let res = false;
    const typeOfItems = typeof items;
    if (items == null || items == undefined) {
      res = true;
    } else if (Array.isArray(items)) {
      if (items.length == 0) {
        res = true;
      }
    } else if (typeOfItems == "string") {
      const str = items.trim();
      if (str.length == 0 || str == "") {
        res = true;
      }
    } else if (typeOfItems == "object") {
      if (items?.constructor?.name == "NodeList") {
        res = length > 0;
      } else {
        res = Utils.isEmptyObj(items);
      }
    } else if (items.length == 0) {
      res = true;
    }

    return res;
  }

  static async fetchTemplate(templatePath) {
    const baseUrl = window.location.origin;

    const response = await fetch(`${baseUrl}/views/${templatePath}`);
    if (!response.ok) {
      throw new Error(`Error fetching template ${templatePath}`);
    }
    return await response.text();
  }

  static toDocument(html) {
    var template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content;
  }

  static Register_Element(elem_class) {
   
    const comp_class = customElements.get(elem_class.tname);
    if (comp_class == undefined) {
      customElements.define(elem_class.tname, elem_class);
    }
  }

  static Bind(obj, fn_prefix)
  {
    const members = Utils.getMethods(obj);
    for (const member of members)
    {
      if (typeof obj[member] == "function" && member.startsWith(fn_prefix))
      {
        obj[member] = obj[member].bind(obj);
      }
    }
  }

  static getMethods(obj)
  {
    let properties = new Set();
    let currentObj = obj;
    do 
    {
      Object.getOwnPropertyNames(currentObj).map(item => properties.add(item));
    }
    while ((currentObj = Object.getPrototypeOf(currentObj)));
    return [...properties.keys()].filter(item => typeof obj[item] === 'function');
  }
  static loadCSS(url) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${url}?t=${Date.now()}`; // Add timestamp
      link.onload = () => resolve(link);
      link.onerror = (error) => reject(error);
      document.head.appendChild(link);
    });
  }
  static showApiError(input, errorMessage)
  {
    const errorElement = Utils.createElement('div', {class: 'error-message'}, []);
    input.parentNode.insertBefore(errorElement, input.nextSibling);
    input.parentNode.classList.add('error')
    if (errorElement) {
      errorElement.textContent = errorMessage;
    } else {
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('error-message');
      errorDiv.textContent = errorMessage;
      input.parentElement.appendChild(errorDiv);
    }
  }
  static extractNumericWord(str)
  {
    const Regex = /\d+/;
    const code = str.match(Regex);
  
    if (code) {
      return code[0];
    } else {
      return null;
    }
  }
  
  static getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          (error) => {
            switch(error.code) {
              case error.PERMISSION_DENIED:
                reject(new Error("User denied the request for Geolocation."));
                break;
              case error.POSITION_UNAVAILABLE:
                reject(new Error("Location information is unavailable."));
                break;
              case error.TIMEOUT:
                reject(new Error("The request to get user location timed out."));
                break;
              case error.UNKNOWN_ERROR:
                reject(new Error("An unknown error occurred."));
                break;
            }
          },
          {
            enableHighAccuracy: false,
            timeout: 8000,
            maximumAge: 0,
          }
        );
      } else {
        reject(new Error('Geolocation not supported by this browser'));
      }
    });
  }

  static buildQueryParams(filters) {
    const queryParams = new URLSearchParams();
    for (const filterKey in filters) {
      if (filters.hasOwnProperty(filterKey)) {
        const filterValue = filters[filterKey];
        queryParams.set(filterKey, filterValue);
      }
    }
    this.updateUrlWithQueryParams(queryParams.toString());
  };


  static updateUrlWithQueryParams(queryParams) {
    const currentUrl = new URL(window.location.href);
    currentUrl.search = queryParams;
    history.pushState(null, '', currentUrl.toString());
  }

  static clickOutside(target, callback) {
    function handleClick(event) {
      if (!target.contains(event.target)) {
        callback(event);
      }
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }
 
  static getQueryParam(keys) 
  {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if (typeof keys === 'string') 
    {
      if (keys === '*') 
      {
        let paramsObj = {};
        for (let param of params.entries()) 
        {
          paramsObj[param[0]] = param[1];
        }
        return paramsObj;
      }
      return params.get(keys);
    }
    let result = {};
    for (let key of keys) 
    {
      result[key] = params.get(key);
    }
    return result;
    }

    static debounce(func, wait, onStart)
    {
      let timeout;
      return function (...args) {
        const context = this;
        if (onStart) onStart();
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
      };
    };

    static emptyObj() 
    {
      return {
        prop1: '',
        prop2: null,
        prop3: 'value',
        prop4: undefined  
      }
    };
    
    static loadScript(url) {
      return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = url;
  
          script.onload = resolve;
          script.onerror = reject;
  
          document.body.appendChild(script);
      });
  }

  static removeScript(url) {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; --i) {
        if (scripts[i].src === url) {
            scripts[i].parentNode.removeChild(scripts[i]);
            break;
        }
    }
}

static clearObject(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      delete obj[prop];
    }
  }
  return obj;
}

static getQueryParams(url) {
  const queryString = url.split('?')[1];
  if (!queryString) return {};

  return queryString
      .split('&')
      .reduce((params, param) => {
          const [key, value] = param.split('=');
          params[key] = decodeURIComponent(value);
          return params;
      }, {});
}

static floatingLabel(){
  console.log('enterr')
  document.querySelectorAll('.form-input').forEach(input => {
    if(input.value)
    {
      input.parentElement.classList.add('active');
    }
    else
    {
      input.parentElement.classList.remove('active');
    }
    input.addEventListener('input', () => {
        if (input.value) {
            input.parentElement.classList.add('active');
        } else {
            input.parentElement.classList.remove('active');
        }
    });
    input.addEventListener('focus', ()=> {
      input.parentElement.classList.add('active');
    })
    input.addEventListener('blur', ()=> {
      if(!input.value)
      input.parentElement.classList.remove('active');
    })
});

};

static convertToUnderscore(text)
{
  return text
  .trim()                        // Remove any leading or trailing spaces
  .toLowerCase()                 // Convert the entire string to lowercase
  .replace(/\s+/g, '_')         // Replace one or more spaces with an underscore
  .replace(/[/\[\](){}!@#$%^&*+=|<>?~;,]/g, ''); // Remove special symbols and brackets
}
    
static copyToClipboard(value) {
  const el = document.createElement('textarea'); 
  el.value = value;
  el.setAttribute('readonly', ''); 
  el.style.position = 'absolute'; 
  el.style.left = '-9999px'; 
  document.body.appendChild(el); 
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0) 
      : false; 
  el.select(); 
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) { 
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}
}
export default Utils;
