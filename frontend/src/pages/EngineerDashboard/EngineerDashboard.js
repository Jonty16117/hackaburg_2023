import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './EngineerDashboard.module.css'; // Import the CSS module file
import ControlPart from './ControlPart/ControlPart';
import ViewPart from './ViewPart/ViewPart';


const EngineerDashboard = () => {
  return (
    <Container fluid className='pt-4'>
      <Row>
        <Col className={styles['divider-col']}>
          <ControlPart />
        </Col>
        <Col className={styles['divider-col']}>
          <ViewPart />
        </Col>
      </Row>
    </Container>
  );
};

export default EngineerDashboard;
