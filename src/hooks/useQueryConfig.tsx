import { ProductListConfig } from 'src/types/product.type'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string | undefined
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || 1,
      sortBy: queryParams.sortBy,
      searchTerm: queryParams.searchTerm,
      active: queryParams.active,
      sortType: queryParams.sortType
    },
    isUndefined
  )

  return queryConfig
}
