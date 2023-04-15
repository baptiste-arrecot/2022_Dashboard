import { Navbar, Nav } from 'react-bootstrap';

export default function Header(props: any) {
	return (
		<Navbar bg="primary" background-color="blue" variant="dark">
			<Navbar.Brand style={{ paddingLeft: '1rem' }}>Bnet</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link onClick={() => props.setDisplayedPage("Ladder")}>Ladder</Nav.Link>
					<Nav.Link onClick={() => props.setDisplayedPage("CardViewer")}>Card Viewer</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			<Navbar.Collapse className="justify-content-end">
				<Navbar.Text>
					<Nav.Link onClick={() => props.setDisplayedPage("profile")}>My Account</Nav.Link>
				</Navbar.Text>
			</Navbar.Collapse>
		</Navbar>
	);
}