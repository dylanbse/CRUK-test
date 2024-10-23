import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Box, Button, TextField } from "@cruk/cruk-react-components";
import { Dispatch, SetStateAction } from "react";
import { NasaSearchParams } from "../types";

export const formSchema = z.object({ 
  keywords: z
    .string({
      required_error: "Keywords required."
    })
    .min(2, "Keywords must have at least 2 characters.")
    .max(50, "Keywords must have at most 50 characters."),
  mediaType: z
    .enum(
      ["audio", "video", "image"], {
        required_error: "Please select a media type."
      }),
  yearStart: z
    .number()
    .min(1900)
    .max(new Date().getFullYear())
    .optional(),
});

export type FormValues = z.infer<typeof formSchema>;

Form

export const initialData = {
  keywords: "",
  mediaType: "",
  yearStart: ""
} as unknown as FormValues;

export function Form({
  setValues,
}: {
  setValues: Dispatch<SetStateAction<NasaSearchParams | undefined>>;
}) {
  const formProps = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "firstError",
    shouldFocusError: true,
    defaultValues: initialData,
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = formProps;

  const onSubmit: SubmitHandler<FormValues> = async (
    data,
  ): Promise<void> => {
    
    setValues({
      mediaType: data.mediaType as FormValues["mediaType"],
      keywords: data.keywords,
      yearStart: data.yearStart ? data.yearStart : undefined
    })
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box marginBottom="m">
          <TextField
            {...register("keywords")}
            errorMessage={errors.keywords?.message}
            name="keywords"
            label="Keywords"
            required
          />
        </Box>
        <Box marginBottom="m">
          <TextField
            {...register("mediaType")}
            errorMessage={errors.mediaType?.message}
            name="mediaType"
            label="Media Type"
            required
          />
        </Box>
        <Box marginBottom="m">
        </Box>
        <Box marginBottom="m">
          <TextField
            {...register("yearStart", {
              valueAsNumber: true
            } )}
            name="yearStart"
            errorMessage={errors.yearStart?.message}
            label="Year start"
          />
        </Box>
        <Box marginBottom="m">
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </>
  );
}
