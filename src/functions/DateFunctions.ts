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

export const makeFileterShipmentAge = (date, days: number) => {
  const inputDate = moment(date).format('LL')
  const endDate = moment().format('LL')
  const startDate = moment(endDate)
    .subtract(days, 'days')
    .format('LL')

  if (moment(inputDate).isBefore(endDate)) {
    return true
  } else {
    return false
  }
}

export const convertDate = (date1, date2) => {
  const dateOne = moment(date1).format('LL')
  const dateTwo = moment(date2).format('LL')

  if (moment(dateOne).isAfter(dateOne)) {
    return 1
  }
  if (moment(dateOne).isBefore(dateTwo)) {
    return -1
  }
  return 0
}

export const getAge = (date1) => {
  const dateOne = moment(date1).format('LL')

  return moment().diff(dateOne, 'days')
}
