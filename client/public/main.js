import React, { Component } from 'react'
import { render } from 'react-dom'

const show = { display: 'block' }
const hide = { display: 'none' }

class Names extends React.Component {
  render() {
    const filterText = this.props.filterText
    const name = this.props.name
    return (
      <li>{name}</li>
    )
  }
}

class NameTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      names: []
    }
  }

  componentWillMount() {
    fetch('/typeaheadData')
      .then(res => res.json())
      .then(names => this.setState({names}))
  }

  render() {
    const filterText = this.props.filterText
    const rows = []
    this.state.names.forEach(names => {
      if (!names.name.toLowerCase().startsWith(filterText.toLowerCase())) {
        return
      }
      else
      {
        rows.push(
          <Names key={names.name} name={names.name} />
        )
      }
    })
    return (
      <ul style={filterText ? show : hide}>{rows}</ul>
    )
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
  }

  handleFilterTextChange(event) {
    this.props.onFilterTextChange(event.target.value)
  }

  render() {
    const filterText = this.props.filterText
    return (
      <form>
        <input
          type="text"
          placeholder="search"
          value={filterText}
          onChange={this.handleFilterTextChange}
        />
      </form>
    )
  }
}

class FilterableNameTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterText: ''
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <NameTable filterText={this.state.filterText} />
      </div>
    )
  }
}

render(<FilterableNameTable />, document.querySelector('#app'))
