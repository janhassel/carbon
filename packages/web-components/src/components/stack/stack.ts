/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import styles from './stack.scss?lit';
import { STACK_ORIENTATION, SPACING_STEPS } from './defs';

export { STACK_ORIENTATION, SPACING_STEPS };

/**
 * The Stack component is a useful layout utility in a component-based model.
 * This allows components to not use margin and instead delegate the
 * responsibility of positioning and layout to parent components.
 *
 * In the case of the Stack component, it uses the spacing scale from the
 * Design Language in order to determine how much space there should be between
 * items rendered by the Stack component. It also supports a custom `gap` prop
 * which will allow a user to provide a custom value for the gap of the layout.
 *
 * This component supports both horizontal and vertical orientations.
 *
 * @element cds-stack
 */
@customElement(`${prefix}-stack`)
class CDSStack extends LitElement {
  /**
   * Specify the orientation of them items in the Stack
   */
  @property({ type: String, reflect: true })
  orientation = STACK_ORIENTATION.VERTICAL;

  /**
   * Provide either a custom value or a step from the spacing scale to be used
   * as the gap in the layout
   */
  @property({ type: SPACING_STEPS || String, reflect: true })
  gap;

  /**
   * Turn on when passing in custom value to 'gap' attribute (ie. gap="2rem")
   */
  @property({ type: Boolean, attribute: 'use-custom-gap-value' })
  useCustomGapValue = false;

  updated(changedProperties) {
    if (changedProperties.has('gap')) {
      if (this.useCustomGapValue) {
        this.style.setProperty(`--${prefix}-stack-gap`, `${this.gap}`);
      } else {
        const oldGapValue = changedProperties.get('gap');
        this.shadowRoot
          ?.querySelector('div')
          ?.classList.remove(`${prefix}--stack-scale-${oldGapValue}`);
        this.shadowRoot
          ?.querySelector('div')
          ?.classList.add(`${prefix}--stack-scale-${this.gap}`);
      }
    }
  }

  render() {
    return html`<div><slot></slot></div>`;
  }

  static styles = styles;
}

export default CDSStack;
