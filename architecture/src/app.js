import Router from './routes/router.js';
import './env.js'
import { loadAboutView,} from './views/about/about.js';
import { loadWelcomeView,} from './views/welcome/welcome.js';
import { loginLayout,} from './views/login/login.js';
import { rxDownloadingView } from './views/rx-downloading/rx-downloading.js';
import { identityVerificationView } from './views/identity-verification/identity-verification.js';
import { findPharmacyView } from './views/find-pharmacy/find-pharmacy.js';

const routes = 
[
    { path: '/', template: loadWelcomeView },
    { path: '/about', template: loadAboutView},
    { path: '/login', template: loginLayout},
    { path: '/identityVerification', template: identityVerificationView},
    { path: '/rxDownloading', template: rxDownloadingView},
    { path: '/findPharmacy', template: findPharmacyView},
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
