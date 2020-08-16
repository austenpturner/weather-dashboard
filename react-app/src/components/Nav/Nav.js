import React, { Component } from "react";
import renderConditionIcon from "../../utils/renderIcons";
import "../dashboardstyles.css";

class Nav extends Component {
    locationSelection(event) {
        this.props.handleNavSlide();
        this.props.handleLocationSelection(event);
    };

    render() {
        const locations = this.props.savedLocations;
        return (
            <nav>
                <div id="nav-bar">
                    <div id="btn-container">
                        <button id="search-btn" onClick={this.props.displaySearchBar}>
                            <i className="fas fa-search fa-lg"></i>
                        </button>
                        <button id="location-btn" onClick={this.props.handleCurrentSelection}>
                            <i className="fas fa-location-arrow"></i>
                        </button>
                        <button id="save-btn" onClick={this.props.handleLocationSave}>
                            <i className="far fa-bookmark fa-lg"></i>
                        </button>
                    </div>
                    <div id="nav-icon" onClick={this.props.handleNavSlide}>
                        <div className={this.props.slideNav ? "line toggle1" : "line"} id="line1"></div>
                        <div className={this.props.slideNav ? "line toggle2" : "line"} id="line2"></div>
                        <div className={this.props.slideNav ? "line toggle3" : "line"} id="line3"></div>
                    </div>
                </div>
                <div id="nav-slider" className={this.props.slideNav ? "slide-in" : "slide-out"}>
                    <ul id="saved-list">
                        <li id="no-saved-msg" className={locations.length === 0 ? "show" : "hide"}>
                            <p>No saved locations</p>
                        </li>
                        {locations.map((location, index) => {
                            return <li
                                key={index}
                                className="location"
                                id={location.city}
                                onClick={this.locationSelection.bind(this)}
                            >
                                <p className="city">{location.city}</p>
                                <i className={renderConditionIcon(location.description)}></i>
                                <p className="temp">{location.temp}&deg;F</p>
                            </li>
                        })}
                    </ul>
                </div>
            </nav>
        );
    };
};

export default Nav;