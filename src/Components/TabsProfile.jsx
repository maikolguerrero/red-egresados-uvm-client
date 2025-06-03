import { createTheme, TabItem, Tabs, ThemeProvider } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import FormContact from "./Forms/Profile/FormContact";
import FormProfessional from "./Forms/Profile/FormProfessional";

const customTheme = createTheme({
  "base": "flex flex-col gap-2",
  "tablist": {
    "base": "flex text-center",
    "variant": {
      "default": "flex-wrap border-b border-verdeD",
      "underline": "-mb-px flex-wrap border-b border-verdeD",
      "pills": "flex-wrap space-x-2 text-sm font-medium text-Negro",
      "fullWidth": "grid w-full grid-flow-col divide-x divide-verdeD rounded-none text-sm font-medium shadow"
    },
    "tabitem": {
      "base": "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400",
      "variant": {
        "default": {
          "base": "rounded-t-lg",
          "active": {
            "on": "bg-verdeD bg-opacity-30 text-RojoC ",
            "off": "text-Negro hover:bg-gray-200 hover:text-RojoC"
          }
        },
        "underline": {
          "base": "rounded-t-lg",
          "active": {
            "on": "rounded-t-lg border-b-2 border-primary-600 text-primary-600",
            "off": "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600"
          }
        },
        "pills": {
          "base": "",
          "active": {
            "on": "rounded-lg bg-primary-600 text-white",
            "off": "rounded-lg hover:bg-gray-100 hover:text-gray-900"
          }
        },
        "fullWidth": {
          "base": "ml-0 flex w-full rounded-none first:ml-0",
          "active": {
            "on": "rounded-none bg-gray-100 p-4 text-gray-900",
            "off": "rounded-none bg-white hover:bg-gray-50 hover:text-gray-700"
          }
        }
      },
      "icon": "mr-2 h-5 w-5"
    }
  },
  "tabitemcontainer": {
    "base": "",
    "variant": {
      "default": "",
      "underline": "",
      "pills": "",
      "fullWidth": ""
    }
  },
  "tabpanel": "py-3"
});

export function TabsProfile() {
  return (
    <ThemeProvider theme={customTheme}>
      <Tabs theme={customTheme} aria-label="Default tabs" variant="default">
        <TabItem active title="Contactos" icon={HiUserCircle}>
          <FormContact />
        </TabItem>
        <TabItem title="Profesional" icon={MdDashboard}>
          <FormProfessional />
        </TabItem>
      </Tabs>
    </ThemeProvider>
  );
}