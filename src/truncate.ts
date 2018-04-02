export interface ITruncateOptions {
  monitorElement: HTMLElement;

  /**
   * @default monitorElement
   */
  scalableElement: HTMLElement;

  /**
   * The line-height value of the monitor element in pixels.
   * @default [lineHeight=20]
   */
  lineHeight: number;

  /**
   * @default [linesCount=2]
   */
  linesCount: number;

  /**
   * Symbol to append to the truncated text.
   * @default [omission='...']
   */
  omission: string;

  /**
   * Symbol/Regex used for spliting text when truncating text.
   * @default [separator=undefined]
   */
  separator: string | undefined;

  /**
   * Whether the last word in the truncated text could be a broken down word or must be a complete word.
   * @default [omissionBreakWord=true]
   */
  omissionBreakWord: boolean;
}

function normalizeOptions(options: Partial<ITruncateOptions>): ITruncateOptions {
  if (!options.monitorElement) {
    throw new Error('Monitor element cannot be empty');
  }

  options.scalableElement = options.scalableElement || options.monitorElement;
  options.lineHeight = options.lineHeight || 20;
  options.linesCount = options.linesCount || 2;
  options.omission = options.omission || '...';
  options.omissionBreakWord = options.omissionBreakWord || true;

  return options as ITruncateOptions;
}

export function truncate(rawOptions: Partial<ITruncateOptions>): void {
  const options: ITruncateOptions = normalizeOptions(rawOptions);

  options.monitorElement.style.lineHeight = `${options.lineHeight}px`;
  options.monitorElement.style.wordWrap = 'break-word';

  const maxHeight: number = options.lineHeight * options.linesCount;
}
