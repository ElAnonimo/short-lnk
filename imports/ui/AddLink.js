import React from 'react';
import Modal from 'react-modal';
import {Meteor} from 'meteor/meteor';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {url: "", isOpen: false, error: null};
  }

  onSubmit(evt) {
    evt.preventDefault();
    // const url = this.refs.url.value.trim();
    const url = this.state.url;
    // if (url) {
      // Links.insert({url: url, userId: Meteor.userId()});
      Meteor.call('links.insert', url, (err, res) => {
        // this.setState({error: err.message});
        if (!err) {
          // this.setState({url: "", isOpen: false, error: null});
          this.handleModalClose.bind(this);
        } else {
          this.setState({error: err.reason});
        }
      });
      // this.refs.url.value = null;
    // }
  }

  onChange(evt) {
    this.setState({url: evt.target.value});
  }

  onClickAdd(evt) {
    this.setState({isOpen: true});
  }

  handleModalClose() {
    this.setState({url: "", isOpen: false, error: null});
  }

  render() {
    return(
      <div>
        <button className="button" onClick={this.onClickAdd.bind(this)}>Add link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="add link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view--box"
          overlayClassName="boxed-view boxed-view--overlay"
        >
          <h1>{this.props.title}</h1>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              ref="url"
              placeholder="put a URL here"
              value={this.state.url}
              onChange={this.onChange.bind(this)}
            />
            <button className="button">Add link</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}
