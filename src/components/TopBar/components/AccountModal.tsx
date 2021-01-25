import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useBao from '../../../hooks/useBao'
import { getBaoAddress } from '../../../bao/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
	const { account, reset } = useWallet()

	const handleSignOutClick = useCallback(() => {
		onDismiss!()
		reset()
	}, [onDismiss, reset])

	const bao = useBao()
	const baoBalance = useTokenBalance(getBaoAddress(bao))

	return (
		<Modal>
			<ModalTitle text="My Account" />
			<ModalContent>
				<Spacer />

				<div style={{ display: 'flex' }}>
					<StyledBalanceWrapper>
						<CardIcon>
							<span>🥟</span>
						</CardIcon>
						<StyledBalance>
							<Value value={getBalanceNumber(baoBalance)} />
							<Label text="BAO Balance" />
						</StyledBalance>
					</StyledBalanceWrapper>
				</div>

				<Spacer />
				<Button
					href={`https://etherscan.io/address/${account}`}
					text="View on Etherscan"
					variant="secondary"
				/>
				<Spacer />
				<Button
					onClick={handleSignOutClick}
					text="Sign out"
					variant="secondary"
				/>
			</ModalContent>
			<ModalActions>
				<Button onClick={onDismiss} text="Cancel" />
			</ModalActions>
		</Modal>
	)
}

const StyledBalance = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
