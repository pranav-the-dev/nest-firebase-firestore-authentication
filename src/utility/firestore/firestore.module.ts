import { Module, DynamicModule } from '@nestjs/common';
import { Firestore, Settings } from '@google-cloud/firestore';
import { FirestoreDatabaseProvider, FirestoreOptionsProvider, FirestoreCollectionProviders } from './firestore.provider';

type FirestoreModuleOptions = {
  imports: any[];
  useFactory: (...args: any[]) => Settings;
  inject: any[];
};

@Module({})
export class FirestoreModule {
  static forRoot(options: FirestoreModuleOptions): DynamicModule {
    const optionsProvider = {
      // imp .
      // Provide is the “name” of this provider. How will NestJS call it when it needs to retrieve it for injection.
      provide: FirestoreOptionsProvider, // here provider hold 'firestoreOptions'
      // We will use one of the constants we created.
      useFactory: options.useFactory, //useFactory is the function that will return whatever this provider will hold.
      inject: options.inject, //  inject refers to what we need to inject to this provider for it to work.
    };

    // It will provide database connection of firestore
    const dbProvider = {
      provide: FirestoreDatabaseProvider, // here provider hold 'firestoredb'
      useFactory: (config: Settings) => new Firestore(config), //This function returns a new instance of Firestore
      inject: [FirestoreOptionsProvider], //  inject is also a dependency, but the interesting thing here is that this dependency is our options created in the last provider.
    };

    // imp
    /* We just saved a Firestore instance into our dependencies */

    // This creates a provider for each document collection that we saved in FirestoreCollectionNames. Don’t worry, it is still an empty array.
    const collectionProviders = FirestoreCollectionProviders.map((providerName) => ({
      provide: providerName,
      useFactory: (db: any) => db.collection(providerName),
      inject: [FirestoreDatabaseProvider],
    }));

    return {
      global: true,
      module: FirestoreModule,
      imports: options.imports,
      providers: [optionsProvider, dbProvider, ...collectionProviders],
      exports: [dbProvider, ...collectionProviders],
    };
  }
}
