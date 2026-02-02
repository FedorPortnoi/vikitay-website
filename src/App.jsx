import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VikitayWebsite from './vikitay-website';
import ServicePage from './ServicePage';
import { servicesDataRu } from './servicesData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VikitayWebsite />} />
        <Route path="/services/consultation" element={<ServicePage service={servicesDataRu.consultation} />} />
        <Route path="/services/strategy" element={<ServicePage service={servicesDataRu.strategy} />} />
        <Route path="/services/stm" element={<ServicePage service={servicesDataRu.stm} />} />
        <Route path="/services/product-line" element={<ServicePage service={servicesDataRu.productLine} />} />
        <Route path="/services/buyer" element={<ServicePage service={servicesDataRu.buyer} />} />
        <Route path="/services/procurement" element={<ServicePage service={servicesDataRu.procurement} />} />
        <Route path="/services/business-tour" element={<ServicePage service={servicesDataRu.businessTour} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
