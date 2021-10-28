
import { ComponentType } from "react"


export interface RouteType {

    component: ComponentType<any>,
    path: string,
    exact: boolean,
}