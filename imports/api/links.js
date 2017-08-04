import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import SimplSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function() {
    console.log("user ID from server: ", this.userId);
    return Links.find({userId: this.userId});   // this.userId is logged in user's ID inside publish()
  });
}

Meteor.methods({
  greetUser(userName = "default user") {
    // throw new Meteor.Error("a no reason error", "just to try Meteor.Error out");
    console.log("greetUser() on api (server) is running");
    return `Hello ${userName}`;
  },
  sum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Meteor.Error("arg(s) aren't Numbers", "ouch");
    }
    return a + b;
  },
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error("not authorized");
    }

    // try {
      new SimplSchema({
        url: {
          type: String,
          // label: "my wrong URL error message",
          regEx: SimplSchema.RegEx.Url
        },
      })
      .validate({url: url});
    /*} catch(ex) {
      console.log(ex);
      throw new Meteor.Error(400, ex.message);
    }*/

    Links.insert({
      _id: shortid.generate(),
      url: url,
      userId: this.userId,
      visible: true,
      visitCount: 0,
      lastVisitedAt: null
    });
  },
  'links.setVisibility'(_id, newVisible) {
    if (!this.userId) {
      throw new Meteor.Error("not authorized");
    }

    new SimplSchema({
      _id: {
        type: String,
        min: 1
      },
      newVisible: {
        type: Boolean
      }
    })
    .validate({_id: _id, newVisible: newVisible});

    Links.update(
      {_id: _id, userId: this.userId},
      {$set: {visible: newVisible}}
    );
  },
  'links.visitCount'(_id) {
    new SimplSchema({
      _id: {
        type: String,
        min: 1
      }
    })
    .validate({_id: _id});

    Links.update({_id: _id}, {
      $inc: {visitCount: 1},
      $set: {lastVisitedAt: new Date().getTime()}
    });
  }
});
