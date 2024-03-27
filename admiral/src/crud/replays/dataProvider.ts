import { DataProvider } from '@devfamily/admiral';
import _ from '../../config/request';

const apiUrl = 'https://archive.timing71.org';

export const replayDataProvider: DataProvider = {

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
        'filter[order]': params.sort || 'startTime DESC',
        ...filters
    }

    const count = await replayDataProvider._getTotal(resource, filters);

    const url = `${apiUrl}/${resource}`
    const items = await _.get(url)({ params: query });
    return ({ items, meta: { current_page: page, total: count, per_page: perPage } });
  },

  getOne: (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.id}`
      return _.get(url)({ params })
  },

  getCreateFormData: (resource) => {
      const url = `${apiUrl}/${resource}/create`
      return _.get(url)({})
  },

  getFiltersFormData: (resource) => {

    if (resource === 'replays') {
      const url = `${apiUrl}/${resource}/series`;
      return _.get(url)({}).then(({ series }) => ({ options: { series: series.map((s: string) => ({ label: s, value: s })) } }))
    }

      const url = `${apiUrl}/${resource}/filters`
      return _.get(url)({})
  },

  create: (resource, params) => {
      const url = `${apiUrl}/${resource}`
      return _.post(url)({ data: params.data })
  },

  getUpdateFormData: (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.id}/update`
      return _.get(url)({ params })
  },

  update: (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.id}`
      return _.post(url)({ data: params.data })
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
