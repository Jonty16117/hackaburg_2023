import React, { useState } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap';


const KPIBox = ({ kpi_label, kpi_value, kpi_value_standard, variant }) => {
  console.log(kpi_label, kpi_value, kpi_value_standard, variant);
  return (
    <Col className="d-flex justify-content-center text-center" >
      <Card
        bg={variant.toLowerCase()}
        key={variant}
        text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
        style={{ width: '18rem' }}
        className="mb-2"
      >
        <Card.Header>{kpi_label}</Card.Header>
        <Card.Body>
          <Card.Title style={{ fontSize: '50px' }}>{kpi_value}</Card.Title>
          <Card.Text>{kpi_value_standard}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

// variants:
// 'Primary'
// 'Secondary'
// 'Success'
// 'Danger'
// 'Warning'
// 'Info'
// 'Light'
// 'Dark'

const dataArray = [
  {
    kpi_label: "Speed",
    kpi_value: "69",
    kpi_value_standard: "kmph",
    variant: "Light",
  },
  {
    kpi_label: "Temperature",
    kpi_value: "50",
    kpi_value_standard: "°Celsius",
    variant: "Danger",
  },
  {
    kpi_label: "Motor Speed",
    kpi_value: "2000",
    kpi_value_standard: "RPM",
    variant: "Light",
  },
  {
    kpi_label: "Cooling Temperature",
    kpi_value: "10",
    kpi_value_standard: "°Celsius",
    variant: "Primary",
  },
]

const KPISection = () => {

  // const [kpiData, setKpiData] = useState(data);

  return (
    <Container fluid className='pt-4'>
      <Row className="justify-content-around">
        {dataArray.map((data, index) => (
          <Col className="d-flex justify-content-center" key={index}>
            <KPIBox {...data} />
          </Col>
        ))}
      </Row>
    </Container>
  )
};

export default KPISection;
