import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const Table = ({ list, onDismiss }) =>
  <div>
    {list.map(item =>
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
    list: PropTypes.array,
    onDismiss: PropTypes.func, 
  }
  
export default Table;