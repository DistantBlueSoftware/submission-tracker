import React from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import * as actions from './actions';
import { Table } from './framework';

const moment = extendMoment(Moment);

const mapStateToProps = state => {
  return {...state};
}

const sortTable = by => {
  console.log(`sorting by ${by}`)
}

const isPublicationOpen = pub => {
  if (pub.alwaysOpen) return true;
  if (!pub.openDates || !pub.openDates.length) return false;
  let isOpen = false;
  pub.openDates.forEach(date => {
    let openDate = moment(moment().format('YYYY') + '-' + date.openMonth + '-' + date.openDay);
    let closeDate = moment(moment().format('YYYY') + '-' + date.closeMonth + '-' + date.closeDay);
    if (closeDate.isSame(openDate)) isOpen = true;
    if (closeDate.isBefore(openDate)) closeDate = closeDate.add(1, 'year');
    const range = moment.range(openDate, closeDate);
    if (range.contains(moment())) isOpen = true;
  })
  return isOpen;
}

const PublicationsList = ({publications, openPublication}) => {
  const { all } = publications;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{textAlign: 'center'}} onClick={() => sortTable('name')}>Publication Name</th>
          <th style={{textAlign: 'center'}} onClick={() => sortTable('open')}>Open?</th>
        </tr>
      </thead>
      <tbody>
        {all && all.map(pub => {
          return (
            <tr key={pub._id || pub.slug} onClick={e => openPublication(pub)}>
              <td>{pub.name}</td>
              <td style={{textAlign: 'center'}}>{isPublicationOpen(pub) ? <i className='fas fa-check-square' style={{fontSize: '22px', color: '#478947'}}></i> : 'no'}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default connect(mapStateToProps, actions)(PublicationsList);
