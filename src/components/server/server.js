// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require('stripe')('sk_test_51Mu4ZtJo31NhKOMDjMJKPEAfLnAMWWQjyNpCkUNde9mtafy7RLLJ5DgbjuLdICGjQeywZFQZdd0s43RF1kzvWKCw00r4It609v');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(cors({origin:"*"}))

app.post('/create-checkout-session', async (req, res) => {

  const line_items = []
  
  req.body.cart.forEach((item) => {
    const line_item = new Object()
    line_item.price=item._id
    line_item.quantity = item.count
    line_items.push(line_item)
  })

  const session = await stripe.checkout.sessions.create({
    
    line_items: line_items,
    mode: 'payment',
    success_url: `http://localhost:3000/order-success`,
    cancel_url: `http://localhost:3000/order-error`,
  });
  console.log(session);
  res.url = session.url
  app.use(cors({origin:'http://localhost:4242/'}))
  url = res.url
  return res.json(res.url)
});

app.listen(4242, () => console.log('Running on port 4242'));