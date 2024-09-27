"use client"

import { useEffect, useState } from "react"
import { sliderComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'

// SS_DUTYCHGLIMIT
export function SoftStartSpeedChangeLimitSlider ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: sliderComponentProps){
    const [value, setValue] = useState<number>(RegisterList.SS_DUTYCHGLIMIT.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.SS_DUTYCHGLIMIT.command)
                    const updatedState = state
                    updatedState.SS_DUTYCHGLIMIT = result
                    setValue(result)
                    setState(updatedState)  
                }
                catch (error){
                    console.error('SS_DUTYCHGLIMIT failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    const sliderFormat = (value: number) => {
        return (100 / (RegisterList.SS_DUTYCHGLIMIT.valuemap[value] as number)) + "%/second"
    }
    const sliderText = () => {
        return sliderFormat(state.SS_DUTYCHGLIMIT) + " seconds"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Speed Change Rate during soft start: { sliderText() }
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={7}
                    step={1}
                    scale={(value: number) => { return (value + 1) % 8 }}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            const updatedState = state
                            updatedState.SS_DUTYCHGLIMIT = newValue
                            setValue(newValue)
                            setState(updatedState)  
                            UpdateParam(motorNumber, RegisterList.SS_DUTYCHGLIMIT.command, newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                /> 
            </Box>
        </Grid2>
    )
}