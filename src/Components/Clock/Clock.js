import { useEffect } from "react"

export const Clock = ({ clock, setClock, stop, start }) => {


    useEffect(() => {
        if (!stop) {
            if (start) {
                const interval = setInterval(() => {
                    setClock((prevTime) => prevTime - 0.01);
                }, 10);
                return () => clearInterval(interval)
            }
        }
    }, [setClock, stop, start])

    return <div><h1>{!stop ? clock.toFixed(2) : 'Sadly, you lost'}</h1></div>
}