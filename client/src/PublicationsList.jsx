import React from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import * as actions from './actions';
import { Table } from './framework'

const moment = extendMoment(Moment);

const mapStateToProps = state => {
  return {...state};
}

const PublicationsList = ({publications, openPublication}) => {
  const { all } = publications;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Publication Name</th>
          <th>Open?</th>
        </tr>
      </thead>
      <tbody>
        {all && all.map(pub => {
          const openDate = moment(moment().format('YYYY') + '-' + pub.dateOpenMonth1 + '-' + pub.dateOpenDay1);
          const closeDate = moment(moment().format('YYYY') + '-' + pub.dateCloseMonth1 + '-' + pub.dateCloseDay1);
          if (closeDate < openDate) openDate.subtract(1, 'year');
          const range = moment.range(openDate, closeDate);
          if (range.contains(moment())) pub.open = true;
          return (
            <tr key={pub._id} onClick={e => openPublication(pub)}>
              <td>{pub.name}</td>
              <td>{pub.open ? <img src='check.svg' width='20px' height='20px'/> : 'no'}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default connect(mapStateToProps, actions)(PublicationsList);
