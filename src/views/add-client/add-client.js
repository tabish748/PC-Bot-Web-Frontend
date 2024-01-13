import Utils from "../../libs/utils.js";
import ButtonAction from "../../components/button/button.js";
import DashboardLayout from "../../components/dashboard-layout/dashboard-layout.js";
import TableBuddy from "../../components/table-buddy/table-buddy.js";
import FormHandler from "../../libs/form-handling/form-handling.js";
import { createUser } from "../../services/user/user-service.js";
import { createDeceased } from "../../services/deceased/deceased-service.js";
import Router from "../../routes/router.js";
import GrantTypeToggle from "../../components/grant-type/grant-type.js";
import Toast from "../../components/toast/toast.js";

export async function addClientDashboardView() {
  //Here you can import files
  const template = await Utils.fetchTemplate("add-client/add-client.tpl");
  const css = await Utils.loadCSS("../../compiled-css/pages/add-client.css");

  //SEO
  Utils.setPageTitle("Add-Client");

  // After Render will automatically call when HTML will insert into DOM
  const filters = {};

  const afterRender = async () => {
    Utils.setIdShortcuts(document, window);
    // toggleBtn();
    handleForm();
    // addExecutorNewForm();
    handleFields();
    floatingLabel();
  };

  const floatingLabel = () => {
    document.querySelectorAll('.form-input').forEach(input => {
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
  
  }

  const handleFields = () => {
    divorce_after_the_will_was_made.addEventListener('input', (e)=> {
      e.target.value == 'yes' ?  details_of_divorce_box.hidden = false:  details_of_divorce_box.hidden = true;
    })
  }



  async function handleForm() {
    new FormHandler({ formId: "add_client_form" });
    add_client_form.addEventListener("formSubmit", async () => {
      const grant_values = add_client_grant_type.getSelectedGrant();
      console.log("getSelectedGrant", grant_values);

      try {
        const userPayload = {
          first_name: first_name.value,
          middle_name: middle_name.value,
          last_name: last_name.value,
          address: address.value,
          email: email.value,
          phone: phone.value,
          type_grant: grant_values?.type,
          type_grant_sub: grant_values.subType,
          supreme_court: Supreme_court.value,
          password: password.value,
          tenant: 22,
          occupation: occupation.value,
          relationship_to_deceased: relation_to_deceased.value,
          affidavit: affidavit.value,
        };

        const userResponse = await createUser(userPayload);
        console.log(userResponse);
        if (userResponse.message) {
          const deceasedPayload = {
            user_id: userResponse?.user_id,
            first_name: deceased_first_name.value,
            middle_name: deceased_middle_name.value,
            last_name: deceased_last_name.value,
            last_address: deceased_address.value,
            marital_status_will_made: martial_status_when_will_was_made.value,
            divorce_after_will: divorce_after_the_will_was_made.value,
            details_of_divorce: details_of_divorce.value,
          };

          console.log("deceasedPayload", deceasedPayload);
          const deceasedResponse = await createDeceased(deceasedPayload);

          if (userResponse.message && deceasedResponse.message) {
            showToast(userResponse.message, 'true')
            const router = Router.getInstance(); 
            router.navigateTo(
              `${window.location.origin}/edit-client?id=${userResponse?.user_id}#client_profile`
            );
          }
          console.log('test', userResponse);
        }
        if (userResponse.error) showToast(userResponse.error, 'false')

        const formSubmitCompleteEvent = new CustomEvent("formSubmitComplete");
        add_client_form.dispatchEvent(formSubmitCompleteEvent);
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }

  
  const showToast = (message, type) => {
    const toastEl = document.createElement("ui-toast");
    toastEl.setAttribute("toast.message", message);
    toastEl.setAttribute("toast.type", type); // 'true' for success, 'false' for error
    document.body.appendChild(toastEl);
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
