import { Grid } from '@mui/material';
import { Control, Controller, FieldValues, FieldErrors, Path } from 'react-hook-form';
import CustomInput from '@/components/CustomInput';

// This is a generic type for form field.
// When using this type, we need to provide the type of the formdata generated by using schema.
// i.e T is the type of the formdata.
// The type of the form data is used to infer the type of the field name.
export type FormField<T> = {
  label: string; // Label for the field.
  name: keyof T; // Name of the field.
  type?: string; // Type of the field.
  options?: { label: string; src: string; value: string | number }[]; // Options for select inputs.
  multiline?: boolean; // Renders a multiline input if true.
  rows?: number; // Number of rows to display if multiline is true.
  xs?: number; // Grid size for extra small screens.
  sm?: number; // Grid size for small screens.
  defaultValue?: any; // Default value for the field.
  sx?: any; // Style object for the field.
};

interface FormSectionProps<T extends FieldValues> {
  /** fields to be displayed in the form section. */
  fields: FormField<T>[];

  /** Form control object from react-hook-form. */
  control: Control<T>;

  /** Errors object from react-hook-form. */
  errors: FieldErrors<T>;

  /** Additional elements to render inside the form section. */
  children?: React.ReactNode;

  /** Additional elements to render inside the input container. */
  childrenForInput?: { [key in keyof T]?: React.ReactNode };

  /** Show password visibility toggle. */
  showPassword?: Record<string, boolean>;

  /** Handle password visibility toggle. */
  handleToggleVisibility?: (field: keyof FormSectionProps<T>['showPassword']) => void;

  /** Default value for the field. */
  defaultValue?: any;

  /** sx . */
  sx?: any;
}

/**
export default function FormSection<T extends FieldDataType>({
 */
export default function FormSection<T extends Record<string, any>>({
  fields,
  control,
  errors,
  children,
  childrenForInput,
  showPassword,
  handleToggleVisibility,
  defaultValue,
  sx
}: FormSectionProps<T>) {
  return (
    <>
      {children}
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={field.xs || 12} sm={field.sm || 12} key={field.name as string} sx={{ mt: 1 }}>
            <Controller
              name={field.name as Path<T>}
              control={control}
              render={({ field: controllerField }) => (
                <CustomInput
                  {...controllerField}
                  name={field.name as string}
                  type={field.type}
                  label={field.label}
                  options={field.options}
                  multiline={field.multiline}
                  rows={field.rows}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message as string}
                  showPassword={showPassword}
                  handleToggleVisibility={handleToggleVisibility}
                  defaultValue={defaultValue}
                  sx={sx}
                >
                  {/* Render the specific component for specific field */}
                  {(childrenForInput && childrenForInput[field.name]) || null}
                </CustomInput>
              )}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
