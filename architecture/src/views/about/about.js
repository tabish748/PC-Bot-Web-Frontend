import Utils from '../../libs/utils.js'
export async function loadAboutView() 
{
  const template = await Utils.fetchTemplate('about/about.tpl');
  const loginCss = await Utils.loadCSS('../../compiled-css/components/atoms/button.css');
   //SEO
   Utils.setPageTitle('About'); 

  const afterRender = async () => 
  {
   

  };
  const teardown = () => 
    {
      // alert('leaving dom')
      // test_btn.removeEventListener('custom-button-click', handleBtn);
     }

  return {
    html:  template,
    css:[loginCss],
    afterRender,
    teardown
  };
}
