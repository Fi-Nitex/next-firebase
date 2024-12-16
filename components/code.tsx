interface KbdProps {
  text: string;
  classname?: string;
}

export default function Kbd({ text, classname }: KbdProps) {
  return (
    <span className={`bg-gray-400/30 rounded-lg p-1.5 ${classname}`}>
      <p className="text-text-100 text-xs">{text}</p>
    </span>
  );
}
