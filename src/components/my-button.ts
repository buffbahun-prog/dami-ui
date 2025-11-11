export class MyButton extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      const button = document.createElement('button');
      button.textContent = this.textContent || 'Click Me';
      button.style.cssText = `
        background: royalblue;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 8px 16px;
        cursor: pointer;
        font-size: 1rem;
      `;
  
      button.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('myclick', { bubbles: true }));
      });
  
      shadow.appendChild(button);
    }
  }
  
  customElements.define('my-button', MyButton);
  