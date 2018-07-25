var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * Normailize - Set default value of options to make all fields required.
 * @param options - The truncate options object that has optional fields.
 */
function normalizeOptions(options) {
    if (!options.monitorElement) {
        throw new Error('LessText: Monitor element cannot be empty');
    }
    var originalLineHeight = window
        .getComputedStyle(options.monitorElement, undefined)
        .getPropertyValue('line-height');
    var lineHeight = parseInt(originalLineHeight, 10) || 20;
    return __assign({ flexibleElement: options.monitorElement, lineHeight: lineHeight, linesCount: 2, omission: '...', omissionBreakLastWord: false, reserveExtraSpace: false, separator: '' }, options);
}
function getHeight(element) {
    var contentStyles = window.getComputedStyle(element);
    var padding = 0;
    if (contentStyles && contentStyles.paddingTop && contentStyles.paddingBottom) {
        padding = parseFloat(contentStyles.paddingTop) + parseFloat(contentStyles.paddingBottom);
    }
    return element.offsetHeight - padding;
}
function hasEnoughSpace(options) {
    var maxHeight = options.lineHeight * options.linesCount;
    return getHeight(options.monitorElement) <= maxHeight;
}
export function truncate(rawOptions) {
    var options = normalizeOptions(rawOptions);
    options.monitorElement.style.lineHeight = options.lineHeight + "px";
    options.monitorElement.style.wordWrap = 'break-word';
    // --------------------------
    // FAST RETURN: Skipped
    // Had enough space, skip truncating.
    // --------------------------
    if (hasEnoughSpace(options)) {
        return Promise.resolve(1 /* Skipped */);
    }
    // This is the text where we can operate.
    var scalableText = options.flexibleElement.textContent || '';
    // --------------------------
    // FAST RETURN: Failed
    // We cannot do anything if there is no text that can be truncated.
    // --------------------------
    if (!scalableText) {
        return Promise.resolve(2 /* Failed */);
    }
    var wordsArray = scalableText
        .split(options.separator)
        .filter(function (text) { return options.reserveExtraSpace || text; });
    var allowedWordsCount = wordsArray.length;
    var minWordsCount = 0, maxWordsCount = allowedWordsCount;
    // Do a binary search to fit as many words as we can.
    do {
        var experimentWordsCount = Math.floor((minWordsCount + maxWordsCount + 1) / 2);
        var experimentText = wordsArray.slice(0, experimentWordsCount - 1).join(options.separator) + options.omission;
        options.flexibleElement.textContent = experimentText;
        if (hasEnoughSpace(options)) {
            minWordsCount = experimentWordsCount;
        }
        else {
            maxWordsCount = experimentWordsCount - 1;
        }
    } while (minWordsCount < maxWordsCount);
    // --------------------------
    // FAST RETURN: Failed
    // We don't have space for even one word, and it is not allowed to break the last word.
    // --------------------------
    if (minWordsCount === 0 && !options.omissionBreakLastWord) {
        return Promise.resolve(2 /* Failed */);
    }
    // --------------------------
    // FAST RETURN: Unexpected
    // The hit of this code means no text is truncated,
    // in which case the function should already be returned at the early stage.
    // --------------------------
    if (minWordsCount === allowedWordsCount) {
        return Promise.resolve(4 /* Unexpected */);
    }
    // --------------------------
    // FAST RETURN: Success
    // The words have been truncated and it is not configured to further truncate the last word.
    // --------------------------
    if (!options.omissionBreakLastWord) {
        return Promise.resolve(3 /* Success */);
    }
    // We will try to show as many characters as we can from the last word that was truncated away.
    var lastWord = wordsArray[minWordsCount + 1];
    var currentText = wordsArray.slice(0, minWordsCount).join(options.separator);
    var nextText = currentText + options.separator;
    var experimentCharacterIndex = 0;
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
    return Promise.resolve(3 /* Success */);
}

//# sourceMappingURL=truncate.js.map
