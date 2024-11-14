// Function to format the date
export const formatDate = (dateString?: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
