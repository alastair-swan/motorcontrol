"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// ISD_MASK
export function OverCurrentDetectionSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const [value, setValue] = useState<boolean>(RegisterList.ISD_MASK.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.ISD_MASK.command) === 1
                    const updatedState = state
                    updatedState.ISD_MASK = result
                    setValue(result)
                    setState(updatedState)  
                }
                catch (error){
                    console.error('ISD_MASK failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )
    const switchText = () => { return state.ISD_MASK ? "Disabled" : "Enabled"}
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        const updatedState = state
                        updatedState.ISD_MASK = checked
                        setValue(checked)
                        setState(updatedState)  
                        UpdateParam(motorNumber, RegisterList.ISD_MASK.command, checked)
                    }}
                />
                Monitor Motor Current: { switchText() }
            </Box>
        </Grid2>
    )
}