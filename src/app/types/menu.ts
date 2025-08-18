export type SubmenuItem = {
  label: string
  href: string
}

export type HeaderType = {
  label: string
  href: string
  submenu?: SubmenuItem[]
}
