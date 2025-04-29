import { useTheme } from "../hooks/use-theme";
import { Search, Sun, Moon, ChevronsLeft } from "lucide-react";
import PropTypes from "prop-types";

export const Header = ({ collapsed, setCollapsed }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between bg-slate-900 px-4 shadow-md transition-colors text-white dark:bg-white dark:text-slate-900">
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
        </button>
        <div className="flex items-center gap-2 border border-slate-700 rounded-lg px-2 py-1 bg-slate-800 dark:bg-slate-200">
          <Search size={20} className="text-slate-300 dark:text-slate-700" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-300 dark:text-slate-50"
          />
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func.isRequired,
};

export default Header;