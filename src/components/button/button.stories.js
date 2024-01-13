import CustomButton from './button.js';

export default {
    title: 'components/CustomButton',
    component: CustomButton,
  };
  
  const Template = (args) => {
    const button = document.createElement('custom-button');
    Object.assign(button, args);
    return button;
  };
  
  export const Default = Template.bind({});
  Default.args = {
    label: 'Default',
  };
  
  export const Primary = Template.bind({});
  Primary.args = {
    label: 'Primary',
    primary: true,
  };
  
  export const Secondary = Template.bind({});
  Secondary.args = {
    label: 'Secondary',
    secondary: true,
  };
  
  export const Medium = Template.bind({});
  Medium.args = {
    label: 'Medium',
    size: 'medium',
  };
  
  export const Large = Template.bind({});
  Large.args = {
    label: 'Large',
    size: 'large',
  };
  
  export const Small = Template.bind({});
  Small.args = {
    label: 'Small',
    size: 'small',
  };