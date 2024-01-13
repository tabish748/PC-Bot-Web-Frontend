import Utils from "../../libs/utils.js";
import ButtonAction from "../../components/button/button.js";
import DashboardLayout from "../../components/dashboard-layout/dashboard-layout.js";
import TableBuddy from "../../components/table-buddy/table-buddy.js";
import Router from "../../routes/router.js";
import { userList } from "../../services/user/user-service.js";

export async function clientDashboardView() {
  //Here you can import files
  const template = await Utils.fetchTemplate("clients/clients.tpl");
  const css = await Utils.loadCSS("../../compiled-css/pages/clients.css");

  //SEO
  Utils.setPageTitle("Clients");

  const filters = {};
  let currentPage = 1;

  const afterRender = async () => {
    Utils.setIdShortcuts(document, window);
    main();
    getData(1);
  };

  const getData = async (page) => {
    const response = await userList(page);

    document.getElementById(
      "paginationInfo"
    ).innerText = `Page ${response.currentPage} of ${response.totalPage}`;

    clients_table.data = await response?.users?.map((user) => {
      return [
        user?.id,
        user?.first_name + user?.last_name,
        user?.email,
        user?.type_grant,
        user?.supreme_court,
        "",
        user?.deceased_first_name && user?.deceased_last_name
          ? user?.deceased_first_name + user?.deceased_last_name
          : "",
        "",
      ];
    });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      currentPage--;
      getData(currentPage);
    }
  };

  const handleNextPage = async () => {
    const response = await userList(1);
    if (currentPage < response.totalPage) {
      currentPage++;
      getData(currentPage);
    }
  };

  const main = () => {
    clients_table.headings = [
      "Id",
      "Name",
      "Contact",
      "Type of Grant",
      "Supreme Court",
      "Status",
      "Deceased Profile",
      "",
    ];

    clients_table.elementsConfig = {
      7: '<button class="view-action-btn">View</button>',
    };
    clients_table.addEventListener("rowActionClick", (event) => {
      const router = Router.getInstance();
      router.navigateTo(
        `${window.location.origin}/edit-client?id=${event.detail.rowData[0]}#client_profile`
      );
    });

    client_btn.addEventListener("click", () => handAddClientClick());

    document
      .getElementById("prevPageBtn")
      .addEventListener("click", handlePrevPage);
    document
      .getElementById("nextPageBtn")
      .addEventListener("click", handleNextPage);
  };

  const handAddClientClick = () => {
    const router = Router.getInstance();
    router.navigateTo(`${window.location.origin}/add-client`);
  };

  const teardown = () => {};

  return {
    html: template,
    css: [css],
    afterRender,
    teardown,
  };
}
