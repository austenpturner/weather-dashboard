import React, { Component } from 'react';
import "./searchstylesheet.css";

class SearchBar extends Component {
    render() {
        return (
            <div 
                id="search-bar"
                className={this.props.showSearchBar ? 'slide-down' : 'slide-up'}
            >
                <form>
                    <div className={this.props.showSearchBar ? 'form-group show' : 'form-group hide'}>
                        <label htmlFor="search">Search for a city:</label>
                        <input 
                            type="text" 
                            name="search" 
                            id="search-input"
                            value={this.props.searchInput} 
                            onChange={this.props.handleInputChange}
                        />
                        <button>
                            <i 
                                className='fas fa-search fa-md'
                                onClick={this.props.handleFormSubmit}
                            ></i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;