## Hyperbolic Demo by [Carl Kho](https://www.linkedin.com/in/carlkho/): GPU Pricing

This demo showcases the GPU pricing functionality using the Hyperbolic Marketplace API. The demo is designed specifically for the Hyperbolic team and demonstrates how our API can be integrated into a live React application.

<div>
    <a href="https://www.loom.com/share/758ab8840a3d496396de8a785a27c47f">
      <p>Demo for Hyperbolic Team - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/758ab8840a3d496396de8a785a27c47f">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/758ab8840a3d496396de8a785a27c47f-8de09c9a99478ccb-full-play.gif">
    </a>
  </div>

### Setup

1. **Environment Variables**
   Ensure your `.env` file contains the Hyperbolic API key and URL. For example:

   ```
   HYPERBOLIC_API_KEY=your_hyperbolic_api_key
   REACT_APP_HYPERBOLIC_API_KEY=your_api_key_here
   REACT_APP_HYPERBOLIC_API_URL=https://api.hyperbolic.ai
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

### Running the Demo

Start the development server:

```sh
npm install && npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. When the GPU pricing tool is triggered (by an API tool call using the "list_gpu_prices" function), it calls our

callMarketplace

 API endpoint which in turn fetches the latest GPU details.

### How It Works

- The marketplace-api.js module makes a POST request to our Hyperbolic endpoint.
- In `Altair.tsx`, the GPU pricing tool listens for a tool call event. When triggered, it uses the API to fetch GPU data and renders each GPU using the `GpuCard` component.
- Successful responses send back pricing data, and errors are handled gracefully by notifying the user.

This demo is a focused example for the Hyperbolic team to evaluate API integration and real-time GPU pricing functionality.