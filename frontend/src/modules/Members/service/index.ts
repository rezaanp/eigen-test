import API from "@/utils/API";

const GET = async (endpoint: string) => {
  try {
    const response = await API.get(endpoint);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export { GET };
