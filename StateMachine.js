import { newRidgeState } from "react-ridge-state"

export const AvailablePillsState = newRidgeState(require('./pills.json'))

export const ChosenPills = newRidgeState([])

export const Updates = newRidgeState(0)