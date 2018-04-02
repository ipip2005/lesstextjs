function normalizeOptions(options) {
    if (!options.monitorElement) {
        throw new Error('Monitor element cannot be empty');
    }
    options.scalableElement = options.scalableElement || options.monitorElement;
    options.lineHeight = options.lineHeight || 20;
    options.linesCount = options.linesCount || 2;
    options.omission = options.omission || '...';
    options.omissionBreakWord = options.omissionBreakWord || true;
    return options;
}
export function truncate(rawOptions) {
    var options = normalizeOptions(rawOptions);
    options.monitorElement.style.lineHeight = options.lineHeight + "px";
    options.monitorElement.style.wordWrap = 'break-word';
    var maxHeight = options.lineHeight * options.linesCount;
}

//# sourceMappingURL=truncate.js.map
