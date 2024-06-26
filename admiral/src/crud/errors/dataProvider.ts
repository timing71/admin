import { DataProvider } from '@devfamily/admiral';
import _ from '../../config/request';

const apiUrl = import.meta.env.VITE_ARCHIVE_URL || 'https://archive.timing71.org';

export const errorsDataProvider: DataProvider = {

  getList: async (resource, params) => {
    const { page, perPage } = params.pagination || { page: 1, perPage: 10 }

    const filters = Object.fromEntries(
      Object.entries(params.filter || {}).map(
        ([key, value]) => [`filter[where][${key}][ilike]`, `%${value}%`]
      ).filter(
        ([_, v]) => v !== '%%'
      )
    );

    const query = {
        'filter[skip]' : (page - 1) * perPage,
        'filter[limit]': perPage,
        'filter[order]': params.sort,
        ...filters
    }

    const count = await errorsDataProvider._getTotal(resource, filters);

    const url = `${apiUrl}/${resource}`
    const items = await _.get(url)({ params: query });
    return ({ items, meta: { current_page: page, total: count, per_page: perPage } });
  },

  getOne: (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.id}`
      return _.get(url)({ params })
  },

  getCreateFormData: (resource) => {
    throw new Error('Create not implemented for replays!');
  },

  getFiltersFormData: (resource) => {
   return Promise.resolve({ options: {} });
  },

  create: (resource, params) => {
      throw new Error('Create not implemented for replays!');
  },

  getUpdateFormData: (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.id}`
      return _.get(url)({ params }).then(data => ({ data, values: {} }))
  },

  update: (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.id}`
      return _.patch(url)({ data: filterNullValues(params.data) })
  },

  deleteOne: (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.id}`
      return _.delete(url)()
  },

  reorderList: (resource, params) => {
      const url = `${apiUrl}/${resource}/reorder`
      return _.postFD(url)({ data: params.data })
  },

  _getTotal: (resource: string, filterQuery: object) => {
    const url = `${apiUrl}/${resource}/count`;

    const filterParams = Object.fromEntries(
      Object.entries(filterQuery || {}).map(
        ([k, v]) => [`where[${k.slice(14)}`, v]
      )
    );
    return _.get(url)({ params: filterParams }).then(result => result.count);
  }

}

const filterNullValues = (obj: object) => Object.fromEntries(
  Object.entries(obj).filter(
    ([k, v]) => !!v
  )
);
