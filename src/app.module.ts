import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreModule } from './utility/firestore/firestore.module';
import { TodoDocument } from './todo/todo.document';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { FirestoreService } from './utility/firestore/firestore.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        keyFilename: configService.get<string>('KEY_FILE_NAME'),
        projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
      }),
      inject: [ConfigService],
    }),
  ],

  controllers: [AppController, TodoController],
  providers: [AppService, TodoDocument, TodoService, FirestoreService],
})
export class AppModule {}
