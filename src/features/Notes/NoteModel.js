export default class NoteModel {
  constructor(createDate, title, content, updateDate) {
    this.createDate = createDate;
    this.title = title;
    this.content = content;
    this.updateDate = updateDate;
    this.isArchived = false;
    this.reminderDate = null;
    this.reminderTimeout = null;
  }
}
