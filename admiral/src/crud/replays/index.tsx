import { createCRUD, TextInput, PasswordInput, SelectInput, BooleanInput } from '@devfamily/admiral'
import React from 'react'

export const CRUD = createCRUD({
    path: '/replays',
    resource: 'replays',
    index: {
        title: 'Replays',
        newButtonText: 'Add',
        tableColumns: [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Series',
                dataIndex: 'series',
                key: 'series',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Start time',
                dataIndex: 'startTime',
                key: 'startTime',
                render: (value) => {
                  const date = new Date(value * 1000);
                  return `${date.toDateString()} ${date.toLocaleTimeString()}`
                },
            },
            {
                title: 'Duration',
                dataIndex: 'duration',
                key: 'duration',
                render: (value) => new Date(value * 1000).toLocaleTimeString()
            },
        ],
    },
    filter: {
      topToolbarButtonText: 'Filter',
      fields: (
          <>
            <TextInput label="Series" name="series" placeholder="Series" />
            <TextInput label="Description" name="description" placeholder="Session description" />
          </>
      ),
      quickFilters: ['series', 'description'],
  },
    form: {
        create: {
            fields: (
                <>
                  <TextInput label="Series" name="series" placeholder="Series" required />
                  <TextInput label="Description" name="description" placeholder="Session description" required />
                </>
            ),
        },
        edit: {
            fields: (
                <>
                  <TextInput label="Series" name="series" placeholder="Series" required />
                  <TextInput label="Description" name="description" placeholder="Session description" required />
                </>
            ),
        },
    },
    create: {
        title: 'Create Replay',
    },
    update: {
        title: (id: string) => `Edit Replay #${id}`,
    },
})
