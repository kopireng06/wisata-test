import { useQuery } from '@tanstack/react-query'
import { getLocationsDetail, getLocationsByQuery } from '../../fetchers/location'

const USE_SEARCH_LOCATIONS_KEY = 'search_locations'

const useSearchLocations = ({ query, options }) =>
  useQuery({
    queryKey: [USE_SEARCH_LOCATIONS_KEY, query],
    queryFn: () => getLocationsByQuery(query),
    enabled: !!query,
    ...options
  })

const USE_LOCATIONS_DETAIL_KEY = 'locations_detail'

const useLocationsDetail = ({ location_ids = [], options }) =>
  useQuery({
    queryKey: [USE_LOCATIONS_DETAIL_KEY, location_ids],
    queryFn: () => getLocationsDetail(location_ids),
    enabled: !!location_ids.length,
    ...options
  })

export { USE_SEARCH_LOCATIONS_KEY, USE_LOCATIONS_DETAIL_KEY, useLocationsDetail, useSearchLocations }
