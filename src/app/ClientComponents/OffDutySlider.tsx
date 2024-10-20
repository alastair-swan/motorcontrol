"use client"

import { sliderComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Slider } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { asPercentage } from "./helper"

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
                min={0} 
                max={127}
                step={1}
                scale={sliderScale}
                onChange={(event: Event, newValue: number | number[]) => {
                    if (typeof newValue === 'number'){
                        setState({
                            ...state,
                            STOPDUTY: newValue
                        })
                        UpdateParam(motorNumber, RegisterList.STOPDUTY.command, newValue)
                    }
                }}
                valueLabelFormat={asPercentage}
            /> 
        </Box>
    )
}
