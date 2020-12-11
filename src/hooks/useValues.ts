import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import {BigNumber} from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getWethPrice, getBaoPrice, getWethPriceContract, getBaoPriceContract } from '../sushi/utils'
import useLockedEarnings from './useLockedEarnings'
import useSushi from './useSushi'
import useBlock from './useBlock'



const useValues = () => {
   const { account }: { account: string } = useWallet()
   const sushi = useSushi()
   const locks = useLockedEarnings()
   //const wethPriceContract = getWethPriceContract(sushi)
   //const baoPriceContract = getBaoPriceContract(sushi)
   const [usrText, setUsrText] = useState(new String())
   const [baoPrices, setBaoPrices] = useState(new BigNumber(0))
   const [wethPrices, setWethPrices] = useState(new BigNumber(0))
	
const getInfo = useCallback(async () => {
	console.log(sushi)
	if(sushi){
   let wethPriceFun = getWethPrice(sushi).then((response) => {
	setWethPrices(response);
	
	  let baoPriceFun = getBaoPrice(sushi).then((response) => {
	   setBaoPrices(response);
	   	console.log("baovalues")
	console.log(response)
  var currentRate = wethPrices.dividedBy(100000000).dividedBy(baoPrices)
  var userValue = currentRate.multipliedBy(locks.dividedBy(1000000000000000000))
  var dailyPrice = userValue.dividedBy(1095).toFormat(2)
  console.log(dailyPrice + " dailyPrice");
  console.log(wethPrices + " wethprice");
  console.log(baoPrices + " baoPrice");
  var annualPrice = userValue.dividedBy(3).toFormat(2)
  console.log(annualPrice + " annual");
  var wethText = userValue.toFormat(2)
  var usrText1 = "Your Locked BAO is worth $"+wethText+"";
  setUsrText(usrText1);
  console.log(usrText);
   })
})}}, [locks, usrText]);


	useEffect(() => {
	 if(account && sushi) {
		getInfo()
		}
	}, [account, sushi, locks, usrText])
	
return usrText.toString();
}

export default useValues
