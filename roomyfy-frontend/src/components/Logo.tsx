import logo from "@/assets/roomyfy logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  withWordmark?: boolean;
  withTagline?: boolean;
  variant?: "light" | "dark";
  className?: string;
}

export const Logo = ({
  size = 32,
  withWordmark = true,
  withTagline = false,
  variant = "light",
  className,
}: LogoProps) => {
  const gap = size * 0.5;
  const wordmarkSize = size * 0.7;
  const taglineSize = Math.max(10, size * 0.28);

  return (
    <div className={cn("inline-flex items-center", className)} style={{ gap }}>
      <img
        src={logo}
        alt="Roomyfy logo"
        width={size}
        height={size}
        loading="lazy"
        className="block h-auto select-none"
        style={{
          width: size,
          filter: "drop-shadow(0 6px 14px hsl(224 76% 25% / 0.28))",
        }}
      />
      {withWordmark && (
        <div className="flex flex-col leading-none">
          <div
            className="font-display tracking-tight"
            style={{ fontSize: wordmarkSize, letterSpacing: "-0.02em" }}
          >
            <span
              className={cn(
                "font-semibold",
                variant === "dark" ? "text-white" : "text-foreground"
              )}
            >
              Roomy
            </span>
            <span
              className={cn(
                "font-medium",
                variant === "dark" ? "text-white/85" : "text-foreground/80"
              )}
            >
              fy
            </span>
          </div>
          {withTagline && (
            <span
              className="mt-1 font-medium tracking-wide"
              style={{
                fontSize: taglineSize,
                color: "hsl(175 84% 26%)",
                letterSpacing: "0.04em",
              }}
            >
              Smart Rooms. Smarter Living.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const LogoMark = ({
  size = 64,
  rounded = true,
  className,
}: {
  size?: number;
  rounded?: boolean;
  className?: string;
}) => (
  <div
    className={cn(
      "inline-flex items-center justify-center",
      rounded ? "rounded-2xl" : "",
      className
    )}
    style={{
      width: size,
      height: size,
      background:
        "linear-gradient(135deg, hsl(224 76% 26%) 0%, hsl(224 76% 33%) 45%, hsl(221 83% 45%) 100%)",
      boxShadow:
        "0 12px 32px -10px hsl(224 76% 18% / 0.55), inset 0 1px 0 hsl(0 0% 100% / 0.18)",
    }}
  >
    <img
      src={logo}
      alt="Roomyfy app icon"
      width={size}
      height={size}
      loading="lazy"
      className="block"
      style={{ width: size * 0.7, height: size * 0.7, filter: "brightness(1.15) contrast(1.05)" }}
    />
  </div>
);
