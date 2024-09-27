"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// KI
export function KISlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const [value, setValue] = useState<number>(RegisterList.KI.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.KI.command)
                    const updatedState = state
                    updatedState.KI = result
                    setValue(result)
                    setState(updatedState)
                }
                catch (error){
                    console.error('KI failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    const sliderScale = (value: number) => { return (value * 0.08) }
    const sliderFormat = (value: number) => {
        return value.toFixed(2)
    }
    const switchText = () => {
        return sliderFormat(sliderScale(state.KI))
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                I coefficient: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={127}
                    step={1}
                    scale={sliderScale}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            const updatedState = state
                            updatedState.KI = newValue
                            setValue(newValue)
                            setState(updatedState)
                            UpdateParam(motorNumber, RegisterList.KI.command, newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                />
            </Box>
        </Grid2>
    )
}