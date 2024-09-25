"use client"

import { useEffect, useState } from "react"
import { RegisterList } from "../MotorControl"
import { sliderComponentWithVOCProps } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'
import { shuntResistor } from "./helper"

// STARTCURRENT
export function StartupCurrentLimitSlider ({ motorNumber, itembgColor, itembgHoverColor, VOC }: sliderComponentWithVOCProps){
    const [value, setValue] = useState<number>(RegisterList.STARTCURRENT.default);

    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.STARTCURRENT.command)
                    setValue(result)
                }
                catch (error){
                    console.error('STARTCURRENT failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    const switchText = () => {
        return value
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                Startup Current Limit: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={7}
                    step={1}
                    scale={(value: number) => { 
                        return (((8 - value) / 8) * VOC) / shuntResistor; 
                    }}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, RegisterList.STARTCURRENT.command, newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        return value + "A"
                    }}
                /> 
            </Box>
        </Grid2>
    )
}
