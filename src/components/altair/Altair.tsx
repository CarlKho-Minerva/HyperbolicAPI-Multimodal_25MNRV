import { type FunctionDeclaration, SchemaType } from "@google/generative-ai";
import { useEffect, useState, memo } from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import { ToolCall } from "../../multimodal-live-types";
import { callMarketplace } from "../../api/marketplate-api";
import GpuCard from '../GpuCard/GpuCard';

const gpuPriceDeclaration: FunctionDeclaration = {
  name: "list_gpu_prices",
  description: "Lists current GPU price information.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      filter: {
        type: SchemaType.STRING,
        description: "Optional filter for GPU listing, e.g., model or brand",
      },
    },
    required: [],
  },
};

function GpuPriceListingComponent() {
  const [gpuData, setGpuData] = useState<any[]>([]);
  const { client, setConfig } = useLiveAPIContext();

  useEffect(() => {
    // Set up configuration including tool declaration
    setConfig({
      model: "models/gemini-2.0-flash-exp",
      generationConfig: {
        responseModalities: "audio",
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
        },
      },
      systemInstruction: {
        parts: [
          {
            text: 'You are my helpful assistant. When I ask for GPU pricing, use the "list_gpu_prices" function. Just respond with the pricing details.',
          },
        ],
      },
      tools: [
        // include GPU price listing function declaration
        { functionDeclarations: [gpuPriceDeclaration] },
      ],
    });
  }, [setConfig]);

  useEffect(() => {
    const onToolCall = async (toolCall: ToolCall) => {
      console.log("Received gpu price tool call:", toolCall);
      const fc = toolCall.functionCalls.find(
        (fc) => fc.name === gpuPriceDeclaration.name,
      );
      if (fc) {
        try {
          const filter = (fc.args as any).filter || "";
          const marketplaceData = await callMarketplace(filter);
          setGpuData(marketplaceData.items || []);

          // Send success response
          client.sendToolResponse({
            functionResponses: toolCall.functionCalls.map((fc) => ({
              response: { output: { success: true, data: marketplaceData } },
              id: fc.id,
            })),
          });
        } catch (error) {
          console.error("Error fetching GPU prices:", error);
          setGpuData([]);

          // Send error response
          client.sendToolResponse({
            functionResponses: toolCall.functionCalls.map((fc) => ({
              response: { output: { success: false, error: "Failed to fetch GPU prices" } },
              id: fc.id,
            })),
          });
        }
      }
    };

    client.on("toolcall", onToolCall);
    return () => {
      client.off("toolcall", onToolCall);
    };
  }, [client]);

  return (
    <div>
      <h3>GPU Pricing</h3>
      <div className="gpu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {gpuData.length > 0 ? (
          gpuData.map((gpu, index) => (
            <GpuCard key={index} gpu={gpu} />
          ))
        ) : (
          <p>No GPU pricing information received yet.</p>
        )}
      </div>
    </div>
  );
}

export const Altair = memo(GpuPriceListingComponent);