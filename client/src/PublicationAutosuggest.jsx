import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

export default class PublicationAutosuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };
  }

  escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions = (value) => {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === '' || escapedValue.length < 3) {
      return [];
    }

    const regex = new RegExp(escapedValue, 'i');
    return this.props.publications.all.filter(publication => regex.test(publication.name));
  }

  getSuggestionValue = (suggestion) => {
    return suggestion.name;
  }

  renderSuggestion = (suggestion) => {
    return (
      <span>{suggestion.name}</span>
    );
  }

  renderInputComponent = inputProps => (
    <div className='form-group'>
      <label htmlFor='publication'>Publication Name:</label>
      <input className='form-control'
      type='text'
      name='publication'
      {...inputProps}
      />
  </div>
  );

  onChange = (event, { newValue }) => {
    this.props.handleChange(event)
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionSelected = (event, { suggestion }) => {
    this.props.handleChange(event, suggestion.name)
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value)
      this.setState({
        value: this.props.value
      })
  }

  render() {
    const theme = {
  container: {
    position: 'relative'
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 71,
    width: 280,
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
};

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type a publication name...",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        renderInputComponent={this.renderInputComponent}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        theme={theme} />
    );
  }
}
