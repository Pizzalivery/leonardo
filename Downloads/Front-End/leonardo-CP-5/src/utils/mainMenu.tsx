import { Home, Menu, ReceiptText, Search, UserRound } from "lucide-react";

export const mainMenuItems = [
  {
    id: 1,
    icon: <Home />,
    label: "Início",
    link: "/",
  },
  {
    id: 2,
    icon: <Search />,
    label: "Busca",
    link: "/search",
  },
  {
    id: 3,
    icon: <Menu />,
    label: "Menu",
    link: "/menu",
  },
  {
    id: 4,
    icon: <ReceiptText />,
    label: "Pedidos",
    link: "/orders",
  },
  {
    id: 5,
    icon: <UserRound />,
    label: "Perfil",
    link: "/profile",
  },
];
