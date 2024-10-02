'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';

const initialData = [
  {
    id: 1,
    idRota: 'R001',
    valor: 100,
    motivo: 'Hora extra',
    justificativa: 'Atraso na entrega',
    status: 'Pendente',
  },
  {
    id: 2,
    idRota: 'R002',
    valor: 150,
    motivo: 'Pernoite',
    justificativa: 'Entrega em cidade distante',
    status: 'Aprovado',
  },
  {
    id: 3,
    idRota: 'R003',
    valor: 80,
    motivo: 'Alimentação',
    justificativa: 'Viagem longa',
    status: 'Rejeitado',
  },
];

export default function ExtrasPage() {
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
      <h1 className="text-3xl font-bold mb-6">Aprovação de Extras</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID da Rota</th>
              <th className="border px-4 py-2">Valor</th>
              <th className="border px-4 py-2">Motivo</th>
              <th className="border px-4 py-2">Justificativa</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.idRota}</td>
                <td className="border px-4 py-2">R$ {item.valor.toFixed(2)}</td>
                <td className="border px-4 py-2">{item.motivo}</td>
                <td className="border px-4 py-2">{item.justificativa}</td>
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
                  <strong>ID da Rota:</strong> {selectedItem.idRota}
                </p>
                <p>
                  <strong>Valor:</strong> R$ {selectedItem.valor.toFixed(2)}
                </p>
                <p>
                  <strong>Motivo:</strong> {selectedItem.motivo}
                </p>
                <p>
                  <strong>Justificativa:</strong> {selectedItem.justificativa}
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
