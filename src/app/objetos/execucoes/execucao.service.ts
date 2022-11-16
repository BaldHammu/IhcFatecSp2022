import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Execucao } from './execucao';

@Injectable({
  providedIn: 'root'
})
export class ExecucaoService {

  constructor(private fs: AngularFirestore) { }

  insert(execucao: Execucao) {
    this.fs.collection('execucao').add(Object.assign({},execucao))
      .then((result: any) => {
        console.log(result.key);
      })
  }

  update(execucao: Execucao, key: string) {
    this.fs.doc(`execucao/${key}`).update(Object.assign({},execucao))
      .catch((error: any) => {
        console.error(error);
      })
  }

  getAll() {
    return this.fs.collection('execucao')
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => ({ key: doc.payload.doc.id, ...doc.payload.doc.data() as {} }));
        })
      );
  }

  delete(key: string) {
    this.fs.doc(`execucao/${key}`).delete()
  }
}
