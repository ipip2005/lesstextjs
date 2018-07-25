export declare const enum TruncationResult {
    /**
     * The given element doesn't need to be truncated as space is enough to render all text.
     */
    Skipped = 1,
    /**
     * We have truncated everything, but the space is still not enough.
     */
    Failed = 2,
    /**
     * We successfully truncated the text to fix the given space.
     */
    Success = 3
}
