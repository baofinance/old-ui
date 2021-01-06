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
  const sushi = useBao()
  const sushiContract = getBaoContract(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getLockedEarned(sushiContract, account)
    setBalance(new BigNumber(balance))
  }, [account, sushiContract, sushi])

  useEffect(() => {
    if (account && sushiContract && sushi) {
      fetchBalance()
    }
  }, [account, block, sushiContract, setBalance, sushi])

  return balance
}

export default useLockedEarnings
