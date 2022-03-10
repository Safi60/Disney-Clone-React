import Link from "next/link";
import Image from "next/image";
import logo from "../public/disney.png";

const NavBar = ({ account }) => {
  return (
    <div className="NavBar">
      <div className="logo-wrapper">
        <Link href="/">
          <Image src={logo} alt="Disney logo" width={90} height={50} />
        </Link>
      </div>

      <div className="account-info">
        <p>
          <span>Welcome</span> {account.username}
        </p>
        <img className="avatar" src={account.avatar.url} alt="profile image" />
      </div>
    </div>
  );
};

export default NavBar;
