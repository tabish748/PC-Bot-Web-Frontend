class LazyImage extends HTMLElement {
  constructor() {
    super();

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage();
          this.observer.disconnect();
        }
      });
    });
  }

  connectedCallback() {
    this.observer.observe(this);
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  async loadImage() {
    const img = document.createElement('img');
    const src = this.getAttribute('data-src');
    const alt = this.getAttribute('data-alt');
    const cls = this.getAttribute('className');

    img.src = src;
    img.alt = alt;
    img.classList.add(cls)
    img.onload = () => {
      this.innerHTML = '';
      this.appendChild(img);
    };
  }
}

customElements.define('lazy-image', LazyImage);

export default LazyImage;
