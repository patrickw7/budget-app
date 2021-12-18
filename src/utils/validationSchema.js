import * as yup from 'yup';

export const validationSchema = yup.object({
  budgetItemType: yup.string().typeError('You must choose type of item!'),
  name: yup
    .string()
    .required('Name field is required!')
    .min(5, 'Name needs to has at least 5 characters!')
    .max(32, 'Name cannot exceed 32 characters!'),
  amount: yup
    .number()
    .typeError('Amount must be a number!')
    .required('Name field is required!')
    .min(1, 'Amount needs to be more than 0!')
    .max(1000000, 'Amount cannot exceed 1 million!'),
  category: yup.string().required('Category is required!'),
});
