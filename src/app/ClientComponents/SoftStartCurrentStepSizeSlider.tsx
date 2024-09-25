"use client"

import { useEffect, useState } from "react"
import { RegisterList } from "../MotorControl"
import { sliderComponentWithVOCProps } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'
import { shuntResistor } from "./helper"

// SS_UP_SEL
export function SoftStartCurrentStepSizeSlider ({ motorNumber, itembgColor, itembgHoverColor, VOC }: sliderComponentWithVOCProps){
    const [value, setValue] = useState<number>(RegisterList.SS_UP_SEL.default);
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.SS_UP_SEL.command)
                    setValue(result)
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
            const stepValues = [0.01, 0.02, 0.05, 0.10] as number[]
            return ((typeof(stepValues[index]) === 'number') ? stepValues[index] : 0) as number
        }
        return steps(value) * (VOC / shuntResistor) 
    }
    const sliderFormat = (value: number) => { return value.toFixed(1) + ' Amps' }
    const switchText = () => {
        return sliderFormat(sliderScale(value))
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
                            setValue(newValue)
                            UpdateParam(motorNumber, RegisterList.SS_UP_SEL.command, newValue)
                        }
                    }}
                    valueLabelFormat={sliderFormat}
                /> 
            </Box>
        </Grid2>
    )
}