import Image from "next/image";

export default function PaythLogo({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/payth-logo-transparent.png"
        alt="PAYTH — Find your path to payment"
        width={778}
        height={327}
        priority
        className="h-9 w-auto sm:h-10 md:h-11"
      />
    </div>
  );
}
