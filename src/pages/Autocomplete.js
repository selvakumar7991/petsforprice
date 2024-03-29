import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from 'axios';

class Autocomplete extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      suggestions: [],
      city:''
    };
  }


  
  onChange = async e => {

    const value = e.target.value;

    this.props.citySetState(value);
  
    this.setState({
      city:value,
      suggestions: []
    });
 
    if(value.length>=3){
    const response = await axios.get("/api/countrysearch/"+value);

    response.data.map((val,key)=>{
      this.setState({
        
      
       suggestions: this.state.suggestions.concat([val.cities[0].name]+", "+[val.name]+" ,"+[val.country_name])
      });

      
      // return (
      //    <li><label onClick={()=>{this.handleSearchChange(val.cities[0].name+", "+val.name+" ,"+val.country_name)}}>{val.cities[0].name+", "+val.name+" ,"+val.country_name}</label></li>
      // );
      
     })


   
    
    } else {
      this.setState({
        suggestions: []
      });
    }

   

    //console.log(this.state.filteredSuggestions)
  

    // const { suggestions } = this.props;
    const userInput = value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = this.state.suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,filteredSuggestions,
      showSuggestions: true,
      userInput: value
    });
  };


  onClick = e => {
    this.props.citySetState(e.currentTarget.innerText);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          className="form-control text-truncate"
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;
