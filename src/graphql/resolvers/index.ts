import { mergeResolvers } from 'merge-graphql-schemas'

import completedReport from './completedReport'
import varianceReport from './varianceReport'

const resolvers: any[] = [completedReport, varianceReport]

export default mergeResolvers(resolvers)
