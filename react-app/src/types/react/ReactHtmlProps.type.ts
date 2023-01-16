export type ReactHtmlProps<HTMLElementProps> = Partial<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLElementProps>,
    HTMLElementProps
  >
>;

export type SelectInputProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { label: string };
