'use client';

import { useState, useEffect } from 'react';

// Definindo o tipo para os dados da tabela
type TableData = {
  id: number;
  status: string;
  data: string;
  placa: string;
  transportadora: string;
  rodou: string;
  regiao: string;
  precoBase: string;
  rv: string;
  extras: string;
  motivoExtra: string;
  totalDiaria: string;
};

// Dados de exemplo
const initialData: TableData[] = [
  {
    id: 1,
    status: 'Pago',
    data: '02/09/2024',
    placa: 'ABC1234',
    transportadora: 'Damonte',
    rodou: 'Sim',
    regiao: 'RMR',
    precoBase: 'R$ 280,00',
    rv: 'R$ 25,00',
    extras: 'R$ 30,00',
    motivoExtra: 'Quilometragem',
    totalDiaria: 'R$ 335,00',
  },
  {
    id: 2,
    status: 'Pendente',
    data: '03/09/2024',
    placa: 'DEF5678',
    transportadora: 'Transportadora1',
    rodou: 'Não',
    regiao: 'Jaboatão',
    precoBase: 'R$ 260,00',
    rv: 'R$ 20,00',
    extras: 'R$ 0,00',
    motivoExtra: '-',
    totalDiaria: 'R$ 280,00',
  },
  {
    id: 3,
    status: 'Pago',
    data: '04/09/2024',
    placa: 'GHI9012',
    transportadora: 'Damonte',
    rodou: 'Sim',
    regiao: 'Ipojuca',
    precoBase: 'R$ 300,00',
    rv: 'R$ 30,00',
    extras: 'R$ 50,00',
    motivoExtra: 'Hora extra',
    totalDiaria: 'R$ 380,00',
  },
  {
    id: 4,
    status: 'Pendente',
    data: '05/09/2024',
    placa: 'JKL3456',
    transportadora: 'Transportadora1',
    rodou: 'Sim',
    regiao: 'Caruaru',
    precoBase: 'R$ 320,00',
    rv: 'R$ 35,00',
    extras: 'R$ 40,00',
    motivoExtra: 'Pernoite',
    totalDiaria: 'R$ 395,00',
  },
];

export default function ExtractPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [tableData, setTableData] = useState<TableData[]>(initialData);

  const filterOptions = [
    'Status',
    'Placa',
    'Transportadora',
    'Rodou',
    'Região',
  ];

  const handleSearch = () => {
    let filteredData = initialData;

    if (startDate && endDate) {
      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.data.split('/').reverse().join('-'));
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      });
    }

    if (filterOption && filterValue) {
      filteredData = filteredData.filter((item) => {
        const itemValue = item[filterOption.toLowerCase() as keyof TableData];
        return String(itemValue)
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    }

    setTableData(filteredData);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Extrato</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">Selecione um filtro</option>
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Valor do filtro"
          className="border border-gray-300 rounded-md p-2"
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white rounded-md p-2 hover:bg-gray-800"
        >
          Buscar
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Data</th>
              <th className="border px-4 py-2">Placa</th>
              <th className="border px-4 py-2">Transportadora</th>
              <th className="border px-4 py-2">Rodou</th>
              <th className="border px-4 py-2">Região</th>
              <th className="border px-4 py-2">Preço Base</th>
              <th className="border px-4 py-2">RV</th>
              <th className="border px-4 py-2">Extras</th>
              <th className="border px-4 py-2">Motivo Extra</th>
              <th className="border px-4 py-2">Total da Diária</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.status}</td>
                <td className="border px-4 py-2">{item.data}</td>
                <td className="border px-4 py-2">{item.placa}</td>
                <td className="border px-4 py-2">{item.transportadora}</td>
                <td className="border px-4 py-2">{item.rodou}</td>
                <td className="border px-4 py-2">{item.regiao}</td>
                <td className="border px-4 py-2">{item.precoBase}</td>
                <td className="border px-4 py-2">{item.rv}</td>
                <td className="border px-4 py-2">{item.extras}</td>
                <td className="border px-4 py-2">{item.motivoExtra}</td>
                <td className="border px-4 py-2">{item.totalDiaria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
