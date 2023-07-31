import { invertColorForText, stringToColor } from '@/lib/utils'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { UseFormReturn } from 'react-hook-form'
import { Textarea } from './ui/textarea'
import { useState } from 'react'

/*
 * Shows either the edit or view mode of the prompt fields
 */
// export function EditPromptFields({
//   form,
//   index
// }: {
//   form: UseFormReturn
//   index: number
// }) {
//   const [isEditing, setIsEditing] = useState(false)

//   return (
//     <div className="flex">

//     </div>
//   )
// }

export function PromptNameField({
  form,
  index
}: {
  form: UseFormReturn
  index: number
}) {
  return (
    <FormField
      control={form.control}
      name={`prompt_name_${index}`}
      render={({ field }) => (
        <div className="flex">
          <FormItem className="flex-1 mb-4">
            <FormLabel>Prompt Name</FormLabel>
            <FormControl>
              <Input placeholder="Tech Guru" {...field} />
            </FormControl>
            <FormDescription>
              Create a brief, descriptive title for your profile.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem className="ml-4">
            <FormLabel>Prompt Color</FormLabel>
            <FormDescription
              style={{
                backgroundColor: stringToColor(field.value),
                color: invertColorForText(stringToColor(field.value)),
                textAlign: 'center',
                margin: '1rem'
              }}
            >
              {stringToColor(field.value)}
            </FormDescription>
          </FormItem>
        </div>
      )}
    />
  )
}

// export function PromptNameView({
//   form,
//   index
// }: {
//   form: UseFormReturn
//   index: number
// }) {
//   return (
//     <div className="flex">
//       <FormItem className="flex-1 mb-4">
//         <FormLabel>Prompt Name</FormLabel>
//         <FormControl>
//           <Input placeholder="Tech Guru" {...form.getValues()} />
//         </FormControl>
//         <FormDescription>
//           Create a brief, descriptive title for your profile.
//         </FormDescription>
//         <FormMessage />
//       </FormItem>
//     </div>
//   )
// }

export function PromptBodyField({
  form,
  index
}: {
  form: UseFormReturn
  index: number
}) {
  return (
    <FormField
      control={form.control}
      name={`prompt_body_${index}`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Prompt Body</FormLabel>
          <FormControl>
            <Textarea
              placeholder="I'm a tech enthusiast who loves discussing the latest gadgets and AI trends."
              {...field}
            />
          </FormControl>
          <FormDescription>
            Identify your unique perspective or a perspective you&apos;d like
            the AI to adopt. This helps the AI to tailor its responses to your
            interests.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
