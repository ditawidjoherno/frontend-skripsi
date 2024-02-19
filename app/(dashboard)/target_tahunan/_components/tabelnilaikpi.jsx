
// import React from 'react';

// const Table = ({ data }) => {
//     return (
//         <div className=' mx-4 my-5'>
//             <table className="border-collapse border-2 bg-gray-200 border-gray-400">
//                 <thead>
//                     <tr>
//                         <th className=" border-gray-400 px-4 py-2">No</th>
//                         <th className=" border-gray-400  px-4 py-2">No</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((item, index) => (
//                         <tr key={index}>
//                             <td className="border border-gray-400 px-4 py-2">{item}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>

//     );
// };

// export default Table;

// components/Table.js

const TableKpi = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto mx-9 mt-5 mb-5">
        <thead>
          <tr>
            <th className="border border-gray-400 px-1 py-2 bg-gray-200">No</th>
            <th className="border border-gray-400 px-20 py-2 bg-gray-200">KPI</th>
            <th className="border border-gray-400 px-20 py-2 bg-gray-200">Jan</th>
            <th className="border border-gray-400 px-20 py-2 bg-gray-200">Feb</th>
            <th className="border border-gray-400 px-20 py-2 bg-gray-200">Mar</th>
            <th className="border border-gray-400 px-20 py-2 bg-gray-200">Apr</th>
            <th className="border border-gray-400 px-20 py-2 bg-gray-200">Mei</th>
            <th className="border border-gray-400 px-20 py-2 bg-gray-200">Jun</th>
            <th className="border border-gray-400 px-20 py-2 bg-gray-200">Jul</th>
            <th className="border border-gray-400 px-20 py-2 bg-gray-200">Agu</th>
            <th className="border border-gray-400 px-20 py-2 bg-gray-200">Sep</th>
            <th className="border border-gray-400 px-20 py-2 bg-gray-200">Okt</th>
            <th className="border border-gray-400 px-20 py-2 bg-gray-200">Nov</th>
            <th className="border border-gray-400 px-20 py-2 bg-gray-200">Des</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2">1</td>
            <td className="border border-gray-400 px-4 py-2">DPK RITEL</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2 ">2</td>
            <td className="border border-gray-300 px-4 py-2 justify-end flex">TABUNGAN</td>
            <td className="border border-gray-400 px-4 py-2">b</td>
            <td className="border border-gray-400 px-4 py-2">c</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">3</td>
            <td className="border border-gray-300 px-4 py-2 justify-end flex">DEPO RITEL</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">4</td>
            <td className="border border-gray-400 px-4 py-2">NTB - PBO</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">5</td>
            <td className="border border-gray-400 px-4 py-2">NOA BTN MOVE</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">6</td>
            <td className="border border-gray-400 px-4 py-2">TRANSAKSI TELLER</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">7</td>
            <td className="border border-gray-400 px-4 py-2">TRANSAKSI CRM</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">8</td>
            <td className="border border-gray-400 px-4 py-2">OPERASIONAL MKK</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">9</td>
            <td className="border border-gray-400 px-4 py-2">QRIS</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">10</td>
            <td className="border border-gray-400 px-4 py-2">EDC</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">11</td>
            <td className="border border-gray-400 px-4 py-2">AGEN</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">12</td>
            <td className="border border-gray-400 px-4 py-2">KUADRAN AGEN</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">13</td>
            <td className="border border-gray-400 px-4 py-2">NOA PAYROLL</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">14</td>
            <td className="border border-gray-400 px-4 py-2">VOA PAYROLL</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">15</td>
            <td className="border border-gray-400 px-4 py-2">NOA PENSIUN</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">16</td>
            <td className="border border-gray-400 px-4 py-2">VOA PENSIUN</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">17</td>
            <td className="border border-gray-400 px-4 py-2">VOA E'BATARAPOS</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">18</td>
            <td className="border border-gray-400 px-4 py-2">NOA GIRO</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">19</td>
            <td className="border border-gray-400 px-4 py-2">AKUISISI SATKER</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">20</td>
            <td className="border border-gray-400 px-4 py-2">CMS</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">21</td>
            <td className="border border-gray-400 px-4 py-2">JUMLAH PKS PRO</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2"></td>
            <td className="border border-gray-400 px-4 py-2">DPK LEMBAGA</td>
            <td className="border border-gray-400 px-4 py-2">q</td>
            <td className="border border-gray-400 px-4 py-2">r</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
            <td className="border border-gray-400 px-4 py-2">y</td>
            <td className="border border-gray-400 px-4 py-2">z</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableKpi;

