import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";

interface IProps {
  link?: string;
  heading: string;
  subHeading: string;
  spantext:string;
}

const SectionHeading = ({ heading, subHeading, link, spantext }: IProps) => {
  return (
    <header className="flex justify-between items-start">
      <div>
        <h1 className="font-semibold text-lg">{heading}</h1>

        <p className="text-sm text-gray-500 mt-1">
         {subHeading}
        </p>
      </div>

      {link && (
        <Link href={link}>
          <div className="flex items-center gap-2 mt-3 text-gray-600 font-normal text-[14px] hover:text-primary-hover transition-all duration-300">
            <span className="text-[16px]">{spantext}</span>
            <IoChevronDown size={16} />
          </div>
        </Link>
      )}
    </header>
  );
};

export default SectionHeading;
