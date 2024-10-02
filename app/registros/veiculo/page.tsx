'use client';

import { useState } from 'react';
import RegistroGenerico from '../../components/registroGenerico';

// Simulating data from the Transportadora page
const transportadoras = ['Transportes Rápidos', 'Logística Express'];

const fields = [
  { name: 'placa', label: 'Placa', type: 'text' },
  { name: 'tipo', label: 'Tipo', type: 'text' },
  {
    name: 'transportadora',
    label: 'Transportadora',
    type: 'select',
    options: transportadoras,
  },
  { name: 'capacidade', label: 'Capacidade', type: 'text' },
  { name: 'modelo', label: 'Modelo', type: 'text' },
  { name: 'custo', label: 'Custo', type: 'number' },
];

const initialData = [
  {
    id: 1,
    placa: 'ABC1234',
    tipo: 'Caminhão',
    transportadora: 'Transportes Rápidos',
    capacidade: '10 toneladas',
    modelo: 'Volvo FH',
    custo: 5000,
  },
  {
    id: 2,
    placa: 'DEF5678',
    tipo: 'Van',
    transportadora: 'Logística Express',
    capacidade: '1.5 toneladas',
    modelo: 'Mercedes Sprinter',
    custo: 2000,
  },
];

export default function VeiculoPage() {
  const [data, setData] = useState(initialData);

  const handleAdd = (newItem: any) => {
    setData([...data, { id: data.length + 1, ...newItem }]);
  };

  const handleUpdate = (id: number, updatedItem: any) => {
    setData(
      data.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <RegistroGenerico
      title="Registro de Veículo"
      fields={fields}
      data={data}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
