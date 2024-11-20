type Constructor = new (...args: any[]) => {};

function withTemplating<TBase extends Constructor>(Base: TBase) {
  return class AppWebComponent extends Base {
    // The ShadowDOM for the component is stored here.
    root: ShadowRoot | null = null;

    // Lifecycle hook for when the component is inserted into the DOM.
    connectedCallback() {
      this.setRoot();
      this.render();
    }

    // Create shadowDOM root
    private setRoot(): void {
      this.root = this.attachShadow({ mode: "closed" });
    }

    // Find the template and insert a copy of its contents into
    // the inited component.
    protected render(): void {
      const template: HTMLTemplateElement | null = document.querySelector(
        `template[for="${this.tagName.toLowerCase()}"]`
      );
      template &&
        this.root &&
        this.root.replaceChildren(template.content.cloneNode(true));
    }
  };
}

customElements.define("app-field", withTemplating(HTMLElement));
customElements.define("app-form", withTemplating(HTMLFormElement));
customElements.define("app-submit", withTemplating(HTMLElement));
