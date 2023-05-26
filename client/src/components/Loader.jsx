import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';

export default function Loader() {
  return (
    <div>
      <div className='d-flex justify-content-center pt-1'>
        <Row>
          <Col>
            <Spinner
              className='spinner-border spinner-border-lg'
              role='status'
              style={{ height: 30, width: 30, color: '#4278f5' }}
            ></Spinner>
          </Col>
        </Row>

      </div>
    </div>
  );
}
