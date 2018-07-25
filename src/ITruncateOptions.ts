export interface ITruncateOptions {
  monitorElement: HTMLElement;

  /**
   * @default monitorElement
   */
  scalableElement?: HTMLElement;

  /**
   * The line-height value of the monitor element in pixels.
   * @default - If lineHeight is not specified, the line height of monitorElement will be used.
   */
  lineHeight?: number;

  /**
   * @default [linesCount=2]
   */
  linesCount?: number;

  /**
   * Symbol to append to the truncated text.
   * @default [omission='...']
   */
  omission?: string;

  /**
   * Symbol/Regex used for spliting text when truncating text.
   * @default [separator=undefined]
   */
  separator?: string;

  /**
   * Whether the last word in the truncated text could be a broken down word or must be a complete word.
   * @default [omissionBreakWord=true]
   */
  omissionBreakWord?: boolean;
}
