'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, RefreshCw } from "lucide-react"
import { useCompletion } from 'ai/react'

export function JokeGenerator() {
  const [subject, setSubject] = useState("")

  const { complete, completion, isLoading } = useCompletion({
    api: '/api/joke',
  })

  const handleGenerateJoke = async () => {
    if (!subject) return
    await complete(`Generate a unique and funny dad joke about ${subject}. Be creative and avoid common puns if possible.`)
  }

  return (
    <div className="w-screen h-full p-4 overflow-auto">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <img src="/logo.png" alt="Jarrod" width={1344 / 4} height={896 / 4} className="rounded-full" />
          <CardTitle className="text-2xl font-bold text-purple-800">Jarrod's Joke Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter a subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full"
            />
            <Button
              onClick={handleGenerateJoke}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading || !subject}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Gimme a Joke!"
              )}
            </Button>
            {completion && (
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-purple-100 rounded-md">
                  <p className="text-purple-800 font-medium">{completion}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}