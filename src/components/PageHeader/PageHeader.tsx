import React from 'react'
import styled from 'styled-components'
import Container from '../Container'

interface PageHeaderProps {
	icon: any
	subtitle?: string
	title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
	const titletext = title.toString()
	if (titletext.toString() == 'BaoChef is Ready') {
		return (
			<Container size="sm">
				<StyledPageHeader>
					<StyledIcon>
						<img src={icon} alt="" height="130" />
					</StyledIcon>
					<StyledTitle>{title}</StyledTitle>
					<StyledSubtitle>{subtitle}</StyledSubtitle>
				</StyledPageHeader>
			</Container>
		)
	} else if (titletext.toString() == 'Select Your Fav Dim Sum Entrees!') {
		return (
			<Container size="sm">
				<StyledPageHeader>
					<StyledIcon>
						<img src={icon} height="125" />
					</StyledIcon>
					<StyledTitle>{title}</StyledTitle>
					<StyledSubtitle>{subtitle}</StyledSubtitle>
					<StyledSubtitle>
						<br />
						<br />
						Tip: Using the "Buy" button will take you to exchanges via the Bao
						affiliate links. 100% of the revenue from these goes back to the Bao
						treasury which Bao holders own. <br />
						Using these links grows your bags!
					</StyledSubtitle>
				</StyledPageHeader>
			</Container>
		)
	} else {
		return (
			<Container size="sm">
				<StyledPageHeader>
					<StyledIcon>
						<img src={icon} height="125" />
					</StyledIcon>
					<StyledTitle>{title}</StyledTitle>
					<StyledSubtitle>{subtitle}</StyledSubtitle>
				</StyledPageHeader>
			</Container>
		)
	}
}

const StyledPageHeader = styled.div`
	align-items: center;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	padding-bottom: ${(props) => props.theme.spacing[6]}px;
	padding-top: ${(props) => props.theme.spacing[6]}px;
	margin: 0 auto;
`

const StyledIcon = styled.div`
	font-size: 120px;
	height: 120px;
	line-height: 120px;
	text-align: center;
`

const StyledTitle = styled.h1`
	font-family: 'Kaushan Script', sans-serif;
	color: ${(props) => props.theme.color.grey[600]};
	font-size: 36px;
	font-weight: 700;
	margin: 0;
	padding: 0;
`

const StyledSubtitle = styled.h3`
	color: ${(props) => props.theme.color.grey[400]};
	font-size: 18px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
`

export default PageHeader
