import React from 'react';
import {Link} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';

export default class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {error: null};
  }

  onSubmit(evt) {
    evt.preventDefault();

    let email = this.refs.email.value;
    let password = this.refs.password.value;

    Meteor.loginWithPassword({email: email}, password, (err) => {
      if (err) {
        this.setState({error: err.message});
      } else {
        this.setState({error: null});
      }
    });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk login</h1>
          <p>{this.state.error ? this.state.error : "No errors"}</p>
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Log in</button>
          </form>
          <Link to="/signup">Have an account?</Link>
        </div>
      </div>
    );
  }
};
