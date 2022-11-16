import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Pessoa } from './pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private fs: AngularFirestore) { }

  insert(pessoa: Pessoa) {
    this.fs.collection('pessoa').add(Object.assign({},pessoa))
      .then((result: any) => {
        console.log(result.key);
      })
  }

  update(pessoa: Pessoa, key: string) {
    this.fs.doc(`pessoa/${key}`).update(Object.assign({},pessoa))
      .catch((error: any) => {
        console.error(error);
      })
  }

  getAll() {
    return this.fs.collection('pessoa')
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => ({ key: doc.payload.doc.id, ...doc.payload.doc.data() as {} }));
        })
      );
  }

  delete(key: string) {
    this.fs.doc(`pessoa/${key}`).delete()
  }
}
