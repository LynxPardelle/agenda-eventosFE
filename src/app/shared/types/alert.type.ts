export type AlertReturn<T = any>  ={
  readonly isConfirmed: boolean;
  readonly isDenied: boolean;
  readonly isDismissed: boolean;
  readonly value?: T;
  readonly dismiss?: "cancel" | "backdrop" | "close" | "esc" | "timer";
}
export type AlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';
export type AlertInput =
  'text' | 'email' | 'password' | 'number' | 'tel' | 'range' | 'textarea' | 'select' | 'radio' | 'checkbox' |
  'file' | 'url';
export type AlertPosition =
  'top' | 'top-start' | 'top-end' | 'top-left' | 'top-right' |
  'center' | 'center-start' | 'center-end' | 'center-left' | 'center-right' |
  'bottom' | 'bottom-start' | 'bottom-end' | 'bottom-left' | 'bottom-right';
export type AlertCustomClass = {
  container?: string | readonly string[];
  popup?: string | readonly string[];
  title?: string | readonly string[];
  closeButton?: string | readonly string[];
  icon?: string | readonly string[];
  image?: string | readonly string[];
  htmlContainer?: string | readonly string[];
  input?: string | readonly string[];
  validationMessage?: string | readonly string[];
  actions?: string | readonly string[];
  confirmButton?: string | readonly string[];
  denyButton?: string | readonly string[];
  cancelButton?: string | readonly string[];
  loader?: string | readonly string[];
  footer?: string | readonly string[];
}  
export type AlertGrow = 'row' | 'column' | 'fullscreen' | false;
type AlertHideShowClass = {
  backdrop?: string | readonly string[];
  icon?: string | readonly string[];
  popup?: string | readonly string[];
}
export type AlertHideClass = AlertHideShowClass;
export type AlertShowClass = Readonly<AlertHideShowClass>;
type ValueOrThunk<T> = T | (() => T);
type SyncOrAsync<T> = T | Promise<T> | { toPromise: () => T };
export type TAlertOptionPlusActive<T = any> = AlertOptions<T> & { isActive: boolean };
export type AlertOptions<PreConfirmResult = any, PreConfirmCallbackValue = any> = {
  /**
   * The title of the popup, as HTML.
   * It can either be added to the object under the key `title` or passed as the first parameter of `Swal.fire()`.
   *
   * @default ''
   */
  title?: string | HTMLElement;

  /**
   * The title of the popup, as text. Useful to avoid HTML injection.
   *
   * @default ''
   */
  titleText?: string;

  /**
   * A description for the popup.
   * If `text` and `html` parameters are provided in the same time, `html` will be used.
   *
   * @default ''
   */
  text?: string;

  /**
   * A HTML description for the popup.
   * If `text` and `html` parameters are provided in the same time, `html` will be used.
   *
   * [Security] Alert2 does NOT sanitize this parameter. It is the developer's responsibility
   * to escape any user input when using the `html` option, so XSS attacks would be prevented.
   *
   * @default ''
   */
  html?: string | HTMLElement;

  /**
   * The icon of the popup.
   * Alert2 comes with 5 built-in icons which will show a corresponding icon animation:
   * `'warning'`, `'error'`, `'success'`, `'info'` and `'question'`.
   * It can either be put to the object under the key `icon` or passed as the third parameter of `Swal.fire()`.
   *
   * @default undefined
   */
  icon?: AlertIcon;

  /**
   * Use this to change the color of the icon.
   *
   * @default undefined
   */
  iconColor?: string;

  /**
   * The custom HTML content for an icon.
   *
   * Example:
   * ```
   * Swal.fire({
   *   icon: 'error',
   *   iconHtml: '<i class="fas fa-bug"></i>'
   * })
   * ```
   *
   * @default undefined
   */
  iconHtml?: string;

  /**
   * The footer of the popup, as HTML.
   *
   * @default ''
   */
  footer?: string | HTMLElement;

  /**
   * 
   * Example:
   * ```html
   * <template id="my-template">
   * </template>
   * ```
   *
   * ```
   * Swal.fire({
   *   template: '#my-template'
   * })
   * ```
   *
   * @default undefined
   */
  template?: string | HTMLTemplateElement;

  /**
   * Whether or not Alert2 should show a full screen click-to-dismiss backdrop.
   * Either a boolean value or a css background value (hex, rgb, rgba, url, etc.)
   *
   * @default true
   */
  backdrop?: boolean | string;

  /**
   * Whether or not an alert should be treated as a toast notification.
   * This option is normally coupled with the `position` and `timer` parameters.
   * Toasts are NEVER autofocused.
   *
   * @default false
   */
  toast?: boolean;

  /**
   * The container element for adding popup into (query selector only).
   *
   * @default 'body'
   */
  target?: string | HTMLElement;

  /**
   * Input field type, can be `'text'`, `'email'`, `'password'`, `'number'`, `'tel'`, `'range'`, `'textarea'`,
   * `'select'`, `'radio'`, `'checkbox'`, `'file'` and `'url'`.
   *
   * @default undefined
   */
  input?: AlertInput;

  /**
   * Popup width, including paddings (`box-sizing: border-box`).
   *
   * @default undefined
   */
  width?: number | string;

  /**
   * Popup padding.
   *
   * @default undefined
   */
  padding?: number | string;

  /**
   * Color for title, content and footer (CSS `color` property).  The default color is `#545454`.
   *
   * @default undefined
   */
  color?: string;

  /**
   * Popup background (CSS `background` property). The default background is `#fff`.
   *
   * @default undefined
   */
  background?: string;

  /**
   * Popup position
   *
   * @default 'center'
   */
  position?: AlertPosition;

  /**
   * Popup grow direction
   *
   * @default false
   */
  grow?: AlertGrow;

  /**
   * CSS classes for animations when showing a popup (fade in)
   * @default { popup: '', backdrop: '', icon: '' }
   */
  showClass?: AlertShowClass;

  /**
   * CSS classes for animations when hiding a popup (fade out)
   * @default { popup: '', backdrop: '', icon: '' }
   */
  hideClass?: AlertHideClass;

  /**
   * A custom CSS class for the popup.
   * If a string value is provided, the classname will be applied to the popup.
   * If an object is provided, the classnames will be applied to the corresponding fields:
   *
   * Example:
   * ```
   * Swal.fire({
   *   customClass: {
   *     container: '...',
   *     popup: '...',
   *     title: '...',
   *     closeButton: '...',
   *     icon: '...',
   *     image: '...',
   *     input: '...',
   *     inputLabel: '...',
   *     validationMessage: '...',
   *     actions: '...',
   *     confirmButton: '...',
   *     denyButton: '...',
   *     cancelButton: '...',
   *     loader: '...',
   *     footer: '...'
   *   }
   * })
   * ```
   *
   * @default {}
   */
  customClass?: AlertCustomClass;

  /**
   * Auto close timer of the popup. Set in ms (milliseconds).
   *
   * @default undefined
   */
  timer?: number;

  /**
   * If set to `true`, the timer will have a progress bar at the bottom of a popup.
   * Mostly, this feature is useful with toasts.
   *
   * @default false
   */
  timerProgressBar?: boolean;

  /**
   * By default, Alert2 sets html's and body's CSS `height` to `auto !important`.
   * If this behavior isn't compatible with your project's layout, set `heightAuto` to `false`.
   *
   * @default true
   */
  heightAuto?: boolean;

  /**
   * If set to `false`, the user can't dismiss the popup by clicking outside it.
   * You can also pass a custom function returning a boolean value, e.g. if you want
   * to disable outside clicks for the loading state of a popup.
   *
   * @default true
   */
  allowOutsideClick?: ValueOrThunk<boolean>;

  /**
   * If set to `false`, the user can't dismiss the popup by pressing the Escape key.
   * You can also pass a custom function returning a boolean value, e.g. if you want
   * to disable the escape key for the loading state of a popup.
   *
   * @default true
   */
  allowEscapeKey?: ValueOrThunk<boolean>;

  /**
   * If set to `false`, the user can't confirm the popup by pressing the Enter or Space keys,
   * unless they manually focus the confirm button.
   * You can also pass a custom function returning a boolean value.
   *
   * @default true
   */
  allowEnterKey?: ValueOrThunk<boolean>;

  /**
   * If set to `false`, Alert2 will allow keydown events propagation to the document.
   *
   * @default true
   */
  stopKeydownPropagation?: boolean;

  /**
   * Useful for those who are using Alert2 along with Bootstrap modals.
   * By default keydownListenerCapture is `false` which means when a user hits `Esc`,
   * both Alert2 and Bootstrap modals will be closed.
   * Set `keydownListenerCapture` to `true` to fix that behavior.
   *
   * @default false
   */
  keydownListenerCapture?: boolean;

  /**
   * If set to `false`, the "Confirm" button will not be shown.
   * It can be useful when you're using custom HTML description.
   *
   * @default true
   */
  showConfirmButton?: boolean;

  /**
   * If set to `true`, the "Deny" button will be shown, which the user can click on to deny the popup.
   *
   * @default false
   */
  showDenyButton?: boolean;

  /**
   * If set to `true`, the "Cancel" button will be shown, which the user can click on to dismiss the popup.
   *
   * @default false
   */
  showCancelButton?: boolean;

  /**
   * Use this to change the text on the "Confirm" button.
   *
   * @default 'OK'
   */
  confirmButtonText?: string;

  /**
   * Use this to change the text on the "Confirm" button.
   *
   * @default 'No'
   */
  denyButtonText?: string;

  /**
   * Use this to change the text on the "Cancel" button.
   *
   * @default 'Cancel'
   */
  cancelButtonText?: string;

  /**
   * Use this to change the background color of the "Confirm" button.
   *
   * @default undefined
   */
  confirmButtonColor?: string;

  /**
   * Use this to change the background color of the "Deny" button.
   *
   * @default undefined
   */
  denyButtonColor?: string;

  /**
   * Use this to change the background color of the "Cancel" button.
   *
   * @default undefined
   */
  cancelButtonColor?: string;

  /**
   * Use this to change the `aria-label` for the "Confirm" button.
   *
   * @default ''
   */
  confirmButtonAriaLabel?: string;

  /**
   * Use this to change the `aria-label` for the "Deny" button.
   *
   * @default ''
   */
  denyButtonAriaLabel?: string;

  /**
   * Use this to change the `aria-label` for the "Cancel" button.
   *
   * @default ''
   */
  cancelButtonAriaLabel?: string;

  /**
   * Whether to apply the default Alert2 styling to buttons.
   * If you want to use your own classes (e.g. Bootstrap classes) set this parameter to `false`.
   *
   * @default true
   */
  buttonsStyling?: boolean;

  /**
   * Set to `true` if you want to invert default buttons positions.
   *
   * @default false
   */
  reverseButtons?: boolean;

  /**
   * Set to `false` if you want to focus the first element in tab order instead of the "Confirm" button by default.
   *
   * @default true
   */
  focusConfirm?: boolean;

  /**
   * Set to `true` if you want to focus the "Deny" button by default.
   *
   * @default false
   */
  focusDeny?: boolean;

  /**
   * Set to `true` if you want to focus the "Cancel" button by default.
   *
   * @default false
   */
  focusCancel?: boolean;

  /**
   * Set to `false` if you don't want to return the focus to the element that invoked the modal
   * after the modal is closed.
   *
   * @default true
   */
  returnFocus?: boolean;

  /**
   * Set to `true` to show close button.
   *
   * @default false
   */
  showCloseButton?: boolean;

  /**
   * Use this to change the HTML content of the close button.
   *
   * @default '&times;'
   */
  closeButtonHtml?: string;

  /**
   * Use this to change the `aria-label` for the close button.
   *
   * @default 'Close this dialog'
   */
  closeButtonAriaLabel?: string;

  /**
   * Use this to change the HTML content of the loader.
   *
   * @default ''
   */
  loaderHtml?: string;

  /**
   * Set to `true` to disable buttons and show the loader instead of the Confirm button.
   * Use it in combination with the `preConfirm` parameter.
   *
   * @default false
   */
  showLoaderOnConfirm?: boolean;

  /**
   * Set to `true` to disable buttons and show the loader instead of the Deny button.
   * Use it in combination with the `preDeny` parameter.
   *
   * @default false
   */
  showLoaderOnDeny?: boolean;

  /**
   * Function to execute before confirming, may be async (Promise-returning) or sync.
   * Returned (or resolved) value can be:
   *  - `false` to prevent a popup from closing
   *  - anything else to pass that value as the `result.value` of `Swal.fire()`
   *  - `undefined` to keep the default `result.value`
   *
   * Example:
   * ```
   * Swal.fire({
   *   title: 'Multiple inputs',
   *   html:
   *     '<input id="input1" class="input">' +
   *     '<input id="input2" class="input">',
   *   focusConfirm: false,
   *   preConfirm: () => [
   *     document.querySelector('#input1').value,
   *     document.querySelector('#input2').value
   *   ]
   * }).then(result => Swal.fire(JSON.stringify(result));
   * ```
   *
   * @default undefined
   */
  preConfirm?(inputValue: PreConfirmCallbackValue): PreConfirmResult;

  /**
   * Function to execute before denying, may be async (Promise-returning) or sync.
   * Returned (or resolved) value can be:
   *  - `false` to prevent a popup from closing
   *  - anything else to pass that value as the `result.value` of `Swal.fire()`
   *  - `undefined` to keep the default `result.value`
   *
   * @default undefined
   */
  preDeny?(value: any): SyncOrAsync<any | void>;

  /**
   * Add an image to the popup. Should contain a string with the path or URL to the image.
   *
   * @default undefined
   */
  imageUrl?: string;

  /**
   * If imageUrl is set, you can specify imageWidth to describes image width.
   *
   * @default undefined
   */
  imageWidth?: number | string;

  /**
   * If imageUrl is set, you can specify imageHeight to describes image height.
   *
   * @default undefined
   */
  imageHeight?: number | string;

  /**
   * An alternative text for the custom image icon.
   *
   * @default ''
   */
  imageAlt?: string;

  /**
   * Input field label.
   *
   * @default ''
   */
  inputLabel?: string;

  /**
   * Input field placeholder.
   *
   * @default ''
   */
  inputPlaceholder?: string;

  /**
   * Input field initial value.
   *
   * @default ''
   */
  inputValue?: SyncOrAsync<string | number | boolean>;

  /**
   * If the `input` parameter is set to `'select'` or `'radio'`, you can provide options.
   * Object keys will represent options values, object values will represent options text values.
   * @default {}
   */
  inputOptions?: SyncOrAsync<ReadonlyMap<string, string> | Record<string, any>>;

  /**
   * Automatically remove whitespaces from both ends of a result string.
   * Set this parameter to `false` to disable auto-trimming.
   *
   * @default true
   */
  inputAutoTrim?: boolean;

  /**
   * HTML input attributes (e.g. `min`, `max`, `step`, `accept`), that are added to the input field.
   *
   * Example:
   * ```
   * Swal.fire({
   *   title: 'Select a file',
   *   input: 'file',
   *   inputAttributes: {
   *     accept: 'image/*'
   *   }
   * })
   * ```
   *
   * @default {}
   */
  inputAttributes?: Record<string, string>;

  /**
   * Validator for input field, may be async (Promise-returning) or sync.
   *
   * Example:
   * ```
   * Swal.fire({
   *   title: 'Select color',
   *   input: 'radio',
   *   inputValidator: result => !result && 'You need to select something!'
   * })
   * ```
   *
   * @default undefined
   */
  inputValidator?(inputValue: string): SyncOrAsync<string | null>;

  /**
   * If you want to return the input value as `result.value` when denying the popup, set to `true`.
   * Otherwise, the denying will set `result.value` to `false`.
   *
   * @default false
   */
  returnInputValueOnDeny?: boolean;

  /**
   * A custom validation message for default validators (email, url).
   *
   * Example:
   * ```
   * Swal.fire({
   *   input: 'email',
   *   validationMessage: 'Adresse e-mail invalide'
   * })
   * ```
   *
   * @default undefined
   */
  validationMessage?: string;

  /**
   * Progress steps, useful for popup queues.
   *
   * @default []
   */
  progressSteps?: readonly string[];

  /**
   * Current active progress step.
   *
   * @default undefined
   */
  currentProgressStep?: number;

  /**
   * Distance between progress steps.
   *
   * @default undefined
   */
  progressStepsDistance?: number | string;

  /**
   * Popup lifecycle hook. Synchronously runs before the popup is shown on screen.
   *
   * @default undefined
   * @param popup The popup DOM element.
   */
  willOpen?(popup: HTMLElement): void;

  /**
   * Popup lifecycle hook. Asynchronously runs after the popup has been shown on screen.
   *
   * @default undefined
   * @param popup The popup DOM element.
   */
  didOpen?(popup: HTMLElement): void;

  /**
   * Popup lifecycle hook. Synchronously runs after the popup DOM has been updated (ie. just before the popup is
   * repainted on the screen).
   * Typically, this will happen after `Swal.fire()` or `Swal.update()`.
   * If you want to perform changes in the popup's DOM, that survive `Swal.update()`, prefer `didRender` over
   * `willOpen`.
   *
   * @default undefined
   * @param popup The popup DOM element.
   */
  didRender?(popup: HTMLElement): void;

  /**
   * Popup lifecycle hook. Synchronously runs when the popup closes by user interaction (and not due to another popup
   * being fired).
   *
   * @default undefined
   * @param popup The popup DOM element.
   */
  willClose?(popup: HTMLElement): void;

  /**
   * Popup lifecycle hook. Asynchronously runs after the popup has been disposed by user interaction (and not due to
   * another popup being fired).
   *
   * @default undefined
   */
  didClose?(): void;

  /**
   * Popup lifecycle hook. Synchronously runs after popup has been destroyed either by user interaction or by another
   * popup.
   * If you have cleanup operations that you need to reliably execute each time a popup is closed, prefer
   * `didDestroy` over `didClose`.
   *
   * @default undefined
   */
  didDestroy?(): void;

  /**
   * Set to `false` to disable body padding adjustment when scrollbar is present.
   *
   * @default true
   */
  scrollbarPadding?: boolean;
}