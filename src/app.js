import Router from './routes/router.js';
import './env.js'

import { loginLayout,} from './views/login/login.js';
import { dashboardView } from './views/dashboard/dashboard.js';
import { clientDashboardView } from './views/clients/clients.js';
import { addClientDashboardView } from './views/add-client/add-client.js';
import { editClientDashboardView } from './views/edit-client/edit-client.js';

const routes = 
[
    { path: '/', template: loginLayout },
    { path: '/login', template: loginLayout},
    { path: '/dashboard', template: dashboardView},
    { path: '/clients', template: clientDashboardView},
    { path: '/add-client', template: addClientDashboardView},
    { path: '/edit-client', template: editClientDashboardView}
];

const router = Router.getInstance(routes);
document.body.addEventListener('click', (e) => 
  {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      if(e.target.href)
        router.navigateTo(e.target.href);
      else
      router.navigateTo(`${window.location.origin}/${e.target.getAttribute('redirect-to')}`);
    }
  });

window.addEventListener('popstate', () => {
    router.loadRoute(window.location.pathname.split('/').slice(1));
}); 

