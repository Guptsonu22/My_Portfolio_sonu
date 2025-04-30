import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CodeModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  code: string
}

export function CodeModal({ isOpen, onClose, title, code }: CodeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title} - Source Code</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto">
            <code className="text-sm">{code}</code>
          </pre>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
