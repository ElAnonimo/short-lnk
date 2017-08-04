import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';

/*export default class PrivateHeader extends React.Component {
  onLogout() {
    Accounts.logout();
  }

  render() {
    return(
      <div>
        <h1>{this.props.title}</h1>
        <button onClick={this.onLogout.bind(this)}>Log out</button>
      </div>
    );
  }
}*/

const PrivateHeader = (props) => {
  const onLogout = () => {
    Accounts.logout();
  };

  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={onLogout.bind(this)}>Log out</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PrivateHeader;
