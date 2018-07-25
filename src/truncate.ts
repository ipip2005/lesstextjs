import { ITruncateOptions } from './ITruncateOptions';
import { TruncationResult } from './TruncationResult';

function normalizeOptions(options: ITruncateOptions): Required<ITruncateOptions> {
  if (!options.monitorElement) {
    throw new Error('LessText: Monitor element cannot be empty');
  }

  const originalLineHeight: string = window
    .getComputedStyle(options.monitorElement, undefined)
    .getPropertyValue('line-height');

  const lineHeight: number = parseInt(originalLineHeight, 10) || 20;

  return {
    scalableElement: options.monitorElement,
    lineHeight,
    linesCount: 2,
    omission: '...',
    omissionBreakWord: true,
    reserveSpace: false,
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

function joinTextArray(textArray: string[], separator: string, omission: string): string {
  return textArray.join(separator) + omission;
}

export function truncate(rawOptions: ITruncateOptions): Promise<TruncationResult> {
  const options: Required<ITruncateOptions> = normalizeOptions(rawOptions);

  options.monitorElement.style.lineHeight = `${options.lineHeight}px`;
  options.monitorElement.style.wordWrap = 'break-word';

  const maxHeight: number = options.lineHeight * options.linesCount;

  if (getHeight(options.monitorElement) <= maxHeight) { // Had enough space, skip truncating.
    return Promise.resolve(TruncationResult.Skipped);
  }

  const scalableText: string = options.scalableElement.textContent || '';
  if (!scalableText) { // Space is not enough, and there is no text can be truncated, thus nothing we could do.
    return Promise.resolve(TruncationResult.Failed);
  }

  const textArray: string[] = scalableText
    .split(options.separator)
    .filter(text => options.reserveSpace || text);

  const allowedTextNumber: number = textArray.length;

  let minTextNumber: number = 0, maxTextNumber: number = allowedTextNumber;

  do {
    const currentCharactersCount: number = Math.floor((minTextNumber + maxTextNumber + 1) / 2);
    const currentTruncatedText: string =
      joinTextArray(textArray.slice(0, currentCharactersCount - 1), options.separator, options.omission);
    options.scalableElement.textContent = currentTruncatedText;

    if (getHeight(options.monitorElement) > maxHeight) {
      maxTextNumber = currentCharactersCount - 1;
    } else {
      minTextNumber = currentCharactersCount;
    }
  } while (minTextNumber < maxTextNumber);

  if (minTextNumber === 0) { // We truncated everyting.
    return Promise.resolve(TruncationResult.Failed);
  } else {
    return Promise.resolve(TruncationResult.Success);
  }
}
