import { useCallback } from 'react';

const YupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.map((message, type) => ({ type, message }))
        };
      }
    },
    [validationSchema]
  );
export default YupValidationResolver;
