'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

type Field = {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select';
  options?: string[];
};

type Props = {
  title: string;
  fields: Field[];
  data: any[];
  onAdd: (newItem: any) => void;
  onUpdate: (id: number, updatedItem: any) => void;
  onDelete: (id: number) => void;
};

export default function RegistroGenerico({
  title,
  fields,
  data,
  onAdd,
  onUpdate,
  onDelete,
}: Props) {
  const [tableData, setTableData] = useState<any[]>([]);
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState<any>({});

  useEffect(() => {
    setTableData(data || []);
  }, [data]);

  const handleFilter = () => {
    if (filterField && filterValue) {
      const filtered = (data || []).filter((item) =>
        String(item[filterField])
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
      setTableData(filtered);
    } else {
      setTableData(data || []);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (editingItem && editingItem.id) {
      onUpdate(editingItem.id, editingItem);
      setIsEditOpen(false);
    }
  };

  const handleDelete = () => {
    if (editingItem && editingItem.id) {
      onDelete(editingItem.id);
      setIsEditOpen(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    isNewItem: boolean = false
  ) => {
    const { name, value } = e.target;
    if (isNewItem) {
      setNewItem((prev) => ({ ...prev, [name]: value }));
    } else {
      setEditingItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAdd = () => {
    setIsAddOpen(false);
    setIsConfirmOpen(true);
  };

  const confirmAdd = () => {
    onAdd(newItem);
    setNewItem({});
    setIsConfirmOpen(false);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      <div className="mb-4 flex space-x-4">
        <select
          value={filterField}
          onChange={(e) => setFilterField(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">Selecione um campo</option>
          {fields.map((field) => (
            <option key={field.name} value={field.name}>
              {field.label}
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
          onClick={handleFilter}
          className="bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800"
        >
          Filtrar
        </button>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600"
        >
          Registrar
        </button>
      </div>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {fields.map((field) => (
                <th key={field.name} className="border px-4 py-2">
                  {field.label}
                </th>
              ))}
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                {fields.map((field) => (
                  <td key={field.name} className="border px-4 py-2">
                    {item[field.name]}
                  </td>
                ))}
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white rounded-md px-3 py-1 text-sm hover:bg-blue-600"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium mb-4">
              Editar Registro
            </Dialog.Title>
            {editingItem && (
              <div className="space-y-4">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={`edit-${field.name}`}
                      className="block mb-1"
                    >
                      {field.label}:
                    </label>
                    {field.type === 'select' ? (
                      <select
                        id={`edit-${field.name}`}
                        name={field.name}
                        value={editingItem[field.name] || ''}
                        onChange={(e) => handleInputChange(e)}
                        className="w-full border border-gray-300 rounded-md p-2"
                      >
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        id={`edit-${field.name}`}
                        name={field.name}
                        value={editingItem[field.name] || ''}
                        onChange={(e) => handleInputChange(e)}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    )}
                  </div>
                ))}
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setIsEditOpen(false)}
                    className="bg-gray-200 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                  >
                    Deletar
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                  >
                    Atualizar
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium mb-4">
              Adicionar Novo Registro
            </Dialog.Title>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={`add-${field.name}`} className="block mb-1">
                    {field.label}:
                  </label>
                  {field.type === 'select' ? (
                    <select
                      id={`add-${field.name}`}
                      name={field.name}
                      value={newItem[field.name] || ''}
                      onChange={(e) => handleInputChange(e, true)}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Selecione</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={`add-${field.name}`}
                      name={field.name}
                      value={newItem[field.name] || ''}
                      onChange={(e) => handleInputChange(e, true)}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setIsAddOpen(false)}
                  className="bg-gray-200 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAdd}
                  className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600"
                >
                  Registrar
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium mb-4">
              Confirmar Registro
            </Dialog.Title>
            <p className="mb-4">
              Deseja realmente criar este registro com os seguintes dados?
            </p>
            <div className="space-y-2 mb-4">
              {fields.map((field) => (
                <p key={field.name}>
                  <strong>{field.label}:</strong> {newItem[field.name] || ''}
                </p>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="bg-gray-200 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmAdd}
                className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600"
              >
                Confirmar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
