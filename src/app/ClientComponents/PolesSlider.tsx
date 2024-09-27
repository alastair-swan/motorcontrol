"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// POLEPAIR
export function PolesSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const [value, setValue] = useState<number>(RegisterList.POLEPAIR.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.POLEPAIR.command)
                    const updatedState = state
                    updatedState.POLEPAIR = result
                    setValue(result)
                    setState(updatedState)  
                }
                catch (error){
                    console.error('POLEPAIR failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    const sliderFormat = (value: number) => {
        return (value + 1) * 2 + " Pole Motor"
    }
    const sliderText = () => {
        return sliderFormat(state.POLEPAIR)
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                {sliderText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={7}
                    step={1}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            const updatedState = state
                            updatedState.POLEPAIR = newValue
                            setValue(newValue)
                        setState(updatedState)  
                            UpdateParam(motorNumber, RegisterList.POLEPAIR.command, newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                />
            </Box>
        </Grid2>
    )
}