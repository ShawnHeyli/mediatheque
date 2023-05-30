export default function Debug({ title = "", data }) {
  return title ? (
    <>
      <h2>{title}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  ) : (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
}
