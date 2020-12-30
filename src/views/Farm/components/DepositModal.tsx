import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import ModalContent from '../../../components/ModalContent'
import TokenInput from '../../../components/TokenInput'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import styled from 'styled-components'

interface DepositModalProps extends ModalProps {
	max: BigNumber
	onConfirm: (amount: string) => void
	tokenName?: string
}

const DepositModal: React.FC<DepositModalProps> = ({
	max,
	onConfirm,
	onDismiss,
	tokenName = '',
}) => {
	const [val, setVal] = useState('')
	const [pendingTx, setPendingTx] = useState(false)

	const fullBalance = useMemo(() => {
		return getFullDisplayBalance(max)
	}, [max])

	const handleChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			setVal(e.currentTarget.value)
		},
		[setVal],
	)

	const handleSelectMax = useCallback(() => {
		setVal(fullBalance)
	}, [fullBalance, setVal])

	return (
		<Modal>
			<ModalTitle text={`Deposit ${tokenName} Tokens`} />
			<TokenInput
				value={val}
				onSelectMax={handleSelectMax}
				onChange={handleChange}
				max={fullBalance}
				symbol={tokenName}
			/>
			<ModalActions>
				<Button text="Cancel" variant="secondary" onClick={onDismiss} />
				<Button
					disabled={pendingTx}
					text={pendingTx ? 'Pending Confirmation' : 'Confirm'}
					onClick={async () => {
						setPendingTx(true)
						await onConfirm(val)
						setPendingTx(false)
						onDismiss()
					}}
				/>
			</ModalActions>
			<ModalContent>
				{
					"Remember a 0.75% fee will be added to the treasury when depositing but you'll earn the APY to offset it."
				}
			</ModalContent>
		</Modal>
	)
}

export default DepositModal
