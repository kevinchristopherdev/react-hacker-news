import React, { Component } from 'react';
import Search from './components/Search';
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
        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}
        />
        {list.filter(isSearched(searchTerm)).map(item => 
            <div key={item.objectID} className={"list-item"}>
              <h2>
                <a href={item.url}>{item.title}</a>
              </h2>
              <h3>{item.author}</h3>
              <h4>Comments:{item.num_comments}</h4>
              <h4>Popularity Points:{item.points}</h4>
              <button
                onClick={() => this.onDismiss(item.objectID)}
                type="button"
              >
                Dismiss
              </button>
  
            </div>
        )}
      </div>
    );
  }
}

export default App;
