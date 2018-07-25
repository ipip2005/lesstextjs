export interface ITruncateOptions {
    monitorElement: HTMLElement;
    /**
     * @default monitorElement
     */
    flexibleElement?: HTMLElement;
    /**
     * The line-height value of the monitor element in pixels.
     * @default - If lineHeight is not specified, the line height of monitorElement will be used.
     */
    lineHeight?: number;
    /**
     * @default [linesCount=2]
     */
    linesCount?: number;
    /**
     * Symbol to append to the truncated text.
     * @default [omission='...']
     */
    omission?: string;
    /**
     * Symbol/Regex used for spliting text when truncating text.
     * @default [separator=undefined]
     */
    separator?: string;
    /**
     * Whether space character should be reserved.
     * When set to true, continuous space characters will not be deleted.
     * When set to false, continuous space will be trimmed to be one space and leading/trailing spaces will be deleted.
     * @default false
     */
    reserveSpace?: boolean;
    /**
     * Whether the last word in the truncated text could be a broken down word or must be a complete word.
     * @default [omissionBreakWord=true]
     */
    omissionBreakLastWord?: boolean;
}
