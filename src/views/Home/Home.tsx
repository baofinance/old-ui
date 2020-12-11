import React from 'react'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

const Home: React.FC = () => {
  return (
    <Page>
      <PageHeader
		icon={chef.toString()}
        title="BaoChef is Ready"
        subtitle="Stake Uniswap LP tokens and earn BAO!"
      />
       <StyledInfo>
	   Be sure to read <a href="https://docs.bao.finance">docs.bao.finance</a> before using the pools so you are familiar with protocol risks and fees.!
	   </StyledInfo>
	   <Spacer size="md" />
      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
	        <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text="🔪 See the Menu" to="/farms" variant="secondary" />
      </div>
	  <Spacer size="lg" />
      <StyledInfo>
        🏆<b>Pro Tip</b>: BAO-ETH UNI-V2 LP token pool yields 32x more tokens than other pairs.
      </StyledInfo>
	    <Spacer size="md" />
      <StyledInfo>
        💲<b>Pro Tip</b>: The affiliate links from the "Buy X" buttons generate revenue for the Bao Treasury which Bao holders own. <br/>
		Even if you already trade at these exchanges consider creating a new account to help grow the protocol.
      </StyledInfo>
	   <Spacer size="md" />
      <StyledInfo>
        ❗️<b>Disclaimer</b>: Bao is currently in alpha and has a one-person engineering team. <br/>
		While we are scaling, there may be higher than normal risk of bugs and we may be slower in being able to respond to them.<br/>Please partake accordingly.<br/>The service is provided as-is.
      </StyledInfo>

      
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

export default Home
