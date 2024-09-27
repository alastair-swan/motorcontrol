"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// SPEEDSLOP
export function SpeedSlopeSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const [value, setValue] = useState<number>(RegisterList.SPEEDSLOP.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.SPEEDSLOP.command)
                    const updatedState = state
                    updatedState.SPEEDSLOP = result
                    setValue(result)
                    setState(updatedState)  
                }
                catch (error){
                    console.error('SPEEDSLOP failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    const switchText = () => {
        return sliderFormat(sliderScale(state.SPEEDSLOP))
    }
    const sliderScale = (value: number) => { return value * 0.08 }
    const sliderFormat = (value: number) => {
        return Math.round(value * 100) / 100 + " RPM/%"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Speed Slope Below Inflection Point: { switchText() }
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={16383}
                    step={1}
                    scale={sliderScale}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            const updatedState = state
                            updatedState.SPEEDSLOP = newValue
                            setValue(newValue)
                            setState(updatedState)  
                            UpdateParam(motorNumber, RegisterList.SPEEDSLOP.command, newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                /> 
            </Box>
        </Grid2>
    )
}