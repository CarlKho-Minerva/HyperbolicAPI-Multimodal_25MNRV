// marketplace-api.js
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const url = "https://api.hyperbolic.xyz/v1/marketplace";

async function callMarketplace(filter = "", limit = 1) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filters: {
          ...(filter ? { query: filter } : {}),
          limit: limit,
        },
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const processApiResponse = (response) => {
  if (!response.output?.success) {
    throw new Error("API request failed");
  }

  // Return only the first instance from the response
  return response.instances?.[0] || null;
};

async function getGpuPricing() {
  try {
    const response = await callMarketplace();
    return processApiResponse(response);
  } catch (error) {
    console.error("Error fetching GPU pricing:", error);
    throw error;
  }
}

export { callMarketplace, getGpuPricing };
