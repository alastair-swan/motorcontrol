"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { BRK_INV } from "./Register"

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
                    UpdateParam(motorNumber, BRK_INV, checked)
                }}
            />
            Brake Pin: {state.BRK_INV ? "Active Low" : "Active High"}
        </Box>
    )
}