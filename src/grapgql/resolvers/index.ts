import { mergeResolvers } from "merge-graphql-schemas";

import report from "./completedReport";

const resolvers: any[] = [report];

export default mergeResolvers(resolvers);
