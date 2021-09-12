exports.selfDeletingMessage = (channel, message, timeout = 5000) => {
    channel.send(message)
        .then((msg) => {
            setTimeout(() => {
                msg.delete();
            }, timeout);
        });
}