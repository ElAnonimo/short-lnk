import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import FlipMove from 'react-flip-move';

import {Links} from '../api/links';
import LinksListItem from './LinksListItem';
import LinksListFilters from './LinksListFilters';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {links: []};
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      console.log("LinksList component did mount");
      const links = Links.find({visible: Session.get('showVisible')}).fetch();
      this.setState({links: links});
    });
  }

  componentWillUnmount() {
    console.log("LinksList component unmounted");
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-msg">no links found</p>
        </div>
      );
    }

    return this.state.links.map((link) => {
      // return <span key={link._id}>{link.url}, {link.userId}; </span>;
      const absoluteUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} absoluteUrl={absoluteUrl} {...link} />;
    });
  }

  render() {
    return (
      <div>
        <b>Links List</b>
        <LinksListFilters/>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}
