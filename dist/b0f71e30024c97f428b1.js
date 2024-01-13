import"core-js/modules/es.array.concat.js";import"core-js/modules/es.array.slice.js";import Router from"./routes/router.js";import"./env.js";import{loadAboutView}from"./views/about/about.js";import{loadWelcomeView}from"./views/welcome/welcome.js";import{loginLayout}from"./views/login/login.js";import{rxDownloadingView}from"./views/rx-downloading/rx-downloading.js";import{identityVerificationView}from"./views/identity-verification/identity-verification.js";import{findPharmacyView}from"./views/find-pharmacy/find-pharmacy.js";var routes=[{path:"/",template:loadWelcomeView},{path:"/about",template:loadAboutView},{path:"/login",template:loginLayout},{path:"/identityVerification",template:identityVerificationView},{path:"/rxDownloading",template:rxDownloadingView},{path:"/findPharmacy",template:findPharmacyView}],router=Router.getInstance(routes);document.body.addEventListener("click",(function(t){t.target.matches("[data-link]")&&(t.preventDefault(),t.target.href?router.navigateTo(t.target.href):router.navigateTo("".concat(window.location.origin,"/").concat(t.target.getAttribute("redirect-to"))))})),window.addEventListener("popstate",(function(){router.loadRoute(window.location.pathname.split("/").slice(1))}));