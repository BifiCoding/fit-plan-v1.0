import React from 'react';
import './homepage.css';

import Form from '../components/Form';
import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  Col,
  Container,
  Navbar,
  Nav,
  Row,
  Button,
  Image,
  Card,
} from 'react-bootstrap';

import logo from '../img/main-photo.jpeg';
import GreenFresh from '../img/green-fresh.jpeg';
import Plate from '../img/plate.webp';
import Veges from '../img/veges.webp';
import Weight from '../img/weight.webp'
import AllergyFood from '../img/allergy-food.jpeg'

function HomePage() {
  const goToForm = () => {
    const element = document.getElementById('formHomePage');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: '#eeeeee' }}>
        <Header />
      </div>

      <div className='header-slider shadow'>
        <img src={logo} alt='' className='header-photo' />
        <div className='text-block'>
          <Container>
            <Row>
              <Col className='mx-auto'>
                <div className='text'>Create your Personal Diet</div>
                <button className='get-start' onClick={goToForm}>
                  Get Started
                </button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className='about'>
        <Container>
          <Row className='justify-content-center shadow'>
            <Col
              md={6}
              xs={12}
              className='text-center text-md-left order-md-1'
              style={{ backgroundColor: ' rgb(78, 78, 78)' }}
            >
              <div
                className='text-about-container'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  WebkitFlexDirection: 'column',
                }}
              >
                <div className='headline-about'>About FitPlan</div>
                <div className='text-about'>
                  The main driving force behind FitPlan is a deep desire to help
                  people achieve their diet and nutrition goals. Whether you're
                  looking for help losing weight, gaining or maintaining weight,
                  each client is individually assessed and provided with a
                  well-researched and comprehensive nutrition plan.
                </div>
              </div>
            </Col>
            <Col
              md={6}
              xs={12}
              className='img-about-block order-md-2'
              style={{ padding: 0,  maxWidth: '600px' }}
            >
              <Image src={GreenFresh} alt='' className='about-img' />
            </Col>
          </Row>
        </Container>
      </div>

      <div className='suport'>
        <Container className='text-center pt-2'>
          <span className='headline'>Supporting Your Success</span>
        </Container>

        <Container style={{ paddingBottom: '20px' }}>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card
                className='my-3 text-center shadow mb-2'
                style={{ border: 'none' }}
                id='card'
              >
                <div>
                  <Card.Img
                    variant='top'
                    src={Veges}
                    style={{
                      borderRadius: 0,
                      height: '15rem',
                      objectFit: 'cover',
                    }}
                  />

                  <Card.Body
                    style={{
                      backgroundColor: ' rgb(78, 78, 78)',
                      color: 'white',
                      paddingTop: '50px',
                      paddingBottom: '50px',
                    }}
                    className='card-size'
                  >
                    <Card.Title
                      as='div'
                      style={{ fontWeight: '800', fontSize: '1.3em' }}
                    >
                      Sports Nutrition Education
                    </Card.Title>
                    <Card.Title as='div' style={{ fontSize: '1.15em' }}>
                      The Guidance You Need
                    </Card.Title>
                  </Card.Body>
                </div>
              </Card>
            </Col>

            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card
                className='my-3 text-center shadow mb-2'
                style={{ border: 'none' }}
                id='card'
              >
                <div>
                  <Card.Img
                    variant='top'
                    src={Weight}
                    style={{
                      borderRadius: 0,
                      height: '15rem',
                      objectFit: 'cover',
                    }}
                  />

                  <Card.Body
                    style={{
                      backgroundColor: ' rgb(126, 184, 50)',
                      color: 'white',
                      paddingTop: '50px',
                      paddingBottom: '50px',
                    }}
                    className='card-size'
                  >
                    <Card.Title
                      as='div'
                      style={{ fontWeight: '800', fontSize: '1.3em' }}
                    >
                      Control your body weight
                    </Card.Title>
                    <Card.Title as='div' style={{ fontSize: '1.15em' }}>
                      Better Decisions
                    </Card.Title>
                  </Card.Body>
                </div>
              </Card>
            </Col>

            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <Card
                className='my-3 text-center shadow mb-2'
                style={{ border: 'none' }}
                id='card'
              >
                <div>
                  <Card.Img
                    variant='top'
                    src={AllergyFood}
                    style={{
                      borderRadius: 0,
                      height: '15rem',
                      objectFit: 'cover',
                    }}
                  />

                  <Card.Body
                    style={{
                      backgroundColor: ' rgb(78, 78, 78)',
                      color: 'white',
                      paddingTop: '50px',
                      paddingBottom: '50px',
                    }}
                    className='card-size'
                  >
                    <Card.Title
                      as='div'
                      style={{ fontWeight: '800', fontSize: '1.3em' }}
                    >
                      Food Allergy Management
                    </Card.Title>
                    <Card.Title as='div' style={{ fontSize: '1.15em' }}>
                      A Healthier You
                    </Card.Title>
                  </Card.Body>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className='text-center mt-3' id='formHomePage'>
        <div className='headline-create'>
          Create your 100% Personilized Diet
        </div>
      </Container>

      <Form className='mt-3' />
      
      <Footer />


      </div>

  );
}

export default HomePage;
