import { useEffect, useState } from 'react'
import './Keyboard.css'

export const Keyboard = ({ theKey, setTheKey }) => {

    const [oneSecondKey, setOneSecondKey] = useState(null)

    const keyboard =
        [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']]

    useEffect(() => {
        if (theKey) {
            setOneSecondKey(theKey)
            setTimeout(function () {
                setOneSecondKey(null)
                setTheKey('')
            }, 100);
        }
    }, [theKey, setTheKey])

    return (
        keyboard.map((key) => <div key={key[0]} className="keyboardRow">{key.map((key) => <div className={oneSecondKey === key ? 'key hit' : 'key'} key={key}></div>)}</div>)
    )
}