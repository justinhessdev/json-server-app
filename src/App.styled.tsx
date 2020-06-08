import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    height: 100vh;

    #root {
        height: inherit;
    }
  }
`
export const AppWrapper = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  margin-left: 10em;
`
export const AppHeader = styled.div`
  display: flex;
  flex-direction: column;
  height: 20em;
  justify-content: center;
`
export const UserWrapper = styled.div`
  text-align: left;
`
export const User = styled.div`
  cursor: pointer;
  margin-bottom: 0.5em;
  font-size: 14px;
`
export const UserSpan = styled.span`
  margin-left: 5em;
`
