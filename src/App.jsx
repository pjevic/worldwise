/** @format */

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

import Homepage from "./pages/Homepage/Homepage";
import Product from "./pages/Product/Product";
import Pricing from "./pages/Pricing/Pricing";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import CityList from "./components/City/CitiList/CityList";
import CountryList from "./components/Country/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
