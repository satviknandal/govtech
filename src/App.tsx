import React from "react";
import Heading from "./shared/components/Heading";
import Navbar from "./shared/components/Navbar";
import Table from "./components/table/TableComponent";
import ChartComponent from "./components/ChartComponent";
import DetailComponent from "./components/DetailComponent";
import { NavItem } from "./interface/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFoundComponent from "./shared/components/PageNotFoundComponent";

const data: NavItem[] = [
  {
    label: 'Table',
    link: '/table'
  },
  {
    label: 'Chart',
    link: '/chart'
  }
]
const App = () => {
  return (
    <div>
      <Heading title="React Table"></Heading>
      <BrowserRouter>
        <Navbar data={data}></Navbar>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/table" element={<Table />} />
          <Route path="/chart" element={<ChartComponent />} />
          <Route path="/table/:id" element={<DetailComponent />} />
          <Route path="/*" element={<PageNotFoundComponent message="Page Not Found, Visit home page" />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
