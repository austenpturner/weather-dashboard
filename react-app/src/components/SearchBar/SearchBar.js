import React, { Component } from 'react';
import "./searchstylesheet.css";

class SearchBar extends Component {
    render() {
        const searchOptions = this.props.searchOptions;
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
                            list="city-options" 
                            id="search-input"
                            value={this.props.searchInput} 
                            onChange={this.props.handleInputChange}
                        />
                            <datalist 
                                id="city-options"
                            >
                                {searchOptions.map((location, index) => {
                                    if (location.country === 'US') {
                                        const searchLocation = `${location.city}, ${location.state}`
                                        return <option 
                                            key={index}
                                            value={searchLocation}
                                        />
                                    } else {
                                        const searchLocation = `${location.city}, ${location.country}`
                                        return <option 
                                            key={index}
                                            value={searchLocation}
                                        />
                                    }
                                })}
                            </datalist>
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