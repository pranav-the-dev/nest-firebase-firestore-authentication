import { CollectionReference, Timestamp } from '@google-cloud/firestore';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { FirestoreService } from '../utility/firestore/firestore.service';
import { TodoDocument } from './todo.document';

@Injectable()
export class TodoService {
  constructor(
    @Inject(TodoDocument.collectionName)
    private readonly todosCollection: CollectionReference<TodoDocument>,

    public readonly firestoreService: FirestoreService
  ) {}

  async createTodoFireBase(todoDocument: TodoDocument) {
    const { name } = todoDocument;

    const toDoData = {
      name: todoDocument.name,
    };

    // create a new firestore
    const createToDo: any = this.todosCollection.doc(name);
    await createToDo.set(toDoData);

    // const docRef = this.todosCollection.doc(name);
    // const dueDateMillis = dayjs(dueDate).valueOf();
    // await docRef.set({
    //   name,
    //   dueDate: Timestamp.fromMillis(dueDateMillis),
    // });

    // const todoDoc = await docRef.get();
    // const todo = todoDoc.data();
    // return todo;
  }

  async findAll(): Promise<TodoDocument[]> {
    const snapshot = await this.todosCollection.get();
    const todos: TodoDocument[] = [];
    snapshot.forEach((doc) => todos.push(doc.data()));
    return todos;
  }
}
