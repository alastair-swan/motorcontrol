"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'
import { shuntResistor } from "./helper"

// SS_UP_SEL
export function SoftStartCurrentStepSizeSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const [value, setValue] = useState<number>(RegisterList.SS_UP_SEL.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.SS_UP_SEL.command)
                    const updatedState = state
                    updatedState.SS_UP_SEL = result
                    setValue(result)
                    setState(updatedState)  
                }
                catch (error){
                    console.error('SS_UP_SEL failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    const sliderScale = (value: number) => {
        const steps = (index: number) : number => { 
            return RegisterList.SS_UP_SEL.valuemap[index] as number
        }
        return steps(value) * ((state.OCP_LVL ? 0.125 : 0.25) / shuntResistor) 
    }
    const sliderFormat = (value: number) => { return value.toFixed(1) + ' Amps' }
    const switchText = () => {
        return sliderFormat(sliderScale(state.SS_UP_SEL))
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Soft Start Current Step Size: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    scale={sliderScale}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            const updatedState = state
                            updatedState.SS_UP_SEL = newValue
                            setValue(newValue)
                            setState(updatedState)  
                            UpdateParam(motorNumber, RegisterList.SS_UP_SEL.command, newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                /> 
            </Box>
        </Grid2>
    )
}