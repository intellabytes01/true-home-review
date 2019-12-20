import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ButtonPrimaryDropdown = ({ dropdownOpen, toggleDropdownButton, btnText, className }) => (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdownButton}>
        <DropdownToggle className={className} caret>
            {btnText}
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem>Some Action</DropdownItem>
            <DropdownItem disabled>Action (disabled)</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Foo Action</DropdownItem>
            <DropdownItem>Bar Action</DropdownItem>
            <DropdownItem>Quo Action</DropdownItem>
        </DropdownMenu>
    </Dropdown>
);
export default ButtonPrimaryDropdown;