import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
	return (
		<StyledNav>
			<StyledLink
				target="_blank"
				href="https://etherscan.io/address/0xBD530a1c060DC600b951f16dc656E4EA451d1A2D"
			>
				BaoChef Contract
			</StyledLink>
			<StyledLink
				target="_blank"
				href="https://app.uniswap.org/#/swap?inputCurrency=0x374cb8c27130e2c9e04f44303f3c8351b9de61c1&outputCurrency=ETH"
			>
				Uniswap BAO-ETH
			</StyledLink>
			<StyledLink
				target="_blank"
				href="https://app.sushiswap.fi/pair/0x0eee7f7319013df1f24f5eaf83004fcf9cf49245"
			>
				SushiSwap BAO-ETH
			</StyledLink>
			<StyledLink target="_blank" href="https://discord.gg/BW3P62vJXT">
				Discord
			</StyledLink>
			<StyledLink target="_blank" href="https://twitter.com/thebaoman">
				Twitter
			</StyledLink>
			<StyledLink target="_blank" href="https://thebaoman.medium.com/">
				Medium
			</StyledLink>
		</StyledNav>
	)
}

const StyledNav = styled.nav`
	align-items: center;
	display: flex;
`

const StyledLink = styled.a`
	color: ${(props) => props.theme.color.grey[400]};
	padding-left: ${(props) => props.theme.spacing[3]}px;
	padding-right: ${(props) => props.theme.spacing[3]}px;
	text-decoration: none;
	&:hover {
		color: ${(props) => props.theme.color.grey[500]};
	}
`

export default Nav
