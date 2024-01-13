<dashboard-layout  heading="Clients" breadCrumb="Home / Clients">
  <div class="clients__content--wrapper">
    <div class="d__flex justify__content__end mb-3">
      <button-action
        label-txt="Add Clients"
        secondary
        id="client_btn"
        className="mt-2"
        icon="plus"
      ></button-action>
    </div>
    <div class="table__container">
      <table-buddy id="clients_table"></table-buddy>
      <div class="pagination-container">
        <button class="pagination-btn" id="prevPageBtn">←</button>
        <span id="paginationInfo">Page 1 of 10</span>
        <button class="pagination-btn" id="nextPageBtn">→</button>
    </div>
    </div>
  </div>
</dashboard-layout>
