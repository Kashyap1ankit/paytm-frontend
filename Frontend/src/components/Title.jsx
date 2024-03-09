export default function Title({ title, className, onClick }) {
  return (
    <>
      <p onClick={onClick} className={className}>
        {title}
      </p>
    </>
  );
}
