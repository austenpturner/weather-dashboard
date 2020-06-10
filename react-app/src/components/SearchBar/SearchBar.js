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
                            // value={this.state.firstName} 
                            // onChange={this.handleInputChange.bind(this)}
                        />
                        <button type='submit' id='search-btn'>
                            <i class='fas fa-search fa-lg'></i>
                        </button>
                        <button id='save-btn'>
                            <i class='far fa-bookmark fa-lg'></i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;