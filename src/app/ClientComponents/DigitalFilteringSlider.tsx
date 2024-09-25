"use client"

import { useEffect, useState } from "react"
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Slider } from '@mui/material'
import { sliderComponentProps, RegisterList } from "."

// OCPMASK
export function DigitalFilteringSlider ({ motorNumber, itembgColor, itembgHoverColor }: sliderComponentProps){
    const [value, setValue] = useState<number>(RegisterList.OCPMASK.default);
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.OCPMASK.command)
                    setValue(result)
                }
                catch (error){
                    console.error('OCPMASK failed to fetch: ', error)
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
                Current Sense Digital Filtering: {switchText()}
                <Slider 
                    valueLabelDisplay='auto' 
                    value={value}
                    min={0} 
                    max={3}
                    step={1}
                    scale={(value: number) => { return value }}
                    onChange={(event: Event, newValue: number | number[]) => {
                        if (typeof newValue === 'number'){
                            setValue(newValue)
                            UpdateParam(motorNumber, RegisterList.OCPMASK.command, newValue)
                        }
                    }}
                    valueLabelFormat={(value: number) => {
                        const speedList = ['OCP: none, ISD: 83ns', 'OCP: 500ns, ISD: 583ns', 'OCP: 666ns, ISD: 750ns', 'OCP: 750ns, ISD: 833ns']
                        return speedList[value]
                    }}
                /> 
            </Box>
        </Grid2>
    )
}
