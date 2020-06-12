import React, { Component } from 'react';
import "./searchstylesheet.css";

class SearchBar extends Component {
    render() {
        return (
            <div id="search-bar">
                <form>
                    <div className="form-group">
                        <label htmlFor="search">Search for a city:</label>
                        <input 
                            type="text" 
                            name="search" 
                            id="search-input"
                            value={this.props.searchInput} 
                            onChange={this.props.handleInputChange}
                        />
                        <button  
                            id='search-btn'
                            onClick={this.props.handleFormSubmit}
                        >
                            <i 
                                className='fas fa-search fa-lg'
                            ></i>
                        </button>
                        <button id='save-btn'>
                            <i className='far fa-bookmark fa-lg'></i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;