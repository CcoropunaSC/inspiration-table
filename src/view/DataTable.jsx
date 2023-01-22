import React, { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from '@tanstack/react-table'
import { defaultData } from '../utils/defaultData'
import classNames from 'classnames'
import { info } from 'autoprefixer'

const DataTable = () => {
  const [data, setData] = useState(defaultData)

  const columns = [
    {
      accessorKey: 'name',
      header: () => <span>Nombre</span>,
      cell: info => <span className='font-bold'>{info.getValue()}</span>
    },
    {
      accessorKey: 'lastName',
      header: () => <span>Apellidos</span>
    },
    {
      accessorKey: 'age',
      header: () => <span>Edad</span>
    },
    {
      accessorKey: 'status',
      header: () => <span>Estado</span>,
      cell: info => {
        return (
          <span className={classNames({
            'text-white px-2 rounded-full font-semibold': true,
            'bg-red-500': 'Inactivo' === info.getValue(),
            'bg-green-500': 'Activo' === info.getValue()
          })}>
            {info.getValue()}
          </span>
        )
      }
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <div className='px-6 py-4'>
      <table className='table-auto w-full'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="border-b border-gray-300 text-gray-600 bg-gray-100" >
              {headerGroup.headers.map(header => (
                <th key={header.id} className="py-2 px-4 text-left uppercase">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="text-gray-600 hover:bg-slate-100" >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="py-2 px-4" >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <button
            className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            {'<<'}
          </button>
          <button
            className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            {'<'}
          </button>

          {table.getPageOptions().map((value, key) => (
            <button key={key} 
            className={classNames({
              "text-gray-600 bg-gray-200 py-0.5 px-2 font-bold rounded border border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300": true,
              "bg-indigo-200 text-indigo-700" : value === table.getState().pagination.pageIndex
            })}
            onClick={() => table.setPageIndex(value)}>
              {value + 1}
            </button>
          ))}

          <button
            className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            {'>'}
          </button>
          <button
            className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            {'>>'}
          </button>
        </div>
        <div className='text-gray-600 font-semibold'>
            Mostrando de {Number(table.getRowModel().rows[0].id) + 1}&nbsp; 
            a {Number(table.getRowModel().rows[table.getRowModel().rows.length - 1].id) + 1}&nbsp;
            del total de {defaultData.length} registros
        </div>
        <select 
        className='text-gray-600 border border-gray-300 rounded outline-indigo-700'
        onChange={e => {
          table.setPageSize(Number(e.target.value))
        }}>
          <option value="10">10 pág.</option>
          <option value="20">20 pág.</option>
          <option value="25">25 pág.</option>
          <option value="50">50 pág.</option>
        </select>
      </div>
    </div>
  )
}

export default DataTable