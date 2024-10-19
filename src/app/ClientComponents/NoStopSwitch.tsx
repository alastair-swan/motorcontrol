"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// NOSTOP
export function NoStopSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const switchText = () => {
        if (!state.NOSTOP){
            return "Full Speed below StopDuty"
        }
        return "Off below StopDuty"
    }
    return (                                    
        <Box sx={{ justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingRight: 2}}>
            <Switch 
                checked={ state.NOSTOP }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        NOSTOP: checked
                    })
                    UpdateParam(motorNumber, RegisterList.NOSTOP.command, checked)
                }}
            /> 
            {
                switchText()    
            }
        </Box>
    )
}