import { BookOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import Home from "@/modules/Home";
import Books from "@/modules/Books";
import Members from "@/modules/Members";

interface MenuProps {
  key: string;
  icon: React.ReactNode;
  label: string;
  element: React.ReactNode | any;
  path: string;
}

const Navigation: MenuProps[] | any = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: "Home",
    element: <Home />,
    path: "/",
  },
  {
    key: "2",
    icon: <BookOutlined />,
    label: "Books",
    element: <Books />,
    path: "/books",
  },
  {
    key: "3",
    icon: <UserOutlined />,
    label: "Members",
    element: <Members />,
    path: "/members",
  },
];

export default Navigation;
