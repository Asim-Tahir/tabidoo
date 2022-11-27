export default class FoundationElement extends HTMLElement {
  readonly renderRoot!: HTMLElement | ShadowRoot;

  static styles: Array<string | CSSStyleSheet>;
  static shadowRootOptions: ShadowRootInit = { mode: "open" };

  constructor() {
    super();
  }

  connectedCallback() {
    // create renderRoot before first update.
    if (this.renderRoot === undefined) {
      (
        this as {
          renderRoot: Element | DocumentFragment;
        }
      ).renderRoot = this.createRenderRoot();
    }

    this.renderRoot.innerHTML = this.render();
  }
  disconnectedCallback() {}
  attributeChangedCallback() {
    this.renderRoot.innerHTML = this.render();
  }
  adoptedCallback() {}

  protected createRenderRoot(): HTMLElement | ShadowRoot {
    const renderRoot =
      this.shadowRoot ??
      // Shadow DOM
      this.attachShadow(
        (this.constructor as typeof FoundationElement).shadowRootOptions
      );

    // Constructed Stylesheets
    const adoptedStyleSheets = (
      this.constructor as typeof FoundationElement
    ).styles.map((style) => {
      if (typeof style === "string") {
        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(style);

        return stylesheet;
      }

      return style;
    });

    renderRoot.adoptedStyleSheets = [
      ...renderRoot.adoptedStyleSheets,
      ...adoptedStyleSheets,
    ];

    return renderRoot;
  }

  protected render(): string {
    return `<slot></slot>`;
  }
}
