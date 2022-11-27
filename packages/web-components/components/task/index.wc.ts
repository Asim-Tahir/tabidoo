import { FoundationElement } from "@tabidoo/web-components/helpers";
import styles from "./index.css?inline";

export default class TabidooTaskElement extends FoundationElement {
  static styles = [styles];

  constructor() {
    super();
  }

  connectedCallback() {}
  disconnectedCallback() {}
  attributeChangedCallback() {}
  adoptedCallback() {}

  render() {
    return `<div>Lorem Ipsum</div>`;
  }
}
