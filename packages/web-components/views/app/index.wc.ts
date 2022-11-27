import { FoundationElement } from "@tabidoo/web-components/helpers";

import styles from "./index.css?inline";

export default class TabidooAppElement extends FoundationElement {
  static styles = [styles];

  protected render() {
    return `<div>Lorem</div>`;
  }
}
