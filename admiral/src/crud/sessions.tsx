import React, { useEffect } from 'react';
import { createCRUD, CreateParams, DataProvider, DatePickerInput, DeleteParams, GetOneParams, ReorderParams, TextInput, UpdateParams, useForm } from '@devfamily/admiral';
import { add, format, formatISO, getSeconds, isBefore, set } from 'date-fns';

import _ from '../config/request';
import dataProvider from '../config/dataProvider';

const SessionForm = () => {

  const { setValues, values: { endTime, start, ...values } } = useForm();

  useEffect(
    () => {
      if (start) {
        const parsedStart = new Date(start);
        // Ensure seconds component of date is always 0
        if (getSeconds(parsedStart) !== 0) {
          setValues({ start: formatISO(set(parsedStart, { seconds: 0 })), endTime, ...values });
        }
        else {
          const parsedEndTime = new Date(endTime);
          // Default end time to one hour after start time; re-set the end time
          // if necessary to ensure it's after start time if it already exists.
          if (!endTime || isBefore(parsedEndTime, parsedStart)) {
            setValues({
              endTime: formatISO(
                add(parsedStart, { hours: 1 })
              ),
              start,
              ...values
            });
          }
        }
      }
    },
    [start]
  )

  return (
    <>
      <TextInput label="Description" name="description" placeholder="Session description" required />
      <TextInput label="Source" name="source" placeholder="Data source URL" required />
      <DatePickerInput label="Start time" name="start" required showTime showSecond={false} />
      <DatePickerInput label="End time" name="endTime" required showTime showSecond={false} />
    </>
  )
}

export const CRUD = createCRUD({
    path: '/sessions',
    resource: 'sessions',
    index: {
        title: 'Scheduled sessions',
        newButtonText: 'Add',
        tableColumns: [
            {
                title: 'Session ID',
                dataIndex: 'sessionID',
                key: 'sessionID',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Source',
                dataIndex: 'source',
                key: 'source',
                render: (value) => value && <a href={value}>{value}</a>
            },
            {
                title: 'Start time',
                dataIndex: 'start',
                key: 'start',
                render: (value) => {
                  const date = new Date(value);
                  return format(date, "yyyy-MM-dd HH:mm")
                },
                width: 200
            },
            {
                title: 'Duration',
                dataIndex: 'durationSeconds',
                key: 'durationSeconds',
                render: timeWithHours,
                width: 150
            },
            {
              title: 'Started',
              dataIndex: 'started',
              key: 'started',
              render: (value) => value ? 'Yes' : 'No',
              width: 100
            },
            {
              title: 'Running',
              dataIndex: 'running',
              key: 'running',
              render: (value) => value ? 'Yes' : 'No',
              width: 100
            }
        ],
    },
    form: {
        create: {
          fields: (
            <SessionForm />
          ),
        },
        edit: {
          fields: (
              <SessionForm />
          ),
        },
    },
    update: {
        title: (id: string) => `Edit Session ${id}`,
    },
    create: {
      title: "Add new session"
    }
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

type SessionType = {
  sessionID: string
}

export const dvrDataProvider = (apiUrl: string): DataProvider => {
  const dp = dataProvider(apiUrl);

  return {
    getList: async (resource, params) => {
      const { page, perPage } = params.pagination || { page: 1, perPage: 10 }

      const query = {
          page,
          perPage,
          sort: params.sort,
          filter: params.filter,
      }

      const url = `${apiUrl}/${resource}`
      const apiResult = await _.get(url)({ params: query });
      return {
        ...apiResult,
        items: apiResult.items.map(
          (i: SessionType) => ({ ...i, id: i.sessionID })
        )
      }
    },

    getOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        return _.get(url)({ params }).then((i) => ({ ...i, data: { ...i.data, id: i.sessionID } }))
    },

    getCreateFormData: (resource: string) => dp.getCreateFormData(resource),

    getFiltersFormData: (resource: string) => dp.getFiltersFormData(resource),

    create: (resource: string, params: CreateParams) => dp.create(resource, filterIDParam(params)),

    getUpdateFormData: (resource: string, params: GetOneParams) => dp.getUpdateFormData(resource, params),

    update: (resource: string, params: UpdateParams) => dp.update(resource, filterUpdateParams(params)),

    deleteOne: (resource: string, params: DeleteParams) => dp.deleteOne(resource, params),

    reorderList: (resource: string, params: ReorderParams) => dp.reorderList(resource, params)
  }
}

const filterIDParam = (obj: CreateParams) => {
  const { id, ...data } = obj.data;
  return { ...obj, data};
}

const filterUpdateParams = (obj: UpdateParams) => {
  const { id, durationSeconds, ...data } = obj.data;
  return { ...obj, data};
}
