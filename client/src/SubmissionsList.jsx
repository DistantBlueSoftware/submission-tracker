import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table } from './framework';
import { Filters } from './Filters';
import ReactTable from 'react-table';
import SubmissionModal from './SubmissionModal';
import * as actions from './actions';

const inactiveStatuses = ['Accepted', 'Withdrawn', 'Declined', 'Declined - Higher Tier', 'Declined - Personal'];

class SubmissionsList extends Component {
  constructor(props) {
    super(props);
    const {subs} = this.props;
    this.state = {
      modalOpen: false,
      modalData: null,
      all: subs, 
      active: subs.filter(sub => inactiveStatuses.indexOf(sub.status) === -1),
      inactive: subs.filter(sub => inactiveStatuses.indexOf(sub.status) !== -1),
      filter: 'all'
    }
  }
  
  openModal = data => {
    this.setState({
      modalData: data
    });
    window.$('#submission-modal').modal();
  }
  
  setFilter = filter => {
    this.setState({
      filter,
      count: this.state[filter].length
    });
  }
  
  componentDidUpdate(prevProps) {
    // if ()
  }
  
  render() {
    const {subs, openSubmission} = this.props;
    const {count, modalOpen, modalData, filter} = this.state;
    return (
      <React.Fragment>
        <Filters count={this.state.all.length} filter={filter} setFilter={this.setFilter} activeCount={this.state.active.length} inactiveCount={this.state.inactive.length} />
        <ReactTable data={this.state[filter]} 
          columns={[
            {
              Header: 'Date Submitted',
              id: 'dateSubmitted',
              accessor: d => moment(d.dateSubmitted).format('MM/DD/YYYY')
            },
            {
              Header: 'Title',
              accessor: 'title'
            },
            {
              Header: 'Publication',
              accessor: 'publication'
            },
            {
              Header: 'Status',
              accessor: 'status'
            }
          ]}
          defaultSorted={[
            {
              id: 'dateSubmitted',
              desc: false
            }
          ]}
          defaultPageSize={10}
          className='-striped -highlight'
          getTrProps ={(state, rowInfo, column, instance) => {
            return {
              onClick: e => openSubmission(rowInfo.original._id, res => this.openModal(res))
            }
          }}
          />
        <SubmissionModal isOpen={modalOpen} data={modalData} />
      </React.Fragment>
    )
  }
}

export default connect(null, actions)(SubmissionsList)