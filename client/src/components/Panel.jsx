import React from 'react';
import ReactDOM from 'react-dom'
import styled from 'styled-components';
import $ from 'jquery';
import Entry from './Entry.jsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.section`
  padding: 0.75rem;
  // border-bottom: 1px solid #d8d9db;
  margin: 0 0 0.25rem;
`;
class Panel extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      var items = this.props.data.map( (i,idx)=> {
        if (this.props.currentIndex === idx) {
          return <Entry entry = {i} name= {idx.toString()} key = {idx.toString()} currentIndex={true}/>
        } else {
          return <Entry entry = {i} name= {idx.toString()} key = {idx.toString()} currentIndex={false}/>
        }
      })
      return (
        <Container>
          <Wrapper>
            {items}
          </Wrapper>
        </Container>
      )
    }
  }

export default Panel;