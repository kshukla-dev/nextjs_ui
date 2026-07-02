import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  description?: string
  align?: "left" | "center" | "right"
}

const SectionTitle = React.forwardRef<HTMLDivElement, SectionTitleProps>(
  ({ className, title, subtitle, description, align = "left", ...props }, ref) => {
    const alignments = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }
    const alignmentClass = alignments[align]
    const descriptionMarginClass = align === "center" ? "mx-auto" : align === "right" ? "ml-auto mr-0" : "mr-auto ml-0"

    return (
      <div ref={ref} className={cn("mb-6", alignmentClass, className)} {...props}>
        <h2 className={cn("section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight", alignmentClass)}>
          {title}
        </h2>
        {description && (
          <p className={cn("text-base text-gray-600 max-w-3xl leading-relaxed", alignmentClass, descriptionMarginClass)}>
            {description}
          </p>
        )}
      </div>
    )
  }
)
SectionTitle.displayName = "SectionTitle"

export { SectionTitle }

