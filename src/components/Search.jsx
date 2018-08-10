import React, { Component } from 'react';

class Search extends Component {
    render() {
        const { value, onChange } = this.props;
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search Title"
                    value={value}
                    onChange={onChange}
                />
            </form>
        )
    }
}

export default Search;