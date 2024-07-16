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
                <Navbar.Link as={"div"}>
                    <Link to="/contact-me">
                        Contact Me
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
