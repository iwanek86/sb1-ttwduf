import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import BiologySubcategoryPage from './pages/BiologySubcategoryPage';
import CatPregnancyCalculator from './pages/calculators/CatPregnancyCalculator';
import PhAnalysisCalculator from './pages/calculators/PhAnalysisCalculator';
import CatAgeCalculator from './pages/calculators/CatAgeCalculator';
import AtomCalculator from './pages/calculators/AtomCalculator';
import AtomicMassCalculator from './pages/calculators/AtomicMassCalculator';
import CellSizeCalculator from './pages/calculators/CellSizeCalculator';
import AverageAtomicMassCalculator from './pages/calculators/AverageAtomicMassCalculator';
import CellDivisionTimeCalculator from './pages/calculators/CellDivisionTimeCalculator';
import SurfaceAreaVolumeCalculator from './pages/calculators/SurfaceAreaVolumeCalculator';
import DnaSequenceCalculator from './pages/calculators/DnaSequenceCalculator';
import ProteinSynthesisCalculator from './pages/calculators/ProteinSynthesisCalculator';
import HardyWeinbergCalculator from './pages/calculators/HardyWeinbergCalculator';
import MetabolicRateCalculator from './pages/calculators/MetabolicRateCalculator';
import OxygenConsumptionCalculator from './pages/calculators/OxygenConsumptionCalculator';
import BloodPressureCalculator from './pages/calculators/BloodPressureCalculator';
import PopulationGrowthCalculator from './pages/calculators/PopulationGrowthCalculator';
import SpeciesDiversityCalculator from './pages/calculators/SpeciesDiversityCalculator';
import CarryingCapacityCalculator from './pages/calculators/CarryingCapacityCalculator';
import EnzymeKineticsCalculator from './pages/calculators/EnzymeKineticsCalculator';
import GuineaPigPregnancyCalculator from './pages/calculators/GuineaPigPregnancyCalculator';
import CowGestationCalculator from './pages/calculators/CowGestationCalculator';
import MolecularWeightCalculator from './pages/calculators/MolecularWeightCalculator';
import DogPregnancyCalculator from './pages/calculators/DogPregnancyCalculator';
import GoatGestationCalculator from './pages/calculators/GoatGestationCalculator';
import AnnealingTemperatureCalculator from './pages/calculators/AnnealingTemperatureCalculator';
import AlleleFrequencyCalculator from './pages/calculators/AlleleFrequencyCalculator';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/category/biology/:subcategoryId" element={<BiologySubcategoryPage />} />
          <Route path="/calculator/cat-pregnancy" element={<CatPregnancyCalculator />} />
          <Route path="/calculator/ph-analysis" element={<PhAnalysisCalculator />} />
          <Route path="/calculator/cat-age" element={<CatAgeCalculator />} />
          <Route path="/calculator/atom" element={<AtomCalculator />} />
          <Route path="/calculator/atomic-mass" element={<AtomicMassCalculator />} />
          <Route path="/calculator/cell-size" element={<CellSizeCalculator />} />
          <Route path="/calculator/average-atomic-mass" element={<AverageAtomicMassCalculator />} />
          <Route path="/calculator/cell-division-time" element={<CellDivisionTimeCalculator />} />
          <Route path="/calculator/surface-area-volume" element={<SurfaceAreaVolumeCalculator />} />
          <Route path="/calculator/dna-sequence" element={<DnaSequenceCalculator />} />
          <Route path="/calculator/protein-synthesis" element={<ProteinSynthesisCalculator />} />
          <Route path="/calculator/hardy-weinberg" element={<HardyWeinbergCalculator />} />
          <Route path="/calculator/metabolic-rate" element={<MetabolicRateCalculator />} />
          <Route path="/calculator/oxygen-consumption" element={<OxygenConsumptionCalculator />} />
          <Route path="/calculator/blood-pressure" element={<BloodPressureCalculator />} />
          <Route path="/calculator/population-growth" element={<PopulationGrowthCalculator />} />
          <Route path="/calculator/species-diversity" element={<SpeciesDiversityCalculator />} />
          <Route path="/calculator/carrying-capacity" element={<CarryingCapacityCalculator />} />
          <Route path="/calculator/enzyme-kinetics" element={<EnzymeKineticsCalculator />} />
          <Route path="/calculator/guinea-pig-pregnancy" element={<GuineaPigPregnancyCalculator />} />
          <Route path="/calculator/cow-gestation" element={<CowGestationCalculator />} />
          <Route path="/calculator/molecular-weight" element={<MolecularWeightCalculator />} />
          <Route path="/calculator/dog-pregnancy" element={<DogPregnancyCalculator />} />
          <Route path="/calculator/goat-gestation" element={<GoatGestationCalculator />} />
          <Route path="/calculator/annealing-temperature" element={<AnnealingTemperatureCalculator />} />
          <Route path="/calculator/allele-frequency" element={<AlleleFrequencyCalculator />} />
          <Route path="*" element={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
              <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
              <a href="/" className="btn">Back to Home</a>
            </div>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}