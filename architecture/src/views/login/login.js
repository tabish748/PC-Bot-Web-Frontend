import Utils from "../../libs/utils.js";
import FormHandler from "../../libs/form-handling/form-handling.js";
import { Validators } from "../../libs/form-handling/validators.js";
import { loginUser } from "../../services/user/user-service.js";

export async function loginLayout() {
  //import
  const template = await Utils.fetchTemplate("login/login.tpl");
  // await Utils.fetchTemplate("login/login.tpl");

  //SEO
  Utils.setPageTitle("Login Screen");
  Utils.setMetaTag(
    "keywords",
    "about, single page application, Login Scalamed"
  );
  //After Render

  const afterRender = () => {
    main()
    function main() {
      console.log('loginUser',loginUser)
      Utils.setIdShortcuts(document, window);
      new FormHandler({ formId: "myForm" });
      login();
    }
    function login() {
      createFailed.setAttribute('data-dynamic-context', 'testing')
        myForm.addEventListener("formSubmit", async () => {
          try {
            const userCredentials = {
              email: 'aezaz@scalamed.com',
              password: 'admin123',
              agentFQN:"com.scalamed.test.cloud"
            };
            const loggedInUser = await loginUser(userCredentials);
            console.log("User logged in:", loggedInUser);
  
          } catch (error) {
            console.error("Error logging in user:", error);
          }
        });
    }
  };
  // teardown will exectue when view will leave the DOM
  const teardown = () => {};
  return {
    html: template,
    afterRender,
    teardown,
  };
}
