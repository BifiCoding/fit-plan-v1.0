import { Navbar, Nav, Row, Col, Container } from 'react-bootstrap';

import './header.css';

import logo from '../img/Logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigateTo(`/`);
  };

  const goToAbout = () => {
    const element = document.querySelector('.text-about-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToServices = () => {
    const element = document.querySelector('#formHomePage');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
                  {location.pathname === '/' ? (
                    <>
                      <Nav.Link
                        className='menu-item'
                        to='/'
                        activeClassName='active'
                      >
                        Home
                      </Nav.Link>
                      <Nav.Link
                        className='menu-item'
                        href='#'
                        onClick={goToAbout}
                      >
                        About
                      </Nav.Link>
                      <Nav.Link
                        className='menu-item'
                        href='#'
                        onClick={goToServices}
                      >
                        Services
                      </Nav.Link>
                      <Nav.Link
                        className='menu-item'
                        href='#'
                        onClick={goToServices}
                      >
                        Diet
                      </Nav.Link>
                    </>
                  ) : (
                    <Nav.Link
                    className='menu-item'
                    onClick={handleClick}
                  >
                    Go to Home
                  </Nav.Link>
                  )}
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
