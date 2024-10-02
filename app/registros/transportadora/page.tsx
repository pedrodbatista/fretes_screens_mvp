'use client';

import { useState } from 'react';
import RegistroGenerico from '../../components/registroGenerico';

const fields = [
  { name: 'nome', label: 'Nome', type: 'text' },
  { name: 'cnpj', label: 'CNPJ', type: 'text' },
  { name: 'responsavel', label: 'Responsável', type: 'text' },
  { name: 'numeroResponsavel', label: 'Número do Responsável', type: 'text' },
];

const initialData = [
  {
    id: 1,
    nome: 'Transportes Rápidos',
    cnpj: '12.345.678/0001-90',
    responsavel: 'João Silva',
    numeroResponsavel: '(11) 98765-4321',
  },
  {
    id: 2,
    nome: 'Logística Express',
    cnpj: '98.765.432/0001-10',
    responsavel: 'Maria Oliveira',
    numeroResponsavel: '(21) 91234-5678',
  },
];

export default function TransportadoraPage() {
  const [data, setData] = useState(initialData);

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
      title="Registro de Transportadora"
      fields={fields}
      data={data}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
