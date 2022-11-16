import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Projeto } from './projeto';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor(private fs: AngularFirestore) { }

  insert(projeto: Projeto) {
    this.fs.collection('projeto').add(Object.assign({},projeto))
      .then((result: any) => {
        console.log(result.key);
      })
  }

  update(projeto: Projeto, key: string) {
    this.fs.doc(`projeto/${key}`).update(Object.assign({},projeto))
      .catch((error: any) => {
        console.error(error);
      })
  }

  getAll() {
    return this.fs.collection('projeto')
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => ({ key: doc.payload.doc.id, ...doc.payload.doc.data() as {} }));
        })
      );
  }

  delete(key: string) {
    this.fs.doc(`projeto/${key}`).delete()
  }
}
