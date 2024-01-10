import { useQuery } from '@tanstack/react-query'
import { getPropertiesDetail, getPropertiesByQuery, getPropertyAvailability } from '../../fetchers/property'

const USE_SEARCH_PROPERTIES_KEY = 'search_properties'

const useSearchProperties = ({ query, options }) =>
  useQuery({
    queryKey: [USE_SEARCH_PROPERTIES_KEY, query],
    queryFn: () => getPropertiesByQuery(query),
    enabled: !!query,
    ...options
  })

const USE_PROPERTIES_DETAIL_KEY = 'properties_detail'

const usePropertiesDetail = ({ property_ids = [], options }) =>
  useQuery({
    queryKey: [USE_PROPERTIES_DETAIL_KEY, property_ids],
    queryFn: () => getPropertiesDetail(property_ids),
    enabled: !!property_ids.length,
    ...options
  })

const USE_PROPERTY_AVAILABILITY_KEY = 'property_detail'

const usePropertyAvailability = ({ property_id, options }) =>
  useQuery({
    queryKey: [USE_PROPERTY_AVAILABILITY_KEY, property_id],
    queryFn: () => getPropertyAvailability(property_id),
    enabled: !!property_id,
    ...options
  })

export {
  USE_SEARCH_PROPERTIES_KEY,
  USE_PROPERTIES_DETAIL_KEY,
  USE_PROPERTY_AVAILABILITY_KEY,
  useSearchProperties,
  usePropertiesDetail,
  usePropertyAvailability
}
