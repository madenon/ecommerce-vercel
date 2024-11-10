import { stripe } from "../../config/stripe.js";

const endpointSecret = process.env.STIPR_ENDPOINT_WEBHOOK_SECRET_KEY;
const webhooks = async(request, response) => {
  const sig = request.headers["stripe-signature"];

  const payloadString = JSON.stringify(request.body);

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log("sessionsid", session)
      const lineItems =await  stripe.checkout.sessions.listLineItems(session.id)
      console.log("lineItems", lineItems)
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).send();
};

export { webhooks };
