import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function DetailDrawer({ open, onOpenChange, title, children, footer }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-lg flex-col gap-5 overflow-y-auto bg-paper p-6 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300 dark:bg-night-card">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-lg font-semibold text-ink dark:text-paper">
              {title}
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-1.5 text-ink/60 transition hover:bg-ink/5 dark:text-paper/60 dark:hover:bg-paper/10">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <div className="flex-1 space-y-6">{children}</div>

          {footer && (
            <div className="flex flex-wrap gap-3 border-t border-dashed border-ink/10 pt-5 dark:border-paper/10">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
