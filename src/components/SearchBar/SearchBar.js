import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "",
            location: "",
            sortBy: "best_match"
        };

        this.sortByOptions = {
            "Best Match": "best_match",
            "Highest Rating": "rating",
            "Most Reviewed": "review_count"
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSortByChange(sortByOption) {
        this.setState({ sortBy: sortByOption });
    }

    handleTermChange(event) {
        const term = event.target.value
        this.setState({ term: term });
        this.props.setBusiness(term);
    }

    handleLocationChange(event) {
        const location = event.target.value;
        this.setState({ location: location });
        this.props.setLocation(location);
    }

    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault(); 
    }

    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return "active";
        }
        return "";
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(key => {
            let sortByOptionValue = this.sortByOptions[key];
            return <li
                className={this.getSortByClass(sortByOptionValue)}
                key={sortByOptionValue}
                onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                {key}</li>
        });
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange={this.handleTermChange} />
                    <input placeholder="Where?" onChange={this.handleLocationChange} />
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch}>Let's Go</a>
                </div>
            </div>
        )
    }
}

export default SearchBar;