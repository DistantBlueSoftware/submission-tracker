import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PublicationAutosuggest from './PublicationAutosuggest';
import moment from 'moment';
import * as actions from './actions';

const mapStateToProps = state => {
  return {...state};
}

class SubmissionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleChange = e => {
    e.preventDefault();
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { match } = this.props;
    const isNew = match.params && match.params.slug ? false : true;
    // if (isNew) {
    //   this.props.newSubmission();
    // } else {
    //   this.props.updateSubmission();
    // }
  }

  render () {
    const { current: submission = {}, match } = this.props;
    const isNew = match && match.params && match.params.slug ? false : true;
    return (
      <div className='modal fade' id='submission-modal' tabIndex='-1' role='dialog'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{isNew ? 'New Submission' : '\"' + submission.title + '\"—' + submission.publication}</h5>
            </div>
            <div className='modal-body'>
            <form onSubmit={this.handleSubmit}>
              <div className='row'>
                <div className='col-md-12'>
                <div className='form-group'>
                  <label htmlFor='title'>Title of Submission:</label>
                  <input className='form-control' type='text' name='title' placeholder='Enter title' value={submission.title} onChange={this.handleChange}></input>
                </div>
                </div>
                <div className='col-md-12'>
                <div className='form-group'>
                  <label htmlFor='wordCount'>Word Count:</label>
                  <input className='form-control' type='number' name='wordCount' value={submission.wordCount} onChange={this.handleChange}></input>
                </div>
                </div>
                <div className='col-md-12'>
                  {/*<PublicationAutosuggest publications={publications} publication={submission.publication} handleInput={handleInput} />*/}
                </div>
                <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='dateSubmitted'>Submit Date</label>
                  <input className='form-control' type='date' name='dateSubmitted' value={moment(submission.dateSubmitted).format('YYYY-MM-DD')} onChange={this.handleChange}>
                  </input>
                </div>
                </div>
                <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='dateHeard'>Heard Date</label>
                  <input className='form-control' type='date' name='dateHeard' value={submission.dateHeard ? moment(submission.dateHeard).format('YYYY-MM-DD') : ''} onChange={this.handleChange}></input>
                </div>
                </div>
                <div className='col-md-12'>
                <div className='form-group'>
                  <label htmlFor='status'>Status</label>
                    <select className='form-control' name='status' value={submission.status} onChange={this.handleChange}>
                      <option value='Sent'>Sent</option>
                      <option value='Withdrawn'>Withdrawn</option>
                      <option value='Accepted'>Accepted</option>
                      <option value='Declined'>Declined</option>
                      <option value='Declined - Higher Tier'>Declined - Higher Tier</option>
                      <option value='Declined - Personal'>Declined - Personal</option>
                    </select>
                </div>
                </div>
                <div className='col-md-12'>
                <div className='form-group'>
                  <label htmlFor='notes'>Notes:</label>
                  <textarea className='form-control' name='notes' placeholder='Enter optional notes here' value={submission.notes} onChange={this.handleChange}></textarea>
                </div>
                </div>
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button className='btn btn-success' onClick={this.handleSubmit}>{isNew ? 'Add' : 'Update'}</button>
            <button className='btn btn-danger' data-dismiss='modal'>Close</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default connect(mapStateToProps, actions)(SubmissionModal);
