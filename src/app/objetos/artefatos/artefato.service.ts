import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Artefato } from './artefato';

@Injectable({
  providedIn: 'root'
})
export class ArtefatoService {

  constructor(private fs: AngularFirestore) { }

  insert(artefato: Artefato) {
    this.fs.collection('artefato').add(Object.assign({},artefato))
      .then((result: any) => {
        console.log(result.key);
      })
  }

  update(artefato: Artefato, key: string) {
    this.fs.doc(`artefato/${key}`).update(Object.assign({},artefato))
      .catch((error: any) => {
        console.error(error);
      })
  }

  getAll() {
    return this.fs.collection('artefato')
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => ({ key: doc.payload.doc.id, ...doc.payload.doc.data() as {} }));
        })
      );
  }

  delete(key: string) {
    this.fs.doc(`artefato/${key}`).delete()
  }
}
