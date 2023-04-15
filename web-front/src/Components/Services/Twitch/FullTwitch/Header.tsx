import { Navbar, Nav } from 'react-bootstrap';

export default function Header(props: any) {

	const changePage = (page: string) => {
		if (page === "streams") {
			props.setDisplayedGameStreams("");
		}
		props.setDisplayedPage(page);
	};

	return (
		<Navbar bg="primary" background-color="purple" variant="dark">
			<Navbar.Brand onClick={() => changePage("home")} style={{ paddingLeft: '1rem', cursor: 'pointer' }}>Twitch</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link onClick={() => changePage("games")}>Games</Nav.Link>
					<Nav.Link onClick={() => changePage("streams")}>Streams</Nav.Link>
					{/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
					<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
					<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
					<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
				</NavDropdown> */}
				</Nav>
			</Navbar.Collapse>
			<Navbar.Collapse className="justify-content-end">
				<Navbar.Text>
					<Nav.Link onClick={() => changePage("profile")}>My Account</Nav.Link>
				</Navbar.Text>
			</Navbar.Collapse>
		</Navbar>
	);
}