export default function Button({ nameBtn, colorBtn = "primary", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-white rounded-md ${
        colorBtn === "primary" ? "bg-accent-coral" : "bg-accent-success"
      } font-semibold whitespace-nowrap hover:opacity-95 disabled:opacity-70 mx-2 ${colorBtn === 'primary' ? "hover:bg-red-500" : "hover:bg-green-500"}`}
    >
      {nameBtn}
    </button>
  );
}
