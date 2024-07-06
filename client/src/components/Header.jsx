import { Navbar, Button, Dropdown } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon } from "react-icons/fa";

export default function Header() {
    const path = useLocation().pathname;

    return (
        <Navbar className="border-b-2">
            <Link to="/" className="selfself-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">Calculadora Teoria de Colas</Link>
            <div className="flex gap-2 md:order-2">
                <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
                    <FaMoon />
                </Button>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link activate={path === "/"} as={"div"}>
                    <Link to="/">
                        Home
                    </Link>
                </Navbar.Link>
                <Dropdown
                    inline
                    label="Modelos"
                >
                    <Link to='/mm1'>
                        <Dropdown.Item>
                            M/M/1
                        </Dropdown.Item>
                    </Link>
                    <Link to='/mm2'>
                        <Dropdown.Item>
                            M/M/2
                        </Dropdown.Item>
                    </Link>
                    <Link to='/mm1n'>
                        <Dropdown.Item>
                            M/M/1/N
                        </Dropdown.Item>
                    </Link>
                </Dropdown>
                <Navbar.Link activate={path === "/about"} as={"div"}>
                    <Link to="/about">
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/contact-me"} as={"div"}>
                    <Link to="/contact-me">
                        Contact Me
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
