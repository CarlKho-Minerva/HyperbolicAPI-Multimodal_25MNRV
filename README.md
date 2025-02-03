## Hyperbolic Demo by [Carl Kho](https://www.linkedin.com/in/carlkho/) — GPU Pricing

This demo showcases the GPU pricing functionality using the Hyperbolic Marketplace API. The demo is designed specifically for the Hyperbolic team and demonstrates how our API can be integrated into a live React application.

<div align="center">
  <a href="https://www.loom.com/share/758ab8840a3d496396de8a785a27c47f">
    <p><strong>Demo for Hyperbolic Team - Watch Video</strong></p>
  </a>
  <a href="https://www.loom.com/share/758ab8840a3d496396de8a785a27c47f">
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/758ab8840a3d496396de8a785a27c47f-8de09c9a99478ccb-full-play.gif" alt="Demo Video">
  </a>
</div>

### Setup

1. **Environment Variables**
   Create a `.env` file with the following variables:

   ```env
   # Gemini
   REACT_APP_GEMINI_API_KEY=""

   # Hyperbolic
   HYPERBOLIC_API_KEY=""
   REACT_APP_HYPERBOLIC_API_URL=https://api.hyperbolic.ai
   ```

### Running the Demo

1. Install dependencies and start the server:
   ```sh
   npm install && npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

The GPU pricing tool is triggered by an API tool call using the `list_gpu_prices` function, which calls our `callMarketplace` API endpoint to fetch the latest GPU details.

### How It Works

- The `marketplace-api.js` module makes a POST request to our Hyperbolic endpoint
- `Altair.tsx` listens for tool call events and uses the API to fetch GPU data
- todo: GPU data is rendered using the `GpuCard` component
- Responses include pricing data with graceful error handling

I need to borrow GPU power from you guys. The demo makes it so slow!
