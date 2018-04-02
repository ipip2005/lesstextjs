export interface ILessTextClassicProps {
    /**
     * Lines of text to show in the text container.
     */
    lines: number;
    /**
     * Symbol to append to the truncated text.
     * @default [omission='...']
     */
    omission?: string;
    /**
     * Symbol/Regex used for spliting text when truncating text.
     * @default [separator=undefined]
     */
    separator?: string | undefined;
    /**
     * Original text to process.
     */
    text: string;
    /**
     * The class names added to the root element.
     */
    className: string;
}
