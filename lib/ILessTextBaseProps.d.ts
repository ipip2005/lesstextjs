/// <reference types="react" />
export interface ILessTextBaseProps {
    /**
     * A callback to get the rendered content based the assessment given by currently rendered space.
     * assessment is a number from 0 to 1.
     * The callback should restrictly obey the linear rule that more content will be returned when given a larger assessment.
     * e.g.
     *  If assessment is 0, nothing is returned.
     *  And if assessment is 1, all the content will be returned.
     */
    getContent(assessment: number): JSX.Element;
}
