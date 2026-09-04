export function Stat({
  value,
  suffix,
  label,
  suffixClassName = "text-2xl md:text-3xl",
  className = "",
}: {
  value: string;
  suffix?: string;
  label: string;
  suffixClassName?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-4xl font-medium tracking-tight md:text-5xl">
        {value}
        {suffix && <span className={suffixClassName}>{suffix}</span>}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
