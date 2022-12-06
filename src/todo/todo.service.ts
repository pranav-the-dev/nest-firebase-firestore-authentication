import { CollectionReference, Timestamp } from '@google-cloud/firestore';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { FirestoreService } from '../utility/firestore/firestore.service';
import { TodoDocument } from './todo.document';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  constructor(
    @Inject(TodoDocument.collectionName)
    private readonly todosCollection: CollectionReference<TodoDocument>,

    public readonly firestoreService: FirestoreService
  ) {}

  async createTodoFirebase(todoDocument: TodoDocument) {
    const { title, description, question, issue, subIssue } = todoDocument;
    const uuid = uuidv4();
    const toDoData = {
      toDoId: uuid,
      title: title,
      description: description,
      question: question,
      issue: issue,
      subIssue: subIssue,
    };

    // create a new firestore
    const createToDo: any = this.todosCollection.doc(toDoData.toDoId);
    await createToDo.set(toDoData);
  }

  async findAllTodos() {
    const snapshot = await this.todosCollection.get();

    if (snapshot.empty) {
      return false;
    }

    const todos: TodoDocument[] = [];
    snapshot.forEach(async (document: { id: any; data: () => any }) => {
      todos.push((document.id, '=>', document.data()));
    });
    return todos;
  }

  async findTodoById(todoDocument: TodoDocument) {
    const snapshot = await this.todosCollection.get();

    const todos: TodoDocument[] = [];
    snapshot.forEach(async (document: { id: any; data: () => any }) => {
      todos.push((document.id, '=>', document.data()));
    });

    const toDoObject = todos.find((obj) => obj.toDoId === todoDocument.toDoId); // get data from array of object
    return toDoObject;
  }
}
