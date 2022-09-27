import axios from "axios"
import moment from "moment"
import { endpoints } from "../config/endpoints"
import { DataItemInterface } from "../interfaces/DataItemInterface"

export const getOrdersByTechnology = async () => {
  const result = await axios.get(endpoints.ordersByTechnology)
  return result.data
}

export const getOrderDue = async () => {
  const result = await axios.get(endpoints.orderDue)
  const formatResult = result.data.map((item: DataItemInterface) => {
    const formatDate = moment(item.status).format("ddd, M/D")
    return {
      ...item,
      status: formatDate
    }
  })
  return formatResult
}

export const getPiecesByStatus = async () => {
  const result = await axios.get(endpoints.piecesByStatus)
  return result.data
}

export const getEstimate = async () => {
  const result = await axios.get(endpoints.estimate)
  return result.data
}