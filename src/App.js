import React, { Component } from 'react';
import Search from './components/Search';
import Table from './components/Table';
import Button from './components/Button';
import Header from './components/Header';

import './App.css';

const DEFAULT_QUERY = 'Redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
  }

  setSearchTopStories = (result) => {
    //Get the hits and the page from the result.
    const { hits, page } = result;
    //Check to see if there are already old hits.
    const oldHits = page !== 0
      ? this.state.result.hits
      : [];
    //Merge the old and new hits.
    const updatedHits = [
      ...oldHits,
      ...hits 
    ];
    //Set the merged hits and page in the local state.
    this.setState({
      result: { hits: updatedHits, page }
    });
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchSubmit = (event) => {
    const { searchTerm } =this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  onDismiss = (id) => {
    const isNotId = item => item.objectID !== id;
    const updatedHits= this.state.result.hits.filter(isNotId);
    this.setState({ 
      result: { ...this.state.result, hits: updatedHits }
     });
  }

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;
    return (
      <div>
        <div className="App">
          <Header />
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
          { result &&
            <Table 
              list={result.hits}
              onDismiss={this.onDismiss}
            />
          }
        <div className="interactions">
          <Button 
          onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}
          className="more_butt"
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
