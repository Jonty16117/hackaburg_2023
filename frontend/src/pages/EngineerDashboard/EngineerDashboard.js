import { Container, Row } from 'react-bootstrap';

const EngineerDashboard = () => {
  return (
    <Container fluid className='pt-4'>
      <Row>
        <div className="left-partition">
          {/* Component for the left partition */}
        </div>
        <div className="right-partition">
          {/* Component for the right partition */}
        </div>
      </Row>
    </Container>
  );
};

export default EngineerDashboard;
