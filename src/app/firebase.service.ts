import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private readonly firestore: AngularFirestore,
  ) { }


  async addQuestion(ques: Question): Promise<boolean> {
    try {

      let level: string

      if (ques.level === 1)
        level = "level_one"
      else if (ques.level === 2)
        level = "level_two"
      else if (ques.level === 3)
        level = "level_three"
      else
        level = "level_one"

      const res = await this.firestore.collection('fl_content')
        .add({
          "freePack": "subscription_free",
          "grade": "grade_pre",
          "level_name": level,
          "session_answer": ques.session_answer,
          "session_comment": ques.session_comment,
          "session_question": ques.session_question,
          "topic_name": ques.topic_name,
        })

      console.log("Document Created with ID:", res.id)

      return true
    } catch ({ message }) {
      console.log(message)
      return false
    }
  }
}
