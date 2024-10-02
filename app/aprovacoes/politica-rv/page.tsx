'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';

const initialData = [
  {
    id: 1,
    nome: 'João Silva',
    politica: 'RV001',
    funcao: 'Motorista',
    status: 'Pendente',
  },
  {
    id: 2,
    nome: 'Maria Oliveira',
    politica: 'RV002',
    funcao: 'Gerente',
    status: 'Aprovado',
  },
  {
    id: 3,
    nome: 'Carlos Santos',
    politica: 'RV003',
    funcao: 'Coordenador',
    status: 'Rejeitado',
  },
];

export default function PoliticaRVPage() {
  const [data, setData] = useState(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Aprovação de Política de RV</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Nome</th>
              <th className="border px-4 py-2">Política</th>
              <th className="border px-4 py-2">Função</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.nome}</td>
                <td className="border px-4 py-2">{item.politica}</td>
                <td className="border px-4 py-2">{item.funcao}</td>
                <td className="border px-4 py-2">{item.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsOpen(true);
                    }}
                    className="bg-black text-white rounded-md px-3 py-1 text-sm hover:bg-gray-800"
                  >
                    Alterar Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium mb-4">
              Alterar Status
            </Dialog.Title>
            {selectedItem && (
              <div>
                <p>
                  <strong>Nome:</strong> {selectedItem.nome}
                </p>
                <p>
                  <strong>Política:</strong> {selectedItem.politica}
                </p>
                <p>
                  <strong>Função:</strong> {selectedItem.funcao}
                </p>
                <p>
                  <strong>Status Atual:</strong> {selectedItem.status}
                </p>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() =>
                      handleStatusChange(selectedItem.id, 'Aprovado')
                    }
                    className="w-full bg-green-500 text-white rounded px-4 py-2"
                  >
                    Aprovar
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(selectedItem.id, 'Rejeitado')
                    }
                    className="w-full bg-red-500 text-white rounded px-4 py-2"
                  >
                    Rejeitar
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-gray-300 text-gray-800 rounded px-4 py-2"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
