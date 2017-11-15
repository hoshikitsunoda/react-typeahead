import React, { Component } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'

class SearchBar extends React.Component {
  render() {
    return (
      <input type="text" placeholder="search" />
    )
  }
}

render(<SearchBar />, document.querySelector('#app'))
