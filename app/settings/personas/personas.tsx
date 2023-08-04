'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import React from 'react'
import { getPrompts } from '../../actions'
import { PersonaForm } from './persona-form'

type Prompts = {
  prompt_name: string
  prompt_body: string
}[]

export function Personas({ user, prompts }: { user: any; prompts: any[] }) {
  const [editPrompts, setEditPrompts] = React.useState(prompts || [])

  function addPrompt() {
    setEditPrompts([
      ...editPrompts,
      { id: 0, prompt_name: '', prompt_body: '' }
    ])
  }

  const onUpdate = async () => {
    const result = (await getPrompts(user)) as Prompts
    setEditPrompts(result)
  }

  const onRemove = async (id: number) => {
    // remove index from editPrompts
    const newPrompts = editPrompts.filter(prompt => prompt.id !== id)
    setEditPrompts(newPrompts)
  }

  const isAddDisabled = editPrompts?.some(
    prompt => prompt.prompt_name === '' || prompt.prompt_body === ''
  )

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {editPrompts?.map((prompt, index) => (
          <PersonaForm
            key={prompt.id}
            prompt={prompt}
            user={user}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))}

        <Button
          type="button"
          disabled={isAddDisabled}
          variant="outline"
          onClick={addPrompt}
        >
          <PlusIcon className="h-4 w-4 mr-1.5" />
          Add New
        </Button>
      </div>
    </div>
  )
}
