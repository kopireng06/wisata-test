import axios from 'axios'
import { BASE_API_URL } from '../constants/query'

const getPropertiesByQuery = (query) =>
  axios({
    url: `${BASE_API_URL}/property/fts`,
    method: 'get',
    params: {
      query
    }
  }).then((res) => res.data)

const getPropertiesDetail = (property_ids) =>
  axios({
    url: `${BASE_API_URL}/property`,
    method: 'get',
    params: {
      id: property_ids
    }
  }).then((res) => res.data)

const getPropertyAvailability = (property_id) =>
  axios({
    url: `${BASE_API_URL}/property/availability/${property_id}`,
    method: 'get',
    params: {
      id: property_id
    }
  }).then((res) => res.data)

export { getPropertiesByQuery, getPropertiesDetail, getPropertyAvailability }
