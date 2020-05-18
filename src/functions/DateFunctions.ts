import moment from 'moment'

export const filterByDateRange = (dateFrom, dateTo, deliveryDate) => {
  const inputDateFrom = dateFrom ? moment(dateFrom).format('LL') : undefined
  const inputDateTo = dateTo ? moment(dateTo).format('LL') : undefined
  const inputDeliveryDate = moment(deliveryDate).format('LL')
  console.log('Input Dates', inputDateFrom, inputDateTo, inputDeliveryDate)
  if (dateFrom && dateTo) {
    if (
      moment(inputDeliveryDate).isSame(inputDateFrom) ||
      moment(inputDeliveryDate).isSame(inputDateTo)
    ) {
      return true
    }
    if (
      moment(inputDeliveryDate).isAfter(inputDateFrom) &&
      moment(inputDeliveryDate).isBefore(inputDateTo)
    ) {
      return true
    }

    return false
  }

  if (dateTo) {
    if (moment(inputDeliveryDate).isSame(inputDateTo)) {
      return true
    }
    if (moment(inputDeliveryDate).isBefore(inputDateTo)) {
      return true
    }
    return false
  }

  if (dateFrom) {
    if (moment(inputDeliveryDate).isSame(inputDateFrom)) {
      return true
    }
    if (moment(inputDeliveryDate).isAfter(inputDateFrom)) {
      return true
    }
    return false
  }

  return false
}

export const makeFilterDeliveryByDate = (date, days: number) => {
  const inputDate = moment(date).format('LL')
  const endDate = moment().format('LL')
  const startDate = moment(endDate)
    .subtract(days, 'days')
    .format('LL')

  if (
    moment(inputDate).isBefore(endDate) &&
    moment(inputDate).isAfter(startDate)
  ) {
    return true
  }

  if (moment(inputDate).isSame(endDate)) {
    return true
  }

  if (moment(inputDate).isSame(startDate)) {
    return true
  } else {
    return false
  }
}
