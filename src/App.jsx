import React, { useState, useEffect } from "react";
import ProductTable from "./components/ProductTable";
import ProductChart from "./components/ProductChart";
import { FaChartBar, FaTable } from "react-icons/fa"; 

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("table"); 

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center py-10">
      <div className="bg-white p-6 shadow-md rounded-lg w-11/12 max-w-6xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold"> PRODUCTOS </h1>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
            onClick={() => setView(view === "table" ? "chart" : "table")}
          >
            {view === "table" ? "Ver Gráfico" : "Ver Tabla"}</button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
            onClick={() => setView(view === "table" ? "chart" : "table")}
          >
            {view === "table" ? <FaChartBar /> : <FaTable />}
          </button>

        </div>

        <input
          type="text"
          placeholder="🔍 Buscar por nombre o categoría..."
          className="w-full p-2 mb-4 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {view === "table" ? <ProductTable products={filteredProducts} /> : <ProductChart products={products} />}
      </div>
    </div>
  );
};

export default App;