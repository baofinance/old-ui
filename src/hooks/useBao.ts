import { useContext } from 'react'
import { Context } from '../contexts/BaoProvider'

const useBao = () => {
  const { bao } = useContext(Context)
  return bao
}

export default useBao
