'use client';

import { useState, useEffect } from 'react';
import RegistroGenerico from '../../components/registroGenerico';

// Simulating data from the Transportadora page
const getTransportadoras = async () => {
  // In a real application, this would be an API call
  return [
    { id: 1, nome: 'Transportes Rápidos' },
    { id: 2, nome: 'Logística Express' },
  ];
};

const fields = [
  { name: 'nome', label: 'Nome', type: 'text' },
  { name: 'documento', label: 'Documento', type: 'text' },
  {
    name: 'transportadora',
    label: 'Transportadora',
    type: 'select',
    options: [],
  },
];

const initialData = [
  {
    id: 1,
    nome: 'João Silva',
    documento: '123.456.789-00',
    transportadora: 'Transportes Rápidos',
  },
  {
    id: 2,
    nome: 'Maria Oliveira',
    documento: '987.654.321-00',
    transportadora: 'Logística Express',
  },
];

export default function MotoristaPage() {
  const [data, setData] = useState(initialData);
  const [transportadoras, setTransportadoras] = useState<string[]>([]);

  useEffect(() => {
    const fetchTransportadoras = async () => {
      const transportadorasData = await getTransportadoras();
      const transportadorasNames = transportadorasData.map((t) => t.nome);
      setTransportadoras(transportadorasNames);
      fields.find((f) => f.name === 'transportadora')!.options =
        transportadorasNames;
    };
    fetchTransportadoras();
  }, []);

  const handleAdd = (newItem: any) => {
    setData((prevData) => [
      ...(prevData || []),
      { id: (prevData?.length || 0) + 1, ...newItem },
    ]);
  };

  const handleUpdate = (id: number, updatedItem: any) => {
    setData((prevData) =>
      (prevData || []).map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setData((prevData) => (prevData || []).filter((item) => item.id !== id));
  };

  return (
    <RegistroGenerico
      title="Registro de Motorista"
      fields={fields}
      data={data}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
