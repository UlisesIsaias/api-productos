import React from "react";

const ProductTable = ({ products }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3"> Nombre </th>
            <th className="p-3"> Precio </th>
            <th className="p-3"> Categoria </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{product.title}</td>
              <td className="p-3 font-semibold text-green-600">${product.price}</td>
              <td className="p-3">{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;