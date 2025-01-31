'use client'

import Image from 'next/image'
import { type Session } from '@supabase/auth-helpers-nextjs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IconExternalLink } from '@/components/ui/icons'
import { ChatBubbleIcon, HomeIcon } from '@radix-ui/react-icons'

export interface UserMenuProps {
  user: Session['user']
}

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter()
  const path = usePathname();

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0">
            {user?.user_metadata.avatar_url ? (
              <Image
                height={60}
                width={60}
                className="w-6 h-6 transition-opacity duration-300 rounded-full select-none ring-1 ring-zinc-100/10 hover:opacity-80"
                src={
                  user?.user_metadata.avatar_url
                    ? `${user.user_metadata.avatar_url}&s=60`
                    : ''
                }
                alt={user.user_metadata.name ?? 'Avatar'}
              />
            ) : (
              <div className="flex items-center justify-center text-xs font-medium uppercase rounded-full select-none h-7 w-7 shrink-0 bg-muted/50 text-muted-foreground">
                {user?.user_metadata.name
                  ? getUserInitials(user?.user_metadata.name)
                  : null}
              </div>
            )}
            {/* <span className="ml-2">{user?.user_metadata.name}</span>
            <span className="w-20 ml-2 overflow-hidden text-ellipsis whitespace-nowrap md:w-full ">
              {user?.name}
            </span> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-[180px]">
          <DropdownMenuItem onClick={() => router.push('/profile')} className="flex-col items-start cursor-pointer">
	          <div className="text-xs font-medium">
	            Profile
	          </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex-col items-start cursor-pointer">
            <div className="text-xs font-medium">
              {user?.user_metadata.name}
            </div>
            <div className="text-xs text-zinc-500">{user?.email}</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem asChild>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full text-xs"
            >
              Vercel Homepage
              <IconExternalLink className="w-3 h-3 ml-auto" />
            </a>
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={signOut} className="text-xs text-red-300 cursor-pointer hover:bg-red-700">
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {path === '/profile' &&
        <Button variant={'default'} onClick={() => router.push('/')} className='flex flex-row items-center ml-4'>
          <HomeIcon className='w-4 h-4 mr-2' /> Home
        </Button>
      }
    </div>
  )
}
