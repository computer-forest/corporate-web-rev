
type FormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function FormSection({
  title,
  description,
  children,
}: Readonly<FormSectionProps>) {
  return (
    <section
      className="card border-0 shadow-sm mb-4"
      aria-labelledby={title
        .toLowerCase()
        .replace(/\s+/g, "-")}
    >
      <div className="card-body">
        <h2
          className="h5 mb-2"
          id={title
            .toLowerCase()
            .replace(/\s+/g, "-")}
        >
          {title}
        </h2>

        {description && (
          <p className="text-muted mb-4">
            {description}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}


// we can use it like 
{/* <FormSection
  title="Personal Details"
  description="Enter your basic information."
>
  <InputField ... />
  <InputField ... />
</FormSection> */}