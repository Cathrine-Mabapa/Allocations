// pages/index.js
import GeoDropdowns from '../src/components/allocations';

const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Allocations</h1>
      <GeoDropdowns />
    </div>
  );
};

export default HomePage;
