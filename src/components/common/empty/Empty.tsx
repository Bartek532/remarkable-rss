import { memo } from "react";

interface EmptyProps {
  readonly children: React.ReactNode;
  readonly onCreateNew: () => void;
}

export const Empty = memo<EmptyProps>(({ children, onCreateNew }) => {
  return (
    <button
      type="button"
      className="relative mt-8 block flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-16 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={onCreateNew}
    >
      {children}
    </button>
  );
});

Empty.displayName = "Empty";
