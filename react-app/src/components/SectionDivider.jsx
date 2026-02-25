// Thin gold ruled line used between sections
export default function SectionDivider({ className = '' }) {
  return (
    <div className={`w-full ${className}`}>
      <hr className="border-none border-t h-px" style={{ borderTop: '0.5px solid #C9A44C' }} />
    </div>
  )
}
