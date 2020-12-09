import { Component } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flamelink';

  level: string = ""
  session_answer: string = ""
  session_comment: string = ""
  session_question: string = ""
  topic_name: string = ""

  error: string
  loading: boolean = false

  constructor(
    private readonly fService: FirebaseService,
  ) { }


  async uploadQuestion() {
    this.loading = true
    const res = await this.fService.addQuestion({
      level: parseInt(this.level.trim()),
      session_answer: this.session_answer,
      session_comment: this.session_comment,
      session_question: this.session_question,
      topic_name: this.topic_name,
    })

    if (!res) {
      this.error = "Cannot insert document"
    } else {
      this.error = undefined
      this.level = ""
      this.session_answer = ""
      this.session_comment = ""
      this.session_question = ""
      this.topic_name = ""
    }
    this.loading = false
  }
}
