// imp
// This file will have the names of the document collections

import { TodoDocument } from 'src/todo/todo.document';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  TodoDocument.collectionName,
];
