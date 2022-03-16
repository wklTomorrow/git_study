import {useLayoutEffect, useRef, useState} from 'react'

function useDrapDrop() {
    const currentDom = useRef(null)

    const lastOffset = useRef({
        x: 0,
        y: 0,
        X: 0,
        Y: 0
    })
    const [, forceUpdate] = useState(null)

    const [ontouchstart, ontouchmove, ontouchend] = useMemo(() => {
        const currentOffset = {}

        const ontouchstart = (e) => {
            const target = e.targetTouches[0]
            currentOffset.X = target.clientX
            currentOffset.Y = target.clientY
        }

        const ontouchmove = (e) => {
            const target = e.targetTouches[0]
            let x = target.clientX + lastOffset.X - currentOffset.X
            let y = target.clientY + lastOffset.Y - currentOffset.Y
            lastOffset.current.x = x
            lastOffset.current.y = y
            forceUpdate({
                x, y
            })
        }

        const ontouchend = (e) => {
            lastOffset.current.X = lastOffset.current.x
            lastOffset.current.Y = lastOffset.current.y
        }

        return [ontouchstart, ontouchmove, ontouchend]
    })

    useLayoutEffect(() => {
        const dom = currentDom.current
        dom.ontouchstart = ontouchstart
        dom.ontouchmove = ontouchmove
        dom.ontouchend = ontouchend
    }, [])

    return [{x: lastOffset.current.x, y: lastOffset.current.y}, currentDom]
}