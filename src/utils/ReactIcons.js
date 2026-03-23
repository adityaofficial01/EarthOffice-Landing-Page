import { FaArrowCircleRight } from "react-icons/fa";
import { FaCircleArrowLeft, FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { IoCloseCircle, IoMenuSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';



export const ReactIcons = {
    MenuBar: () => <IoMenuSharp className={`size-10`} />,
    ArrowRightCircleIcon: ({ style, className }) => <FaCircleArrowLeft style={style} className={`${className} bg-white text-red-900 rounded-full size-10`} />,
    ArrowLeftCircleIcon: ({ style, className }) => <FaArrowCircleRight style={style} className={`${className} bg-white rounded-full text-red-900 size-10`} />,
    ArrowUpIcon: ({ style, className }) => <MdOutlineKeyboardArrowUp style={style} className={`${className} text-Blue-100 size-10`} />,
    ArrowDownIcon: ({ style, className }) => <MdOutlineKeyboardArrowDown style={style} className={`${className}  text-Blue-100 size-10`} />,
    CloseIcon: ({ style, className }) => <IoCloseCircle style={style} className={`${className}  text-red-900 size-16 -mt-5 sm:-mt-4`} />,
    PauseIcon: ({ style, className }) => <FaCirclePause style={style} className={`${className} text-white size-14`} />,
    PlayIcon: ({ style, className }) => <FaCirclePlay style={style} className={`${className} text-white size-14`} />,
}