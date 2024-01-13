import Utils from '../../libs/utils.js';
import RxLayout from '../../components/rx-layout/rx-layout.js';
import ProgressBar from '../../components/progress-bar/progress-bar.js';
import Router from '../../routes/router.js';
export async function rxDownloadingView()
{
    //Here you can import files
    const template = await Utils.fetchTemplate('rx-downloading/rx-downloading.tpl');
    const css = await Utils.loadCSS('../../compiled-css/pages/rx-downloading.css');

    //SEO
    Utils.setPageTitle('sample title');
    Utils.setMetaTag('description','sample description');

    // After Render will automatically call when HTML will insert into DOM
    // Write all the logics in afterRender
    const afterRender = () => 
    {
        Utils.setIdShortcuts(document, window);
        ProgressBar.initialize(initProgressBar);
        function initProgressBar() 
        {
          const progressBar = document.getElementById('progress_bar');
          progressBar.addEventListener('progress-complete', () => {
            //now redirect here to next screen using router
            const router = Router.getInstance();
            router.navigateTo(`${window.location.origin}/findPharmacy`);
          });
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