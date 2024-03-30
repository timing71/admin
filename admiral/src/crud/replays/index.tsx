import React from 'react';
import { createCRUD, TextInput } from '@devfamily/admiral';
import { format } from 'date-fns';

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
                  return format(date, "yyyy-MM-dd HH:mm")
                },
            },
            {
                title: 'Duration',
                dataIndex: 'duration',
                key: 'duration',
                render: timeWithHours
            },
            {
                title: 'Replay file',
                dataIndex: 'filename',
                key: 'filename',
                render: (url) => <a href={url}>[Link]</a>
            },
            {
                title: 'Analysis file',
                dataIndex: 'analysisFilename',
                key: 'analysisFilename',
                render: (url) => <a href={url}>[Link]</a>
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
            fields: null,
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
    update: {
        title: (id: string) => `Edit Replay #${id}`,
    },
});

/**
 * Format a time in seconds to (HH:)?MM:SS, allowing HH to be > 23 if needed.
 * @param {number} seconds
 * @returns {string} Formatted time HH:MM:SS.
 */
export function timeWithHours(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    seconds -= (3600 * hours);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds - (60 * minutes));

    const hoursStr = `${hours}`.padStart(2, '0');
    const minutesStr = `${minutes}`.padStart(2, '0');
    const secondsStr = `${seconds}`.padStart(2, '0');

    if (hours > 0) {
        return `${hoursStr}:${minutesStr}:${secondsStr}`;
    }

    return `${minutesStr}:${secondsStr}`;
  };
