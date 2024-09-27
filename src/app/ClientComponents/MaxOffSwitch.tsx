"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// MAXOFF
export function MaxOffSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const [value, setValue] = useState<boolean>(RegisterList.MAXOFF.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.MAXOFF.command) === 1
                    const updatedState = state                    
                    updatedState.MAXOFF = result
                    setValue(result)
                    setState(updatedState)  
                }
                catch (error){
                    console.error('MAXOFF failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    const switchText = () => {
        if (!state.MAXOFF){
            return "Off above Max Duty"
        }
        return "On above Max Duty"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingRight: 2}}>
                <Switch 
                    checked={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        const updatedState = state                    
                        updatedState.MAXOFF = checked
                        setValue(checked)
                        setState(updatedState)  
                        UpdateParam(motorNumber, RegisterList.MAXOFF.command, checked)
                    }}
                />
                {switchText()}
            </Box>
        </Grid2>
    )
}