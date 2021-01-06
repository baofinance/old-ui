import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import { BigNumber } from 'bignumber.js'
import { useWallet } from 'use-wallet'

import {
  getWethPrice,
  getBaoPrice,
  getWethPriceContract,
  getBaoPriceContract,
} from '../bao/utils'
import useLockedEarnings from './useLockedEarnings'
import useBao from './useBao'
import useBlock from './useBlock'

const useValues = () => {
  const { account }: { account: string } = useWallet()
  const sushi = useBao()
  const locks = useLockedEarnings()
  //const wethPriceContract = getWethPriceContract(sushi)
  //const baoPriceContract = getBaoPriceContract(sushi)
  const [usrText, setUsrText] = useState(new String())
  const [baoPrices, setBaoPrices] = useState(new BigNumber(0))
  const [wethPrices, setWethPrices] = useState(new BigNumber(0))

  const getInfo = useCallback(async () => {
    console.log(sushi)
    if (sushi) {
      const wethPriceFun = getWethPrice(sushi).then((response) => {
        setWethPrices(response)

        const baoPriceFun = getBaoPrice(sushi).then((response) => {
          setBaoPrices(response)
          console.log('baovalues')
          console.log(response)
          const currentRate = wethPrices
            .dividedBy(100000000)
            .dividedBy(baoPrices)
          const userValue = currentRate.multipliedBy(
            locks.dividedBy(1000000000000000000),
          )
          const dailyPrice = userValue.dividedBy(1095).toFormat(2)
          console.log(dailyPrice + ' dailyPrice')
          console.log(wethPrices + ' wethprice')
          console.log(baoPrices + ' baoPrice')
          const annualPrice = userValue.dividedBy(3).toFormat(2)
          console.log(annualPrice + ' annual')
          const wethText = userValue.toFormat(2)
          const usrText1 = 'Your Locked BAO is worth $' + wethText + ''
          setUsrText(usrText1)
          console.log(usrText)
        })
      })
    }
  }, [locks, usrText])

  useEffect(() => {
    if (account && sushi) {
      getInfo()
    }
  }, [account, sushi, locks, usrText])

  return usrText.toString()
}

export default useValues
