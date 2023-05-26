import KPISection from "./KPISection/KPISection";
import ChartSection from "./ChartSection/ChartSection";
import { Container } from 'react-bootstrap';


const UserDashboard = () => {
  return (
    <Container fluid className='pt-4'>
      <KPISection />
      <ChartSection />
    </Container>
  )
};

export default UserDashboard;

