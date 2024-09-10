export  interface IbuttonProps{
    label: string;
    onClick:()=>void;
    className?: string;
    type?: "button" | "submit" | "reset";
}