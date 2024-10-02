'use client';

import { useState } from 'react';
import RegistroGenerico from '../../components/registroGenerico';

const fields = [
  { name: 'nome', label: 'Nome', type: 'text' },
  { name: 'uf', label: 'UF', type: 'text' },
];

const initialData = [
  { id: 1, nome: 'São Paulo', uf: 'SP' },
  { id: 2, nome: 'Rio de Janeiro', uf: 'RJ' },
];

export default function CidadePage() {
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
      title="Registro de Cidade"
      fields={fields}
      data={data}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
