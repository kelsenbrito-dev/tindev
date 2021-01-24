import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

const allResolvers = fileLoader(path.join(__dirname, '**', '*-resolvers.ts'));
const resolvers = mergeResolvers(allResolvers);

const allTypeDefs = fileLoader(path.join(__dirname, '**', '*.gql'));
const typeDefs = mergeTypes(allTypeDefs);

export default {typeDefs, resolvers};