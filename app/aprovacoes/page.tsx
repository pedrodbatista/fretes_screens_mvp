'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';

type ApprovalData = {
  id: number;
  status: 'Aceito' | 'Pendente' | 'Rejeitado';
  placa: string;
  motorista: string;
  empresa: string;
  ultimoValor: string;
  novoValor: string;
};

const initialData: ApprovalData[] = [
  {
    id: 1,
    status: 'Pendente',
    placa: 'ABC1234',
    motorista: 'João Silva',
    empresa: 'Transportes Rápidos',
    ultimoValor: 'R$ 1000,00',
    novoValor: 'R$ 1200,00',
  },
  {
    id: 2,
    status: 'Aceito',
    placa: 'DEF5678',
    motorista: 'Maria Oliveira',
    empresa: 'Logística Express',
    ultimoValor: 'R$ 950,00',
    novoValor: 'R$ 950,00',
  },
  {
    id: 3,
    status: 'Rejeitado',
    placa: 'GHI9012',
    motorista: 'Carlos Santos',
    empresa: 'Entregas Ágeis',
    ultimoValor: 'R$ 1100,00',
    novoValor: 'R$ 1300,00',
  },
  {
    id: 4,
    status: 'Pendente',
    placa: 'JKL3456',
    motorista: 'Ana Pereira',
    empresa: 'Transportadora Veloz',
    ultimoValor: 'R$ 1050,00',
    novoValor: 'R$ 1150,00',
  },
];

export default function ApprovacoesPage() {
  const [approvalData, setApprovalData] = useState<ApprovalData[]>(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ApprovalData | null>(null);
  const [newStatus, setNewStatus] = useState<
    'Aceito' | 'Pendente' | 'Rejeitado'
  >('Pendente');

  const handleStatusChange = (id: number) => {
    const item = approvalData.find((item) => item.id === id);
    if (item) {
      setSelectedItem(item);
      setNewStatus(item.status);
      setIsOpen(true);
    }
  };

  const handleApprove = () => {
    if (selectedItem) {
      const updatedData = approvalData.map((item) =>
        item.id === selectedItem.id ? { ...item, status: newStatus } : item
      );
      setApprovalData(updatedData);
      setIsOpen(false);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">Aprovações</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Placa</th>
              <th className="border px-4 py-2">Motorista</th>
              <th className="border px-4 py-2">Empresa</th>
              <th className="border px-4 py-2">Último Valor</th>
              <th className="border px-4 py-2">Novo Valor</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {approvalData.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.status}</td>
                <td className="border px-4 py-2">{item.placa}</td>
                <td className="border px-4 py-2">{item.motorista}</td>
                <td className="border px-4 py-2">{item.empresa}</td>
                <td className="border px-4 py-2">{item.ultimoValor}</td>
                <td className="border px-4 py-2">{item.novoValor}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleStatusChange(item.id)}
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
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium mb-4">
              Alterar Status
            </Dialog.Title>
            {selectedItem && (
              <div className="space-y-4">
                <p>
                  <strong>Placa:</strong> {selectedItem.placa}
                </p>
                <p>
                  <strong>Motorista:</strong> {selectedItem.motorista}
                </p>
                <p>
                  <strong>Empresa:</strong> {selectedItem.empresa}
                </p>
                <p>
                  <strong>Último Valor:</strong> {selectedItem.ultimoValor}
                </p>
                <p>
                  <strong>Novo Valor:</strong> {selectedItem.novoValor}
                </p>
                <div>
                  <label htmlFor="status" className="block mb-2">
                    Novo Status:
                  </label>
                  <select
                    id="status"
                    value={newStatus}
                    onChange={(e) =>
                      setNewStatus(
                        e.target.value as 'Aceito' | 'Pendente' | 'Rejeitado'
                      )
                    }
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="Aceito">Aceito</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Rejeitado">Rejeitado</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-200 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleApprove}
                    className="bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800"
                  >
                    Aprovar
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
