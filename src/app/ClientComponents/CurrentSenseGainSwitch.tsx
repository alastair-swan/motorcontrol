"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// OCP_LVL
export function CurrentSenseGainSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const [value, setValue] = useState<boolean>(RegisterList.OCP_LVL.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.OCP_LVL.command) === 1
                    const updatedState = state
                    updatedState.OCP_LVL = result
                    setValue(result)
                    setState(updatedState)
                }
                catch (error){
                    console.error('OCP_LVL failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        const updatedState = state
                        updatedState.OCP_LVL = checked
                        setValue(checked)
                        setState(updatedState)
                        UpdateParam(motorNumber, RegisterList.OCP_LVL.command, checked)
                    }}
                />
                Current Sense Gain: {state.OCP_LVL? "10" : "20"}
            </Box>
        </Grid2>
    )
}