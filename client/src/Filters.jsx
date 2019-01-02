import React from 'react';
import { Button } from './framework';

const style = {minWidth: '100px'}

export const Filters = ({count, activeCount, inactiveCount, filter, setFilter}) => (
  <div>
    <Button style={style} blue active={filter === 'all'} onClick={() => setFilter('all')}>All {`(${count})`}</Button>
    <Button style={style} green active={filter === 'active'} onClick={() => setFilter('active')}>Active {`(${activeCount})`}</Button>
    <Button style={style} red active={filter === 'inactive'} onClick={() => setFilter('inactive')}>Inactive {`(${inactiveCount})`}</Button>
  </div>
)