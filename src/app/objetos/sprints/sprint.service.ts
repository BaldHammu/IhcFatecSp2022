import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Sprint } from './sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private fs: AngularFirestore) { }

  insert(sprint: Sprint) {
    this.fs.collection('sprint').add(Object.assign({},sprint))
      .then((result: any) => {
        console.log(result.key);
      })
  }

  update(sprint: Sprint, key: string) {
    this.fs.doc(`sprint/${key}`).update(Object.assign({},sprint))
      .catch((error: any) => {
        console.error(error);
      })
  }

  getAll() {
    return this.fs.collection('sprint')
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => ({ key: doc.payload.doc.id, ...doc.payload.doc.data() as {} }));
        })
      );
  }

  delete(key: string) {
    this.fs.doc(`sprint/${key}`).delete()
  }

}
