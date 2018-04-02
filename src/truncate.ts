import { ITruncateOptions } from './ITruncateOptions';
import { TruncationResult } from './TruncationResult';

function normalizeOptions(options: Partial<ITruncateOptions>): ITruncateOptions {
  if (!options.monitorElement) {
    throw new Error('Monitor element cannot be empty');
  }

  options.scalableElement = options.scalableElement || options.monitorElement;

  if (options.lineHeight) {
    options.lineHeight = options.lineHeight;
  } else {
    const originalLineHeight: string = window
      .getComputedStyle(options.monitorElement, undefined)
      .getPropertyValue('line-height');

    options.lineHeight = parseInt(originalLineHeight, 10);
  }

  options.linesCount = options.linesCount || 2;
  options.omission = options.omission || '...';
  options.omissionBreakWord = options.omissionBreakWord || true;
  options.separator = options.separator || '';

  return options as ITruncateOptions;
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

export function truncate(rawOptions: Partial<ITruncateOptions>): Promise<TruncationResult> {
  const options: ITruncateOptions = normalizeOptions(rawOptions);

  options.monitorElement.style.lineHeight = `${options.lineHeight}px`;
  options.monitorElement.style.wordWrap = 'break-word';

  const maxHeight: number = options.lineHeight * options.linesCount;

  if (getHeight(options.monitorElement) <= maxHeight) { // Had enough space, skip truncating.
    return Promise.resolve(TruncationResult.Skipped);
  }

  const truncatableText: string = options.scalableElement.textContent || '';

  if (!truncatableText) { // Spcae is not enough, but there is no text can be truncated.
    return Promise.resolve(TruncationResult.Failed);
  }

  const textArray: string[] = truncatableText
    .split(options.separator)
    .filter(text => text);

  const allowedTextNumber: number = textArray.length;

  let minTextNumber: number = 0, maxTextNumber: number = allowedTextNumber;

  do {
    const currentTextNumber: number = Math.floor((minTextNumber + maxTextNumber + 1) / 2);
    const currentTruncatedText: string =
      joinTextArray(textArray.slice(0, currentTextNumber - 1), options.separator, options.omission);
    options.scalableElement.textContent = currentTruncatedText;

    if (getHeight(options.monitorElement) > maxHeight) {
      maxTextNumber = currentTextNumber - 1;
    } else {
      minTextNumber = currentTextNumber;
    }
  } while (minTextNumber < maxTextNumber);

  if (minTextNumber === 0) { // We truncated everyting.
    return Promise.resolve(TruncationResult.Failed);
  } else {
    return Promise.resolve(TruncationResult.Success);
  }
}
