/** @format */

import classNames from "classnames";
import { FiActivity } from "react-icons/fi";
import { HiOutlineCog, HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router-dom";

import type { CommonProps } from "@/@types/common";
import Avatar from "@/components/ui/Avatar";
import Dropdown from "@/components/ui/Dropdown";
// import { useAppSelector } from "@/store";
import withHeaderItem from "@/utils/hoc/withHeaderItem";
import useAuth from "@/utils/hooks/useAuth";

type DropdownList = {
  label: string;
  path: string;
  icon: JSX.Element;
};

const dropdownItemList: DropdownList[] = [
  // {
  //   label: "Profile",
  //   path: "/app/account/settings/profile",
  //   icon: <HiOutlineUser />,
  // },
  // {
  //   label: "Account Setting ",
  //   path: "/app/account/settings/profile",
  //   icon: <HiOutlineCog />,
  // },
  // {
  //   label: "Activity Log",
  //   path: "/app/account/activity-log",
  //   icon: <FiActivity />,
  // },
  // {
  //   label: "Custom Setting",
  //   path: "/app/account/custom-setting",
  //   icon: <HiOutlineCog />,
  // },
  // {
  //   label: "Filter Setting",
  //   path: "/app/account/filter-setting",
  //   icon: <HiOutlineCog />,
  // },
];

const _UserDropdown = ({ className }: CommonProps) => {
  const { avatar, userName, authority, email } = useAppSelector(
    (state) => state.auth.user
  );

  const { signOut } = useAuth();

  const UserAvatar = (
    <div className={classNames(className, "flex items-center gap-2")}>
      <Avatar size={32} shape="circle" src={avatar} />
      <div className="hidden md:block">
        <div className="font-bold text-xs">{userName}</div>
        <div className="text-xs capitalize">{authority?.[0] || "guest"}</div>
      </div>
    </div>
  );

  return (
    <div>
      <Dropdown
        menuStyle={{ minWidth: 240 }}
        renderTitle={UserAvatar}
        placement="bottom-end"
      >
        <Dropdown.Item variant="header">
          <div className="py-2 px-3 flex items-center gap-2">
            <Avatar shape="circle" src={avatar} />
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100">
                {userName}
              </div>
              <div className="text-xs">{email}</div>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item variant="divider" />
        {dropdownItemList.map((item) => (
          <Dropdown.Item
            key={item.label}
            eventKey={item.label}
            className="mb-1 px-0"
          >
            <Link className="flex h-full w-full px-2" to={item.path}>
              <span className="flex gap-2 items-center w-full">
                <span className="text-xl opacity-50">{item.icon}</span>
                <span>{item.label}</span>
              </span>
            </Link>
          </Dropdown.Item>
        ))}
        <Dropdown.Item variant="divider" />
        <Dropdown.Item eventKey="Sign Out" className="gap-2" onClick={signOut}>
          <span className="text-xl opacity-50">
            <HiOutlineLogout />
          </span>
          <span>Sign Out</span>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

const UserDropdown = withHeaderItem(_UserDropdown);

export default UserDropdown;
