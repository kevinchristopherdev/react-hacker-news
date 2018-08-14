import React, { Component } from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import Search from './components/Search';
import Table from './components/Table';
import Button from './components/Button';
import Header from './components/Header';

import './App.css';

import {
  DEFAULT_QUERY, 
  DEFAULT_HPP, 
  PATH_BASE, 
  PATH_SEARCH, 
  PARAM_SEARCH, 
  PARAM_PAGE, 
  PARAM_HPP,
} from './constants/';

library.add(faSpinner)

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
    };
  }

  setSearchTopStories = (result) => {
    //Get the hits and the page from the result.
    const { hits, page } = result;
    //Retrieve searchKey from state.
    const { searchKey, results } = this.state;
    //Check to see if there are already old hits. Old hits get
     // retrieved from the results map with the searchKey as key.
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];
    //Merge the old and new hits.
    const updatedHits = [
      ...oldHits,
      ...hits 
    ];
    //Set the merged hits and page in the local state cache.
    this.setState({
      results: {
        ...results,
        //store the updated result by searchKey in the results map. Non fluctuant now
        [searchKey]: { hits: updatedHits, page }
      },
      isLoading: false
    });
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    this.setState({ isLoading: true });

    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }

  componentDidMount() {
    this._isMounted = true;

    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  needsToSearchTopStories = (searchTerm) => {
    return !this.state.results[searchTerm];
  }

  onSearchSubmit = (event) => {
    const { searchTerm } =this.state;
    this.setState({ searchKey: searchTerm })
    //initializes use of the local cache if search has already happened.
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  }

  onDismiss = (id) => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits= hits.filter(isNotId);

    this.setState({ 
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
     });
  }

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { 
      searchTerm, 
      results, 
      searchKey, 
      error,
      isLoading,
    } = this.state;

    const page = (
      results && 
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

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
          { error
            ? <div className="error_text">
            <p>Something went <em>terribly</em> wrong!</p>
            </div>
            : <Table 
              list={list}
              onDismiss={this.onDismiss}
            />
          }
        <div className="interactions">
         { isLoading  
            ? <FontAwesomeIcon icon="spinner" className="fa-2x spinner" />
          : <Button 
          onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          className="more_butt"
          >
            More
          </Button>
         }
        </div>
      </div>
    );
  }
}

export default App;
