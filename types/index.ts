export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>

export type Option = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  withCount?: boolean
}

export type DataTableFilterField<TData> = {
  label: string
  value: keyof TData
  placeholder?: string
  options?: Option[]
}

export type DataTableFilterOption<TData> = {
  id: string
  label: string
  value: keyof TData
  options: Option[]
  filterValues?: string[]
  filterOperator?: string
  isMulti?: boolean
}
