'use client';

import { useState, useEffect } from 'react';
import RegistroGenerico from '../../components/registroGenerico';

// Simulating data from the Cidade page
const getCidades = async () => {
  // In a real application, this would be an API call
  return [
    { id: 1, nome: 'São Paulo' },
    { id: 2, nome: 'Rio de Janeiro' },
  ];
};

const fields = [
  { name: 'nome', label: 'Nome', type: 'text' },
  { name: 'cidade', label: 'Cidade', type: 'select', options: [] },
  { name: 'centroDistribuicao', label: 'Centro de Distribuição', type: 'text' },
];

const initialData = [
  { id: 1, nome: 'Zona Sul', cidade: 'São Paulo', centroDistribuicao: 'CD-01' },
  {
    id: 2,
    nome: 'Zona Oeste',
    cidade: 'Rio de Janeiro',
    centroDistribuicao: 'CD-02',
  },
];

export default function RegiaoPage() {
  const [data, setData] = useState(initialData);
  const [cidades, setCidades] = useState<string[]>([]);

  useEffect(() => {
    const fetchCidades = async () => {
      const cidadesData = await getCidades();
      const cidadesNames = cidadesData.map((c) => c.nome);
      setCidades(cidadesNames);
      fields.find((f) => f.name === 'cidade')!.options = cidadesNames;
    };
    fetchCidades();
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
      title="Registro de Região"
      fields={fields}
      data={data}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
