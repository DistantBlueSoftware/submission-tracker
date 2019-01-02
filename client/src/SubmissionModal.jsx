import React, { Component } from 'react';
import { connect } from 'react-redux';
import PublicationAutosuggest from './PublicationAutosuggest';
import PieceAutosuggest from './PieceAutosuggest';
import moment from 'moment';
import { Button } from './framework';
import * as actions from './actions';
import { toast } from 'react-toastify';
import _ from 'underscore';

const mapStateToProps = state => {
  return {...state};
}

class SubmissionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Sent',
      dateSubmitted: moment().format('YYYY-MM-DD'),
    }
  }
  
  handleSuggestion = suggestion => {
    this.setState({
      title: suggestion.title,
      wordCount: suggestion.wordCount
    })
  }

  handleChange = (e, explicitValue) => {
    if (explicitValue) {
      this.setState({
        publication: explicitValue
      });
    } else {
      e.preventDefault();
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const isNew = this.props.isNew ? this.props.isNew : (_.isEmpty(this.props.submissions.current));
    const sub = {...this.state};
    sub.user = this.props.user.username;
    this.newPieceCheck(sub.title, sub.wordCount);
    if (isNew) {
      this.props.newSubmission(sub, () => {
        toast.success("Submission created!");
      });
    } else {
      this.props.updateSubmission(sub, () => {
        toast.success('Submission updated');
      });
    }
  }
  
  newPieceCheck = (title, wordCount) => {
    const pieces = this.props.pieces.all.map(p => p.title);
    if (!~pieces.indexOf(title)) {
      // if (confirm(`${title} is not currently in your tracked pieces. Add it?`))
        this.props.newPiece({title, wordCount, user: this.props.user.id});
      }
  }
  
  componentDidMount() {
    this.setState({
      ...this.props.submissions.current
    }) 
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.submissions.current._id !== prevProps.submissions.current._id) {
      this.setState({
        ...this.props.submissions.current,
      }) 
    }
  }
  
  render () {
    const { submissions, publications, pieces } = this.props;
    const { current } = submissions;
    const isNew = this.props.isNew ? this.props.isNew : _.isEmpty(current);
    return (
      <div className='modal fade' id='submission-modal' tabIndex='-1' role='dialog'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{isNew ? 'New Submission' : '\"' + this.state.title + '\"—' + this.state.publication}</h5>
            </div>
            <div className='modal-body'>
            <form onSubmit={this.handleSubmit}>
              <div className='row'>
                <div className='col-md-12'>
                <div className='form-group'>
                  <PieceAutosuggest pieces={pieces} value={this.state.title ? this.state.title : ''} handleSuggestion={this.handleSuggestion} handleChange={this.handleChange} />
                  {/*
                    <label htmlFor='title'>Title of Submission:</label>
                    <input className='form-control' type='text' name='title' placeholder='Enter title' value={this.state.title} onChange={this.handleChange}></input>*/}
                </div>
                </div>
                <div className='col-md-12'>
                <div className='form-group'>
                  <label htmlFor='wordCount'>Word Count:</label>
                  <input className='form-control' type='number' name='wordCount' value={this.state.wordCount} onChange={this.handleChange}></input>
                </div>
                </div>
                <div className='col-md-12'>
                  <PublicationAutosuggest publications={publications} value={this.state.publication ? this.state.publication : ''} handleChange={this.handleChange} />
                </div>
                <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='dateSubmitted'>Submit Date</label>
                  <input className='form-control' type='date' name='dateSubmitted' value={moment(this.state.dateSubmitted).format('YYYY-MM-DD')} onChange={this.handleChange}>
                  </input>
                </div>
                </div>
                <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='dateHeard'>Heard Date</label>
                  <input className='form-control' type='date' name='dateHeard' value={this.state.dateHeard ? moment(this.state.dateHeard).format('YYYY-MM-DD') : ''} onChange={this.handleChange}></input>
                </div>
                </div>
                <div className='col-md-12'>
                <div className='form-group'>
                  <label htmlFor='status'>Status</label>
                    <select className='form-control' name='status' value={this.state.status} onChange={this.handleChange}>
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
                  <textarea className='form-control' name='notes' placeholder='Enter optional notes here' value={this.state.notes} onChange={this.handleChange}></textarea>
                </div>
                </div>
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <Button green onClick={this.handleSubmit} data-dismiss='modal'>{isNew ? 'Add' : 'Update'}</Button>
            <Button red data-dismiss='modal'>Close</Button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default connect(mapStateToProps, actions)(SubmissionModal);
