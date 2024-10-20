"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle, warningStateColor } from "../UIStyle"

// ISD_MASK
export function OverCurrentDetectionSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => { return state.ISD_MASK ? <span style={{color: warningStateColor}}>Disabled</span> : "Enabled"}
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={ state.ISD_MASK }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        ISD_MASK: checked
                    })  
                    UpdateParam(motorNumber, RegisterList.ISD_MASK.command, checked)
                }}
            />
            Monitor Motor Current: { switchText() }
        </Box>
    )
}