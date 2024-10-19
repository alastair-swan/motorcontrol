"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// OCP_LVL
export function CurrentSenseGainSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
            <Switch  
                checked={state.OCP_LVL}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        OCP_LVL: checked
                    })
                    UpdateParam(motorNumber, RegisterList.OCP_LVL.command, checked)
                }}
            />
            Current Sense Gain: {state.OCP_LVL? "10" : "20"}
        </Box>
    )
}