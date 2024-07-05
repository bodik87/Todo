import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Circle,
  CircleCheck,
  CloudOff,
  Copy,
  Languages,
  Settings2,
  Trash,
  UserCircle,
} from "lucide-react";

export function ExpandIcon() {
  return <ChevronUp />;
}

export function CollapseIcon() {
  return <ChevronDown />;
}

export function DeleteIcon() {
  return <Trash size={22} />;
}

export function BackIcon() {
  return <ArrowLeft />;
}

export function SettingsIcon() {
  return <Settings2 />;
}

export function UserIcon() {
  return <UserCircle className="stroke-app-green" />;
}

export function LanguagesIcon() {
  return <Languages className="stroke-app-red" />;
}

export function NoConnectionIcon() {
  return <CloudOff className="stroke-app-red" />;
}

export function CopyIcon() {
  return <Copy size={20} />;
}

export function TodoIcon() {
  return <Circle className="stroke-app-blue" />;
}

export function TodoCheckedIcon() {
  return <CircleCheck className="stroke-app-gray-200" />;
}

export function Loader() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 54 20"
      className="mt-5 max-w-10"
    >
      <circle cx="6" cy="10" r="6" className="fill-app-green">
        <animate
          attributeName="opacity"
          begin=".1"
          dur="1s"
          repeatCount="indefinite"
          values="0;1;0"
        />
      </circle>
      <circle cx="26" cy="10" r="6" className="fill-app-green">
        <animate
          attributeName="opacity"
          begin=".2"
          dur="1s"
          repeatCount="indefinite"
          values="0;1;0"
        />
      </circle>
      <circle cx="46" cy="10" r="6" className="fill-app-green">
        <animate
          attributeName="opacity"
          begin=".3"
          dur="1s"
          repeatCount="indefinite"
          values="0;1;0"
        />
      </circle>
    </svg>
  );
}
