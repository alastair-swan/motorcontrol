"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// VCP_MASK
export function ChargePumpStateMonitoringSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const switchText = () => {
        if (state.VCP_MASK){
            return "Enabled"
        }
        return "Disabled"
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
            <Switch 
                checked={ state.VCP_MASK }
                onChange={ (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        VCP_MASK: checked
                    })
                    UpdateParam(motorNumber, RegisterList.VCP_MASK.command, checked)
                } }
            /> 
            Charge Pump Monitoring: {switchText()}
        </Box>
    )
}