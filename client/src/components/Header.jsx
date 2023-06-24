import { Navbar, Nav, Row, Col, Container } from 'react-bootstrap';

import './header.css';

import logo from '../img/Logo.png';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigateTo = useNavigate();

  const handleClick = () => {
    navigateTo(`/`);
  };

  return (
    <>
      <Container>
        <Row>
          <Col onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className='logo mt-1' style={{ display: 'flex' }}>
              <img src={logo} style={{ height: '40px' }} />
              <div
                style={{
                  fontSize: '2em',
                  paddingLeft: '5px',
                  fontWeight: 'bold',
                }}
              >
                FitPlan
              </div>
            </div>
          </Col>

          <Col className='colMenu'>
            <Navbar className=''>
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mx-auto'>
                  <Nav.Link className='menu-item' href='#'>
                    Home
                  </Nav.Link>
                  <Nav.Link className='menu-item' href='#'>
                    About
                  </Nav.Link>
                  <Nav.Link className='menu-item' href='#'>
                    Services
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Header;
