import {Meteor} from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {copied: false};
  };

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard
      .on('success', () => {
        this.setState({copied: true});
        setTimeout(() => this.setState({copied: false}), 1000);
      })
      .on('error', () => {
        this.setState({copied: false});
      });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  renderStats() {
    const visitMsg = this.props.visitCount === 1 ? "visit" : "visits";
    let visitedMsg = null;
    let lastVisitedAtFormatted = null;

    if (typeof this.props.lastVisitedAt === 'number') {
      lastVisitedAtFormatted = moment(this.props.lastVisitedAt).format('HH:mm, MMM Do, YYYY, ddd');
      visitedMsg = `visited ${moment(this.props.lastVisitedAt).fromNow()}`;
    }

    return {visitMsg: visitMsg, visitedMsg: visitedMsg, lastVisitedAtFormatted: lastVisitedAtFormatted};
  }

  render() {
    return (
      <div className="item">
        <table>
          <tbody>
            <tr><td><h2>absolute URL</h2></td><td><h2>{this.props.absoluteUrl}</h2></td></tr>
            <tr><td>visible</td><td>{this.props.visible.toString()}</td></tr>
            <tr className="item__msg"><td>link</td><td>{this.props.url}</td></tr>
            <tr><td>user ID</td><td>{this.props.userId}</td></tr>
            <tr className="item__msg"><td>visit count</td><td>{this.props.visitCount} {this.renderStats().visitMsg}</td></tr>
            <tr className="item__msg"><td>last visited at</td><td>{this.renderStats().lastVisitedAtFormatted}, {this.renderStats().visitedMsg}</td></tr>
          </tbody>
        </table>
        <a className="button button--pill button--link" href={this.props.absoluteUrl} target="_blank">visit me</a>
        <button className="button button--pill" ref="copy" data-clipboard-text={this.props.absoluteUrl}>
          {this.state.copied ? "copied" : "Copy"}
        </button>
        <button className="button button--pill" onClick={() => Meteor.call('links.setVisibility', this.props._id, !this.props.visible)}>
          {this.props.visible ? "Hide" : "Show"}
        </button>
      </div>
    );
  };
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  absoluteUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visitCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
};
