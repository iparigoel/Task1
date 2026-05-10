export default function OutputBox({ data, isError = false }) {
  const text = typeof data === "string" ? data : JSON.stringify(data, null, 2);
  return <div className={`output ${isError ? "error" : "ok"}`}>{text}</div>;
}
