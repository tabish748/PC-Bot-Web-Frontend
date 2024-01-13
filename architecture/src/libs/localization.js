export class Localization {
    constructor() {
      this.userLang = localStorage.getItem("language") || "en-US";
      document.addEventListener("DOMContentLoaded", () => this.initLocalization());
    }
  
    // Utility function to load translations from a JSON file.
    loadTranslations(lang) {
      return fetch(`../translations/${lang}.json`)
        .then(response => response.json())
        .catch(error => {
          console.error("Error fetching translation file:", error);
        });
    }
  
    // Utility function to translate a key from the loaded translation file.
    translate(key, translations,  dynamicValues = {}) {
      if (translations.web && translations.web[key]) {
        let translatedText = translations.web[key];
        // Replace dynamic values in the translated text
        for (const [placeholder, value] of Object.entries(dynamicValues)) {
          translatedText = translatedText.replace(`{${placeholder}}`, value);
        }
        return translatedText;
      } else if (translations.error && translations.error[key]) {
        let translatedText = translations.error[key];
        // Replace dynamic values in the translated text
        for (const [placeholder, value] of Object.entries(dynamicValues)) {
          translatedText = translatedText.replace(`{${placeholder}}`, value);
        }
        return translatedText;
      } else {
        console.warn(`Missing translation for key: ${key}`);
        return key;
      }
    }
  
    // Function to update the UI elements with translated text.
     updateUI(translations) {
      const translationKeys = Object.keys(translations.web).concat(Object.keys(translations.error));
    
      requestAnimationFrame(() => {
        translationKeys.forEach(key => {
          const element = document.getElementById(key);
    
          if (element) {
            // Get the data-dynamic-* attributes and create an object with dynamic values
            const dynamicAttributes = Array.from(element.attributes)
              .filter(attr => attr.name.startsWith('data-dynamic-'))
              .reduce((obj, attr) => {
                const propName = attr.name.slice('data-dynamic-'.length);
                console.log('propName',propName)
                obj[propName] = attr.value;
                console.log('obj',obj)
                return obj;
              }, {});
    
            element.textContent = this.translate(key, translations, dynamicAttributes);
          }
        });
      });
    }
    // Function to initialize localization with the user's preferred language.
    initLocalization() {
        return new Promise((resolve, reject) => {
          const userLang = localStorage.getItem("language") || "en-US";
    
          this.loadTranslations(userLang)
            .then(translations => {
              this.updateUI(translations);
              resolve();
            })
            .catch(error => {
              console.error("Error initializing localization:", error);
              reject(error);
            });
        });
      }
  }
  
  // Instantiate the Localization class when the DOM is ready.
  new Localization();
  