"use client"

import { useEffect, useState } from "react"
import { asPercentage } from "./helper"
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'
import { sliderComponentProps, RegisterList } from "."

// CHANGEDUTY
export function ChangeDutySlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const [value, setValue] = useState<number>(RegisterList.CHANGEDUTY.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.CHANGEDUTY.command)
                    const updatedState = state
                    updatedState.CHANGEDUTY = result
                    setValue(result)
                    setState(updatedState)
                }
                catch (error){
                    console.error('CHANGEDUTY failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )

    const switchText = () => {
        return value
    }
    const sliderScale = (value: number) => { return ((value * 2)/512) }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Motor Slope Inflection Point: {asPercentage(sliderScale(switchText()))}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={255}
                    step={1}
                    scale={sliderScale}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            const updatedState = state
                            updatedState.CHANGEDUTY = newValue
                            setValue(newValue)
                            setState(updatedState)  
                            UpdateParam(motorNumber, RegisterList.CHANGEDUTY.command, newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        if (value != 0) { 
                            return asPercentage(value)
                        }
                        else { 
                            return "Not Used"
                        }
                    }}
                /> 
            </Box>
        </Grid2>
    )
}