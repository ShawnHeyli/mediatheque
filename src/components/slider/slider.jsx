import React,{useState} from 'react'
import './slider.scss'

export default function Slider({ min, max, startValue, step, callback }) {
    const [value, setValue] = useState(startValue);

    function getBackgroundSize() {
        return {
            backgroundSize: `${((value * 100) / max) - min}% 100%`,
        }
    }

    function handleChange(event) {
        setValue(event.target.value)
    }

    return(
        <div className="slider">
            <input
            className="sliderInput"
            type="range" 
            min={min}
            max={max}
            onChange={handleChange}
            style={getBackgroundSize()}
            value={value}
            step={step}
            onClick={() => callback(value)}
            />
            <div className="sliderValue">
                {value}
            </div>
        </div>
    )
}