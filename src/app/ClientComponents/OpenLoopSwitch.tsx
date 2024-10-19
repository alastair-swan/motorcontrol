"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// OPENLOOP
export function OpenLoopSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const switchText = () => {
        if (state.OPENLOOP){
            return "Open"
        }
        return "Closed"
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingLeft: 2, paddingRight: 2}}>
            <Switch 
                checked={state.OPENLOOP}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        OPENLOOP: checked
                    })  
                    UpdateParam(motorNumber, RegisterList.OPENLOOP.command, checked)
                }}
            /> 
            {switchText()} Loop Control
        </Box>
    )
}