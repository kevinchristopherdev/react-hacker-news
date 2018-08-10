import React, { Component } from 'react';

const isSearched = (searchTerm) => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
          {list.filter(isSearched(pattern)).map(item =>
            <div key={item.objectID} className={"list-item"}>
              <h2>
                  <a href={item.url}>{item.title}</a>
              </h2>
              <h3>{item.author}</h3>
              <h4>Comments:{item.num_comments}</h4>
              <h4>Popularity Points:{item.points}</h4>
              <button
                  onClick={() => onDismiss(item.objectID)}
                  type="button"
              >
                  Dismiss
              </button>
            </div>
          )}
      </div>
    )
  }
}

export default Table;