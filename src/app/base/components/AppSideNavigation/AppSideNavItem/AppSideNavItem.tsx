import type { ReactNode } from "react";

import { Icon } from "@canonical/react-components";
import { Link } from "react-router-dom-v5-compat";

import type { NavItem } from "../types";
import { isSelected } from "../utils";

import { useId } from "app/base/hooks/base";

type Props = {
  navLink: NavItem;
  icon?: string | ReactNode;
  path: string;
};

export const AppSideNavItem = ({ navLink, icon, path }: Props): JSX.Element => {
  const id = useId();
  return (
    <li
      aria-labelledby={`${navLink.label}-${id}`}
      className={`l-navigation__item${
        isSelected(path, navLink) ? " is-selected" : ""
      }`}
    >
      <Link
        aria-current={isSelected(path, navLink) ? "page" : undefined}
        className="l-navigation__link"
        id={`${navLink.label}-${id}`}
        to={navLink.url}
      >
        {icon ? (
          typeof icon === "string" ? (
            <Icon light name={icon} />
          ) : (
            <>{icon}</>
          )
        ) : null}
        <span className="l-navigation__link-text">{navLink.label}</span>
      </Link>
    </li>
  );
};

export default AppSideNavItem;