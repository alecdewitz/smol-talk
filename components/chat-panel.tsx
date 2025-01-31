import { type UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconStop } from '@/components/ui/icons'
// import { FooterText } from '@/components/footer'
import { Model } from '@/constants/models'
import { upsertChat } from '@/app/actions'
import { Session } from '@supabase/supabase-js'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
  setModel: (model: Model) => void
  model: Model
  userId?: string
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  setModel,
  model,
  messages,
  userId
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex items-center justify-center h-10">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async value => {
              await append({
                id,
                content: value,
                role: 'user'
              })
              // FIXME: FYI this was breaking a couple of things with the chat history:
              // - Overwriting the path and sharePath with invalid strings
              // - Not setting `id`, but instead assigning a new id to `chat_id` which kept the items from appearing in the sidebar
              // - For some reason doing this is also emptied the `messages` array which otherwise includes message objects
              // All of this is being handled by the `append` function which is a helper we get from the next `ai` package
              //
              // id = id ?? Math.random().toString(36).slice(2) // random id up to 11 chars
              // await upsertChat({
              //   chat_id: id,
              //   title: 'TODO: make title: '+ id,
              //   userId: userId || 'unknown-user-id', // TODO: try to get rid of unknown user id, higher up
              //   messages,
              //   createdAt: new Date(),
              //   path: "todo",
              //   sharePath: "todo"
              // })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            setModel={setModel}
            model={model}
          />

          {/* <FooterText className="hidden sm:block" /> */}
        </div>
      </div>
    </div>
  )
}
