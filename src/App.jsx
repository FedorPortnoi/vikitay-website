import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VikitayWebsite from './vikitay-website';
import ServicePage from './ServicePage';
import CasePage from './CasePage';
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
        <Route path="/services/analysis" element={<ServicePage service={servicesDataRu.analysis} />} />
        <Route path="/services/branding" element={<ServicePage service={servicesDataRu.branding} />} />
        <Route path="/services/packages" element={<ServicePage service={servicesDataRu.packages} />} />
        <Route path="/cases/broshi" element={<CasePage caseId="broshi" />} />
        <Route path="/cases/zhemchug" element={<CasePage caseId="zhemchug" />} />
        <Route path="/cases/parket" element={<CasePage caseId="parket" />} />
        <Route path="/cases/stil" element={<CasePage caseId="stil" />} />
        <Route path="/cases/klassika" element={<CasePage caseId="klassika" />} />
        <Route path="/cases/retail" element={<CasePage caseId="retail" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
