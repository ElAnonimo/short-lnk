import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import {onAuthChange, routes} from '../imports/routes/routes';
import '../imports/startup/simpl-schema-config';
import {Links} from '../imports/api/links';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  console.log("isAuthenticated: ", isAuthenticated);

  onAuthChange(isAuthenticated);
});

Session.set('name', 'Mikki');

Tracker.autorun(() => {
  const name = Session.get('name');
  console.log("Session's name var: ", name);
});

Meteor.startup(() => {
  /* Meteor.call('greetUser', "The user is Mikki", (err, res) => {
    console.log("greetUser() args from client. ", err, res);
  });
  Meteor.call('sum', 5, 5, (err, res) => {
    console.log("sum == ", res);
  }); */
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
});
