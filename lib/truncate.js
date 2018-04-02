function normalizeOptions(options) {
    if (!options.monitorElement) {
        throw new Error('Monitor element cannot be empty');
    }
    options.scalableElement = options.scalableElement || options.monitorElement;
    if (options.lineHeight) {
        options.lineHeight = options.lineHeight;
    }
    else {
        var originalLineHeight = window
            .getComputedStyle(this._textContainerElement, undefined)
            .getPropertyValue('line-height');
        options.lineHeight = parseInt(originalLineHeight, 10);
    }
    options.linesCount = options.linesCount || 2;
    options.omission = options.omission || '...';
    options.omissionBreakWord = options.omissionBreakWord || true;
    options.separator = options.separator || '';
    return options;
}
function getHeight(element) {
    var contentStyles = window.getComputedStyle(element);
    var padding = 0;
    if (contentStyles && contentStyles.paddingTop && contentStyles.paddingBottom) {
        padding = parseFloat(contentStyles.paddingTop) + parseFloat(contentStyles.paddingBottom);
    }
    return element.offsetHeight - padding;
}
function joinTextArray(textArray, separator, omission) {
    return textArray.join(separator) + omission;
}
export function truncate(rawOptions) {
    var options = normalizeOptions(rawOptions);
    options.monitorElement.style.lineHeight = options.lineHeight + "px";
    options.monitorElement.style.wordWrap = 'break-word';
    var maxHeight = options.lineHeight * options.linesCount;
    if (getHeight(options.monitorElement) <= maxHeight) {
        return Promise.resolve(0 /* Skipped */);
    }
    var truncatableText = options.scalableElement.textContent || '';
    if (!truncatableText) {
        return Promise.resolve(1 /* Failed */);
    }
    var textArray = truncatableText
        .split(options.separator)
        .filter(function (text) { return text; });
    var allowedTextNumber = textArray.length;
    var minTextNumber = 0, maxTextNumber = allowedTextNumber;
    do {
        var currentTextNumber = Math.floor((minTextNumber + maxTextNumber + 1) / 2);
        var currentTruncatedText = joinTextArray(textArray.slice(0, currentTextNumber - 1), options.separator, options.omission);
        options.scalableElement.textContent = currentTruncatedText;
        if (getHeight(options.monitorElement) > maxHeight) {
            maxTextNumber = currentTextNumber - 1;
        }
        else {
            minTextNumber = currentTextNumber;
        }
    } while (minTextNumber < maxTextNumber);
    if (minTextNumber === 0) {
        return Promise.resolve(1 /* Failed */);
    }
    else {
        return Promise.resolve(2 /* Success */);
    }
}

//# sourceMappingURL=truncate.js.map
