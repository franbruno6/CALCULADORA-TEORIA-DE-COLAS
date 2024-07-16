import { Navbar, Button, Dropdown } from "flowbite-react";
import { Link} from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

export default function Header() {
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);

    return (
        <Navbar className="border-b-2">
            <Link to="/" className="selfself-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">Calculadora Teoría de Colas</Link>
            <div className="flex gap-2 md:order-2">
                <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={() => dispatch(toggleTheme())}>
                    { theme === 'light' ? <FaMoon /> : <FaSun /> }
                </Button>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link as={"div"}>
                    <Link to="/">
                        Home
                    </Link>
                </Navbar.Link>
                <div className="flex items-center justify-between w-full">
                    <div className="md:hidden flex flex-row space-x-4 lg:flex">
                        <Navbar.Link as={"div"}>
                            <Link to="/MM1">
                                M/M/1
                            </Link>
                        </Navbar.Link>
                        <Navbar.Link as={"div"}>
                            <Link to="/MM2">
                                M/M/2
                            </Link>
                        </Navbar.Link>
                        <Navbar.Link as={"div"}>
                            <Link to="/MM1N">
                                M/M/1/N
                            </Link>
                        </Navbar.Link>
                        <Navbar.Link as={"div"}>
                            <Link to="/MG1">
                                M/G/1
                            </Link>
                        </Navbar.Link>
                        <Navbar.Link as={"div"}>
                            <Link to="/MD1">
                                M/D/1
                            </Link>
                        </Navbar.Link>
                    </div>
                    <div className="hidden md:block lg:hidden">
                        <Dropdown
                            inline
                            label="Modelos"
                        >
                            <Link to='/MM1'>
                                <Dropdown.Item>
                                    M/M/1
                                </Dropdown.Item>
                            </Link>
                            <Link to='/MM2'>
                                <Dropdown.Item>
                                    M/M/2
                                </Dropdown.Item>
                            </Link>
                            <Link to='/MM1N'>
                                <Dropdown.Item>
                                    M/M/1/N
                                </Dropdown.Item>
                            </Link>
                            <Link to='/MG1'>
                                <Dropdown.Item>
                                    M/G/1
                                </Dropdown.Item>
                            </Link>
                            <Link to='/MD1'>
                                <Dropdown.Item>
                                    M/D/1
                                </Dropdown.Item>
                            </Link>
                        </Dropdown>
                    </div>
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}
