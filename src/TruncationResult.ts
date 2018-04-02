export const enum TruncationResult {
  /**
   * The given element doesn't need to be truncated as space is enough to render all text.
   */
  Skipped,

  /**
   * We have truncated everything, but the space is still not enough.
   */
  Failed,

  /**
   * We successfully truncated the text to fix the given space.
   */
  Success
}
