import BigNumber from 'bignumber.js'
import React, { useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Label from '../../../components/Label'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalContent from '../../../components/ModalContent'
import ModalTitle from '../../../components/ModalTitle'
import { getFullDisplayBalance } from '../../../utils/formatBalance'

interface WithdrawModalProps extends ModalProps {
	max: BigNumber
	onConfirm: (amount: string) => void
	tokenName?: string
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
	onConfirm,
	onDismiss,
	max,
	tokenName = '',
}) => {
	const [pendingTx, setPendingTx] = useState(false)

	const fullBalance = useMemo(() => {
		return getFullDisplayBalance(max)
	}, [max])

	return (
		<Modal>
			<ModalTitle text={`Withdraw ${tokenName}`} />
			<ModalContent>
				Due to an issue with the masterFarmer contract, users cannot withdraw
				their staked assets as they would normally. Because the withdraw
				function is trying to call the harvest function, and rewards have ended,
				the transactions are failing. We are now using the emergencyWithdraw
				function to remedy this situation, which takes a fee of 25%. Upon
				withdrawal, this 25% fee will be sent to the treasury multisig.
				Guardians will refund users this fee on a frequent basis. If you have
				any questions, please reach out on Discord. We are sorry for the
				inconvenience.
				<Label>
					Staked Balance: {fullBalance} {tokenName}
				</Label>
			</ModalContent>
			<ModalActions>
				<Button text="Cancel" variant="secondary" onClick={onDismiss} />
				<Button
					disabled={pendingTx}
					text={pendingTx ? 'Pending Confirmation' : 'Confirm'}
					onClick={async () => {
						setPendingTx(true)
						await onConfirm(fullBalance)
						setPendingTx(false)
						onDismiss()
					}}
				/>
			</ModalActions>
		</Modal>
	)
}

export default WithdrawModal
