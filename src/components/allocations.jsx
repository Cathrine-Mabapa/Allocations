import { useState, useEffect } from 'react';
import Select from 'react-select';

const GeoDropdowns = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [towns, setTowns] = useState([]);
  const [selectedTown, setSelectedTown] = useState('');
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');

  useEffect(() => {
    // Fetch provinces from your API or data source
    fetch('http://localhost:3000/provinces')
      .then(response => response.json())
      .then(data => setProvinces(data))
      .catch(error => console.error('Error fetching provinces:', error));
  }, []);

  useEffect(() => {
    // Fetch municipalities based on the selected province
    if (selectedProvince) {
      fetch(`http://localhost:3000/municipalities?provinceId=${selectedProvince}`)
        .then(response => response.json())
        .then(data => setMunicipalities(data))
        .catch(error => console.error('Error fetching municipalities:', error));
    }
  }, [selectedProvince]);

  useEffect(() => {
    // Fetch towns based on the selected municipality
    if (selectedMunicipality) {
      fetch(`http://localhost:3000/towns?municipalityId=${selectedMunicipality}`)
        .then(response => response.json())
        .then(data => setTowns(data))
        .catch(error => console.error('Error fetching towns:', error));
    }
  }, [selectedMunicipality]);

  useEffect(() => {
    // Fetch areas based on the selected town
    if (selectedTown) {
      fetch(`http://localhost:3000/areas?townId=${selectedTown}`)
        .then(response => response.json())
        .then(data => setAreas(data))
        .catch(error => console.error('Error fetching areas:', error));
    }
  }, [selectedTown]);

  return (
    <div style={{ maxWidth: '300px', margin: 'auto' }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>Province</label>
      <select
        value={selectedProvince}
        onChange={(e) => setSelectedProvince(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
      >
        <option value="">Select Province</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>

      <label style={{ display: 'block', marginBottom: '5px' }}>Municipality</label>
      <Select
        value={{ label: selectedMunicipality, value: selectedMunicipality }}
        onChange={(selectedOption) => setSelectedMunicipality(selectedOption.value)}
        options={municipalities.map((municipality) => ({
          label: municipality.name,
          value: municipality.id,
        }))}
        isClearable
        placeholder="Select Municipality"
      />

      <label style={{ display: 'block', marginBottom: '5px' }}>Town</label>
      <Select
        value={{ label: selectedTown, value: selectedTown }}
        onChange={(selectedOption) => setSelectedTown(selectedOption.value)}
        options={towns.map((town) => ({
          label: town.name,
          value: town.id,
        }))}
        isClearable
        placeholder="Select Town"
      />

      <label style={{ display: 'block', marginBottom: '5px' }}>Area</label>
      <Select
        value={{ label: selectedArea, value: selectedArea }}
        onChange={(selectedOption) => setSelectedArea(selectedOption.value)}
        options={areas.map((area) => ({
          label: area.name,
          value: area.id,
        }))}
        isClearable
        placeholder="Select Area"
      />
    </div>
  );
};

export default GeoDropdowns;
