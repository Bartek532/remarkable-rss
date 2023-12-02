"use client";

import { Switch } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { THEME, useThemeContext } from "../../../providers/ThemeProvider";

export const SettingsView = () => {
  const { theme, changeTheme } = useThemeContext();

  return (
    <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
      <Switch.Group as="div" className="flex items-center justify-between">
        <span className="flex flex-grow flex-col">
          <Switch.Label
            as="span"
            className="text-sm font-medium text-gray-900 dark:text-white"
            passive
          >
            Dark mode
          </Switch.Label>
        </span>
        <Switch
          checked={theme === THEME.DARK}
          onChange={(checked) =>
            checked ? changeTheme(THEME.DARK) : changeTheme(THEME.LIGHT)
          }
          className={twMerge(
            theme === THEME.DARK ? "bg-indigo-600" : "bg-gray-200",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          )}
        >
          <span
            aria-hidden="true"
            className={twMerge(
              theme === THEME.DARK ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            )}
          />
        </Switch>
      </Switch.Group>
    </div>
  );
};
