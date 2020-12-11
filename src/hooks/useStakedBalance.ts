import { useCallback, useEffect, useState } from 'react'

import {BigNumber} from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'
import { ethers } from 'ethers'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const sushi = useSushi()
  const masterChefContract = getMasterChefContract(sushi)
  const block = useBlock()
  var userBalance;

  const fetchBalance = useCallback(async () => {
	BigNumber.config({ DECIMAL_PLACES: 18 })
    const balance = await getStaked(masterChefContract, pid, account)
	userBalance = new BigNumber(balance)
    setBalance(userBalance.decimalPlaces(18))
  }, [account, pid, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, sushi])

  return balance.decimalPlaces(18)
}

export default useStakedBalance