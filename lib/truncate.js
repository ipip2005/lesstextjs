var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function normalizeOptions(options) {
    if (!options.monitorElement) {
        throw new Error('LessText: Monitor element cannot be empty');
    }
    var originalLineHeight = window
        .getComputedStyle(options.monitorElement, undefined)
        .getPropertyValue('line-height');
    var lineHeight = parseInt(originalLineHeight, 10) || 20;
    return __assign({ scalableElement: options.monitorElement, lineHeight: lineHeight, linesCount: 2, omission: '...', omissionBreakWord: true, separator: '' }, options);
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
    if (getHeight(options.monitorElement) <= maxHeight) { // Had enough space, skip truncating.
        return Promise.resolve(1 /* Skipped */);
    }
    var truncatableText = options.scalableElement.textContent || '';
    if (!truncatableText) { // Spcae is not enough, but there is no text can be truncated.
        return Promise.resolve(2 /* Failed */);
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
    if (minTextNumber === 0) { // We truncated everyting.
        return Promise.resolve(2 /* Failed */);
    }
    else {
        return Promise.resolve(3 /* Success */);
    }
}

//# sourceMappingURL=truncate.js.map
