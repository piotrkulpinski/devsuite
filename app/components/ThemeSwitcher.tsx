import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/DropdownMenu"
import { Button, ButtonProps } from "./Button"

export const ThemeSwitcher = ({ ...props }: ButtonProps) => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          title="Toggle theme"
          prefix={resolvedTheme === "dark" ? <MoonIcon /> : <SunIcon />}
          {...props}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} asChild>
          <button type="button">Light</button>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("dark")} asChild>
          <button type="button">Dark</button>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("system")} asChild>
          <button type="button">System</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
