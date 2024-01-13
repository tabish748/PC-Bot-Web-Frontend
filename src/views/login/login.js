import Utils from "../../libs/utils.js";
import FormHandler from "../../libs/form-handling/form-handling.js";
import { Validators } from "../../libs/form-handling/validators.js";
import { loginUser } from "../../services/user/user-service.js";
import Router from "../../routes/router.js";
import Toast from "../../components/toast/toast.js";

export async function loginLayout() {
  //import
  const template = await Utils.fetchTemplate("login/login.tpl");
  const loginCss = await Utils.loadCSS("../../compiled-css/pages/login.css");
  // await Utils.fetchTemplate("login/login.tpl");

  //SEO
  Utils.setPageTitle("Login Screen");
  Utils.setMetaTag(
    "keywords",
    "about, single page application, Login Scalamed"
  );
  //After Render

  const afterRender = () => {
    main();
    function main() {
      console.log("loginUser", loginUser);
      Utils.setIdShortcuts(document, window);
      login();
    }

    function login() {
      // createFailed.setAttribute('data-dynamic-context', 'testing')
      new FormHandler({ formId: "login_form" });
      login_form.addEventListener("formSubmit", async () => {
        try {
          const userCredentials = {
            email: email.value,
            password: password.value,
          };
          const response = await loginUser(userCredentials);
          if (response && response.token) {
            localStorage.setItem("token", response.token);
            const router = Router.getInstance();
            showToast("Login Successfully", "true");
            setTimeout(() => {
              router.navigateTo(`${window.location.origin}/clients`);
            }, 2000);
          } else {
            showToast("Wrong Credentials", "false");
          }
        } catch (error) {
          console.log("Error logging in user:", error);
          showToast("Wrong Credentials", "false");
        }

        const formSubmitCompleteEvent = new CustomEvent("formSubmitComplete");
        login_form.dispatchEvent(formSubmitCompleteEvent);
      });
    }
  };

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
    css: [loginCss],
    afterRender,
    teardown,
  };
}
