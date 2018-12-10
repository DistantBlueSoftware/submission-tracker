import React from 'react';
import { Button } from './framework';

const style = {minWidth: '100px'}

export const Filters = ({count, filter, setFilter}) => (
  <div>
    <Button style={style} blue active={filter === 'all'} onClick={() => setFilter('all')}>All {filter === 'all' && `(${count})`}</Button>
    <Button style={style} green active={filter === 'active'} onClick={() => setFilter('active')}>Active {filter === 'active' && `(${count})`}</Button>
    <Button style={style} red active={filter === 'inactive'} onClick={() => setFilter('inactive')}>Inactive {filter === 'inactive' && `(${count})`}</Button>
  </div>
)