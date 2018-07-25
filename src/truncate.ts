import { ITruncateOptions } from './ITruncateOptions';
import { TruncationResult } from './TruncationResult';

/**
 * Normailize - Set default value of options to make all fields required.
 * @param options - The truncate options object that has optional fields.
 */
function normalizeOptions(options: ITruncateOptions): Required<ITruncateOptions> {
  if (!options.monitorElement) {
    throw new Error('LessText: Monitor element cannot be empty');
  }

  const originalLineHeight: string = window
    .getComputedStyle(options.monitorElement, undefined)
    .getPropertyValue('line-height');

  const lineHeight: number = parseInt(originalLineHeight, 10) || 20;

  return {
    flexibleElement: options.monitorElement,
    lineHeight,
    linesCount: 2,
    omission: '...',
    omissionBreakLastWord: false,
    reserveExtraSpace: false,
    separator: '',
    ...options
  };
}

function getHeight(element: HTMLElement): number {
  const contentStyles: CSSStyleDeclaration = window.getComputedStyle(element);
  let padding: number = 0;
  if (contentStyles && contentStyles.paddingTop && contentStyles.paddingBottom) {
    padding = parseFloat(contentStyles.paddingTop) + parseFloat(contentStyles.paddingBottom);
  }

  return element.offsetHeight - padding;
}

function hasEnoughSpace(options: Required<ITruncateOptions>): boolean {
  const maxHeight: number = options.lineHeight * options.linesCount;

  return getHeight(options.monitorElement) <= maxHeight;
}

export function truncate(rawOptions: ITruncateOptions): Promise<TruncationResult> {
  const options: Required<ITruncateOptions> = normalizeOptions(rawOptions);

  options.monitorElement.style.lineHeight = `${options.lineHeight}px`;
  options.monitorElement.style.wordWrap = 'break-word';

  // --------------------------
  // FAST RETURN: Skipped
  // Had enough space, skip truncating.
  // --------------------------
  if (hasEnoughSpace(options)) {
    return Promise.resolve(TruncationResult.Skipped);
  }

  // This is the text where we can operate.
  const scalableText: string = options.flexibleElement.textContent || '';

  // --------------------------
  // FAST RETURN: Failed
  // We cannot do anything if there is no text that can be truncated.
  // --------------------------
  if (!scalableText) {
    return Promise.resolve(TruncationResult.Failed);
  }

  const wordsArray: string[] = scalableText
    .split(options.separator)
    .filter(text => options.reserveExtraSpace || text);

  const allowedWordsCount: number = wordsArray.length;

  let minWordsCount: number = 0, maxWordsCount: number = allowedWordsCount;

  // Do a binary search to fit as many words as we can.
  do {
    const experimentWordsCount: number = Math.floor((minWordsCount + maxWordsCount + 1) / 2);
    const experimentText: string =
      wordsArray.slice(0, experimentWordsCount).join(options.separator) + options.omission;
    options.flexibleElement.textContent = experimentText;

    if (hasEnoughSpace(options)) {
      minWordsCount = experimentWordsCount;
    } else {
      maxWordsCount = experimentWordsCount - 1;
    }
  } while (minWordsCount < maxWordsCount);

  options.flexibleElement.textContent =
    wordsArray.slice(0, minWordsCount).join(options.separator) + options.omission;

    // --------------------------
  // FAST RETURN: Failed
  // We don't have space for even one word, and it is not allowed to break the last word.
  // --------------------------
  if (minWordsCount === 0 && !options.omissionBreakLastWord) {
    return Promise.resolve(TruncationResult.Failed);
  }

  // --------------------------
  // FAST RETURN: Unexpected
  // The hit of this code means no text is truncated,
  // in which case the function should already be returned at the early stage.
  // --------------------------
  if (minWordsCount === allowedWordsCount) {
    return Promise.resolve(TruncationResult.Unexpected);
  }

  // --------------------------
  // FAST RETURN: Success
  // The words have been truncated and it is not configured to further truncate the last word.
  // --------------------------
  if (!options.omissionBreakLastWord) {
    return Promise.resolve(TruncationResult.Success);
  }

  // We will try to show as many characters as we can from the last word that was truncated away.
  const lastWord: string = wordsArray[minWordsCount + 1];

  let currentText: string = wordsArray.slice(0, minWordsCount).join(options.separator);
  let nextText: string = currentText + options.separator;
  let experimentCharacterIndex: number = 0;
  options.flexibleElement.textContent = nextText + options.omission;

  while (hasEnoughSpace(options) && experimentCharacterIndex < lastWord.length) {
    currentText = nextText;
    nextText = currentText + lastWord[experimentCharacterIndex++];
    options.flexibleElement.textContent = nextText + options.omission;
  }

  options.flexibleElement.textContent = currentText + options.omission;

  // --------------------------
  // FAST RETURN: Success
  // We are able to show as many characters as we can.
  // --------------------------
  return Promise.resolve(TruncationResult.Success);
}
