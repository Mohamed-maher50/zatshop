import Image from "next/image";
import { Container } from "./Container";

const HeroSection = () => {
  return (
    <div className="w-full  h-[40rem] relative overflow-hidden">
      <Container className="h-full w-full">
        <div className="relative  w-[26.3rem]  h-full">
          <div className="h-full w-[26.3rem] bg-primary/70 absolute inset-0 z-10">
            <span className="text-primary-foreground">
              BAT TRANG DINNER SET
            </span>
          </div>
        </div>
      </Container>
      <Image
        className=" bg-contain inset-0"
        src={"/flat-lay-composition-different-sized-plates 1.png"}
        alt="hero"
        fill
      />
    </div>
  );
};

export default HeroSection;
