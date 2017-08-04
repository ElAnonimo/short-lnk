import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';

import '../imports/api/users';
import {Links} from '../imports/api/links';
import '../imports/startup/simpl-schema-config';

Meteor.startup(() => {
  /* Meteor.call('greetUser', (err, res) => {
    console.log("greetUser() args from server. ", err, res);
  }); */

  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({_id: _id});
    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.visitCount', _id);
    } else {
      next();
    }
  });

  WebApp.connectHandlers.use((req, res, next) => {
    console.log("The below is from the custom middleware:");
    console.log(req.url, req.method, req.query);
    next();
  });
});
