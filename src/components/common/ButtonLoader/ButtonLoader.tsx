
type ButtonLoaderProps = {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
};

export default function ButtonLoader({
  isLoading,
  loadingText = "Processing...",
  children,
}: Readonly<ButtonLoaderProps>) {
  return (
    <>
      {isLoading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            aria-hidden="true"
          />
          {loadingText}
        </>
      ) : (
        children
      )}
    </>
  );
}


// wil'l use it like this

{/* <Button
  disabled={isSubmitting}
>
  <ButtonLoader isLoading={isSubmitting}>
    Submit
  </ButtonLoader>
</Button> */}
