export interface ITruncateOptions {
  /**
   * The element whose height will be monitored to decide if the text is rendered within given space.
   */
  monitorElement: HTMLElement;

  /**
   * The element whose text content can be truncated.
   * When not specified, it will be `monitor` element.
   * When specified, only text content in the flexibleElement will be truncated.
   * @default monitorElement
   */
  flexibleElement?: HTMLElement;

  /**
   * The line-height value of the monitor element in pixels.
   * @default - If lineHeight is not specified, the line height of monitorElement will be used.
   */
  lineHeight?: number;

  /**
   * The count of lines that will be rendered within monitorElement.
   * @default [linesCount=2]
   */
  linesCount?: number;

  /**
   * Symbol to append at the end of the truncated text.
   * @default [omission='...']
   */
  omission?: string;

  /**
   * Symbol/Regex used for splitting text when truncating text.
   * E.g. In English, use space to separate words in a sentence.
   * @default [separator='']
   */
  separator?: string;

  /**
   * Whether space and line break characters should be reserved.
   * It is pretty useful when the content format should be maintained. Like line breaking and extra spaces.
   * @default false
   */
  reserveWhiteSpace?: boolean;

  /**
   * Whether the last word in the truncated text could be a broken up or must be a complete word.
   * It doesn't work when separator is undefined or empty string because all characters have
   * already been broken up.
   * @example
   *  when it is true, it is possible to see "an app..." in a truncated text when the word is apple.
   *  when it is false, you'll probably only see "an ..." in the truncated text.
   * @default [omissionBreakWord=false]
   */
  omissionBreakLastWord?: boolean;
}
