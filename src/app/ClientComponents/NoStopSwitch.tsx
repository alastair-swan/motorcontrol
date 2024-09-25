"use client"

import { useEffect, useState } from "react"
import { RegisterList } from "../MotorControl"
import { switchComponentProps } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// NOSTOP
export function NoStopSwitch ({ motorNumber, itembgColor, itembgHoverColor }: switchComponentProps){
    const [value, setValue] = useState<boolean>(RegisterList.NOSTOP.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.NOSTOP.command) === 1
                    setValue(result)
                }
                catch (error){
                    console.error('NOSTOP failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )

    const switchText = () => {
        if (!value){
            return "Full Speed below StopDuty"
        }
        return "Off below StopDuty"
    }
    return (                                    
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingRight: 2}}>
                <Switch 
                    checked={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(checked)        
                        UpdateParam(motorNumber, RegisterList.NOSTOP.command, checked)
                    }}
                /> 
                {
                    switchText()    
                }
            </Box>
        </Grid2>
    )
}