import Utils from '../../libs/utils.js';
import RxLayout from '../../components/rx-layout/rx-layout.js';
import ButtonAction from '../../components/button/button.js';
import Router from '../../routes/router.js';

// import { requestRxDownloadToken } from "../../services/rx/rx-service.js";

import FormHandler from "../../libs/form-handling/form-handling.js";
export async function identityVerificationView()
{
    //Here you can import files
    const template = await Utils.fetchTemplate('identity-verification/identity-verification.tpl');
    const css = await Utils.loadCSS('../../compiled-css/pages/identity-verification.css');

    //SEO
    Utils.setPageTitle('Verify your identity - Scalamed');

    // After Render will automatically call when HTML will insert into DOM
    const afterRender = () => 
    {
        main();
        function main()
        {
              const requestRxDownloadToken =
              {
                Send: function ()
                {
                  return {
                    'otp': true,
                    'dob': true
                  };
                }
              };
            Utils.setIdShortcuts(document, window);
            handleCounter(120);
            handleForm();

            function handleForm() 
            {
              new FormHandler({ formId: "dob_form" });
              dob_form.addEventListener("formSubmit", async () => {
                  try {
                    const payload = {
                      "telecom": "+923413639160",
                      "dob": 19920202,
                    };
                    const response = await requestRxDownloadToken.Send();
                    if(response.otp === true && response.dob === true)
                    {
                      const router = Router.getInstance();
                      router.navigateTo(`${window.location.origin}/rxDownloading`);
                    }
                    else
                    {
                      if(response.otp === false)
                      Utils.showApiError(otp_input, 'Incorrect code. please try again or resend')
                      if(response.dob === false)
                      Utils.showApiError(calendar_input, 'This date of birth does not match our records')
                    }
                    
                    const formSubmitCompleteEvent = new CustomEvent('formSubmitComplete');
                    dob_form.dispatchEvent(formSubmitCompleteEvent);
                  } catch (error) {
                    console.error("Error:", error);
                  }
                });
            }

            function handleCounter(count)
              {
                const timer = setInterval(function() {
                if (count <= 0) {
                    clearInterval(timer);
                    remaining_seconds.textContent = "Resend";
                    remaining_seconds.previousElementSibling.hidden = true;
    
                } else {
                    remaining_seconds.textContent = count + " Seconds";
                    count--;
                }
                }, 1000);
              }
        }
    }


     // teardown will exectue when view will leave the DOM 
  const teardown = () => {
  };

    return {
        html: template,
        css: [css],
        afterRender,
        teardown,
    }
}