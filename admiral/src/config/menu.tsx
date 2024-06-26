import React from 'react'
import { Menu, MenuItemLink } from '@devfamily/admiral'

const CustomMenu = () => {
    return (
        <Menu>
            <MenuItemLink name="Replays" to="/replays" icon="FiFilm" />
            <MenuItemLink name="Replay errors" to="/errors" icon="FiFilm" />
            <MenuItemLink name="Scheduled sessions" to="/sessions" icon="FiCalendar" />
            <MenuItemLink name="Users" to="/users" icon="FiUser" />
        </Menu>
    )
}

export default CustomMenu
