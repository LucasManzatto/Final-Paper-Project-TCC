import { updateBlockData } from "../components/MainPage/actions"
import { shiftArray } from "../components/MainPage/utils"
import { useRef, useState, useEffect } from "react"
import usePrevious from './UsePrevious'
import { useDispatch } from 'react-redux'


const useAnimation = (block, createDataArray, createDataArrayArgs, updateOnChanges) => {
  const requestRef = useRef()
  const wasPaused = usePrevious(block.paused)
  const [data, setData] = useState([])
  const [firstRender, setFirstRender] = useState(true)
  const dispatch = useDispatch()

  const animate = paused => {
    if (!paused) {
      setData(prevData => shiftArray(prevData))
      requestRef.current = requestAnimationFrame(() => animate(paused))
    }
    else {
      cancelAnimationFrame(requestRef.current)
    }
  }

  useEffect(() => {
    if (block.paused === wasPaused || firstRender) {
      const newData = createDataArray(...createDataArrayArgs)
      setData(newData)
      dispatch(updateBlockData({ id: block.id, data: newData }))
      setFirstRender(false)
    }
    requestRef.current = requestAnimationFrame(() => animate(block.paused))
    return () => cancelAnimationFrame(requestRef.current)
  }, [...updateOnChanges, block.paused])

  return data
}
export default useAnimation