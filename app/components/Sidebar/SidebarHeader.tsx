import { SiOpenaigym } from "react-icons/si";
import ThemeToggle from "./ThemeToggle";

const SidebarHeader = () => {
  return (
    <div className="flex items-center mb-4 gap-4 px-4 justify-between">
      <SiOpenaigym className="w-10 h-10 text-primary "></SiOpenaigym>
      <div>
        <h2 className="text-xl font-extrabold text-primary mr-auto">GPTGenius</h2>
        <p className="text-xs text-center text-gray-500">v. 0.1.9</p>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default SidebarHeader;
