import Utils from "../../libs/utils.js";
import ButtonAction from "../../components/button/button.js";
import DashboardLayout from "../../components/dashboard-layout/dashboard-layout.js";
import { getUsersCountByGrant } from "../../services/user/user-service.js";

export async function dashboardView() {
  //Here you can import files
  const template = await Utils.fetchTemplate("dashboard/dashboard.tpl");
  const css = await Utils.loadCSS("../../compiled-css/pages/dashboard.css");

  //SEO
  Utils.setPageTitle("Find Pharmacy - Scalamed");

  // After Render will automatically call when HTML will insert into DOM
  const filters = {};

  const afterRender = async () => {
    Utils.setIdShortcuts(document, window);
    main();
  };

  const main = async () => {
    const data = await getUsersCountByGrant();
    total_main_clients.innerText = active_total_clients.innerText =
      data?.totalUsers;
    total_main_loa.innerText = active_probate_clients.innerText =
      data?.loaUsersCount;
    total_main_probate.innerText = active_loa_clients.innerText =
      data?.probateUsersCount;
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
