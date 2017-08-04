import React from 'react';
import {Link} from 'react-router-dom';

/*export default class NotFound extends React.Component {
  render() {
    return (
      <div>not found</div>
    );
  }
}*/

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page not found</h1>
        <p>we're unable to find that page</p>
        <Link className="button button--link" to="/">head home</Link>
      </div>
    </div>
  );
}
