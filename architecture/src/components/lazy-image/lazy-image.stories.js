import LazyImage from './lazy-image.js';

export default {
  title: 'Components/LazyImage',
  component: LazyImage,
};

const Template = (args) => {
  const lazyImage = document.createElement('lazy-image');
  lazyImage.setAttribute('data-src', args.dataSrc);
  lazyImage.setAttribute('data-alt', args.dataAlt);
  lazyImage.setAttribute('className', args.className);
  return lazyImage;
};

export const Default = Template.bind({});
Default.args = {
  dataSrc: 'https://path/to/your/image.jpg',
  dataAlt: 'An example image',
  className: 'your-custom-class',
};
