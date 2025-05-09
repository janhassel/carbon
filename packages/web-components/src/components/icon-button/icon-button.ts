/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { prefix } from '../../globals/settings';
import '../tooltip/index';
import '../button/index';
import CDSButton from '../button/button';
import { ICON_BUTTON_SIZE, ICON_BUTTON_TOOLTIP_ALIGNMENT } from './defs';
import styles from './icon-button.scss?lit';

export { ICON_BUTTON_SIZE, ICON_BUTTON_TOOLTIP_ALIGNMENT };

/**
 * Icon Button
 *
 * @element cds-icon-button
 */
@customElement(`${prefix}-icon-button`)
class CDSIconButton extends CDSButton {
  /**
   * Checks if a badge indicator is being used with incorrect properties
   */

  /**
   * Specify how the trigger should align with the tooltip
   */
  @property({ reflect: true, type: String })
  align = 'top';

  /**
   * Specify whether a auto align functionality should be applied
   */
  @property({ type: Boolean, reflect: true })
  autoalign = false;

  /**
   * Determines whether the tooltip should close when inner content is activated (click, Enter or Space)
   */
  @property({ attribute: 'close-on-activation', reflect: true, type: Boolean })
  closeOnActivation = true;

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  @property({ reflect: true, type: Boolean })
  defaultOpen = false;

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  @property({ attribute: 'enter-delay-ms', type: Number })
  enterDelayMs = 100;

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  @property({ attribute: 'leave-delay-ms', type: Number })
  leaveDelayMs = 300;

  /**
   * Specify the size of the Button. Defaults to `md`.
   */
  @property({ reflect: true })
  size = 'md';

  updated(changedProperties) {
    super.updated?.(changedProperties);
    if (changedProperties) {
      this.shadowRoot
        ?.querySelector(`${prefix}-tooltip`)
        ?.shadowRoot?.querySelector(`.${prefix}--tooltip`)
        ?.classList.add(`${prefix}--icon-tooltip`);

      const tooltipContent = this.querySelector(
        '[slot=tooltip-content]'
      )?.textContent;
      this.shadowRoot
        ?.querySelector(`${prefix}-tooltip`)
        ?.querySelector(`button`)
        ?.setAttribute('aria-label', String(tooltipContent));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected _renderTooltipContent() {
    return html`
      <cds-tooltip-content>
        <slot name="tooltip-content"></slot>
      </cds-tooltip-content>
    `;
  }

  render() {
    const {
      align,
      autoalign,
      closeOnActivation,
      defaultOpen,
      enterDelayMs,
      leaveDelayMs,
    } = this;
    return html`
      <cds-tooltip
        ?autoalign=${autoalign}
        align=${align}
        ?defaultOpen=${defaultOpen}
        close-on-activation="${closeOnActivation}"
        enter-delay-ms=${enterDelayMs}
        leave-delay-ms=${leaveDelayMs}>
        ${super.render()} ${this._renderTooltipContent()}
      </cds-tooltip>
    `;
  }

  static styles = styles;
}

export default CDSIconButton;
