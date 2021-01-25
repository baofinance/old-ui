import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getLockedEarned, getBaoContract } from '../bao/utils'
import useBao from './useBao'
import useBlock from './useBlock'

const useLockedEarnings = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const bao = useBao()
  const baoContract = getBaoContract(bao)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getLockedEarned(baoContract, account)
    setBalance(new BigNumber(balance))
  }, [account, baoContract, bao])

  useEffect(() => {
    if (account && baoContract && bao) {
      fetchBalance()
    }
  }, [account, block, baoContract, setBalance, bao])

  return balance
}

export default useLockedEarnings
