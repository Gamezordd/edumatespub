import React from 'react';
import { compose } from 'recompose';

class InfiniteScrollUncomposed extends React.Component<any, any> {}

export const InfiniteScroll = compose()(InfiniteScrollUncomposed);
