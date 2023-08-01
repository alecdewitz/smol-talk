'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Textarea } from './ui/textarea'
import { updateUser } from '@/app/actions'
import { stringToColor, invertColorForText } from '@/lib/utils'
import { PromptBodyField, PromptNameField } from './profile-form-fields'

export default function ProfileForm({
  user,
  prompts
}: {
  user: any
  prompts: any[]
}) {
  const [numPrompts, setNumPrompts] = React.useState(prompts.length)

  let formSchema: z.ZodRawShape = {
    username: z
      .string()
      .min(2, { message: 'Username cannot have fewer than 2 characters' })
      .max(50, { message: 'Username cannot have more than 50 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' })
  }

  const defaultValues: any = {
    username: user.user_metadata.user_name,
    email: user.user_metadata.email
  }

  for (let index = 0; index < numPrompts; index++) {
    const prompt = prompts[index] || {}
    formSchema = {
      ...formSchema,
      [`prompt_id_${index}`]: z.number().nullable().optional(),
      [`prompt_name_${index}`]: z.string().optional(),
      [`prompt_body_${index}`]: z.string().optional()
    }
    defaultValues[`prompt_id_${index}`] = prompt.id || null
    defaultValues[`prompt_name_${index}`] = prompt.prompt_name || null
    defaultValues[`prompt_body_${index}`] = prompt.prompt_body || null
  }

  const finalFormSchema = z.object(formSchema)

  const form = useForm<z.infer<typeof finalFormSchema>>({
    resolver: zodResolver(finalFormSchema),
    mode: 'onChange',
    defaultValues
  })

  const { isDirty, isValid } = form.formState

  async function onSubmit(values: z.infer<typeof finalFormSchema>) {
    try {
      console.log('🔴 Submitting Form Values:', values)
      const result = await updateUser({ values, user })
      console.log('Update User Result:', result)
    } catch (error) {
      console.error('Error Updating User:', error)
    }
  }

  function addPrompt() {
    setNumPrompts(numPrompts + 1)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        method="post"
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="smol-developer" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="sama@openai.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {[...Array(numPrompts)].map((_, index) => (
          <React.Fragment key={index}>
            <PromptNameField form={form} index={index} />
            <PromptBodyField form={form} index={index} />
          </React.Fragment>
        ))}
        <div>
          <Button variant="outline" onClick={addPrompt}>
            {' '}
            + Add Prompt
          </Button>
        </div>
        <Button type="submit" disabled={!isDirty || !isValid}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
