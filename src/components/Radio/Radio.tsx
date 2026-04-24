interface RadioProps {
  id: string;
  label: string;
  group: string;
  value?: string | null;
  disabled?: boolean;
  onChange: (value: string) => void;
}
export const Radio = ({ id, label, group, value, onChange }: RadioProps) => {
  return (
    <div className="flex items-center gap-2 select-none cursor-pointer">
      <input
        type="radio"
        className="appearance-none p-1 rounded-full bg-common-light border-8 border-common-light ring-1 ring-interface-border hover:bg-brand-primary checked:border-brand-primary"
        name={group}
        id={id}
        checked={value === id}
        onChange={() => onChange(id)}
      />
      <label htmlFor={id} className="w-full">
        {label}
      </label>
    </div>
  );
};

export const RadioCard = ({
  id,
  label,
  group,
  value = null,
  disabled = false,
  onChange,
}: RadioProps) => {
  return (
    <div className="bg-common-light rounded-2xl p-4 border border-interface-border flex items-center gap-2 select-none cursor-pointer my-2">
      <input
        type="radio"
        className="appearance-none p-1 rounded-full bg-common-light border-8 border-common-light ring-1 ring-interface-border hover:bg-brand-primary checked:border-brand-primary"
        name={group}
        id={id}
        checked={value === id}
        onChange={() => onChange(id)}
        disabled={disabled}
      />
      <label htmlFor={id} className="w-full">
        {label}
      </label>
    </div>
  );
};
