"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// BRK_INV
export function BrakePolaritySwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={state.BRK_INV}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        BRK_INV: checked
                    })
                    UpdateParam(motorNumber, RegisterList.BRK_INV.command, checked)
                }}
            />
            Brake Pin Inverted Input
        </Box>
    )
}