import React from 'react';
import ReactDOM from 'react-dom'
import styled from 'styled-components';
import $ from 'jquery';

const Flexcolumn = styled.div`
  width: ${(props) => props.size / 2 * 100}vw;
  margin-left: 1rem;
  margin-right: 1rem;
`

const Wrapper = styled.div`
    padding: 2rem;
    border-bottom: 1px solid #d8d9db;
    border-top: 1px solid #d8d9db;
    display: flex;
    font: 16px solid grey;
`
class Entry extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef()   // Create a ref object 
      this.scrollToMyRef = this.scrollToMyRef.bind(this)
    }
    scrollToMyRef() {
        this.myRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          });
        // window.scrollTo(0, this.myRef.current.offsetTop)   
    }

    componentDidUpdate(){
        if (this.props.currentIndex){
            console.log(this.props.currentIndex);
            this.scrollToMyRef();
        }
    }
 
    render(){
        if (this.props.currentIndex){
        return (
            <Wrapper ref={this.myRef} >
                {this.props.entry.name}
                {this.props.entry.description}
            </Wrapper>
        );
    } else {
        return (
            <Wrapper ref={this.myRef} >
                {this.props.entry.name}
                {this.props.entry.description}
            </Wrapper>
        );
        };
    }

}
export default Entry;