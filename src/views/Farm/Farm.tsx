import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import useBao from '../../hooks/useBao'
import { getMasterChefContract } from '../../bao/utils'
import { getContract } from '../../utils/erc20'
import Harvest from './components/Harvest'
import {PoolType} from '../../contexts/Farms/types';
import Stake from './components/Stake'

const Farm: React.FC = () => {
	const { farmId } = useParams()
	const {
		pid,
		lpToken,
		lpTokenAddress,
		tokenAddress,
		earnToken,
		name,
		icon,
		refUrl,
		poolType
	} = useFarm(farmId) || {
		pid: 0,
		lpToken: '',
		lpTokenAddress: '',
		tokenAddress: '',
		earnToken: '',
		name: '',
		icon: '',
		refUrl: '',
		poolType: PoolType.UNI,
	}

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const bao = useBao()
	const { ethereum } = useWallet()

	const lpContract = useMemo(() => {
		return getContract(ethereum as provider, lpTokenAddress)
	}, [ethereum, lpTokenAddress])

	const { onRedeem } = useRedeem(getMasterChefContract(bao))

	const lpTokenName = useMemo(() => {
		return lpToken.toUpperCase()
	}, [lpToken])

	const earnTokenName = useMemo(() => {
		return earnToken.toUpperCase()
	}, [earnToken])

	return (
		<>
			<PageHeader
				icon={icon}
				subtitle={`Deposit ${lpTokenName}  Tokens and earn BAO`}
				title={name}
			/>
			<StyledFarm>
				<StyledCardsWrapper>
					<StyledCardWrapper>
						<Harvest pid={pid} />
					</StyledCardWrapper>
					<Spacer />
					<StyledCardWrapper>
						<Stake
							lpContract={lpContract}
							pid={pid}
							tokenName={lpToken.toUpperCase()}
							poolType={poolType}
						/>
					</StyledCardWrapper>
				</StyledCardsWrapper>
				<Spacer size="lg" />
				<StyledInfo>
					⭐️ Every time you stake and unstake LP tokens, the contract will
					automagically harvest BAO rewards for you!
				</StyledInfo>
				<Spacer size="lg" />
			</StyledFarm>
		</>
	)
}

const StyledFarm = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 100%;
	}
`

const StyledCardsWrapper = styled.div`
	display: flex;
	width: 600px;
	@media (max-width: 768px) {
		width: 100%;
		flex-flow: column nowrap;
		align-items: center;
	}
`

const StyledCardWrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 80%;
	}
`

const StyledInfo = styled.h3`
	color: ${(props) => props.theme.color.grey[400]};
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
`

export default Farm
