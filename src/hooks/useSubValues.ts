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

const useSubValues = () => {
  const { account }: { account: string } = useWallet()
  const bao = useBao()
  //const wethPriceContract = getWethPriceContract(bao)
  //const baoPriceContract = getBaoPriceContract(bao)
  const locks = useLockedEarnings()
  const [usrSubText, setUsrSubText] = useState(new String())
  const [baoPrices, setBaoPrices] = useState(new BigNumber(0))
  const [wethPrices, setWethPrices] = useState(new BigNumber(0))

  const getInfo = useCallback(async () => {
    if (bao) {
      const wethPriceFun = getWethPrice(bao).then((response) => {
        setWethPrices(response)

        const baoPriceFun = getBaoPrice(bao).then((response) => {
          setBaoPrices(response)
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
          const usrSubText =
            'When this unlocks it will earn you $' +
            dailyPrice +
            ' per day for 3 years. The equivalent of $' +
            annualPrice +
            ' per year!'
          setUsrSubText(usrSubText)
        })
      })
    }
  }, [locks, usrSubText])

  useEffect(() => {
    if (account && bao) {
      getInfo()
    }
  }, [account, bao, locks, usrSubText])

  return usrSubText.toString()
}

export default useSubValues
