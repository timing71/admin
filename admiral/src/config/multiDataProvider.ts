import { CreateParams, DataProvider, DeleteParams, GetOneParams, ReorderParams, UpdateParams } from '@devfamily/admiral';

export const multiDataProvider = (resourceMap: { [key: string]: DataProvider }) : DataProvider => {
  return {

    getList: (resource: string, params: object) => resourceMap[resource].getList(resource, params),

    getOne: (resource: string, params: GetOneParams) => resourceMap[resource].getOne(resource, params),

    getCreateFormData: (resource: string) => resourceMap[resource].getCreateFormData(resource),

    getFiltersFormData: (resource: string) => resourceMap[resource].getFiltersFormData(resource),

    create: (resource: string, params: CreateParams) => resourceMap[resource].create(resource, params),

    getUpdateFormData: (resource: string, params: GetOneParams) => resourceMap[resource].getUpdateFormData(resource, params),

    update: (resource: string, params: UpdateParams) => resourceMap[resource].update(resource, params),

    deleteOne: (resource: string, params: DeleteParams) => resourceMap[resource].deleteOne(resource, params),

    reorderList: (resource: string, params: ReorderParams) => resourceMap[resource].reorderList(resource, params)
  }
}
