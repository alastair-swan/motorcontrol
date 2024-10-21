"use client"

import { sliderComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { asPercentage } from "./helper"
import { STOPDUTY } from "./Register"

// STOPDUTY
export function OffDutySlider ({ motorNumber, state, setState, frameStyle = componentStyle }: sliderComponentProps){
    const switchText = () => {
        return asPercentage(sliderScale(state.STOPDUTY))
    }
    const sliderScale = (value: number) => { return value/256 }
    //const [value, setValue] = useState(0)
    return (
        <Box sx={ frameStyle }>
            Motor Off Input Value: { switchText() }
            <Slider 
                valueLabelDisplay='auto' 
                value={state.STOPDUTY}
                min={ STOPDUTY.min } 
                max={ STOPDUTY.max }
                step={1}
                scale={sliderScale}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            STOPDUTY: newValue
                        })
                        UpdateParam(motorNumber, STOPDUTY, newValue)
                    }
                }}
                valueLabelFormat={asPercentage}
            /> 
        </Box>
    )
}
