import UpdateTab from "../components/Update";
import Delete from "../components/Delete";
import UpperTab from "../components/Tab";

export default function Profile() {
  const items = [
    {
      id: 0,
      label: "Update",
      content: <UpdateTab />,
    },
    {
      id: 1,
      label: "Delete",
      content: <Delete />,
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Tab wise */}
      <UpperTab items={items} />
    </div>
  );
}
