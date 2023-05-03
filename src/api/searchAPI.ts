import { AxiosResponse } from 'axios'

import instance from './instance'

interface SearchAPIResponse {
  name: string
  id: number
}

const searchAPI = (
  keyword: string
): Promise<AxiosResponse<SearchAPIResponse[]>> =>
  instance.get(`/search-conditions/?name=${keyword}`, {
    headers: {
      'Cache-Control': 'max-age=86400'
    }
  })

export default searchAPI
