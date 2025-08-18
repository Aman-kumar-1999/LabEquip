import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo/logo_lab.png"
        alt="logo"
        width={100}
        height={100}
        //style={{ width: "100px", height: "100px" }}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
