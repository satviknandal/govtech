export interface IChartData {
    name: number,
    cost: number,
    impression: number
}

export interface IChart {
    data: IChartData[],
    left: string,
    right: string,
    top: string,
    bottom: string,
    top2: string,
    bottom2: string,
    animation?: boolean
}