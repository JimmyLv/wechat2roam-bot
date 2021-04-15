class RoomNameMatcher {
  constructor(handlers) {
    this.handlers = handlers;
  }

  async match(message) {
    const room = message.room();
    if (!room) {
      return [];
    }

    const topic = await room.topic();
    return this.handlers.filter((h) => topic.includes(h.roomName));
  }
}

module.exports = RoomNameMatcher;
