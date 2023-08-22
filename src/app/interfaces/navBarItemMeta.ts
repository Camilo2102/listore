export default interface navBarItemMeta{
    icon: string,
    label: string,
    roles: string[],
    command: () => void
}