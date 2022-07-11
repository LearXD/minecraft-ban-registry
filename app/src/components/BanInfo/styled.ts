import styled from "styled-components"

export const BanInfo = styled.div`
  
  display: flex;
  color: white;  
  position: relative;
  padding: 1.4rem;
  border-bottom: 2px solid white;
  margin: 15px 15px;
`

export const Face = styled.div`
  position: relative;    
  height: auto;
  width: auto;
  display: flex;
  margin: 0 15px;
  align-items: center;
  > img {
    width: 7rem;
    height: 7rem;
  }
`

export const Details = styled.div`
  display: block;  
  > div {
    display: flex;
    padding: .30rem;
    height: auto;
    overflow-wrap: normal;
    > span {
      font-weight: bold;
      margin-right: 10px;
      letter-spacing: 2px;
      font-size: 1.2rem;
      ~ p {
        letter-spacing: 1px;      
        font-size: 2.1em;   
        word-break: break-all;
      }
    }    
  }
`

export const Remove = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;  
  > button {
    padding: 12px;
    width: 50%;
    border: none;
    background: none;
    cursor: pointer;  
    color: white;
    font-size: 1.6rem;   
    font-weight: bold;
    border-radius: 20px;
    letter-spacing: 2px;
    transition: .5s;
    &::after {      
      display: block;
      content: '';
      position: absolute;
      height: 2px;
      width: 0;
      background-color: gray;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);      
      transition: .55s ease-in-out;
    } 
    :hover {      
      letter-spacing: 5px;
      &::after {
      width: 100%;
      }   
    }    
  }
`