import {
  initializePaddle,
  Paddle,
  Environments,
  CurrencyCode,
} from "@paddle/paddle-js"

let paddleInstance: Paddle | undefined

export const loadPaddle = async () => {
  if (!paddleInstance) {
    paddleInstance = await initializePaddle({
      environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as Environments,
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_KEY as string,
      
      eventCallback: (event) => {
        if (event.name === "checkout.completed") {
          console.log(event.data)
        }
      },
    })
  }

  return paddleInstance
}

export const openCheckout = async (priceId: string, quantity: number) => {
  const paddle = await loadPaddle()

  paddle?.Checkout.open({
    items: [
      {
        priceId: priceId,
        quantity: quantity,
      },
    ],
  })
}

export const openSubscriptionCheckout = async (
  priceId: string,
  email: string
) => {
  const paddle = await loadPaddle()

  paddle?.Checkout.open({
    items: [
      {
        priceId: priceId,
        quantity: 1,

      },
    ],
    customer: {
      email: email,
    },
  })
}
