const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

exports.handler = async (event) => {
  const body = new URLSearchParams(event.body);
  const socketId = body.get("socket_id");
  const channel = body.get("channel_name");

  if (!socketId || !channel) {
    return { statusCode: 400, body: "Fehlende Parameter" };
  }

  try {
    const authResponse = pusher.authorizeChannel(socketId, channel);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authResponse)
    };
  } catch (error) {
    return { statusCode: 500, body: "Serverfehler" };
  }
};