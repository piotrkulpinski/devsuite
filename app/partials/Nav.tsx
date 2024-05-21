import { NavLink } from "@remix-run/react"
import {
  HomeIcon,
  GlassesIcon,
  BrickWallIcon,
  PaintbrushIcon,
  TwitterIcon,
  GithubIcon,
} from "lucide-react"
import { HTMLAttributes } from "react"
import { Dock } from "~/components/Dock"

export const Nav = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <Dock {...props}>
      <NavLink to="/">
        {({ isActive }) => (
          <Dock.Item isActive={isActive}>
            <HomeIcon />
          </Dock.Item>
        )}
      </NavLink>

      <NavLink to="/test">
        {({ isActive }) => (
          <Dock.Item isActive={isActive}>
            <GlassesIcon />
          </Dock.Item>
        )}
      </NavLink>

      <NavLink to="/test">
        {({ isActive }) => (
          <Dock.Item isActive={isActive}>
            <BrickWallIcon />
          </Dock.Item>
        )}
      </NavLink>

      <NavLink to="/test">
        {({ isActive }) => (
          <Dock.Item isActive={isActive}>
            <PaintbrushIcon />
          </Dock.Item>
        )}
      </NavLink>

      <Dock.Separator />

      <NavLink to="/test">
        {({ isActive }) => (
          <Dock.Item isActive={isActive}>
            <TwitterIcon />
          </Dock.Item>
        )}
      </NavLink>

      <NavLink to="/test">
        {({ isActive }) => (
          <Dock.Item isActive={isActive}>
            <GithubIcon />
          </Dock.Item>
        )}
      </NavLink>
    </Dock>
  )
}
