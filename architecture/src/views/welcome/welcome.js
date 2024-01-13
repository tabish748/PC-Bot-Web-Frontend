import Utils from '../../libs/utils.js';
import RxLayout from '../../components/rx-layout/rx-layout.js';
import ButtonAction from '../../components/button/button.js';
export async function loadWelcomeView()
{
    //Here you can import files
    const template = await Utils.fetchTemplate('welcome/welcome.tpl');
    const loginCss = await Utils.loadCSS('../../compiled-css/pages/welcome.css');

    //SEO
    Utils.setPageTitle('Welcome - Scalamed');

    // After Render will automatically call when HTML will insert into DOM
    // Write all the logics in afterRender
    const afterRender = () => 
    {
        main();
        function main()
        {
            Utils.setIdShortcuts(document, window);
        }
    }

     // teardown will exectue when view will leave the DOM 
  const teardown = () => {
    // test_btn.removeEventListener('click', handleBtn);
  };

    return {
        html: template,
        css: [loginCss],
        afterRender,
        teardown,
    }
}