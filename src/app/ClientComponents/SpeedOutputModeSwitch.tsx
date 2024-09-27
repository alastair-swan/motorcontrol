"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// FG_ON
export function SpeedOutputModeSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const [value, setValue] = useState<boolean>(RegisterList.FG_ON.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.FG_ON.command) === 1
                    const updatedState = state
                    updatedState.FG_ON = result
                    setValue(result)
                    setState(updatedState)  
                }
                catch (error){
                    console.error('FG_ON failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    const switchText = () => {
        if (!state.FG_ON){
            return "FG stops without speed control command"
        }
        return "FG stops without speed control command"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        const updatedState = state
                        updatedState.FG_ON = checked
                        setValue(checked)
                        setState(updatedState)  
                        UpdateParam(motorNumber, RegisterList.FG_ON.command, checked)
                    }}
                />
                { switchText () }
            </Box>
        </Grid2>
    )
}