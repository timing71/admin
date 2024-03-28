import { createCRUD } from '@devfamily/admiral'
import React from 'react';

export const CRUD = createCRUD({
    path: '/errors',
    resource: 'errors',
    index: {
        title: 'Errors',
        newButtonText: 'Add',
        tableColumns: [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 100
            },
            {
                title: 'Error text',
                dataIndex: 'errorText',
                key: 'errorText',
            },
            {
                title: 'Replay file',
                dataIndex: 'filename',
                key: 'filename',
                render: (url) => <a href={`https://s3.us-east-005.backblazeb2.com/t71-archive/${url}`}>[Link]</a>,
                width: 150
            },
            {
                title: 'Retries',
                dataIndex: 'retries',
                key: 'retries',
                width: 100
            },
        ],
    },
    form: {
        create: {
            fields: null,
        },
        edit: {
            fields: null,
        },
    },
    update: {
        title: (id: string) => `Edit Replay #${id}`,
    },
})
