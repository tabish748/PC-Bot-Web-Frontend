import Utils from '../../libs/utils.js';

export async function sampleTemplate()
{
    //Here you can import files
    const template = await Utils.fetchTemplate('home/home.tpl');
    const loginCss = await Utils.loadCSS('../../compiled-css/pages/login.css');
    const btnCss = await Utils.loadCSS('../../compiled-css/components/atoms/button.css');

    //SEO
    Utils.setPageTitle('sample title');
    Utils.setMetaTag('description','sample description');

    // After Render will automatically call when HTML will insert into DOM
    // Write all the logics in afterRender
    const afterRender = () => 
    {
        Utils.setIdShortcuts(document, window);
        sampleHeading.addEventListener('click', ()=>
        {
            alert('working fine');
        })

    }

     // teardown will exectue when view will leave the DOM 
  const teardown = () => {
    test_btn.removeEventListener('click', handleBtn);
  };

    return {
        html: template,
        css: [loginCss, btnCss],
        afterRender,
        teardown,
    }
}