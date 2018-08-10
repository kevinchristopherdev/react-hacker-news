import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
]

const isSearched = (searchTerm) => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };
  }

  onDismiss = (id) => {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  onSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <form>
          <input 
          type="text"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={this.onSearchChange}
          />
        </form>
        {list.filter(isSearched(searchTerm)).map(item => 
            <div key={item.objectID} className={"list-item"}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <br />
              <span>{item.author}</span>
              <br />
              <span>Comments:{item.num_comments}</span>
              <br />
              <span>Popularity Points:{item.points}</span>
              <br />
              <span>
                <button
                  onClick={() => this.onDismiss(item.objectID)}
                  type="button"
                >
                  Dismiss
                </button>
              </span>
            </div>
        )}
      </div>
    );
  }
}

export default App;
