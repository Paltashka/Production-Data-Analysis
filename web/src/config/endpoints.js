const MAIN_URL = 'http://localhost:3000';

export const endpoints = {
  ordersByTechnology: `${MAIN_URL}/orders/deadline/`,
  orderDue: `${MAIN_URL}/orders/due`,
  piecesByStatus: `${MAIN_URL}/pieces/status`,
  estimate: `${MAIN_URL}/pieces/estimates`
}