"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle, warningStateColor } from "../UIStyle"

// VCP_MASK
export function ChargePumpStateMonitoringSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => {
        if (state.VCP_MASK){
            return "Enabled"
        }
        return <span style={{color: warningStateColor}}>Not Monitored</span>
    }
    return (
        <Box sx={ frameStyle }>
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