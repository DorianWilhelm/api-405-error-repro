export default function Home() {
  return (
    <div>
      <button
        onClick={async () => {
          const x = await (await fetch("/api/fetchAndRelay")).json();
          console.log(x);
        }}
      >
        TRIGGER API
      </button>
    </div>
  );
}
