import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import { PoolType } from '../../../contexts/Farms/types'
import useEmergencyWithdraw from '../../../hooks/useEmergencyWithdraw'
import useModal from '../../../hooks/useModal'
import useStakedBalance from '../../../hooks/useStakedBalance'
import { getBalanceNumber } from '../../../utils/formatBalance'
import WithdrawModal from './WithdrawModal'

interface StakeProps {
	lpContract: Contract
	pid: number
	tokenName: string
	poolType: PoolType
}

const Stake: React.FC<StakeProps> = ({ pid, tokenName }) => {
	const stakedBalance = useStakedBalance(pid)

	const { onUnstake } = useEmergencyWithdraw(pid)

	const [onPresentWithdraw] = useModal(
		<WithdrawModal
			max={stakedBalance}
			onConfirm={onUnstake}
			tokenName={tokenName}
		/>,
	)

	return (
		<Card>
			<CardContent>
				<StyledCardContentInner>
					<StyledCardHeader>
						<CardIcon>👨🏻‍🍳</CardIcon>
						<Value value={getBalanceNumber(stakedBalance)} />
						<Label text={`${tokenName} Tokens Staked`} />
					</StyledCardHeader>
					<StyledCardActions>
						<Button
							disabled={stakedBalance.eq(new BigNumber(0))}
							text="Unstake"
							onClick={onPresentWithdraw}
						/>
					</StyledCardActions>
				</StyledCardContentInner>
			</CardContent>
		</Card>
	)
}

const StyledCardHeader = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
`
const StyledCardActions = styled.div`
	display: flex;
	justify-content: center;
	margin-top: ${(props) => props.theme.spacing[6]}px;
	width: 100%;
`

const StyledActionSpacer = styled.div`
	height: ${(props) => props.theme.spacing[4]}px;
	width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
`

export default Stake
