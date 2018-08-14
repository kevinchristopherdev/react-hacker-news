import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';

import Button from './Button';
import './styles.css';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

const Sort = ({ sortKey, onSort, children }) => 
  <Button 
    onClick={() => onSort(sortKey)}
    className="sort-button">
    {children}
  </Button>

const Table = ({ 
  list,
  sortKey,
  onSort, 
  onDismiss }) =>
  <div>
    <div className="table-header">
      <span>
        <Sort
          sortKey={'TITLE'}
          onSort={onSort}
        > Title
        </Sort>
      </span>
      <span>
        <Sort
          sortKey={'AUTHOR'}
          onSort={onSort}
        >
          Author
        </Sort>
      </span>
      <span>
        <Sort
          sortKey={'COMMENTS'}
          onSort={onSort}
        > Comments
        </Sort>
      </span>
      <span>
        <Sort
          sortKey={'POINTS'}
          onSort={onSort}
        >
          Points
        </Sort>
      </span>
    </div>

    {SORTS[sortKey](list).map(item =>
      <div key={item.objectID} className={"list-item"}>
        <h2>
            <a href={item.url}>{item.title}</a>
        </h2>
        <h3>{item.author}</h3>
        <h4>Comments:{item.num_comments}</h4>
        <h4>Popularity Points:{item.points}</h4>
        <Button 
            onClick={() => onDismiss(item.objectID)}
            className="dismiss-butt"
        >
            Dismiss
        </Button>
      </div>
    )}
  </div>

  Table.propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        objectID: PropTypes.string.isRequired,
        author: PropTypes.string,
        url: PropTypes.string,
        num_comments: PropTypes.number,
        points: PropTypes.number,
      })
    ).isRequired,
    onDismiss: PropTypes.func.isRequired, 
  }
  
export default Table;