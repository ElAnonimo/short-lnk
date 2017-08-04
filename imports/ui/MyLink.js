import React from 'react';
import {Meteor} from 'meteor/meteor';
import {withRouter} from 'react-router-dom';
// import PropTypes from 'prop-types';
import LinksList from './LinksList';
import AddLink from './AddLink';
import PrivateHeader from './PrivateHeader';

/* class MyLink extends React.Component {
  // static contextTypes = {router: PropTypes.object};
  constructor(props) {
    super(props);
    this.state = {error: null};
  }

  navigate(evt) {
    evt.preventDefault();
    this.props.history.push('/notfound');
    // this.context.router.history.push('/login');
  }

  render() {
    return (
      <div>
        <PrivateHeader title="Your links"/>
        <button onClick={this.navigate.bind(this)}>Go to Not Found page</button>
        <br/>
        <LinksList/>
        <p>{this.state.error ? this.state.error : null}</p>
        <AddLink title="Add a link"/>
      </div>
    );
  }
} */

const MyLink = (props) => {
  const navigate = (evt) => {
    evt.preventDefault();
    props.history.push('/notfound');
  };

  return (
    <div>
      <PrivateHeader title="Short Lnk"/>
      <div className="page-content">
        <button className="button" onClick={navigate.bind(this)}>Go to Not Found page</button>
        <LinksList/>
        <AddLink title="Add a link"/>
      </div>
    </div>
  );
};

export default withRouter(MyLink);
