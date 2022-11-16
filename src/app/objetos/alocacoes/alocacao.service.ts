import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Alocacao } from './alocacao';

@Injectable({
  providedIn: 'root'
})
export class AlocacaoService {

  constructor(private fs: AngularFirestore) { }

  insert(alocacao: Alocacao) {
    this.fs.collection('alocacao').add(Object.assign({},alocacao))
      .then((result: any) => {
        console.log(result.key);
      })
  }

  update(alocacao: Alocacao, key: string) {
    this.fs.doc(`alocacao/${key}`).update(Object.assign({},alocacao))
      .catch((error: any) => {
        console.error(error);
      })
  }

  getAll() {
    return this.fs.collection('alocacao')
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => ({ key: doc.payload.doc.id, ...doc.payload.doc.data() as {} }));
        })
      );
  }

  delete(key: string) {
    this.fs.doc(`alocacao/${key}`).delete()
  }

}
