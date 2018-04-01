import * as React from 'react';

import { ILessTextProps } from './ILessTextProps';

export class LessText extends React.PureComponent<ILessTextProps> {
  public render(): JSX.Element {
    return (
      <p>{this.props.text}</p>
    );
  }
}
