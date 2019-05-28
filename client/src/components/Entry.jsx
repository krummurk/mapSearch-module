import React from 'react';
import ReactDOM from 'react-dom'
import styled from 'styled-components';
import $ from 'jquery';
import faker from 'faker';

const Block = styled.div`
  height: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0.5rem;
`;


const BlockItem = styled.span`
    margin-right: 0.25rem;
    color: grey;
    font-weight: bold;
    align-self: center;

`
const BlockText = styled.span`
    color: grey;
    font: 15px/24px ;
    letter-spacing: .013em;
    margin-right: 0.25rem;
`

const BlackText = styled.span`
    color: black;
    font: 14px ;
    letter-spacing: .061em;
    margin-right: 0.25rem;
    font-weight: 200;

`
const ZagatImage = styled.img`
    width: 20px;
    height: 20px;
    border: white 0px;
    padding-right: 4px;
    align-self: center;

`
const Flexcolumn = styled.div`
  width: ${(props) => props.size / 2 * 100}vw;
  margin-left: 1rem;
  margin-right: 1rem;
  display: flex;
  flex-direction: column
`
const Image = styled.img`
    margin-right: 0.25rem;
    background:url('${props=> props.img}');
    alt: "Grapefruit slice atop a pile of other slices" ;
    width: 300px;
    height: 400px;
`

const Content = styled.img`
    display:flex;
    flex-direaction: column;
    // background-image: url('http://lorempixel.com/640/640/food?random=${Date.now()*Date.now()}');
    width: 100%;
    height: 100%;
`;
    // "url('${faker.image.food()}')";
    // src: url(${faker.image.food()}) ;

const Wrapper = styled.div`
    padding: 1rem;
    border-bottom: 1px solid #d8d9db;
    border-top: 1px solid #d8d9db;
    display: flex;
    height: 40vh;
    flex-direction: row;
    font: 14px solid grey;
`

const Title = styled.div`
    color: #101820;
    font: 22px/28px ;
    letter-spacing: .086em;
    text-transform: uppercase;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0.1rem;
    font-weight:bold
`

const Description = styled.div`
    color: #101820;
    font: 15px/20px ;
    letter-spacing: .013em;
    padding: 0.5rem;
    border-top: 1px solid grey;
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
            inline: 'start',
          });
    }

    componentDidUpdate(){
        if (this.props.currentIndex){
            console.log(this.props.currentIndex);
            this.scrollToMyRef();
        }
    }
 
    render(){
        var  {name, description, neighborhood,cuisine, priceLevel, foodR, decorR, serivceR, foodUrl} = this.props.entry;
        var priceLevel = priceLevel? String(new Array(priceLevel).fill("$").join('')) : ""
        var dot = priceLevel? "·" : ""
        var randomSize = Math.floor(Math.random()*10);
        return (
            <Wrapper ref={this.myRef} >
                <Flexcolumn size={1}>
                {/* <Content src={"https://picsum.photos/30" + Math.floor(Math.random()*10)}/> */}
                    <Content src={foodUrl[0]}/>
                </Flexcolumn>
                <Flexcolumn size={1}>
                <Title> {name} </Title>
                <Block>
                    <BlockText>{cuisine} </BlockText> <BlockItem> · </BlockItem> 
                    <BlockText>{neighborhood} </BlockText> <BlockItem>{dot} </BlockItem> 
                    <BlockText>{ priceLevel  } </BlockText> 
                </Block>
                <Block>
                    <ZagatImage src='https://www.zagat.com/assets/img/z-logo-icon-red.svg'/>
                    <BlackText> FOOD {foodR} </BlackText> <BlockItem> · </BlockItem> 
                    <BlackText> DECOR {decorR}  </BlackText> <BlockItem> · </BlockItem> 
                    <BlackText> SERVICE{ serivceR  }  </BlackText> 
                </Block>

                <Description>{description.split(' ').slice(0,50).join(' ')} </Description>
                </Flexcolumn>
            </Wrapper>
        );
    }
}
export default Entry;