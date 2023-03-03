class Message {
  role;

  content;

  constructor(role, content) {
    this.role = role;
    this.content = content.trim();
  }
}

export default Message;
