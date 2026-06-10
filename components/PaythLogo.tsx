import Image from "next/image";

export default function PaythLogo({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/brand/payth-logo-full.svg"
        alt="PAYTH — Find your path to payment"
        width={720}
        height={230}
        priority
        className="h-9 w-auto sm:h-10 md:h-11"
      />
    </div>
  );
}
