import {Meteor} from 'meteor/meteor';
import SimplSchema from 'simpl-schema';

SimplSchema.defineValidationErrorTransform((error) => {
  return new Meteor.Error(400, error.message);
});

/*SimplSchema.setDefaultMessages({
  messages: {
    RegEx: [
      {msg: "Default Message"},
      {exp: SimplSchema.RegEx.Url, msg: "wow"}
    ]
  }
});*/

/*SimplSchema.messages({
    RegEx: [
      {msg: "Default Message"},
      {exp: SimplSchema.RegEx.Url, msg: "wow"}
    ]
});*/
