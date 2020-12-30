import BigNumber from 'bignumber.js'
import React, { useEffect, useState, Fragment } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import SushiIcon from '../../../components/SushiIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useSushi from '../../../hooks/useSushi'
import {
	getSushiAddress,
	getSushiSupply,
	getReferrals,
	getMasterChefContract,
} from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'

const PendingRewards: React.FC = () => {
	const [start, setStart] = useState(0)
	const [end, setEnd] = useState(0)
	const [scale, setScale] = useState(1)

	const allEarnings = useAllEarnings()
	let sumEarning = 0
	for (const earning of allEarnings) {
		sumEarning += new BigNumber(earning)
			.div(new BigNumber(10).pow(18))
			.toNumber()
	}

	const [farms] = useFarms()
	const allStakedValue = useAllStakedValue()

	if (allStakedValue && allStakedValue.length) {
		const sumWeth = farms.reduce(
			(c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
			0,
		)
	}

	useEffect(() => {
		setStart(end)
		setEnd(sumEarning)
	}, [sumEarning])

	return (
		<span
			style={{
				transform: `scale(${scale})`,
				transformOrigin: 'right bottom',
				transition: 'transform 0.5s',
				display: 'inline-block',
			}}
		>
			<CountUp
				start={start}
				end={end}
				decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
				duration={1}
				onStart={() => {
					setScale(1.25)
					setTimeout(() => setScale(1), 600)
				}}
				separator=","
			/>
		</span>
	)
}

const Balances: React.FC = () => {
	const [totalSupply, setTotalSupply] = useState<BigNumber>()
	const [totalReferrals, setTotalReferrals] = useState<string>()
	const [refLink, setRefLink] = useState<string>()
	const sushi = useSushi()
	const sushiBalance = useTokenBalance(getSushiAddress(sushi))
	const masterChefContract = getMasterChefContract(sushi)
	const { account, ethereum }: { account: any; ethereum: any } = useWallet()

	useEffect(() => {
		async function fetchTotalSupply() {
			const supply = await getSushiSupply(sushi)
			setTotalSupply(supply)
		}
		if (sushi) {
			fetchTotalSupply()
		}
	}, [sushi, setTotalSupply])

	useEffect(() => {
		async function fetchTotalReferrals() {
			const referrals = await getReferrals(masterChefContract, account)
			setTotalReferrals(referrals)
		}
		if (sushi) {
			fetchTotalReferrals()
		}
	}, [sushi, setTotalReferrals])

	useEffect(() => {
		async function fetchRefLink() {
			const usrReflink = 'www.bao.finance?ref=' + account
			setRefLink(usrReflink)
		}
		if (sushi) {
			fetchRefLink()
		}
	}, [sushi, setRefLink])

	return (
		<Fragment>
			<StyledWrapper>
				<Card>
					<CardContent>
						<StyledBalances>
							<StyledBalance>
								<SushiIcon />
								<Spacer />
								<div style={{ flex: 1 }}>
									<Label text="Your BAO Balance" />
									<Value
										value={account ? getBalanceNumber(sushiBalance) : 'Locked'}
									/>
								</div>
							</StyledBalance>
						</StyledBalances>
					</CardContent>
					<Footnote>
						Pending harvest
						<FootnoteValue>
							<PendingRewards /> BAO
						</FootnoteValue>
					</Footnote>
				</Card>
				<Spacer />

				<Card>
					<CardContent>
						<Label text="Total BAO Supply" />
						<Value
							value={totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}
						/>
					</CardContent>
					<Footnote>
						New rewards per block
						<FootnoteValue>1,000 BAO</FootnoteValue>
					</Footnote>
				</Card>
			</StyledWrapper>
			<Spacer />
			<Spacer />
			<StyledWrapper>
				<Card>
					<CardContent>
						<Label
							text="Your Referral Link:
		  "
						/>
						<Label text={account ? refLink : ''} />
						<br />
						<Label
							text="
		  Your Referrals:
		  "
						/>
						<Label text={account ? totalReferrals : 'Referrals'} />
					</CardContent>
					<Footnote>
						Earn future rewards from referrals
						<FootnoteValue></FootnoteValue>
					</Footnote>
				</Card>
			</StyledWrapper>
		</Fragment>
	)
}

const Footnote = styled.div`
	font-size: 14px;
	padding: 8px 20px;
	color: ${(props) => props.theme.color.grey[400]};
	border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
	font-family: 'Roboto Mono', monospace;
	float: right;
`

const StyledWrapper = styled.div`
	align-items: center;
	display: flex;
	@media (max-width: 768px) {
		width: 100%;
		flex-flow: column nowrap;
		align-items: stretch;
	}
`

const StyledBalances = styled.div`
	display: flex;
`

const StyledBalance = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
`

export default Balances
