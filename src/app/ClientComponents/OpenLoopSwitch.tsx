"use client"

import { useEffect, useState } from "react"
import { RegisterList } from "../MotorControl"
import { switchComponentProps } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// OPENLOOP
export function OpenLoopSwitch ({ motorNumber, itembgColor, itembgHoverColor }: switchComponentProps){
    const [value, setValue] = useState<boolean>(RegisterList.OPENLOOP.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.OPENLOOP.command) === 1
                    setValue(result)
                }
                catch (error){
                    console.error('OPENLOOP failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    const switchText = () => {
        if (value){
            return "Open"
        }
        return "Closed"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
                <Switch 
                    checked={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setValue(checked)
                        UpdateParam(motorNumber, RegisterList.OPENLOOP.command, checked)
                    }}
                /> 
                {switchText()} Loop Control
            </Box>
        </Grid2>
    )
}