import { PropsWithChildren } from "react";
import mapon from "@/assets/mapon.png";
import "./Layout.scss";

interface ILayout extends PropsWithChildren {}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className="mp-layout-wrapper">
      <main className="mp-layout">
        <figure className="mp-logo-wrapper" aria-label="Mapon logo">
          <img src={mapon} alt="Mapon logo" />
          <figcaption className="mp-hidden">Mapon logo</figcaption>
        </figure>
        {children}
      </main>
    </div>
  );
};

export default Layout;
