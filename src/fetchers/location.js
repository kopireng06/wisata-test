import axios from 'axios'
import { BASE_API_URL } from '../constants/query'

const getLocationsByQuery = (query) =>
  axios({
    url: `${BASE_API_URL}/location/fts`,
    method: 'get',
    params: {
      query
    }
  }).then((res) => res.data)

const getLocationsDetail = (location_ids) =>
  axios({
    url: `${BASE_API_URL}/location`,
    method: 'get',
    params: {
      id: location_ids
    }
  }).then((res) => res.data)

export { getLocationsByQuery, getLocationsDetail }
