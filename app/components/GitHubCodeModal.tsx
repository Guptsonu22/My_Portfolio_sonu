"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"

interface GitHubCodeModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  repoUrl: string
}

export function GitHubCodeModal({ isOpen, onClose, title, repoUrl }: GitHubCodeModalProps) {
  const [code, setCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchGitHubCode()
    }
  }, [isOpen, repoUrl])

  const fetchGitHubCode = async () => {
    setLoading(true)
    setError(null)
    setCode(null)

    try {
      const apiUrl = repoUrl.replace("github.com", "api.github.com/repos") + "/contents"
      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error("Failed to fetch repository contents")
      }

      const data = await response.json()
      const readmeFile = data.find((file: any) => file.name.toLowerCase() === "readme.md")

      if (!readmeFile) {
        throw new Error("README.md not found in the repository")
      }

      const readmeResponse = await fetch(readmeFile.download_url)
      if (!readmeResponse.ok) {
        throw new Error("Failed to fetch README.md content")
      }

      const readmeContent = await readmeResponse.text()
      setCode(readmeContent)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title} - GitHub Source Code</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          {loading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
          {error && <div className="p-4 text-red-500">Error: {error}</div>}
          {code && (
            <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto">
              <code className="text-sm">{code}</code>
            </pre>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
