export default function Button({ title, onClick, className }) {
  return (
    <div className={className} onClick={onClick}>
      <button>{title}</button>
    </div>
  );
}
