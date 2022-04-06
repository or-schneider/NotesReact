export default function startNoteReminderTimeout(note) {
  const reminderRemainingTime = note.reminderDate - new Date();
  if (reminderRemainingTime <= 0) {
    return null;
  }
  return setTimeout(() => {
    window.alert(
      `Notification:
          ${note.title}
          ${note.content}`
    );
  }, reminderRemainingTime);
}
