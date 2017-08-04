import { Meteor } from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import SimplSchema from 'simpl-schema';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;
  console.log("user: ", user);

  // try {
    new SimplSchema({
      email: {
        type: String,
        regEx: SimplSchema.RegEx.EmailWithTLD
      }
    }).validate({
      email: email
    });
/*  } catch(ex) {
    throw new Meteor.Error(400, ex.message);
  }*/

  return true;
});
