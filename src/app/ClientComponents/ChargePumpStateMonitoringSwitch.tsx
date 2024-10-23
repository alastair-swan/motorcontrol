"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Switch } from '@mui/material'
import { componentStyle, warningStateColor } from "../UIStyle"
import { VCP_MASK } from "./Register"

// VCP_MASK
export function ChargePumpStateMonitoringSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    return (
        <Box sx={ frameStyle }>
            <Switch 
                checked={ state.VCP_MASK }
                onChange={ (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        VCP_MASK: checked
                    })
                    UpdateParam(motorNumber, VCP_MASK, checked)
                } }
            /> 
            Charge Pump Monitoring: {state.VCP_MASK ? <span style={{color: warningStateColor}}>Not Monitored</span> : "Enabled"}
        </Box>
    )
}