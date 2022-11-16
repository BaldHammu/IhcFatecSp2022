import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Tarefa } from './tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private fs: AngularFirestore) { }

  insert(tarefa: Tarefa) {
    this.fs.collection('tarefa').add(Object.assign({},tarefa))
      .then((result: any) => {
        console.log(result.key);
      })
  }

  update(tarefa: Tarefa, key: string) {
    this.fs.doc(`tarefa/${key}`).update(Object.assign({},tarefa))
      .catch((error: any) => {
        console.error(error);
      })
  }

  getAll() {
    return this.fs.collection('tarefa')
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => ({ key: doc.payload.doc.id, ...doc.payload.doc.data() as {} }));
        })
      );
  }

  delete(key: string) {
    this.fs.doc(`tarefa/${key}`).delete()
  }

}
