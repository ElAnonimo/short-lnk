import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props) {
    super();
    this.state = {error: null};    // {count: this.props.count || 0}: this.props.count comes from parent if one exists
  }

  onSubmit(evt) {
    evt.preventDefault();

    let email = this.refs.email.value;
    let password = this.refs.password.value;

    if (password.length < 5) {
      return this.setState({error: "Password must be more than 5 characters"});
    }

    Accounts.createUser({email: email, password: password}, (err) => {
      if (err) {
        this.setState({error: err.message});
      } else {
        this.setState({error: null});
      }
    });
    // this.setState({error: "Hello!"});
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Sign up</h1>
          <p>{this.state.error ? this.state.error : "No errors"}</p>
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Create account</button>
          </form>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    );
  }
};
